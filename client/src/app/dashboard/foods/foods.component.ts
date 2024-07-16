import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from '../foods-edit-dialog/foods-edit-dialog.component';
import { FoodsDeleteDialogComponent } from '../foods-delete-dialog/foods-delete-dialog.component';
import { CustomFood, Food } from '../types/DailyFood';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent implements OnInit {
  selected: Date | null = null;
  customFoods: Food[] = [];
  userId: string | undefined;
  private destroy$ = new Subject<void>();
  errors: string[] = [];

  constructor(
    private sideNavService: SideNavService,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.sideNavService.showSideNav();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId;
    this.fetchCustomFoods();
  }

  fetchCustomFoods() {
    this.dashboardService
      .getUserCustomFoods(this.userId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result) {
            this.customFoods = result;
          }
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
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddFoodDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomFoods();
    });
  }

  openEditDialog(food: Food) {
    const dialogRef = this.dialog.open(FoodsEditDialogComponent, {
      data: { food: food },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomFoods();
    });
  }

  openDeleteDialog(food: Food) {
    const dialogRef = this.dialog.open(FoodsDeleteDialogComponent, {
      data: { food: food },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomFoods();
    });
  }
}
