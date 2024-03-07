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
import { CalculatorComponent } from './calculator/calculator.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeMentionsComponent,
    HomeFeaturesComponent,
    FeaturesItemComponent,
    HomeDiscoverComponent,
    HomeFooterComponent,
    CalculatorComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }
