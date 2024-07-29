import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { footerData, navBarData } from './navBarData';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
  @Output() onToggleSideNav: EventEmitter<sideBarNav> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navBarData;
  footerData = footerData;
  currentYear: number = new Date().getFullYear();
  isMobileView: boolean = false;

  constructor (private sideNavService: SideNavService) {
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.screenWidth = window.innerWidth;
    
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    this.isMobileView = this.screenWidth >= 360 && this.screenWidth <= 428;
  } 

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.isMobileView = window.innerWidth >= 360 && window.innerWidth <= 428;
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  };

  closeSideNav() : void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  };

}

type sideBarNav = {
  collapsed: boolean,
  screenWidth: number,
};