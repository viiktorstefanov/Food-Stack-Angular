import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { NutritionFacts } from '../types/NutritionFacts';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../shared/loader/loader.service';

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

  constructor(private ref: MatDialogRef<AddFoodDialogComponent>, private dashboardService: DashboardService, private toastr: ToastrService, private fb: FormBuilder, private loaderService: LoaderService) {

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
      this.toastr.error('Enter the name of your food', 'Error');
       return;
    };

    if (!calories) {
      this.toastr.error('Enter the calorie count for the food.', 'Error');
       return;
    };

    if (!protein) {
      this.toastr.error('Provide the amount of proteins for the food item.', 'Error');
       return;
    };

    if (!fat) {
      this.toastr.error('Provide the amount of fats for the food item.', 'Error');
       return;
    };

    if (!carbs) {
      this.toastr.error('Provide the amount of carbohydrates for the food item.', 'Error');
       return;
    };

    if (typeof calories !== 'number') {
      this.toastr.error('Enter a valid number for Calories.', 'Error');
       return;
    };

    if (typeof protein !== 'number') {
      this.toastr.error('Enter a valid number for Proteins.', 'Error');
       return;
    };

    if (typeof carbs !== 'number') {
      this.toastr.error('Enter a valid number for Carbohydrates.', 'Error');
       return;
    };

    if (typeof fat !== 'number') {
      this.toastr.error('Enter a valid number for Fats.', 'Error');
       return;
    };
    const customFood = { name , calories, protein, fat, carbohydrates: carbs };

    this.loaderService.show();
    
    this.foodSubscription = this.dashboardService
      .addUserCustomFood(customFood)
      .subscribe({
        next: (result) => {
          this.closeDialog();
          this.loaderService.hide();
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            return;
          }

          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          this.loaderService.hide();
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
