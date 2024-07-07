const User = require("../models/user");
const Food = require("../models/food");
const DailyFood = require("../models/dailyFood");

const mongoose = require("mongoose");

const { searchFoodByIdFromAPI } = require("./foodService");



async function addUserDailyFood(userId, foodId, date, quantity) {
  let food = undefined;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isValidId = mongoose.Types.ObjectId.isValid(foodId);
 
  if (isValidId) {
    food = await Food.findById(foodId);
  } else {
    food = await searchFoodByIdFromAPI(foodId);
  }

  if (!food) {
    throw new Error("Food not found");
  }
  
  let dailyFoodEntry = await DailyFood.findOne({ date, userId });
  // const existingEntry 

  if (dailyFoodEntry) {
    const foodEntry = dailyFoodEntry.foods.find(
      (food) =>
         food.foodId.toString() === foodId
    );

    if (foodEntry) {
      foodEntry.quantity += quantity;
    } else {
      dailyFoodEntry.foods.push({ userId, foodId, quantity });
    }
  } else {
    dailyFoodEntry = new DailyFood({
      date,
      userId,
      foods: [{ foodId, quantity }],
    });
  }

  await dailyFoodEntry.save();

}

async function getUserDailyFoods(userId, date) {

    const dailyEntries = await DailyFood.findOne(
        { date, 'foods.userId': userId } 
    );

    const foodPromises = dailyEntries.foods.map(async dailyFood => {
        let food;
        const isValidId = mongoose.Types.ObjectId.isValid(dailyFood.foodId);

        if (isValidId) {
            let findedFood = await Food.findById(dailyFood.foodId);
            food = {
                macronutrients: { protein: findedFood.macronutrients.protein, carbohydrates: findedFood.macronutrients.carbohydrates, fat: findedFood.macronutrients.fat},
                _id : findedFood._id,
                name: findedFood.name,
                calories: findedFood.calories,
                quantity: dailyFood.quantity,
                api: false,
            };

        } else {
            let findedFood = await searchFoodByIdFromAPI(dailyFood.foodId);
            food = {
                macronutrients: { protein: findedFood.nutrients.protein, carbohydrates: findedFood.nutrients.carbohydrates, fat: findedFood.nutrients.fat},
                _id : findedFood.foodId,
                name: findedFood.label,
                calories: findedFood.nutrients.kcal,
                quantity: dailyFood.quantity,
                api: true,
            }
        }

        return food;
    });

    const dailyFoodsWithMacronutrients = await Promise.all(foodPromises);

    return dailyFoodsWithMacronutrients;
}

async function removeUserDailyFoods(userId, date, foodId) {
     await DailyFood.findOneAndUpdate(
        { date, 'foods.userId': userId }, 
        { $pull: { 'foods': { userId, foodId } } },
        { new: true } 
    );  

    console.log(`Successfully removed food with foodId ${foodId} for userId ${userId} on date ${date}`);
}

module.exports = {
    addUserDailyFood,
    getUserDailyFoods,
    removeUserDailyFoods
};
