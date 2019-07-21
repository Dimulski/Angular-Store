import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { PaymentService } from 'src/app/core/payment.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  readonly url = "https://localhost:44397/api/values"
  post: Observable<any>;

  constructor(public cart: CartService, public http: HttpClient) {
    
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
    // This call might not be necessary considering I call cart.orderItems in the html template
    this.cart.orderItems(); 
  }

  public sendPaymentInfo() {
    const payment = {
      testInfo: "Test payment info"
    }

    this.post = this.http.post(this.url, {["test credit card details"]: 2}, {
      headers: {'Content-Type':'application/json'}});
    
  }
}
