import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { RouterModule } from '@angular/router';
import { HomeFooterComponent } from './home-footer/home-footer.component';

@NgModule({
  declarations: [HomeNavComponent, HomeFooterComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [HomeNavComponent, HomeFooterComponent]
})
export class SharedModule { }
