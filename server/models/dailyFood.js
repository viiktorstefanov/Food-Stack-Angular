const { Schema, model, Types } = require('mongoose');

const dailyFoodSchema = new Schema({
    date: { type: String, required: [true, 'Date is missing.'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    foods: [
        {
            foodId: { 
                type: Schema.Types.Mixed, 
                required: true,
                validate: {
                    validator: function(v) {
                        return Types.ObjectId.isValid(v) || typeof v === 'string';
                    },
                    message: props => `${props.value} is not a valid foodId!`
                }
            },
            quantity: { type: Number, required: [true, 'Quantity is missing'] },
        }
    ]
});

dailyFoodSchema.index({ date: 1, userId: 1 });

const DailyFood = model('dailyFood', dailyFoodSchema);

module.exports = DailyFood;