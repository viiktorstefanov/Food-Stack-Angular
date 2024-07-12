import { Food } from "../../dashboard/types/Food";

export type User = {
    firstName: string,
    email: string,
    password: string,
    gender: string,
    height: string,
    weight: string,
    customFoods?: Food[],
    accessToken: string,
    refreshToken: string,
    _id: string,
};