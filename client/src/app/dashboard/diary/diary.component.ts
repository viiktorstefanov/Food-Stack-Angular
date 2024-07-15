import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodsDialogComponent } from '../foods-dialog/foods-dialog.component';
import { DailyFood } from '../types/DailyFood';
import { FoodsDeleteDialogComponent } from '../foods-delete-dialog/foods-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import { FoodsQuantityEditDialogComponent } from '../foods-quantity-edit-dialog/foods-quantity-edit-dialog.component';
import { NutritionFacts } from '../types/NutritionFacts';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
})
export class DiaryComponent implements OnInit, OnDestroy {
  dailyFoods: DailyFood[] = [];
  selected: string | null = null;

  consumedCalories: number = 0;
  consumedProteins: number = 0;
  consumedFats: number = 0;
  consumedCarbohydrates: number = 0;
  selectedDate: string | undefined;
  errors: string[] = [];
  private destroy$ = new Subject<void>();

  showNutrinitonFacts: boolean = false;
  nutritionFactValues: NutritionFacts | undefined;

  constructor(
    private sideNavService: SideNavService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private dashboardService: DashboardService
  ) {
    this.sideNavService.showSideNav();
  }

  ngOnInit(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');

    //get foods for current date
    this.dashboardService
      .getAllDailyFoods(currentDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dailyFoods) => {
          if (dailyFoods) {
            this.dailyFoods = dailyFoods;
            this.calculateConsumedMacros();
          }
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            return;
          }

          if (err.error.message === 'There are no daily food entries added') {
            return;
          }

          this.errors = [];
          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        },
      });

    this.selectedDate = currentDate;
  }

  calculateConsumedMacros() {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalFats = 0;
    let totalCarbohydrates = 0;

    this.dailyFoods.forEach((currFood) => {
      const servingFactor = Number(currFood.quantity) / 100;

      totalCalories += Math.round(Number(currFood.calories) * servingFactor);
      totalProteins += Math.round(
        Number(currFood.macronutrients.protein) * servingFactor
      );
      totalFats += Math.round(
        Number(currFood.macronutrients.fat) * servingFactor
      );
      totalCarbohydrates += Math.round(
        Number(currFood.macronutrients.carbohydrates) * servingFactor
      );
    });

    this.consumedCalories = totalCalories;
    this.consumedProteins = totalProteins;
    this.consumedFats = totalFats;
    this.consumedCarbohydrates = totalCarbohydrates;
  }

  onFoodClick(food: DailyFood) {
    this.nutritionFactValues = {
      calories: 0,
      fats: 0,
      carbohydrates: 0,
      protein: 0,
    };

    const servingFactor = Number(food.quantity) / 100;

    this.nutritionFactValues!.calories = Math.round(
      Number(food.calories) * servingFactor
    );
    this.nutritionFactValues!.fats = Math.round(
      Number(food.macronutrients.fat) * servingFactor
    );
    this.nutritionFactValues!.carbohydrates = Math.round(
      Number(food.macronutrients.carbohydrates) * servingFactor
    );
    this.nutritionFactValues!.protein = Math.round(
      Number(food.macronutrients.protein) * servingFactor
    );

    this.showNutrinitonFacts = true;
  }

  dateChanged(event: any): void {
    this.dailyFoods = [];

    this.selectedDate = event?.toLocaleDateString('en-GB');
    const currentDate = event?.toLocaleDateString('en-GB');
    this.dashboardService
      .getAllDailyFoods(currentDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dailyFoods) => {
          if (dailyFoods) {
            this.dailyFoods = dailyFoods;
            this.calculateConsumedMacros();
          }
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            return;
          }

          if (err.error.message === 'There are no daily food entries added') {
            return;
          }

          this.errors = [];
          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        },
      });

    this.selectedDate = currentDate;
  }

  openFoodsDialog() {
    const dialogRef = this.dialog.open(FoodsDialogComponent, {
      data: { date: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe(() => {
      const currentDate = this.selectedDate;

      if (!currentDate) {
        return;
      }

      //get foods for current date
      this.dashboardService
        .getAllDailyFoods(currentDate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (dailyFoods) => {
            this.dailyFoods = dailyFoods;
            this.calculateConsumedMacros();
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              return;
            }
            this.errors = [];
            this.errors.push(err.error.message);
            this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          },
        });

      this.selectedDate = currentDate;
    });
  }

  openEditDialog(food: DailyFood) {
    const dialogRef = this.dialog.open(FoodsQuantityEditDialogComponent, {
      data: { food: food, date: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe(() => {
      const currentDate = this.selectedDate;

      if (!currentDate) {
        return;
      }

      //get foods for current date
      this.dashboardService
        .getAllDailyFoods(currentDate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (dailyFoods) => {
            this.dailyFoods = dailyFoods;
            this.calculateConsumedMacros();
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              return;
            }
            this.errors = [];
            this.errors.push(err.error.message);
            this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          },
        });

      this.selectedDate = currentDate;
    });
  }

  openDeleteDialog(food: DailyFood) {
    const dialogRef = this.dialog.open(FoodsDeleteDialogComponent, {
      data: { food: food, date: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe(() => {
      const currentDate = this.selectedDate;

      if (!currentDate) {
        return;
      }

      //get foods for current date
      this.dashboardService
        .getAllDailyFoods(currentDate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (dailyFoods) => {
            this.dailyFoods = dailyFoods;
            this.calculateConsumedMacros();
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              return;
            }
            this.errors = [];
            this.errors.push(err.error.message);
            this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          },
        });

      this.selectedDate = currentDate;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.showNutrinitonFacts = false;
  }
}
