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

    // const user = JSON.parse(req.headers.user);
    const userId = "66840bd16d71738d3068f4e1";

    const result = await getUserDailyFoods(userId, date);

    res.json(result).end();

    console.log("All daily foods were sent.");
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

diaryController.post("/add", async (req, res) => {
  try {
    // const user = JSON.parse(req.headers.user);
    const userId = "66840bd16d71738d3068f4e1";
    //  const foodId = 'food_a1gb9ubb72c7snbuxr3weagwv0dd';
    const foodId = "660ff0aae2f78317ed42be17";
    const date = req.body.date;
    const quantity = req.body.quantity;

    await addUserDailyFood(userId, foodId, "07/07/2024", 5);

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

    // const user = JSON.parse(req.headers.user);
    const userId = "66840bd16d71738d3068f4e1";

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
    // const user = JSON.parse(req.headers.user);
    const userId = "66840bd16d71738d3068f4e1";
    //  const foodId = 'food_a1gb9ubb72c7snbuxr3weagwv0dd';
    const foodId = "660ff0aae2f78317ed42be17";
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
      `Food with id ${foodId} edited for user with id ${userId} on date`
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
