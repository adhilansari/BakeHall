import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/iUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit{
  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[Validators.required,]],
      address:['',[Validators.required,Validators.minLength(7)]]
    },
    {
      Validators:PasswordsMatchValidator('password','confirmPassword')
    })

    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  get fc(){
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted=true
    if(this.registerForm.invalid) return;

    const FV= this.registerForm.value

    const user:IUserRegister={
      name:FV.name,
      email:FV.email,
      password:FV.password,
      confirmPassword:FV.confirmPassword,
      address:FV.address
    }

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl)
    })

    console.log(this.fc.confirmPassword.errors);

  }
}
