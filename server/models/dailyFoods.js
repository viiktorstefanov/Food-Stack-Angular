const mongoose = require('mongoose');

const dailyFoodIntakeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  foods: [{ 
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

module.exports = mongoose.model('DailyFoodIntake', dailyFoodIntakeSchema);
