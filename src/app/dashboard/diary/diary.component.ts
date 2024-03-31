import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent {

  selected: Date | null = null;

  constructor(private sideNavService: SideNavService) {
    this.sideNavService.showSideNav();
  }

  data = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
}
