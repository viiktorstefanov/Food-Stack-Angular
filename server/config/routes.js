const authController = require("../controllers/authController");
const foodsController = require("../controllers/foodsController");
const blogController = require("../controllers/blogController");
const exerciseController = require("../controllers/exerciseController");
const diaryController = require("../controllers/diaryController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/blog', blogController);
    app.use('/foods', foodsController);
    app.use('/diary', diaryController);
    app.use('/exercises', exerciseController);
};