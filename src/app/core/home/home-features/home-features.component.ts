import { Component } from '@angular/core';
import { featuresItems } from './features-items';

@Component({
  selector: 'app-home-features',
  templateUrl: './home-features.component.html',
  styleUrl: './home-features.component.css'
})
export class HomeFeaturesComponent {
  items = featuresItems;
}
