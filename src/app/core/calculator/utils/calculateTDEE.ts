export function calculateTDEE(personBMR: number, activity: string) : number {

    const activityNumber = +activity;

    //sedentary activity(1.2) -  For those who do little to no exercise.

      //light activity(1.375) - For people doing light exercise/sports 1-3 days a week.

      //moderately activity(1.55) - Applies to moderate exercise/sports 3-5 days a week.

      //very activity(1.725) - For those who engage in hard exercises/sports 6-7 days a week.

    //extra activity(1.9) -For extremely active individuals who either have very physically 
    // demanding jobs or engage in very hard exercises/sports and possibly additional physical activities.

    return personBMR * activityNumber;
};

// TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories you burn in a single day, considering all activities. TDEE includes the energy expended through basic bodily functions (BMR), plus the energy used during physical activity, and the energy used in digesting, absorbing, and metabolizing food (also known as the thermic effect of food).

// TDEE is a more comprehensive measure of calorie expenditure than BMR because it accounts for your lifestyle and activity level. Factors influencing TDEE include:

//     Physical Activity Level: The more active you are, the more calories you burn. TDEE accounts for various levels of activity from sedentary (little to no exercise) to highly active (intense exercise or physically demanding job).
//     Exercise: Both the intensity and duration of exercise play significant roles in how many additional calories are burned over the baseline set by your BMR.