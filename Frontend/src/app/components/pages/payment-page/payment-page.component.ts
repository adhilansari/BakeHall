import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  order:Order=new Order();
  constructor(orderService:OrderService,router:Router,private http:HttpClient){
    orderService.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order=order
      },
      error:()=>{
        router.navigateByUrl('/order')
      }
    })
  }



}
