const foodsController = require('express').Router();

const { searchFoodsAPI, getUserCustomFoods, searchUserCustomFoods, addUserCustomFood, deleteUserCustomFood, editUserCustomFood } = require('../services/foodService');

const { parseError } = require('../utils/parseError');

foodsController.get("/", async (req, res) => {
    try {
       //http://localhost:5000/foods/?item=apple

        if (!req.query || !req.query.item || req.query.length <= 0) {
            throw new Error('Missing information about searched item');
        }

        const query = req.query.item.toLocaleLowerCase();

        if (query.length <= 0) {
            throw new Error('Type the name of the food you want to search.');
        }

        const user = JSON.parse(req.headers.user);
        const userId = user._id;
       
        const resultCustomFoods = await searchUserCustomFoods(userId, query);
        
        const resultFoodsAPI = await searchFoodsAPI(query);

        const combinedResults = [...resultCustomFoods, ...resultFoodsAPI];
        
        if(combinedResults.length === 0) {
            throw new Error('No matches found.')
        };

        res.json(combinedResults).end();
   
        console.log(`Found foods for query: ${query} were sent to ${user.email}`);

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
        const user = JSON.parse(req.headers.user);
        const result =  await getUserCustomFoods(userId);

        res.json(result).end();

        console.log(`${user.email}'s custom foods have been sent.`);

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

foodsController.post('/add', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const food = req.body.food;

            if(!req.body || req.body.length <= 0) {
                throw new Error('Enter the information for your new food.');
            };

            const newCustomFood = await addUserCustomFood(user._id, food);

            res.status(204).end();

            console.log(`${user.email} has added a new custom food named: ${newCustomFood.label}.` );
        
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

foodsController.put('/custom/:id', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const foodId = req.params.id;
            const foodData = req.body;
     
            const editedCustomFood = await editUserCustomFood(user._id, foodData.food);

            res.json(editedCustomFood).end();
            
            console.log(`${user.email} has made changes to custom food ${foodId}.`);
        
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

foodsController.delete('/custom/:id', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const foodId = req.params.id;

            const deletedFood = await deleteUserCustomFood(user._id, foodId);
        
            res.status(204).end();
            
            console.log(`${user.email} has deleted the custom food with ${foodId}.`);
        
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

module.exports = foodsController;