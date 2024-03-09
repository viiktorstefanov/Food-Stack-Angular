export function calculateGainCalories(TDEE: number) {
    const gainPerWeek025 = 250;
    const gainPerWeek05 = 500;

    const gain025 = TDEE + gainPerWeek025;
    const gain05 = TDEE + gainPerWeek05;

    return {
        gain025,
        gain05
    };
};

//for 0.25 muscle gain should add around 250kcal
//for 0.5 muscle gain shoud add around 500kcal