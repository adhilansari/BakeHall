import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit{

  order:Order=new Order();
  checkOutForm!:FormGroup;
  shippingCost:number=10

  constructor(cartService:CartService,private formBuilder:FormBuilder,private userService:UserService,private toastr:ToastrService,private orderService:OrderService,private router:Router){

    const cart=cartService.getCart();
    this.order.items=cart.items;
    this.order.totalPrice=cart.totalPrice;


  }
  ngOnInit(): void {
    let {name,address} = this.userService.currentUser;
    this.checkOutForm=this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    })
  }

  get fc(){
    return this.checkOutForm.controls

  }
  createOrder(){
    if(this.checkOutForm.invalid){
      this.toastr.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastr.warning('Please select your location on the map', 'Location');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({

      next:() => {
        this.router.navigateByUrl('/payment');
        // console.log('hihi');

      },
      error:(errorResponse) => {
        this.toastr.error(errorResponse.error, 'Cart');
      }
    })
  }
}
