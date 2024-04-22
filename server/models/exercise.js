const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    caloriesBurnedPerHour: {type: Number, required: true },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
