import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
// import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchKey',component:HomeComponent},
  {path:'favorites/:isFavorite',component:HomeComponent},

  {path:'tag/:tag' ,component:HomeComponent},
  {path:'food/:id',component:FoodPageComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'order',component:CheckoutPageComponent,canActivate:[AuthGuard]},
  {path:'payment',component:PaymentPageComponent,canActivate:[AuthGuard]},
  // {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},
  {path:'track/:orderId',component:OrderTrackPageComponent,canActivate:[AuthGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

