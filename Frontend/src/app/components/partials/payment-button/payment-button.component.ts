import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';


@Component({
  selector: 'payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.scss']
})
export class PaymentButtonComponent {
@Input() order!:Order
constructor(private http:HttpClient, private orderService:OrderService,private cartService:CartService,private router:Router,private toastrService:ToastrService){

}

onCheckout():void{
  this.http.post('http://localhost:5000/checkout',{
    items:this.order

  }).subscribe(async (res:any)=>{

    let stripe = await loadStripe('pk_test_51McQDKSB847cAyCaa3IeYdcHTb1zquHum7jNvOutWkw2PVPBTYpcHwkckKfBtSrFniDRWqh4fJKYnHQvCH1lg02D00F8yOtqXi');
    stripe?.redirectToCheckout({
      sessionId:res.id,
    });

        this.order.paymentId = res.id;

    this.orderService.pay(this.order).subscribe(
      {
        next: (orderId) => {
          this.cartService.clearCart();
          this.router.navigateByUrl('/track/' + orderId);
          this.toastrService.success(
            'Payment Saved Successfully',
            'Success'
          );
        },
        error: (error) => {
          this.toastrService.error('Payment Save Failed', 'Error');
        }
      }
    );
  })
};



}




// @ViewChild('paypal', {static: true})
  // paypalElement!:ElementRef;

  // constructor(private orderService: OrderService,
  //             private cartService: CartService,
  //             private router:Router,
  //             private toastrService: ToastrService) { }

  // ngOnInit(): void {
  //   const self = this;
  //   paypal
  //   .Buttons({
  //     createOrder: (data: any, actions: any) => {
  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             amount: {
  //               currency_code: 'USD',
  //               value: self.order.totalPrice,
  //             },
  //           },
  //         ],
  //       });
  //     },

      // onApprove: async (data: any, actions: any) => {
      //   const payment = await actions.order.capture();
      //   this.order.paymentId = payment.id;
      //   self.orderService.pay(this.order).subscribe(
      //     {
      //       next: (orderId) => {
      //         this.cartService.clearCart();
      //         this.router.navigateByUrl('/track/' + orderId);
      //         this.toastrService.success(
      //           'Payment Saved Successfully',
      //           'Success'
      //         );
      //       },
      //       error: (error) => {
      //         this.toastrService.error('Payment Save Failed', 'Error');
      //       }
      //     }
      //   );
      // },

  //     onError: (err: any) => {
  //       this.toastrService.error('Payment Failed', 'Error');
  //       console.log(err);
  //     },
  //   })
  //   .render(this.paypalElement.nativeElement);

  // }
