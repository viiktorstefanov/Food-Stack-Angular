const { Schema, model, Types } = require('mongoose');

const experiencesSchema = new Schema({
    service: { type: String, required: [true, 'Service is required'], minlength: [5, 'Service should be at least 5 characters'] },
    person: { type: String, required: [true, `Person's name is required`], minlength: [3, `Person's name should be at least 3 characters`] },
    phoneNumber: { type: String, required: [true, `Person's phone number is required`], minlength: [10, `Person's phone number should be at least 10 characters`] },
    description: { type: String, required: [true, 'Description is required'], minlength: [100, 'Description should be at least 100 characters'] },
    ownerId: { type: Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

const experience = model('Experiences', experiencesSchema);

module.exports = experience;