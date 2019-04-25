import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService) {
  }

  ngOnInit() { }


  public increaseQ(productIndex) {
    this.cart.increaseQuantity(productIndex);
  }

  public decreaseQ(productIndex) {
    this.cart.decreaseQuantity(productIndex);
  }

  public removeItem(productIndex) {
    this.cart.removeProduct(productIndex);
  }

  public orderItems() {
    this.cart.orderItems();
  }
}
