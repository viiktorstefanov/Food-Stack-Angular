const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  macronutrients: {
    protein: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Food', foodSchema);
