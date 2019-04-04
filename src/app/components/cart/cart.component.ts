import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CartService } from 'src/app/core/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any;

  constructor(public cart: CartService) {
    this.products = cart.getProducts();
  }

  ngOnInit() { }

  public increaseQ(productIndex) {
    this.cart.increaseQuantity(productIndex);
  }

  public decreaseQ(productIndex) {
    this.cart.decreaseQuantity(productIndex);
  }

  public removeItem(productIndex) {
    console.log(productIndex);
    this.cart.removeProduct(productIndex);
  }
}
