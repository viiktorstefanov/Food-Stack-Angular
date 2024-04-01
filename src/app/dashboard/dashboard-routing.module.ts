import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'diary',
  },
  {
    path: 'diary',
    component: DiaryComponent,
    title: `Foodstack: Diary`,
  },
  {
    path: 'foods',
    component: FoodsComponent,
    title: `Foodstack: Foods`,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
