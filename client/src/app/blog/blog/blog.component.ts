import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  constructor(private sideNavService: SideNavService) {
    this.sideNavService.hideSideNav();
  }
}
