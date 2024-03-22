import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExercisesRoutingModule } from './exercises-routing.module';



@NgModule({
  declarations: [
    ExercisesComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
  ]
})
export class ExercisesModule { }
