import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { HomeHeroComponent } from './home/home-hero/home-hero.component';
import { HomeMentionsComponent } from './home/home-mentions/home-mentions.component';
import { HomeFeaturesComponent } from './home/home-features/home-features.component';
import { FeaturesItemComponent } from './home/home-features/features-item/features-item.component';
import { HomeDiscoverComponent } from './home/home-discover/home-discover.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeNavComponent,
    HomeHeroComponent,
    HomeMentionsComponent,
    HomeFeaturesComponent,
    FeaturesItemComponent,
    HomeDiscoverComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
