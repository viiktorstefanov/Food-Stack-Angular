import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { RouterModule } from '@angular/router';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [HomeNavComponent, HomeFooterComponent, PaginatorComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
  ],
  exports: [HomeNavComponent, HomeFooterComponent, PaginatorComponent]
})
export class SharedModule { }
