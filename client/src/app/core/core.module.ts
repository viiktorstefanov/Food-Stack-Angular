import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeHeroComponent } from './home/home-hero/home-hero.component';
import { HomeMentionsComponent } from './home/home-mentions/home-mentions.component';
import { HomeFeaturesComponent } from './home/home-features/home-features.component';
import { FeaturesItemComponent } from './home/home-features/features-item/features-item.component';
import { HomeDiscoverComponent } from './home/home-discover/home-discover.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeMentionsComponent,
    HomeFeaturesComponent,
    FeaturesItemComponent,
    HomeDiscoverComponent,
    CalculatorComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
