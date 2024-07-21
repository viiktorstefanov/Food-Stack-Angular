import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent  implements OnInit, OnDestroy {

  errors: string[] = [];
  logoutSubscription: Subscription | undefined;

  constructor(private sideNavService: SideNavService, private authService: AuthService, private toastr: ToastrService, private router: Router, private loaderService: LoaderService) {
    this.sideNavService.hideSideNav();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.logoutSubscription = this.authService.logout().subscribe({
      next: () => {
        this.authService.clearUser();
        this.router.navigate(['/home']);
        this.toastr.success('Logout successful.');
        this.loaderService.hide();
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
         };
        this.router.navigate(['/not-found']);
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
        this.loaderService.hide();  
      }
    });
  };

  ngOnDestroy(): void {
    if(this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    };
  };
}
