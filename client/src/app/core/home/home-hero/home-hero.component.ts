import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.css'
})
export class HomeHeroComponent {

  constructor(private authService: AuthService) {
  }

  get isAuthenticated(): boolean {
    return this.authService.isLogged;
  }
}
