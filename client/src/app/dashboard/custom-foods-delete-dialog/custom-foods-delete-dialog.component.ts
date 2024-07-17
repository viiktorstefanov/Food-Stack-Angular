import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DailyFood, Food } from '../types/DailyFood';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-custom-foods-delete-dialog',
  templateUrl: './custom-foods-delete-dialog.component.html',
  styleUrl: './custom-foods-delete-dialog.component.css'
})
export class CustomFoodsDeleteDialogComponent implements OnDestroy{
  private foodSubscription: Subscription | undefined;

  food: Food;
  errors: string[] = [];


  constructor(private ref: MatDialogRef<CustomFoodsDeleteDialogComponent>, private toastr: ToastrService, private dashboardService: DashboardService, @Inject(MAT_DIALOG_DATA) public data: { food: Food }) {
    this.food = data.food;
  }

  closeDialog() {
    this.ref.close();
  }

  onDeleteHandler() {
    this.errors = [];

    this.foodSubscription = this.dashboardService.deleteUserCustomFood(this.data.food._id!).subscribe({
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
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
  }
}
