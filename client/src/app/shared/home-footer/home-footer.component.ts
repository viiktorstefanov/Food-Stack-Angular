import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrl: './home-footer.component.css'
})
export class HomeFooterComponent {

  @Input() showFooter: boolean | undefined;

  currentYear: number = new Date().getFullYear();
  
}
