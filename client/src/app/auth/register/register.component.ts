import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    gender: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]]
  });

  errors: string[] = [];

  private registerSubscription: Subscription | undefined;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
  }

  submitHandler() : void {

    if (this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
       return;
    };

    const { firstName, email, password, weight, height, gender } = this.form.value;
    
    this.registerSubscription = this.authService.register(firstName!, email!, password!, gender!, height!, weight!).subscribe({
      next: (user) => {
        this.toastr.success('Register successful. You are now signed in');
        
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

  get firstName() {
    return this.form.controls['firstName'];
  };

  get email() {
    return this.form.controls['email'];
  };

  get password() {
    return this.form.controls['password'];
  };

  get gender() {
    return this.form.controls['gender'];
  };

  get height() {
    return this.form.controls['height'];
  };

  get weight() {
    return this.form.controls['weight'];
  };


  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  };

}
