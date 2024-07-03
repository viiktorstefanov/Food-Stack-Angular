import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { authGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'diary',
  },
  {
    path: 'diary',
    component: DiaryComponent,
    canActivate: [authGuard],
    title: `Foodstack: Diary`,
  },
  {
    path: 'foods',
    component: FoodsComponent,
    canActivate: [authGuard],
    title: `Foodstack: Foods`,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
