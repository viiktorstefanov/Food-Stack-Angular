import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/loader/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required]],
  });

  errors: string[] = [];
  isMobileView: boolean = false;

  private loginSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.checkWindowSize();
  }


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private loaderService: LoaderService) {
  };

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 414;
  }

  submitHandler(): void {

    this.errors = [];

    if (this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
       return;
    };

    const { email, password } = this.form.value;

    if (!email || !password) {
      this.toastr.error('Email and password are required', 'Error');
      return;
    }
    
    this.loaderService.show();

    this.loginSubscription = this.authService.login(email!, password!).subscribe({
      next: (user) => {
        this.toastr.success('Login successful.');
        
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

  get password() {
    return this.form.controls['password'];
  };

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
