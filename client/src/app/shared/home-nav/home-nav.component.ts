import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css'
})
export class HomeNavComponent {
  @Input() hideNav: boolean = false;
}
