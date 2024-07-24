import { Component, HostListener, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrl: './mobile-nav-bar.component.css'
})
export class MobileNavBarComponent {

  @Input() isDiary: boolean | undefined;

  isMenuOpen: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isLogged;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.menu-container');
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }
}
