const authController = require("../controllers/authController");
const foodsController = require("../controllers/foodsController");
const blogController = require("../controllers/blogController");
const exerciseController = require("../controllers/exerciseController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/blog', blogController);
    app.use('/foods', foodsController);
    app.use('/exercises', exerciseController);
};