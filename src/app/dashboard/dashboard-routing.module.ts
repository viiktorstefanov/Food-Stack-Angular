import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './diary/diary.component';
import { FoodsComponent } from './foods/foods.component';
import { ExercisesComponent } from './exercises/exercises.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: `Foodstack: Dashboard`,
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
  {
    path: 'exercises',
    component: ExercisesComponent,
    title: `Foodstack: Exercises`,
  },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
