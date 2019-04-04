import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private user: any;
  private productCount: number;
  private totalPrice: string;
  private products: any[];
  private productsQ: [];

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.productCount = 0; // if initialization is inside user subscription maybe templating will be easier
    this.products = [];
    this.productsQ = [];

    auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.productCount = user['cartQ'].reduce((a, b) => a + b, 0);
        this.productsQ = user['cartQ'];
        this.totalPrice = '';
        let cartIndex = 0;
        user['cart'].forEach(productName => {
          afs.collection('/games').doc(productName).valueChanges().subscribe(game => {
            this.totalPrice = (+this.totalPrice + +(game['price'] * user['cartQ'][cartIndex]).toFixed(2)).toFixed(2);
            this.products.push(game);
            cartIndex++;
          })
        });
      }
    });
  }

  getProductCount() {
    return this.productCount;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
  
  getProducts() {
    return this.products; 
  }

  getProductsQ() {
    return this.productsQ;
  }

  increaseQuantity(index: number) {
    if (this.user !== null) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.user.uid}`);
      if (this.user['cartQ'][index] < 99) {
        this.user['cartQ'][index] += 1;
        let cartQ = {};
        cartQ['cartQ'] = this.user['cartQ'];
        userRef.update(cartQ);
      }
    }
  }

  decreaseQuantity(index: number) {
    if (this.user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.user.uid}`);
      if (this.user['cartQ'][index] > 1) {
        this.user['cartQ'][index] -= 1;
        let cartQ = {};
        cartQ['cartQ'] = this.user['cartQ'];
        userRef.update(cartQ);
      }
    }
  }

  removeProduct(index: number) {
    console.log('ay yo mane')
    if (this.user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.user.uid}`);
      if (this.user['cart'].length == 1) {
        this.user['cartQ'] = [];
        this.user['cart'] = [];
      } else {
        this.user['cartQ'].splice(index, 1);
        this.user['cart'].splice(index, 1);
      }
      let newUser = {};
      newUser['cartQ'] = this.user['cartQ'];
      newUser['cart'] = this.user['cart'];
      
      userRef.update(newUser);
    }
  }
}
