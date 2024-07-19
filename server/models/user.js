const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is missing'], minlength: [9, 'Email should be at least 9 characters long'], unique: [true, 'Email address is already taken']  }, 
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: [true, 'First name is missing'] },
    age: { type: Number, required: [true, 'Age is missing'] },
    gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender is missing'] },
    height: { type: Number, required: [true, 'Height is missing'], minlength: [3, 'Enter a height that has a minimum of 3 digits'], maxlength: [3, 'Enter a height with no more than 3 digits'] }, 
    weight: { type: Number, required: [true, 'Weight is missing'], maxlength: [3, 'Enter a weight with no more than 3 digits'] },
    activity: { type: Number, required: [true, 'Activity is missing'] },
    targetCalories: {
        type: Number,
        default: 0
    }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;