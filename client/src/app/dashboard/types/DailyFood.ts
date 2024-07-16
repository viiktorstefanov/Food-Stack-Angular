export type DailyFood = {
    _id: string,
    name: string,
    calories: string,
    macronutrients: {
        protein: string,
        fat: string,
        carbohydrates: string,
    },
    quantity?: number,
    api?: boolean,
    label?: string,
};

export type CustomFood = {
    name: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fat: number,
    _id?: string,
};


export type Food = {
    foodId: string,
    label: string,
    nutrients : {
        kcal: number,
        protein: number,
        fat: number,
        carbohydrates: number,
    }
};