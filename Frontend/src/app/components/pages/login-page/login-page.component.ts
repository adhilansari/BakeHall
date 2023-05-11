import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  loginForm!:FormGroup
  isSubmitted=false
  returnUrl=''

  constructor(private formBuilder:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  //loginForm.controls
  get fc(){
    return this.loginForm.controls;
  }

  Submit(){
    this.isSubmitted=true
    if(this.loginForm.invalid)return;
    this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
      if(this.returnUrl) return this.router.navigateByUrl(this.returnUrl);

      return this.router.navigate(["/admin"])
    })
  }
}
