const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: { type: String, required: [true, 'Title is required']},
    subtitle: { type: String, required: [true, `Subtitle is required`]},
    imageUrl: { type: String, required: [true, 'Image url is required']},
    content: { type: String, required: [true, `Content is required`], minlength: [10, `Content should be at least 10 characters`] },
    secondImageUrl: { type: String, required: [true, 'Second image url is required']},
    description: { type: String, required: [true, 'Description is required'], minlength: [10, `Description should be at least 10 characters`] },
}, {
    timestamps: true
});

const blog = model('Blog', blogSchema);

module.exports = blog;