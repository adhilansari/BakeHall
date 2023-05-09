import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartQuantity!:number
  user!:User
  food!:Food
  constructor(cartService:CartService,private userService:UserService,private router:Router) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

   }



  ngOnInit(): void {
  }

  logOut(){
    this.userService.logOut();
  }

  get isAuth(){
    return this.user.token;
  }
  Favorites(){
  this.router.navigateByUrl('/favorites/'+true)
  }

}
