import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/iuser-login';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/iUserRegister';
const USER_KEY='User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient,private toastr:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
   }

   public get currentUser():User{
    return this.userSubject.value
   }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to BakeHall ${user.name}!`,
            'Logged in successfully'
          )
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  // register(userRegister:IUserRegister):Observable<User>{
  //   return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
  //     tap({
  //       next:(user)=>{
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user)
  //         this.toastr.success(`welcome ${user.name} to BAKE HALL`,
  //         `Registered Successfully`)
  //       },
  //       error:(errorResponse)=>{
  //         this.toastr.error(errorResponse.error,'Register Failed')
  //       }

  //     })
  //   );
  // }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(`welcome ${user.name} to BAKE HALL`,
          `Registered Successfully`)
        },
        error: (errorResponse) => {
                this.toastr.error(errorResponse.error,'Register Failed')
        }
      })
    )
  }


   logOut(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
   }
}
