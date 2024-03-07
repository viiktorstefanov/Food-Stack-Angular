import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CalculatorComponent } from './core/calculator/calculator.component';
import { ContactComponent } from './core/contact/contact.component';
import { BlogComponent } from './core/blog/blog.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent, 
    title: `Foodstack: Eat smarter.
    Live better.`,
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
    path: 'blog',
    component: BlogComponent, 
    title: `Foodstack: Blog`,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
