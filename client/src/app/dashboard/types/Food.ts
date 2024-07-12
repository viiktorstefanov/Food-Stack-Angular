export type Food = {
    _id: string,
    name: string,
    calories: string,
    macronutrients: {
        protein: string,
        fat: string,
        carbohydrates: string,
    },
    quantity: number,
    api: boolean,
};
