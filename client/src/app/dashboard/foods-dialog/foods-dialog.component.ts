import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { DailyFood, Food } from '../types/DailyFood';

@Component({
  selector: 'app-foods-dialog',
  templateUrl: './foods-dialog.component.html',
  styleUrl: './foods-dialog.component.css',
})
export class FoodsDialogComponent implements OnInit, OnDestroy{
  searchForm = this.fb.group({
    searchItem: ['', [Validators.required]],
  });

  addForm = this.fb.group({
    quantity: [0, [Validators.required]]
  });

  ngOnInit() {
    this.quantitySubscription = this.addForm.get('quantity')?.valueChanges.subscribe(value => {
      if (value && value >= 10) {
        this.calculateNutritionValues();
      }
    });
  }

  errors: string[] = [];
  submitErrors: string[] = [];
  private searchSubscription: Subscription | undefined;
  private quantitySubscription: Subscription | undefined;
  private submitSubscription: Subscription | undefined;
  date: string;
  protein: number = 0;
  fats: number = 0;
  carbohydrates: number = 0;
  calories: number = 0;

  constructor(
    private ref: MatDialogRef<FoodsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string },
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.date = data.date;
  }



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  searchResults: Food[] = [];
  isFoodSelected: boolean = false;
  selectedFood: Food | undefined;

  onSearchHandler() {
    this.errors = [];

    if (this.searchForm.invalid) {
      this.toastr.error('Enter food name', 'Error');
      return;
    }

    const { searchItem } = this.searchForm.value!;

    this.searchSubscription = this.dashboardService
      .searchFoodsByQuery(searchItem!)
      .subscribe({
        next: (result) => {
          this.searchResults = [];
          this.searchResults = result; 
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
  }

  closeDialog() {
    this.ref.close();
  }

  calculateNutritionValues() {
    
      if (this.selectedFood) {
        const quantity = this.addForm.get('quantity')?.value || 0;
        const servingFactor = quantity / 100;
        
        this.calories = Math.round(Number(this.selectedFood.nutrients.kcal) * servingFactor);
        this.protein = Math.round(Number(this.selectedFood.nutrients.protein) * servingFactor);
        this.fats = Math.round(Number(this.selectedFood.nutrients.fat) * servingFactor);
        this.carbohydrates = Math.round(Number(this.selectedFood.nutrients.carbohydrates) * servingFactor);
      }

  }

  onFoodClick(food: Food) {
 
    this.selectedFood = food;
    this.isFoodSelected = true;
    this.calculateNutritionValues();
  
  }

  onSubmitHandler() {
    this.submitErrors = [];

    if (this.addForm.invalid || this.addForm.value.quantity === 0) {
      this.toastr.error('Enter a serving size', 'Error');
      return;
    }

    const { quantity } = this.addForm.value!;

    this.submitSubscription = this.dashboardService
      .addDailyFood(this.selectedFood!.foodId, this.date, quantity!)
      .subscribe({
        next: (result) => {
          this.ref.close();
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
    
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.quantitySubscription?.unsubscribe();
  }
};


export class Table {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
