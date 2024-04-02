import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from '../foods-edit-dialog/foods-edit-dialog.component';
import { FoodsDeleteDialogComponent } from '../foods-delete-dialog/foods-delete-dialog.component';

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

  openEditDialog() {
    this.dialog.open(FoodsEditDialogComponent);
  }

  openDeleteDialog() {
    this.dialog.open(FoodsDeleteDialogComponent);
  }
}
