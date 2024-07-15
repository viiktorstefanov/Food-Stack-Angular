const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const foodsController = require("../controllers/foodsController");
const diaryController = require("../controllers/diaryController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/blog', blogController);
    app.use('/foods', foodsController);
    app.use('/diary', diaryController);
};