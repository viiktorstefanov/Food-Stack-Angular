const foodsController = require('express').Router();

const { searchFoodsAPI, getUserCustomFoods, searchUserCustomFoods, addUserCustomFood, deleteUserCustomFood } = require('../services/foodService');

const { parseError } = require('../utils/parseError');


foodsController.get("/", async (req, res) => {
    try {
       //http://localhost:5000/foods/?item=apple

        if (!req.query || !req.query.item || req.query.length <= 0) {
            throw new Error('Missing information about searched item');
        }

        const query = req.query.item.toLocaleLowerCase();

        const user = JSON.parse(req.headers.user);
        const userId = user._id;
       
        const resultCustomFoods = await searchUserCustomFoods(userId, query);
      
        const resultFoodsAPI = await searchFoodsAPI(query);

        const combinedResults = [...resultCustomFoods, ...resultFoodsAPI];

        res.json(combinedResults).end();
   
        console.log("All foods were sent.");
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

foodsController.get('/custom/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result =  await getUserCustomFoods(userId);
        res.json(result).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

foodsController.post('/add', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const food = req.body;

            if(!req.body || req.body.length <= 0) {
                throw new Error('Please, enter your new food');
            };


            const newCustomFood = await addUserCustomFood(food, user._id);
            console.log('new custom food added');
            res.status(204).end();
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

foodsController.delete('/custom/:id', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const foodId = req.params.id;

            const deletedFood = await deleteUserCustomFood(user._id, foodId);
        
            if (!deletedFood) {
                throw new Error('Food not found');
            }

            console.log('custom food deleted');
            res.status(204).end();
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});



module.exports = foodsController;