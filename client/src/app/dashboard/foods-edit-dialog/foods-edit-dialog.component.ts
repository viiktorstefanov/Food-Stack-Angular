import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '../types/Food';

@Component({
  selector: 'app-foods-edit-dialog',
  templateUrl: './foods-edit-dialog.component.html',
  styleUrl: './foods-edit-dialog.component.css'
})
export class FoodsEditDialogComponent {

  food: Food | undefined;

  constructor(private ref: MatDialogRef<FoodsEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { food: Food }) {
    this.food = data.food;
    console.log(this.food);
    
  }

  closeDialog() {
    this.ref.close();
  }
}
