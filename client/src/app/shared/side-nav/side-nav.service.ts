import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  hiddenNav = true;

  constructor() { }

  hideSideNav() {
    this.hiddenNav = true;
  }

  showSideNav() {
    this.hiddenNav = false;
  }
}
