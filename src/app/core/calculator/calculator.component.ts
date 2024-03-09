import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  menBMR: number = 88.362;
  womenBMR: number = 447.593;
  TDEE: number = 0;

//   Sedentary (BMR x 1.2): For those who do little to no exercise.

// Lightly active (BMR x 1.375): For people doing light exercise/sports 1-3 days a week.

// Moderately active (BMR x 1.55): Applies to moderate exercise/sports 3-5 days a week.

// Very active (BMR x 1.725): For those who engage in hard exercises/sports 6-7 days a week.

// Extra active (BMR x 1.9): 
}
