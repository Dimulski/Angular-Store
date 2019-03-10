import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of, merge } from 'rxjs';
import { switchMap, last, first } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(f => this.router.navigate(['/profile']))
    .catch(err => {
      switch (err.code) {
        case 'auth/user-not-found':
        alert('No user with that email exists!');
        break;

        case 'auth/wrong-password':
        this.afs.collection('/users', ref => ref.where('email', '==', email))
        .valueChanges().subscribe(userObj => {
          if (userObj[0]['password'] == password) {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
            .then(googleUserObj => {
              let emailUserCredential = firebase.auth.EmailAuthProvider.credential(email, password)
              googleUserObj.user.linkAndRetrieveDataWithCredential(emailUserCredential)
            });
          } else {
            // TODO: notify user properly
            alert('Invalid password!');
          }
        });
        break;

        default:
        alert(err.message);
        alert(err.code);
        break;
      }
    }).finally(() => this.router.navigate(['/profile']));;
  }

  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userInfo => {
      let user = userInfo.user;
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: {
          guest: true
        }
      }
      data['password'] = password;

      userRef.set(data, { merge: true }); // merge when registering might be unnecessary
      
    }).finally(() => this.router.navigate(['/profile']));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    })
  }
  
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user).catch(err => {
        console.log(err);
      })
    }).catch((err) => {
      this.afAuth.auth.fetchSignInMethodsForEmail(err.email).then(providers => {
        let provider = undefined;
        switch (providers[0]) {
          case 'google.com': {
            provider = new firebase.auth.GoogleAuthProvider();
          }
          break;
          case 'facebook.com': {
            provider = new firebase.auth.FacebookAuthProvider();
          }
          break;
          case 'twitter.com': {
            provider = new firebase.auth.TwitterAuthProvider();
          }
          break;
          case 'password': {
            this.afs.collection('/users', ref => ref.where('email', '==', err.email))
            .valueChanges().subscribe(userObj => {
              let user = userObj[0];
              this.afAuth.auth.signInWithCredential(firebase.auth.EmailAuthProvider.credential(user['email'], user['password']))
              .then(emailProviderUser => {
                emailProviderUser.linkWithCredential(err.credential);
              })
            })
            return;
          }
          default: {
            console.log(providers[0])
          }
          break;
        }
        this.afAuth.auth.signInWithPopup(provider).then(user => {
          this.afAuth.auth.currentUser.linkWithCredential
          console.log(user);
          this.afAuth.auth.signInWithCredential(user.credential).then(daUser => {
            daUser.linkWithCredential(err.credential);
          })
        })
      });
    }).finally(() => this.router.navigate(['/profile']));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        guest: true
      }
    }

    return userRef.set(data, { merge: true });
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'moderator', 'guest'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'moderator'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
}
