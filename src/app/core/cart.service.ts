import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: [];
  private productCount: number;
  private totalPrice: number;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.totalPrice = 0;
    this.productCount = 0;

    auth.user$.subscribe(user => {
      if (user) {
      this.cart = user['cart'];
      this.productCount = user['cart'].length;

      this.cart.forEach(product => {
        afs.collection('/games').doc(product).valueChanges().subscribe(game => {
          this.totalPrice += game['price'];
        })
      });
    }});
  }

  getProductCount() {
    return this.productCount;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
