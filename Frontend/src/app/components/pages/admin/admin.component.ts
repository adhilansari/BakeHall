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
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  menu: boolean = true;
  panel: boolean = true;
  foodForm!: FormGroup;
  updateFood!: Food;
  foods: Food[] = [];
  allFoods: boolean = true;
  foodsObservable!: Observable<Food[]>;
  panelName:string='Add';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private foodService: FoodService,
    private http: HttpClient
  ) {
    this.foodsObservable = foodService.getAll();
    this.foodsObservable.subscribe((serverFoods: Food[]) => {
      this.foods = serverFoods;

    });
  }

  changePanel(){
    this.foodForm.reset()
    this.panelName='Edit'?'Add':'Edit'
    this.panel=true
  }

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      cookTime: ['', Validators.required],
      tags: ['', Validators.required],
      origins: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  get fc() {
    return this.foodForm.controls;
  }

  Submit() {
    if (this.foodForm.invalid) {
      this.toastr.warning('please fill the fields');
      return;
    }


    const FV = this.foodForm.value;
    const startIndex = FV.image.lastIndexOf('\\') + 1;
    const fileName = FV.image.substr(startIndex);



    const food: Food = {
      id: '',
      stars: 0,
      name: FV.name,
      price: FV.price,
      tags: FV.tags,
      imageUrl: FV.image.toLocaleLowerCase().split(' ').join('_'),
      origins: FV.origins,
      cookTime: FV.cookTime,
    };

    this.foodService.createFood(food).subscribe((_) => {
      this.foodsObservable.subscribe((serverFoods: Food[]) => {
        this.foods = serverFoods;
      });
    });

    this.foodForm.reset()

  }
  update(food: Food) {
    this.panelName='Edit'
    this.updateFood = food;
    this.foodForm = this.formBuilder.group({
      name: [this.updateFood.name, Validators.required],
      price: [this.updateFood.price, Validators.required],
      cookTime: [this.updateFood.cookTime, Validators.required],
      tags: [this.updateFood.tags, Validators.required],
      origins: [this.updateFood.origins, Validators.required],
      image: [this.updateFood.imageUrl, Validators.required],
    });

  }

  submitChanges() {
    const FV = this.foodForm.value;
    const food: Food = {
      id: this.updateFood.id,
      stars: 0,
      name: FV.name,
      price: FV.price,
      tags: FV.tags,
      imageUrl: FV.image.toLocaleLowerCase().split(' ').join('_'),
      origins: FV.origins,
      cookTime: FV.cookTime,
    };

    this.http
      .put(`http://localhost:5000/api/admin/food/${this.updateFood.id}`, food)
      .subscribe(() => {
        this.foodsObservable.subscribe((serverFoods: Food[]) => {
          this.foods = serverFoods;
        });
      });

      this.toastr.success('Edited Successfully')

  }


  delete(id: string) {
    this.http
      .delete(`http://localhost:5000/api/admin/food/${id}`)
      .subscribe((res) => {
        this.foodsObservable.subscribe((serverFoods: Food[]) => {
          this.foods = serverFoods;
        });
      });
    this.toastr.warning('item deleted');
  }
}
