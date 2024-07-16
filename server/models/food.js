const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  label: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nutrients: {
    kcal: { type: Number, required: true },
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Food', foodSchema);
