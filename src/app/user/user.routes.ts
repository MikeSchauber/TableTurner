import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRegisterComponent } from './user-register/user-register.component';

export const userRoutes: Routes = [
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'user/register', component: UserRegisterComponent },
];
