import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyFood, Food } from '../types/DailyFood';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-foods-edit-dialog',
  templateUrl: './foods-edit-dialog.component.html',
  styleUrl: './foods-edit-dialog.component.css'
})
export class FoodsEditDialogComponent implements OnDestroy{

  form = this.fb.group( {
    name: [ this.data.food.label, [Validators.required]],
    calories: [ this.data.food.nutrients.kcal, [Validators.required]],
    protein: [ this.data.food.nutrients.protein, [Validators.required]],
    fat: [ this.data.food.nutrients.fat, [Validators.required]],
    carbs: [ this.data.food.nutrients.carbohydrates, [Validators.required]],
  } );

  errors: string[] = [];
  private foodSubscription: Subscription | undefined;

  constructor(private ref: MatDialogRef<FoodsEditDialogComponent>, private fb: FormBuilder, private dashboardService: DashboardService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: { food: Food }) {
    console.log(data.food._id);
  }

  submitHandler() {
    this.errors = [];

    const { name, calories, protein, fat, carbs } = this.form.value;

    if (!name) {
      this.toastr.error('Enter your food name', 'Error');
       return;
    };

    if (typeof calories !== 'number') {
      this.toastr.error('Calories must be a number', 'Error');
       return;
    };

    if (typeof protein !== 'number') {
      this.toastr.error('Proteins must be a number', 'Error');
       return;
    };

    if (typeof carbs !== 'number') {
      this.toastr.error('Carbohydrates must be a number', 'Error');
       return;
    };

    if (typeof fat !== 'number') {
      this.toastr.error('Fats must be a number', 'Error');
       return;
    };

    const customFood = { name , calories, protein, fat, carbohydrates: carbs, foodId: this.data.food._id};
    
 
    this.foodSubscription = this.dashboardService
      .editUserCustomFood(customFood.foodId!, customFood)
      .subscribe({
        next: (result) => {
          this.closeDialog();
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            return;
          }

          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        },
      });
  };

  closeDialog() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
  }
}
