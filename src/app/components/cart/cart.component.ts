import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  productsQ: [];

  constructor(public cart: CartService, private changeDetectorRef: ChangeDetectorRef) {
    this.products = cart.getProducts();
    this.productsQ = cart.getProductsQ();
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
    this.changeDetectorRef.detach ;
  }
}
