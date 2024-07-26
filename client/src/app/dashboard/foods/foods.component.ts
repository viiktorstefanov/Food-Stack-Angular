import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from '../foods-edit-dialog/foods-edit-dialog.component';
import { CustomFood, Food } from '../types/DailyFood';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomFoodsDeleteDialogComponent } from '../custom-foods-delete-dialog/custom-foods-delete-dialog.component';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  isMobileView: boolean = false;
  selected: Date | null = null;
  customFoods: Food[] = [];
  selectedFood: Food | null = null;
  userId: string | undefined;
  private destroy$ = new Subject<void>();
  errors: string[] = [];

  constructor(
    private sideNavService: SideNavService,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) {
    this.sideNavService.showSideNav();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId;
    this.checkWindowSize();
    this.fetchCustomFoods();
  }

  onFoodClick(food: Food) {
    this.selectedFood = food;
  }

  fetchCustomFoods() {
    this.loaderService.show();
    this.dashboardService
      .getUserCustomFoods(this.userId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result) {
            this.customFoods = result;
          }
          this.loaderService.hide();
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
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

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 414;
  }

  openAddDialog() {
   if(this.isMobileView) {
    const dialogRef = this.dialog.open(AddFoodDialogComponent, {
      width: '100dvw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomFoods();
    });
   } else {
    const dialogRef = this.dialog.open(AddFoodDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomFoods();
    });
   }
  }

  openEditDialog(food: Food) {
    if(this.isMobileView) {
      const dialogRef = this.dialog.open(FoodsEditDialogComponent, {
        data: { food: food },
        width: '100dvw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.selectedFood = null;
        this.fetchCustomFoods();
      });
    } else {
      const dialogRef = this.dialog.open(FoodsEditDialogComponent, {
        data: { food: food },
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.selectedFood = null;
        this.fetchCustomFoods();
      });
    }
  }

  openDeleteDialog(food: Food) {
    if(this.isMobileView) {
      const dialogRef = this.dialog.open(CustomFoodsDeleteDialogComponent, {
        data: { food: food },
        width: '80dvw',
        maxWidth: '80vw',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.selectedFood = null;
        this.fetchCustomFoods();
      });
    } else {
      const dialogRef = this.dialog.open(CustomFoodsDeleteDialogComponent, {
        data: { food: food },
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.selectedFood = null;
        this.fetchCustomFoods();
      });
    }
   
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
