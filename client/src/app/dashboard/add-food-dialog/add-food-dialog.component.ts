import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { NutritionFacts } from '../types/NutritionFacts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.css'
})
export class AddFoodDialogComponent implements OnInit ,OnDestroy{

  form = this.fb.group( {
    name: [ '', [Validators.required]],
    calories: [ '', [Validators.required]],
    protein: [ '', [Validators.required]],
    fat: [ '', [Validators.required]],
    carbs: [ '', [Validators.required]],
  } );

  errors: string[] = [];
  nutritionFactValues: NutritionFacts = {
    calories: 0,
    fats: 0,
    carbohydrates: 0,
    protein: 0,
  };
  private foodSubscription: Subscription | undefined;
  private formSubscription: Subscription | undefined;

  constructor(private ref: MatDialogRef<AddFoodDialogComponent>, private dashboardService: DashboardService, private toastr: ToastrService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(values => {
      this.updateNutritionFacts(values);
    });
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

    const customFood = { name , calories, protein, fat, carbohydrates: carbs };
    
    this.foodSubscription = this.dashboardService
      .addUserCustomFood(customFood)
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



  updateNutritionFacts(values: any) {
    this.nutritionFactValues = {
      calories: values.calories || 0,
      fats: values.fat || 0,
      carbohydrates: values.carbs || 0,
      protein: values.protein || 0,
    };
  }

  closeDialog() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
