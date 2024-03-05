import { Component } from '@angular/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrl: './home-footer.component.css'
})
export class HomeFooterComponent {
  currentYear: number = new Date().getFullYear();
}
