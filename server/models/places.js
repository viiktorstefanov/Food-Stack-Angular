const { Schema, model, Types } = require('mongoose');

const placesSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'], minlength: [5, 'Title should be at least 5 characters']},
    ownerId: {type: Types.ObjectId, ref: 'User', required: true},
    city: { type: String, required: [true, 'City is required'], minlength: [3, 'City should be at least 3 characters']},
    street: { type: String, required: [true, 'Street is required'], minlength: [5, 'Street should be at least 5 characters']},
    description: { type: String, required: [true, 'Description is required'], minlength: [5, 'Description should be at least 5 characters']},
},{
    timestamps: true
});

const place = model('Places', placesSchema);

module.exports = place;