import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyFood } from '../types/DailyFood';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-foods-quantity-edit-dialog',
  templateUrl: './foods-quantity-edit-dialog.component.html',
  styleUrl: './foods-quantity-edit-dialog.component.css'
})
export class FoodsQuantityEditDialogComponent implements OnInit, OnDestroy{

  form = this.fb.group({
    quantity: [ 0, [Validators.required]],
  });

  food: DailyFood | undefined;
  errors: string[] = [];
  fat: Number = 0;
  carbs: Number = 0;
  protein: Number = 0;
  calories: Number = 0;
  date: string;

  private foodSubscription: Subscription | undefined;
  private valueChangesSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService, private toastr: ToastrService, private ref: MatDialogRef<FoodsQuantityEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { food: DailyFood, date: string }, private loaderService: LoaderService) {
    this.food = data.food;
    this.date = data.date;
  }

  ngOnInit(): void {
    this.updateNutritionFacts(Number(this.food?.quantity));
    this.form.patchValue({ quantity: Number(this.food?.quantity) });

    this.valueChangesSubscription = this.form.get('quantity')?.valueChanges.subscribe(value => {
      if (typeof value === 'number') {
        this.updateNutritionFacts(value);
      }
    });
  }

  updateNutritionFacts(quantity: number): void {
    const servingFactor = quantity / 100;
    this.fat = Math.round(Number(this.food!.macronutrients.fat) * servingFactor);
    this.carbs = Math.round(Number(this.food!.macronutrients.carbohydrates) * servingFactor);
    this.protein = Math.round(Number(this.food!.macronutrients.protein) * servingFactor);
    this.calories = Math.round(Number(this.food!.calories) * servingFactor);
  }


  submitHandler(): void {
    
    this.errors = [];

    const { quantity } = this.form.value;

    if (!quantity || typeof quantity !== 'number') {
      this.toastr.error('Enter a valid number for the serving.', 'Error');
      return;
    }

    this.loaderService.show();
    
    this.foodSubscription = this.dashboardService.editDailyFoodQuantity(this.date, this.food!._id, Number(quantity)).subscribe({
      next: (response) => {          
          this.ref.close();
          this.loaderService.hide();
          
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              return;
            }
            
            this.errors.push(err.error.message);
            this.errors.forEach(error => this.toastr.error(error, 'Error'));
            this.loaderService.hide();   
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
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
}
