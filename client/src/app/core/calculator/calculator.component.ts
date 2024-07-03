import { Component } from '@angular/core';
import { SideNavService } from '../../shared/side-nav/side-nav.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { calculateBMR } from './utils/calculateBMR';
import { calculateTDEE } from './utils/calculateTDEE';
import { calculateGainCalories } from './utils/calculateGainCalories';
import { calculateLossCalories } from './utils/calculateLossCalories';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  errors: string[] = [];

  form = this.fb.group({
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    activity: ['', [Validators.required]]
  });

  constructor(private sideNavService: SideNavService, private fb: FormBuilder, private toastr: ToastrService) {
    this.sideNavService.hideSideNav();
  }
  
  resultBMR: string = '';
  TDEE: string = '';
  gainPerWeek025: string = '';
  gainPerWeek05: string = '';
  weightLoss: string = '';
  weightExtremeLoss: string = '';
  weightMaintenance: string = '';
  weightMildLoss: string = '';

  submitHandler() {

    if (this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
       return;
    };

    const { age, gender, height, weight, activity } = this.form.value;

    if(age && +age > 100 || age && +age < 0){
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
  }


// Sedentary (BMR x 1.2): For those who do little to no exercise.

// Lightly active (BMR x 1.375): For people doing light exercise/sports 1-3 days a week.

// Moderately active (BMR x 1.55): Applies to moderate exercise/sports 3-5 days a week.

// Very active (BMR x 1.725): For those who engage in hard exercises/sports 6-7 days a week.

// Extra active (BMR x 1.9): 

}
