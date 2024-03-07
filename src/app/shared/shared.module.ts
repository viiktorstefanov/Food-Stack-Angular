import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeNavComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [HomeNavComponent]
})
export class SharedModule { }
