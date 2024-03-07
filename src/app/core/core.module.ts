import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeHeroComponent } from './home/home-hero/home-hero.component';
import { HomeMentionsComponent } from './home/home-mentions/home-mentions.component';
import { HomeFeaturesComponent } from './home/home-features/home-features.component';
import { FeaturesItemComponent } from './home/home-features/features-item/features-item.component';
import { HomeDiscoverComponent } from './home/home-discover/home-discover.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeMentionsComponent,
    HomeFeaturesComponent,
    FeaturesItemComponent,
    HomeDiscoverComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }
