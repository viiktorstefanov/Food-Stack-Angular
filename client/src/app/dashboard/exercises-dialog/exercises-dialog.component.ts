import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exercises-dialog',
  templateUrl: './exercises-dialog.component.html',
  styleUrl: './exercises-dialog.component.css'
})
export class ExercisesDialogComponent {
  constructor(private ref: MatDialogRef<ExercisesDialogComponent>) {

  }

  closeDialog() {
    this.ref.close();
  }
}
