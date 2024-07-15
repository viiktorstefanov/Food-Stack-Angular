import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../add-food-dialog/add-food-dialog.component';
import { FoodsEditDialogComponent } from '../foods-edit-dialog/foods-edit-dialog.component';
import { FoodsDeleteDialogComponent } from '../foods-delete-dialog/foods-delete-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { DailyFood } from "../types/DailyFood";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent implements OnInit{

  selected: Date | null = null;
  customFoods : DailyFood[]| undefined = [];

  constructor(private sideNavService: SideNavService, private dialog: MatDialog, private authService: AuthService) {
    this.sideNavService.showSideNav();
  }

  ngOnInit(): void {
    this.customFoods = this.authService.getUserInfo?.customFoods;
    
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
