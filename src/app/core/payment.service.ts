import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from '../models/payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  formData: PaymentDetail

  constructor(private http: HttpClient) { }

  
}
