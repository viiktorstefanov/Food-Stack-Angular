import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DailyFood } from '../types/DailyFood';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-foods-delete-dialog',
  templateUrl: './foods-delete-dialog.component.html',
  styleUrl: './foods-delete-dialog.component.css'
})
export class FoodsDeleteDialogComponent implements OnDestroy{

  private foodSubscription: Subscription | undefined;

  food: DailyFood | undefined;
  errors: string[] = [];
  date: string;

  constructor(private ref: MatDialogRef<FoodsDeleteDialogComponent>, private toastr: ToastrService, private dashboardService: DashboardService, @Inject(MAT_DIALOG_DATA) public data: { food: DailyFood, date: string }, private loaderService: LoaderService) {
    this.food = data.food;
    this.date = data.date;
  }

  closeDialog() {
    this.ref.close();
  }

  onDeleteHandler() {
    this.errors = [];

    this.loaderService.show();

    this.foodSubscription = this.dashboardService.deleteDailyFood(this.date, this.food!._id).subscribe({
      next: (response) => {          
          this.ref.close();
          this.loaderService.hide();
          
          },
          error: (err) => {
            if (err.status === 0) {
              this.toastr.error('Unable to connect to the server', 'Error');
              this.loaderService.hide(); 
              return;
            }
            
            this.errors.push(err.error.message);
            this.errors.forEach(error => this.toastr.error(error, 'Error'));   
            this.loaderService.hide();
          }
    });
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
  }
}
