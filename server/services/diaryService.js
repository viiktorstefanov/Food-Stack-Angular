const User = require("../models/user");
const Food = require("../models/food");
const DailyFood = require("../models/dailyFood");

const { Types } = require("mongoose");

const { searchFoodByIdFromAPI } = require("./foodService");

async function addUserDailyFood(userId, foodId, date, quantity) {
  let food = undefined;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isValidId = Types.ObjectId.isValid(foodId);
 
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
      dailyFoodEntry.foods.push({  foodId, quantity });
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

    const dailyEntries = await DailyFood.findOne({ date, userId });
    
    const foodPromises = dailyEntries.foods.map(async dailyFood => {
        let food;
        const isValidId = Types.ObjectId.isValid(dailyFood.foodId);

        if (isValidId) {
            const foundFood = await Food.findById(dailyFood.foodId);
            food = {
                macronutrients: { protein: foundFood.macronutrients.protein, carbohydrates: foundFood.macronutrients.carbohydrates, fat: foundFood.macronutrients.fat},
                _id : foundFood._id,
                name: foundFood.name,
                calories: foundFood.calories,
                quantity: dailyFood.quantity,
                api: false,
            };

        } else {
            const foundFood = await searchFoodByIdFromAPI(dailyFood.foodId);
            food = {
                macronutrients: { protein: foundFood.nutrients.protein, carbohydrates: foundFood.nutrients.carbohydrates, fat: foundFood.nutrients.fat},
                _id : foundFood.foodId,
                name: foundFood.label,
                calories: foundFood.nutrients.kcal,
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
        { date, userId }, 
        { $pull: { 'foods': { foodId } } },
        { new: true } 
    );  

    console.log(`Successfully removed food with foodId ${foodId} for userId ${userId} on date ${date}`);
}

async function editUserDailyFood(userId, date, foodId, quantity) {
  const dailyEntry = await DailyFood.findOne({ date, userId });
 
  const foodEntry = dailyEntry.foods.find(food => food.foodId.toString() === foodId.toString());

  foodEntry.quantity = quantity;

  await dailyEntry.save();

  return dailyEntry.foods;
}

module.exports = {
    addUserDailyFood,
    getUserDailyFoods,
    removeUserDailyFoods,
    editUserDailyFood
};
