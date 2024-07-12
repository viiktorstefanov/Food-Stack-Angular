import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '../types/Food';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-foods-quantity-edit-dialog',
  templateUrl: './foods-quantity-edit-dialog.component.html',
  styleUrl: './foods-quantity-edit-dialog.component.css'
})
export class FoodsQuantityEditDialogComponent  implements OnDestroy{

  form = this.fb.group({
    quantity: [ 0, [Validators.required]],
  });

  food: Food | undefined;
  errors: string[] = [];
  fat: Number = 0;
  carbs: Number = 0;
  protein: Number = 0;
  calories: Number = 0;
  date: string = '';

  private foodSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService, private toastr: ToastrService, private ref: MatDialogRef<FoodsQuantityEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { food: Food, date: string }) {
    this.food = data.food;
    this.date = data.date;
    
    const servingFactor = Number(this.food.quantity) / 100;
    
    this.fat = Number(this.food.macronutrients.fat) * servingFactor;
    this.carbs = Number(this.food.macronutrients.carbohydrates) * servingFactor;
    this.protein = Number(this.food.macronutrients.protein) * servingFactor;
    this.calories = Math.round(Number(this.food.calories) * servingFactor);
    
    this.form.patchValue({ quantity: Number(this.food?.quantity) });
  }


  submitHandler(): void {
    
    this.errors = [];

    const { quantity } = this.form.value;

    if (typeof quantity !== 'number') {
      this.toastr.error('Serving must be a number', 'Error');
      return;
    }
    
    this.foodSubscription = this.dashboardService.editDailyFoodQuantity(this.date, this.food!._id, Number(quantity)).subscribe({
      next: (response) => {          
          this.ref.close();
          
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              return;
            }
            
            this.errors.push(err.error.message);
            this.errors.forEach(error => this.toastr.error(error, 'Error'));   
          }
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
