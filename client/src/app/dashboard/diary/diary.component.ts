import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodsDialogComponent } from '../foods-dialog/foods-dialog.component';
import { ExercisesDialogComponent } from '../exercises-dialog/exercises-dialog.component';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent {

  selected: Date | null = null;

  constructor(private sideNavService: SideNavService, private dialog: MatDialog) {
    this.sideNavService.showSideNav();
  }

  openFoodsDialog() {
    this.dialog.open(FoodsDialogComponent);
  }

  openExercisesDialog() {
    this.dialog.open(ExercisesDialogComponent);
  }

  data = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
}
