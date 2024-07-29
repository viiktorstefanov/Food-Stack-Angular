import { Component, HostListener, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isMobileView: boolean = false;

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 428;
  }

  constructor(private sideNavService: SideNavService) {
    this.sideNavService.hideSideNav();
  }
  
}
