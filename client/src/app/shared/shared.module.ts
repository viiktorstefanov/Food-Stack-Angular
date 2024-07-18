import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { RouterModule } from '@angular/router';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatIconModule} from '@angular/material/icon'; 
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeNavComponent, HomeFooterComponent, PaginatorComponent, SideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [HomeNavComponent, HomeFooterComponent, PaginatorComponent, SideNavComponent]
})
export class SharedModule { }
