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
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from './foods-edit-dialog/foods-edit-dialog.component';
import { FoodsDeleteDialogComponent } from './foods-delete-dialog/foods-delete-dialog.component';
import { FoodsQuantityEditDialogComponent } from './foods-quantity-edit-dialog/foods-quantity-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFoodsDeleteDialogComponent } from './custom-foods-delete-dialog/custom-foods-delete-dialog.component';
import { ChartModule } from 'primeng/chart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartComponent } from './diary/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    FoodsComponent,
    DiaryComponent,
    FoodsDialogComponent,
    AddFoodDialogComponent,
    FoodsEditDialogComponent,
    FoodsDeleteDialogComponent,
    FoodsQuantityEditDialogComponent,
    CustomFoodsDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    ChartModule,
    MatTooltipModule,
    ChartComponent,
    SharedModule,
    FormsModule,
    MatNativeDateModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ]
})
export class DashboardModule { }
