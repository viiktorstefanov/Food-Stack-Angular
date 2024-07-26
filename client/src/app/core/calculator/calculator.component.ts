import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { calculateBMR } from './utils/calculateBMR';
import { calculateTDEE } from './utils/calculateTDEE';
import { calculateGainCalories } from './utils/calculateGainCalories';
import { calculateLossCalories } from './utils/calculateLossCalories';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/types/User';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent  implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('targetElement') targetElement!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngAfterViewInit(): void {
  }

  scrollToTarget() {
    if(this.targetElement && this.isMobileView) {
      this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  resultsVisible: boolean = false;

  form = this.fb.group({
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    activity: ['', [Validators.required]]
  });

  isMobileView: boolean = false;
  resultBMR: string = '';
  TDEE: string = '';
  gainPerWeek025: string = '';
  gainPerWeek05: string = '';
  weightLoss: string = '';
  weightExtremeLoss: string = '';
  weightMaintenance: string = '';
  weightMildLoss: string = '';
  targetCalories: number = 0;
  user: User | undefined ;
  private formSubscription: Subscription | undefined;
  private targetSubscription: Subscription | undefined;
  errors: string[] = [];

  targetForm = this.fb.group({
    targetCalories: [this.targetCalories, [Validators.required]],
  });

  constructor(private sideNavService: SideNavService, private authService: AuthService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private loaderService: LoaderService) {
    this.sideNavService.hideSideNav();
  }


  ngOnInit(): void {
    this.loaderService.show();
    this.checkWindowSize();
    this.user = this.authService.getUserInfo || undefined;

    if(this.user) {
      this.form.get('age')?.setValue(this.user.age.toString());
      this.form.get('gender')?.setValue(this.user.gender.toString());
      this.form.get('height')?.setValue(this.user.height.toString());
      this.form.get('weight')?.setValue(this.user.weight.toString());
      if(this.user.activity.toString() === '0') {
        this.form.get('activity')?.setValue('1.2');
      } else {
        this.form.get('activity')?.setValue(this.user.activity.toString());
      }

      this.targetSubscription = this.authService.getUserTargetCalories().subscribe({
        next: (result: number) => {
          this.targetCalories = result;
          this.targetForm.get('targetCalories')?.setValue(this.targetCalories);
          this.loaderService.hide();
        },
        error: (err) => {   
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            this.loaderService.hide(); 
            return;
          }
  
          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          this.loaderService.hide();
        },
      });
    }

    
    this.loaderService.hide();
  }

  checkWindowSize(): void {
    const width = window.innerWidth;
    this.isMobileView = width >= 360 && width <= 414;
  }

  submitHandler() {

    const { age, gender, height, weight, activity } = this.form.value;

    if(age && +age > 100 || age && +age <= 0){
      this.toastr.error('Invalid age', 'Error');
      return
    }
    
    if(height && height?.toString().length !== 3){
      this.toastr.error('Invalid height', 'Error');
      return
    }

    if(weight && weight?.toString().length > 3 || weight && weight?.toString().length < 2){
      this.toastr.error('Invalid weight', 'Error');
      return
    }

    if (this.form.invalid) {
      this.toastr.error('Please complete all fields.', 'Error');
       return;
    };

    const ageNum = Number(age);
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const activityNum = Number(activity);

    this.resultBMR = calculateBMR(weightNum, heightNum, ageNum, gender || '').toFixed(0);

    this.TDEE = calculateTDEE(+this.resultBMR, activityNum).toFixed(0);

    const gainCalories = calculateGainCalories(+this.TDEE);
    this.gainPerWeek025 = gainCalories.gain025.toFixed(0);
    this.gainPerWeek05 = gainCalories.gain05.toFixed(0);

    const lossCalories = calculateLossCalories(+this.TDEE);
    this.weightExtremeLoss = lossCalories.extremeWeightLoss.toFixed(0);
    this.weightLoss = lossCalories.weightLoss.toFixed(0);
    this.weightMildLoss = lossCalories.mildWeightLoss.toFixed(0);
    this.weightMaintenance = lossCalories.maintain.toFixed(0);

    this.resultsVisible = true;
    setTimeout(() => {
      if(this.targetElement && this.isMobileView) {
        this.scrollToTarget();
      }
    }, 100);
  }

  onResultCountClick(count: string) {
    if(this.user) {
      this.targetCalories = +count;
      this.targetForm.get('targetCalories')?.setValue(this.targetCalories);
    }
  }

  submitCaloriesTargetHandler() {

    const { targetCalories } = this.targetForm.value;

    if(!targetCalories || typeof targetCalories !== 'number') {
      this.toastr.error('Enter a valid number.', 'Error');
       return;
    }

    this.loaderService.show();

    this.formSubscription = this.authService
      .changeUserTargetCalories(this.user!._id, +targetCalories!)
      .subscribe({
        next: (result) => {
          this.authService.updateUser({...this.user!, targetCalories: +targetCalories});   
          this.router.navigate(['/dashboard/diary']);
          this.loaderService.hide();
        },
        error: (err) => {   
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            this.loaderService.hide(); 
            return;
          }

          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
          this.loaderService.hide();
        },
      });
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    if (this.targetSubscription) {
      this.targetSubscription.unsubscribe();
    }
  }


// Sedentary (BMR x 1.2): For those who do little to no exercise.

// Lightly active (BMR x 1.375): For people doing light exercise/sports 1-3 days a week.

// Moderately active (BMR x 1.55): Applies to moderate exercise/sports 3-5 days a week.

// Very active (BMR x 1.725): For those who engage in hard exercises/sports 6-7 days a week.

// Extra active (BMR x 1.9): 

}
