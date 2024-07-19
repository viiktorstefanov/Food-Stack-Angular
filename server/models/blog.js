const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: { type: String, required: [true, 'Title is missing']},
    subtitle: { type: String, required: [true, `Subtitle is missing`]},
    imageUrl: { type: String, required: [true, 'Image url is missing']},
    content: { type: String, required: [true, `Content is missing`], minlength: [10, `Content should be at least 10 characters`] },
    secondImageUrl: { type: String, required: [true, 'Second image url is missing']},
    description: { type: String, required: [true, 'Description is missing'], minlength: [10, `Description should be at least 10 characters`] },
}, {
    timestamps: true
});

const blog = model('Blog', blogSchema);

module.exports = blog;