import { Injectable, NgZone } from '@angular/core';
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

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private ngZone: NgZone) {
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
    this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user).catch(error => {
        console.log(error); // todo: notify properly
      });
      this.ngZone.run(() => this.router.navigate(['/profile']));
    }).catch((error) => {
      this.afAuth.auth.fetchSignInMethodsForEmail(error.email).then(providers => {
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
            this.afs.collection('/users', ref => ref.where('email', '==', error.email))
            .valueChanges().subscribe(userObj => {
              let user = userObj[0];
              this.afAuth.auth.signInAndRetrieveDataWithCredential(
                firebase.auth.EmailAuthProvider.credential(user['email'], user['password']))
              .then(emailProviderUserObj => { // todo: rename
                emailProviderUserObj.user.linkAndRetrieveDataWithCredential(error.credential);
                this.router.navigate(['/profile']);
              })
            })
            return;
          }
          default: {
            console.log(providers[0])
          }
          break;
        }
        this.afAuth.auth.signInWithPopup(provider).then(primaryProviderUserObj => {
          this.afAuth.auth.signInAndRetrieveDataWithCredential(primaryProviderUserObj.credential).then(authenticatedUserObj => {
            authenticatedUserObj.user.linkAndRetrieveDataWithCredential(error.credential);
          })
        })
        this.ngZone.run(() => this.router.navigate(['/profile']));
      });
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['/profile']))
    .catch(error => {
      switch (error.code) {
        case 'auth/user-not-found':
        alert('No user with that email exists.');
        break;

        case 'auth/wrong-password':
        this.afs.collection('/users', ref => ref.where('email', '==', email))
        .valueChanges().subscribe(userObj => {
          if (userObj[0]['password'] == password) {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
            .then(googleUserObj => {
              let emailUserCredential = firebase.auth.EmailAuthProvider.credential(email, password)
              googleUserObj.user.linkAndRetrieveDataWithCredential(emailUserCredential)
              this.ngZone.run(() => this.router.navigate(['/profile']));
            });
          } else {
            // TODO: notify user properly and test error cases
            alert('Invalid password!');
          }
        });
        break;

        default:
        alert(error.message);
        alert(error.code);
        break;
      }
    });;
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
      this.router.navigate(['/profile'])
    }).catch(error => {
      alert(error.message);
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    })
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
