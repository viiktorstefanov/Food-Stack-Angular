import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css'
})
export class HomeNavComponent {
  @Input() hideNav: boolean = false;

  constructor(private authService: AuthService) {

  }

  get isAuthenticated(): boolean {
    return this.authService.isLogged;
  }
}
