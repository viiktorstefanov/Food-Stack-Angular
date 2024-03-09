export function calculateLossCalories(TDEE : number) {
    const maintain = TDEE;
    const mildWeightLoss = TDEE * 0.9;
    const weightLoss = TDEE * 0.7;
    const extremeWeightLoss = TDEE * 0.6;

    return { maintain, mildWeightLoss, weightLoss, extremeWeightLoss}

}

//Maintain weight = TDEE

//Mild weight loss = 90% TDEE

//Weight loss = 70% TDEE

//Extreme weight loss = 60% TDEE