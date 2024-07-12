import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-foods-dialog',
  templateUrl: './foods-dialog.component.html',
  styleUrl: './foods-dialog.component.css'
})
export class FoodsDialogComponent {

  form = this.fb.group({
    searchItem: ['', [Validators.required]],
  });

  errors: string[] = [];
  private searchSubscription: Subscription | undefined;

  constructor(private ref: MatDialogRef<FoodsDialogComponent>, private dashboardService: DashboardService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  isFoodSelected: boolean = false;

  submitHandler() {

    this.errors = [];

    if (this.form.invalid) {
      this.toastr.error('Enter food name', 'Error');
       return;
    };
    
    const { searchItem } = this.form.value;
    
    this.searchSubscription = this.dashboardService.editDailyFoodQuantity(this.date, this.food!._id, Number(quantity)).subscribe({
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

  closeDialog() {
    this.ref.close();
  }


}


export class Table {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
};