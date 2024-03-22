import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExercisesComponent } from './exercises/exercises.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExercisesComponent,
    title: `Foodstack: Exercises`,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExercisesRoutingModule { }
