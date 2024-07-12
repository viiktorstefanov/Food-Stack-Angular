const diaryController = require("express").Router();

const {
  addUserDailyFood,
  getUserDailyFoods,
  removeUserDailyFoods,
  editUserDailyFood,
} = require("../services/diaryService");
const { parseError } = require("../utils/parseError");

diaryController.get("/", async (req, res) => {
  try {
    //http://localhost:5000/diary/?item=date
    const date = req.query.item.toLocaleLowerCase();
   
    const user = JSON.parse(req.headers.user);
    const userId = user._id;

    const result = await getUserDailyFoods(userId, date);

    
    res.json(result).end();

    console.log("All daily foods were sent.");
  } catch (error) {
    const message = parseError(error);
    console.log(message);

    if(message === 'There are no daily food entries added') {
      return res.status(200).end();
    }

    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

diaryController.post("/add", async (req, res) => {
  try {
    const user = JSON.parse(req.headers.user);
    const userId = user._id;
  
    const foodId = req.body.foodId;
    const date = req.body.date;
    const quantity = req.body.quantity;

    await addUserDailyFood(userId, foodId, date, quantity);

    res.status(204).end();

    console.log(
      `Food with id ${foodId} added for user with id ${userId} on date`
    );
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

diaryController.delete("/", async (req, res) => {
  try {
    //http://localhost:5000/diary/?item=date&foodId=id
    const date = req.query.item.toLocaleLowerCase();
    const foodId = req.query.foodId;

    const user = JSON.parse(req.headers.user);
    const userId = user._id;

    const result = await removeUserDailyFoods(userId, date, foodId);

    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

diaryController.put("/", async (req, res) => {
  try {
    //http://localhost:5000/diary/?item=date

    const user = JSON.parse(req.headers.user);
    const userId = user._id;

     const foodId = req.body.foodId;

    const date = req.query.item.toLocaleLowerCase();

    const quantity = req.body.quantity;

    const editedDailyFood = await editUserDailyFood(
      userId,
      date,
      foodId,
      quantity
    );

    res.json(editedDailyFood).end();
    console.log(
      `Food with id ${foodId} quantity edited for user with id ${userId} on date`
    );
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

module.exports = diaryController;
