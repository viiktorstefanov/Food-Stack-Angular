import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../add-food-dialog/add-food-dialog.component';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent {

  selected: Date | null = null;

  constructor(private sideNavService: SideNavService, private dialog: MatDialog) {
    this.sideNavService.showSideNav();
  }

  openAddDialog() {
    this.dialog.open(AddFoodDialogComponent);
  }
}
