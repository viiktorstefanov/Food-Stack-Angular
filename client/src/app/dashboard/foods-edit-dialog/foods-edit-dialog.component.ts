import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailyFood } from '../types/DailyFood';

@Component({
  selector: 'app-foods-edit-dialog',
  templateUrl: './foods-edit-dialog.component.html',
  styleUrl: './foods-edit-dialog.component.css'
})
export class FoodsEditDialogComponent {

  food: DailyFood | undefined;

  constructor(private ref: MatDialogRef<FoodsEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { food: DailyFood }) {
    this.food = data.food;
    console.log(this.food);
    
  }

  closeDialog() {
    this.ref.close();
  }
}
