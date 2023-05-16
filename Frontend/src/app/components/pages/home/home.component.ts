import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  constructor(private foodService: FoodService,  activatedRoute: ActivatedRoute) {
    let foodsObservable!: Observable<Food[]>;

    // this.foodService.connect();


    activatedRoute.params.subscribe((params) => {
      if (params.searchKey) {
        foodsObservable = this.foodService.getAllBySearch(params.searchKey)
      }
      else if (params.tag) {
        this.hero=false
        foodsObservable = this.foodService.getAllByTag(params['tag'])
      }

      else if(params.isFavorite) {
        foodsObservable = this.foodService.showFavorite(params.isFavorite)
      }

      else
        foodsObservable = foodService.getAll();


      foodsObservable.subscribe((serverFoods:Food[]) => {
        this.foods = serverFoods;
      })
    })

    activatedRoute.params.subscribe((params=>{
      if(params.isFavorite) this.isFavorite=params.isFavorite;
    }))
  }

  changeFavorite(food:Food){
    this.foodService.changeFavorite(food).subscribe(_ =>{
        // location.reload()
    })
  }

}
