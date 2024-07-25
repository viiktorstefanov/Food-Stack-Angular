import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
  });

  errors: string[] = [];
  isMobileView: boolean = false;

  private resetPasswordSubscription: Subscription | undefined;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private loaderService: LoaderService) {
  };

  ngOnInit(): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 414;
  }

  submitHandler(): void {

    this.errors = [];

    if (this.form.invalid) {
      this.toastr.error('Enter your email', 'Error');
       return;
    };

    const { email } = this.form.value;

    this.loaderService.show();

    this.resetPasswordSubscription = this.authService.resetUserPassword(email!).subscribe({
      next: () => {
        this.toastr.success('Your password has been reset successfully');
        
        this.router.navigate(['/home']);

        this.loaderService.hide();
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          this.loaderService.hide(); 
          return;
        }
        
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
        this.loaderService.hide();  
      }
    });
    
    
  };

  get email() {
    return this.form.controls['email'];
  };

  ngOnDestroy(): void {
    if (this.resetPasswordSubscription) {
      this.resetPasswordSubscription.unsubscribe();
    }
  }
}
