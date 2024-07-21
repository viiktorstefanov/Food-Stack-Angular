import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyFood, Food } from '../types/DailyFood';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NutritionFacts } from '../types/NutritionFacts';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-foods-edit-dialog',
  templateUrl: './foods-edit-dialog.component.html',
  styleUrl: './foods-edit-dialog.component.css'
})
export class FoodsEditDialogComponent implements OnInit,OnDestroy{

  form = this.fb.group( {
    name: [ this.data.food.label, [Validators.required]],
    calories: [ this.data.food.nutrients.kcal, [Validators.required]],
    protein: [ this.data.food.nutrients.protein, [Validators.required]],
    fat: [ this.data.food.nutrients.fat, [Validators.required]],
    carbs: [ this.data.food.nutrients.carbohydrates, [Validators.required]],
  } );

  errors: string[] = [];
  private foodSubscription: Subscription | undefined;
  private formSubscription: Subscription | undefined;
  nutritionFactValues: NutritionFacts = {
    calories: this.data.food.nutrients.kcal,
    fats: this.data.food.nutrients.fat,
    carbohydrates: this.data.food.nutrients.carbohydrates,
    protein: this.data.food.nutrients.protein,
  };

  constructor(private ref: MatDialogRef<FoodsEditDialogComponent>, private fb: FormBuilder, private dashboardService: DashboardService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: { food: Food }, private loaderService: LoaderService) {
  
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

    const customFood = { name , calories, protein, fat, carbohydrates: carbs, foodId: this.data.food._id};
    
    this.loaderService.show();
    this.foodSubscription = this.dashboardService
      .editUserCustomFood(customFood.foodId!, customFood)
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

  closeDialog() {
    this.ref.close();
  }

  updateNutritionFacts(values: any) {
    this.nutritionFactValues = {
      calories: values.calories || 0,
      fats: values.fat || 0,
      carbohydrates: values.carbs || 0,
      protein: values.protein || 0,
    };
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    };

    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    };
  }
}
