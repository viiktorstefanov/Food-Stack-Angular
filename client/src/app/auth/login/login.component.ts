import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  errors: string[] = [];

  private loginSubscription: Subscription | undefined;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
  };

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
      
    this.loginSubscription = this.authService.login(email!, password!).subscribe({
      next: (user) => {
        this.toastr.success('Login successful.');
        this.toastr.success('You are now signed in.');
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        }
        
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error'));   
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
