import { Component, Input } from '@angular/core';
import { Feature } from '../feature';

@Component({
  selector: 'app-features-item',
  templateUrl: './features-item.component.html',
  styleUrl: './features-item.component.css'
})
export class FeaturesItemComponent {
  @Input() feature: Feature = { image: '', header: '', text: ''};
}
