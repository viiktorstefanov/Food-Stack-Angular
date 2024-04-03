const authController = require("../controllers/authController");
const experiencesController = require("../controllers/experiencesController");
const placesController = require("../controllers/placesController");
const blogController = require("../controllers/blogController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/blog', blogController);
    app.use('/experiences', experiencesController);
    app.use('/places', placesController);
};