import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FoodsComponent } from './foods/foods.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DiaryComponent } from './diary/diary.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    FoodsComponent,
    ExercisesComponent,
    DiaryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ]
})
export class DashboardModule { }
