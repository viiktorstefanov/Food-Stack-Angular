import { DailyFood } from "../../dashboard/types/DailyFood";

export type User = {
    firstName: string,
    email: string,
    password: string,
    gender: string,
    height: string,
    weight: string,
    customFoods?: DailyFood[],
    accessToken: string,
    refreshToken: string,
    _id: string,
};