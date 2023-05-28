import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../shared/models/Food';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from '../services/food.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
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
  selectedFile: any;

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
    // this.foodForm.reset()
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
      imageUrl: [new FormControl(), Validators.required],
    });
  }

  get fc() {
    return this.foodForm.controls;
  }

  onFileSelected(event: any) {

    // this.selectedFile = event.target.files[0];
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];

  }}

  Submit() {
    if (this.foodForm.invalid) {
      this.toastr.warning('please fill the fields');
      return;
    }


    const FV = this.foodForm.value;


    // const startIndex = FV.image.lastIndexOf('\\') + 1;
    // const fileName = FV.image.substr(startIndex);



    const food: Food = {
      id: '',
      stars: 0,
      name: FV.name,
      price: FV.price,
      tags: FV.tags,
      imageUrl: FV.imageUrl.toLocaleLowerCase().split(' ').join('_'),
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
    console.log(food);

    this.panelName='Edit'
    this.updateFood = food;
    this.foodForm = this.formBuilder.group({
      name: [this.updateFood.name, Validators.required],
      price: [this.updateFood.price, Validators.required],
      cookTime: [this.updateFood.cookTime, Validators.required],
      tags: [this.updateFood.tags, Validators.required],
      origins: [this.updateFood.origins, Validators.required],
      imageUrl: [this.updateFood.imageUrl, Validators.required],
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
      imageUrl: FV.imageUrl.toLocaleLowerCase().split(' ').join('_'),
      origins: FV.origins,
      cookTime: FV.cookTime,
    };



    this.http
      .put(`https://bake-hall.onrender.com/api/admin/food/${this.updateFood.id}`, food)
      .subscribe({
        next:() => {

          this.foodsObservable.subscribe((serverFoods: Food[]) => {
            this.foods = serverFoods;
          });
        },
        error:error=>{
          console.log(error);

        },
        complete:()=>{
          this.toastr.success('Edited Successfully')
          }

      }
      );


  }



  delete(id: string) {
    this.http
      .delete(`https://bake-hall.onrender.com/api/admin/food/${id}`)
      .subscribe((res) => {
        this.foodsObservable.subscribe((serverFoods: Food[]) => {
          this.foods = serverFoods;
        });
      });
    this.toastr.warning('item deleted');
  }
}
