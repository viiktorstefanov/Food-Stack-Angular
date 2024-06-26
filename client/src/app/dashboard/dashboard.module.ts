import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FoodsComponent } from './foods/foods.component';
import { DiaryComponent } from './diary/diary.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDialogModule} from '@angular/material/dialog';
import { FoodsDialogComponent } from './foods-dialog/foods-dialog.component';
import { ExercisesDialogComponent } from './exercises-dialog/exercises-dialog.component';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from './foods-edit-dialog/foods-edit-dialog.component';
import { FoodsDeleteDialogComponent } from './foods-delete-dialog/foods-delete-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FoodsComponent,
    DiaryComponent,
    FoodsDialogComponent,
    ExercisesDialogComponent,
    AddFoodDialogComponent,
    FoodsEditDialogComponent,
    FoodsDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ]
})
export class DashboardModule { }
