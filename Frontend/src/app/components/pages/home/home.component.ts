import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  foods: Food[] = [];
  hero:boolean=true
  isFavorite!:boolean
   foodsObservable!: Observable<Food[]>;
   cart:boolean=false
  constructor(private foodService: FoodService,  activatedRoute: ActivatedRoute,private cartService:CartService) {


    activatedRoute.params.subscribe((params) => {
      if (params.searchKey) {
        this.foodsObservable = this.foodService.getAllBySearch(params.searchKey)
      }
      else if (params.tag) {
        this.hero=false
        this.foodsObservable = this.foodService.getAllByTag(params['tag'])
      }

      else if(params.isFavorite) {
        this.foodsObservable = this.foodService.showFavorite(params.isFavorite)
      }

      else
        this.foodsObservable = foodService.getAll();


      this.foodsObservable.subscribe((serverFoods:Food[]) => {
        this.foods = serverFoods;
      })
    })
  }

  changeFavorite(food:Food){
    this.foodService.changeFavorite(food). subscribe(() => {
      this.foodsObservable.subscribe((serverFoods: Food[]) => {
        this.foods = serverFoods;
      });
    });

  }

  addToCart(food:Food){
    this.cartService.addToCart(food)
  }


}
