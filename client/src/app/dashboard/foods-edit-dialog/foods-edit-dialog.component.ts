import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-foods-edit-dialog',
  templateUrl: './foods-edit-dialog.component.html',
  styleUrl: './foods-edit-dialog.component.css'
})
export class FoodsEditDialogComponent {

  constructor(private ref: MatDialogRef<FoodsEditDialogComponent>) {}

  closeDialog() {
    this.ref.close();
  }
}
