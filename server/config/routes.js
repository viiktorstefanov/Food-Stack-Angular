const authController = require("../controllers/authController");
const experiencesController = require("../controllers/experiencesController");
const placesController = require("../controllers/placesController");
const searchController = require("../controllers/searchController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/experiences', experiencesController);
    app.use('/places', placesController);
    app.use('/find', searchController);
};