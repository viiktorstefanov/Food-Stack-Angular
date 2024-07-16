const User = require("../models/user");
const Food = require("../models/food");

require("dotenv").config();
const axios = require("axios");

const APP_ID = process.env.API_APP_ID;
const APP_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

//food
async function getUserCustomFoods(userId) {
  const customFoods = await Food.find({ ownerId: userId });

  if (!customFoods) {
    throw new Error("Custom foods not found");
  }

  return customFoods;
}

async function searchUserCustomFoods(userId, query) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const userCustomFoods = await Food.find({ ownerId: userId });

  const regex = new RegExp(query, 'i');

  const filteredFoods = userCustomFoods.filter(food => regex.test(food.label));

  const foods = filteredFoods.map((food) => {
    return {
      foodId: food._id.toString(),
      label: food.label,
      nutrients: {
        kcal: food.nutrients.kcal,
        protein: food.nutrients.protein,
        fat: food.nutrients.fat,
        carbohydrates: food.nutrients.carbohydrates
      }
    }
  });

  return foods;
}

async function searchFoodsAPI(query) {
  const queryParams = {
    type: "public",
    ingr: query,
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  try {
    const result = await axios.get(API_URL, { params: queryParams });
    const foods = result.data.hints;
    const response = foods.map((hint) => {
      return {
        foodId: hint.food.foodId,
        label: hint.food.label,
        nutrients: {
          kcal: hint.food.nutrients.ENERC_KCAL,
          protein: hint.food.nutrients.PROCNT,
          fat: hint.food.nutrients.FAT,
          carbohydrates: hint.food.nutrients.CHOCDF,
        },
      };
    });
  
    return response;
  } catch ( error) {
    console.log(error);
  }

 
}

async function searchFoodByIdFromAPI(foodId) {

  const queryParams = {
    type: "public",
    ingr: foodId,
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  try {
    const result = await axios.get(API_URL, { params: queryParams });
 
    const hasFoundedFood = result.data.hints;
    
    if(hasFoundedFood.length > 0) {
    const food = result.data.hints[0].food;
    const response = {
        foodId: food.foodId,
        label: food.label,
        nutrients: {
          kcal: food.nutrients.ENERC_KCAL,
          protein: food.nutrients.PROCNT,
          fat: food.nutrients.FAT,
          carbohydrates: food.nutrients.CHOCDF,
        },
      };

      return response;
    } else {
      return undefined;
    }

  } catch ( error) {
    console.log(error);
  }

 
}

async function addUserCustomFood(userId, foodData) {

  const user = await User.findById(userId);

  if (!user) {
      throw new Error('User not found');
  }

  const newCustomFood = await Food.create({
          label: foodData.name,
          ownerId: user._id.toString(),
          nutrients: {
              kcal: foodData.calories,
              protein: foodData.protein,
              carbs: foodData.carbohydrates,
              fat: foodData.fat,
          }
      });

      return newCustomFood;
};

async function deleteUserCustomFood(userId, foodId) {
  const user = await User.findById(userId);

  if (!user) {
      throw new Error('User not found');
  }

  const customFood = await Food.findById(foodId);

  if(customFood.ownerId.toString() !== userId) {
    throw new Error(`You're not an owner`)
  };

  const deletedFood = await Food.findByIdAndDelete(foodId);

  if (!deletedFood) {
      throw new Error('Food not found');
  }

}

module.exports = {
  searchFoodsAPI,
  getUserCustomFoods,
  searchUserCustomFoods,
  addUserCustomFood,
  deleteUserCustomFood,
  searchFoodByIdFromAPI
};
