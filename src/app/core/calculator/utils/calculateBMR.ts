export function calculateBMR(weight: number, height: number, age: number, gender: string) : number {
    const menBMRfactor= 88.362;
    const menWeightFactor = 13.397;
    const menHeightFactor = 4.799;
    const menAgeFactor = 5.677;
    //constants factors for calculating men BMR

    const womanBMRfactor = 447.593;
    const womanWeightFactor = 9.247;
    const womanHeightFactor = 3.098;
    const womanAgeFactor = 4.330;
    //constants factors for calculating woman BMR

    let personBMR;

    if(gender === 'female') {
        personBMR = womanBMRfactor + (womanWeightFactor * weight) + (womanHeightFactor * height) - (womanAgeFactor * age); 
    } else {
        personBMR = menBMRfactor + (menWeightFactor * weight) + (menHeightFactor * height) - (menAgeFactor * age);
    }

    return personBMR;
};

// BMR stands for Basal Metabolic Rate. It is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. These functions include breathing, circulation, cell production, nutrient processing, protein synthesis, and ion transport. Essentially, BMR is the amount of energy (calories) your body needs to function at rest to maintain the life-sustaining processes for 24 hours.