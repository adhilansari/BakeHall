import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import {  OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-hero-img',
  templateUrl: './hero-img.component.html',
  styleUrls: ['./hero-img.component.scss']
})
export class HeroImgComponent {
  @Input() visible:boolean=false

  foods: Food[] = []

  constructor(private foodService: FoodService) {
    let foodsObservable!: Observable<Food[]>

    foodsObservable = foodService.getAll();

    foodsObservable.subscribe((serverFoods) => {
      this.foods = serverFoods;
  })}


  customOptions: OwlOptions = {
    loop: true,
    navSpeed: 300,
    autoplay:true,
    dots:false,
    pullDrag: false,
    mouseDrag:true,
    navText:['<i class="fa fa-angle-left text-[#2D2424]" aria-hidden="true"></i>', ' <i class="fa fa-angle-right text-[#2D2424]" aria-hidden="true"></i> '],
    // center:true,

    nav:false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
}
