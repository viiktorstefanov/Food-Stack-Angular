import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordValidator } from './registerValidator';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), PasswordValidator.strong]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    activity: ['', [Validators.required]],
  });

  errors: string[] = [];

  private registerSubscription: Subscription | undefined;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private loaderService: LoaderService) {
  }

  submitHandler() : void {

    const { firstName, email, password, age, weight, height, gender, activity } = this.form.value;

    if(!age) {
      this.toastr.error('Please enter your age.', 'Error');
      return;
    }

    if(!gender) {
      this.toastr.error('Please select your gender.', 'Error');
      return;
    }

    if(!height) {
      this.toastr.error('Please enter your height.', 'Error');
      return;
    }

    if(!weight) {
      this.toastr.error('Please enter your weight.', 'Error');
      return;
    }

    if(!activity) {
      this.toastr.error('Please enter your activity.', 'Error');
      return;
    }

    if (this.form.invalid) {
      this.toastr.error('All fields are required.', 'Error');
       return;
    };
    
    this.loaderService.show();

    this.registerSubscription = this.authService.register(firstName!, email!, password!, +age!, gender!, height!, weight!, activity!).subscribe({
      next: (user) => {
        this.toastr.success('You are now signed in');
        
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
