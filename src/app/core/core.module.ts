import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { HomeHeroComponent } from './home/home-hero/home-hero.component';
import { HomeMentionsComponent } from './home/home-mentions/home-mentions.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeNavComponent,
    HomeHeroComponent,
    HomeMentionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
