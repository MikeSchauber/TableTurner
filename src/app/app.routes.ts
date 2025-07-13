import { Routes } from '@angular/router';
import { userRoutes } from './user/user.routes';
import { adminRoutes } from './admin/admin.routes';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  ...userRoutes,
  ...adminRoutes,
  { path: 'admin', redirectTo: '/admin/adminLogin' },
  { path: 'user', redirectTo: '/user/userLogin' },
];
