import { Component } from '@angular/core';
import { SideNavService } from './shared/side-nav/side-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;


  constructor(public sideNavService: SideNavService, private router: Router) {
  }

  onToggleSideNav(data: sideBarNav) : void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getMainClass(): string {
    const isHomeRoute = this.router.url === '/home';

    if (isHomeRoute) {
      return '';
    }

    let styleClass = '';

    if(this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'main-trimmed';
    } else if(this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'main-md-screen'//medium size
    }
    return styleClass;
  }

}

type sideBarNav = {
  collapsed: boolean,
  screenWidth: number,
}
