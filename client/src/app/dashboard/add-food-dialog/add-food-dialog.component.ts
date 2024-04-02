import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.css'
})
export class AddFoodDialogComponent {

  constructor(private ref: MatDialogRef<AddFoodDialogComponent>) {

  }

  closeDialog() {
    this.ref.close();
  }
}
