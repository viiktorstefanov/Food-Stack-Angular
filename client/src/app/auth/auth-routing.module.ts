import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { registerGuard } from '../guards/register.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [registerGuard],
    title: `Foodstack: Login`,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [registerGuard],
    title: `Foodstack: Register`,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: `Foodstack: Forgot Password`
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
