import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { ADMIN_URL } from 'src/app/shared/constants/urls';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menu:boolean=true
  addPanel:boolean=false
  editPanel:boolean=false
  foodForm!:FormGroup;
  updateID!:string
  foods: Food[] = [];
  allFoods:boolean=false


  constructor(private formBuilder:FormBuilder,private toastr:ToastrService,private foodService:FoodService,private http:HttpClient){
    let foodsObservable!: Observable<Food[]>;

    foodsObservable = foodService.getAll();
    foodsObservable.subscribe((serverFoods:Food[]) => {
      this.foods = serverFoods;
    })

  }

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      name:['',Validators.required],
      price:['', Validators.required],
      cookTime:['',Validators.required],
      tags:['',Validators.required],
      origins:['',Validators.required],
      image:['',Validators.required]
    });

  }

  get fc(){
    return this.foodForm.controls
  }

  Submit(){
    if(this.foodForm.invalid){
      this.toastr.warning('please fill the fields')
      return
    }

    const FV=this.foodForm.value

    const food:Food={
      id:'',
      stars:0,
      name:FV.name,
      price:FV.price,
      tags:FV.tags,
      imageUrl:FV.image,
      origins:FV.origins,
      cookTime:FV.cookTime
    }

    this.foodService.createFood(food).subscribe(_ =>{
      console.log('cccc');
    })
  }
  update(id:string){
    this.updateID=id
    this.editPanel=!this.editPanel
  }

  submitChanges(){
    const FV=this.foodForm.value
    const food:Food={
      id:this.updateID,
      stars:0,
      name:FV.name,
      price:FV.price,
      tags:FV.tags,
      imageUrl:FV.image,
      origins:FV.origins,
      cookTime:FV.cookTime
    }

    let id = food.id
    console.log(id);

    this.http.put(`http://localhost:5000/api/admin/food/${id}`,food).subscribe()

  }


  openPanel(isOpen:boolean,type:string){
    this.addPanel=isOpen
  }

  delete(id:string){
    console.log(id);

    this.http.delete(`http://localhost:5000/api/admin/food/${id}`).subscribe((res)=>{console.log(res)})
    this.toastr.warning('item deleted')
  };

}
