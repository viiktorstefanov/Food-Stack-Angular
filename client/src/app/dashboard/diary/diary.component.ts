import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodsDialogComponent } from '../foods-dialog/foods-dialog.component';
import { DailyFood } from '../types/DailyFood';
import { FoodsDeleteDialogComponent } from '../foods-delete-dialog/foods-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FoodsQuantityEditDialogComponent } from '../foods-quantity-edit-dialog/foods-quantity-edit-dialog.component';
import { NutritionFacts } from '../types/NutritionFacts';
import { ChartOptions } from 'chart.js';
import { AuthService } from '../../auth/auth.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
})
export class DiaryComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  isMobileView: boolean = false;
  nutritionChartData: any;
  dailyFoods: DailyFood[] = [];
  selected: string | null = null;

  consumedCalories: number = 0;
  consumedProteins: number = 0;
  consumedFats: number = 0;
  consumedCarbohydrates: number = 0;
  selectedDate: string | undefined;
  selectedFood: DailyFood | null = null;
  targetCalories: number = 0;
  errors: string[] = [];
  private destroy$ = new Subject<void>();
  private targetSubscription: Subscription | undefined;
  chartWidth = '';

  chartOptions: ChartOptions;

  showNutrinitonFacts: boolean = false;
  nutritionFactValues: NutritionFacts | undefined;

  constructor(
    private sideNavService: SideNavService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {

      this.sideNavService.showSideNav();


    this.chartOptions = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {

              return  tooltipItem.raw + 'g';
            }
          }
        }
      }
    };
  }

  ngOnInit(): void {

    this.loaderService.show();
    this.checkWindowSize();

    const currentDate = new Date().toLocaleDateString('en-GB');
    this.selectedDate = currentDate;
    this.targetSubscription = this.authService.getUserTargetCalories().subscribe({
      next: (result: number) => {
        this.targetCalories = result;
        this.loaderService.hide();
      },
      error: (err) => {   
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          this.loaderService.hide(); 
          return;
        }

        this.errors.push(err.error.message);
        this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        this.loaderService.hide();
      },
    });

    this.fetchAllDailyFoods();
  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 428;
    this.chartWidth = this.isMobileView ? '250' : '300'
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

    this.nutritionChartData = {
      labels: ['Protein', 'Fats', 'Carbs'],
      datasets: [
        {
          data: [this.consumedProteins, this.consumedFats, this.consumedCarbohydrates],
          backgroundColor: ['#44D07B', '#EA3B04', '#1CCAD7']
        }
      ]
    };
  }

  onFoodClick(food: DailyFood) {
    if (this.selectedFood && this.selectedFood._id === food._id) {
      this.showNutrinitonFacts = !this.showNutrinitonFacts; 
    } else {
      this.nutritionFactValues = {
        calories: 0,
        fats: 0,
        carbohydrates: 0,
        protein: 0,
      };
  
      const servingFactor = Number(food.quantity) / 100;
  
      this.nutritionFactValues.calories = Math.round(
        Number(food.calories) * servingFactor
      );
      this.nutritionFactValues.fats = Math.round(
        Number(food.macronutrients.fat) * servingFactor
      );
      this.nutritionFactValues.carbohydrates = Math.round(
        Number(food.macronutrients.carbohydrates) * servingFactor
      );
      this.nutritionFactValues.protein = Math.round(
        Number(food.macronutrients.protein) * servingFactor
      );
  
      this.showNutrinitonFacts = true; 
      this.selectedFood = food; 
    }
  }
  

  dateChanged(event: any): void {
    
    this.dailyFoods = [];

    this.consumedCalories = 0;
    this.consumedProteins = 0;
    this.consumedFats = 0;
    this.consumedCarbohydrates = 0;
    this.nutritionChartData = {
      labels: ['Protein', 'Fats', 'Carbs'],
      datasets: [
        {
          data: [this.consumedProteins, this.consumedFats, this.consumedCarbohydrates],
          backgroundColor: ['#44D07B', '#EA3B04', '#1CCAD7']
        }
      ]
    };

    const date = event instanceof Date ? event : event.value;
    if (date) {
      this.selectedDate = date.toLocaleDateString('en-GB');
      this.fetchAllDailyFoods();
      this.showNutrinitonFacts = false;
    }
    
    // this.selectedDate = event?.toLocaleDateString('en-GB');
    
    // this.fetchAllDailyFoods();
    // this.showNutrinitonFacts = false;
  }

  fetchAllDailyFoods() {
    this.loaderService.show();
    this.dashboardService
    .getAllDailyFoods(this.selectedDate!)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (dailyFoods) => {
        if (dailyFoods) {
          this.dailyFoods = dailyFoods;
          this.calculateConsumedMacros();
          this.loaderService.hide();
        }
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          this.loaderService.hide();
          return;
        }

        if (err.error.message === `There are no food entries for ${this.selectedDate}`) {
          this.loaderService.hide();
          return;
        }

        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        this.loaderService.hide();
      },
    });
  }

  openFoodsDialog() {
  if(this.isMobileView) {
    const dialogRef = this.dialog.open(FoodsDialogComponent, {
      data: { date: this.selectedDate },
      width: '100dvw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllDailyFoods();
    });
  } else {
    const dialogRef = this.dialog.open(FoodsDialogComponent, {
      data: { date: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllDailyFoods();
    });
  }
  }

  openEditDialog(food: DailyFood) {
    if(this.isMobileView) {
      const dialogRef = this.dialog.open(FoodsQuantityEditDialogComponent, {
        data: { food: food, date: this.selectedDate },
        width: '100dvw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.showNutrinitonFacts = false;
        this.selectedFood = null;
        this.fetchAllDailyFoods();
      });
    } else {
      const dialogRef = this.dialog.open(FoodsQuantityEditDialogComponent, {
        data: { food: food, date: this.selectedDate },
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.showNutrinitonFacts = false;
        this.selectedFood = null;
        this.fetchAllDailyFoods();
      });
    }
  }

  openDeleteDialog(food: DailyFood) {
    if(this.isMobileView) {
      const dialogRef = this.dialog.open(FoodsDeleteDialogComponent, {
        data: { food: food, date: this.selectedDate },
        width: '80dvw',
        maxWidth: '80vw',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.showNutrinitonFacts = false;
        this.selectedFood = null;
        this.fetchAllDailyFoods();
      });
    } else {
      const dialogRef = this.dialog.open(FoodsDeleteDialogComponent, {
        data: { food: food, date: this.selectedDate },
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.showNutrinitonFacts = false;
        this.selectedFood = null;
        this.fetchAllDailyFoods();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.showNutrinitonFacts = false;

    if (this.targetSubscription) {
      this.targetSubscription.unsubscribe();
    }
  }
}
