import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import  io from 'socket.io-client';
import { ADMIN_URL, FAVORITE_BY_ID_URL, FOOD_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodSubject = new BehaviorSubject<Food>(new Food)


  constructor(private http:HttpClient,private toastr:ToastrService) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllBySearch(searchKey:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchKey);
  }
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }
  getAllByTag(tag:string):Observable<Food[]>{

    return tag === "All" ?
    this.getAll() :
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);

  }
  getById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL+foodId)
  }

  showFavorite(isFavorite:any){
  return this.http.get<Food[]>(FAVORITE_BY_ID_URL + isFavorite)
  };


/////

createFood(food:any):Observable<Food>{
  return this.http.post<Food>(ADMIN_URL,food).pipe(
    tap({
      next:(food)=>{
        this.foodSubject.next(food);
        this.toastr.success(` ${food.name} added successfully`,
        )
      },
      error:(errorResponse)=>{
        this.toastr.error(errorResponse.error,'Adding food is Failed')
      }
    })
    )
  }
  changeFavorite(food:Food):Observable<Food>{
    return this.http.put<Food>(FOOD_BY_ID_URL,food)
  }




}
