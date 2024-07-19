const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  label: { type: String, required: [true, 'Label is missing.'] },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nutrients: {
    kcal: { type: Number, required: [true, 'Calories are missing.'] },
    protein: { type: Number, required: [true, 'Proteins are missing.'], default: 0 },
    fat: { type: Number, required: [true, 'Fats are missing.'], default: 0 },
    carbohydrates: { type: Number, required: [true, 'Carbs are missing.'], default: 0 },
  },
});

module.exports = mongoose.model('Food', foodSchema);
