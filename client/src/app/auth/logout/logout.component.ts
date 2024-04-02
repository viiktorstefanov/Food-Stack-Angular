import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private sideNavService: SideNavService) {
    this.sideNavService.hideSideNav();
  }
}
