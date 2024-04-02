import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private sideNavService: SideNavService) {
    this.sideNavService.showSideNav();
  }
}
