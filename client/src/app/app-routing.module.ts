import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CalculatorComponent } from './core/calculator/calculator.component';
import { ContactComponent } from './core/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent, 
    title: `Foodstack: Better food.
    Better you.`,
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule)
  },
  {
    path: 'calculator',
    component: CalculatorComponent, 
    title: `Foodstack: Calculator`,
  },
  {
    path: 'contacts',
    component: ContactComponent, 
    title: `Foodstack: Contact`,
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
