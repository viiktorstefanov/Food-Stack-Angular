const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required'], minlength: [9, 'Email should be at least 9 characters long'], unique: [true, 'Email is already used']  }, 
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: [true, 'First name is required'] },
    gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender is required'] },
    height: { type: Number, required: [true, 'Height is required'], minlength: [3, 'Height should be at least 3 numbers'], maxlength: [3, 'Height can be max 3 numbers'] }, 
    weight: { type: Number, required: [true, 'Weight is required'], maxlength: [3, 'Weight can be max 3 numbers'] },
    customFoods: { type: Array, default: [] }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('user', userSchema);

module.exports = User;