const Blog = require('../models/blog');

async function getAll() {
    return await Blog.find({});
};

async function getById(id) {
    return await Blog.findById(id);
};

async function deleteById(id) {
    return await Blog.findByIdAndDelete(id);
};

async function addBlog(blog) {
    const newBlog = await Blog.create({
        title: blog.title,
        subtitle: blog.subtitle,
        imageUrl: blog.imageUrl,
        content: blog.content,
        secondImageUrl: blog.secondImageUrl,
        description: blog.description
    }); 
    return newBlog; 
};

async function editBlog(blogId, editedBlog) {
    const updatedBlog = await Blog.findOneAndUpdate(
        { _id: blogId },
        { $set: editedBlog }, 
    );

    return updatedBlog;
};

async function getRecentBlogs() {
    return await Blog.find()
    .sort({ createdAt: -1 })
    .limit(4) 
    .then(blogs => {
        return blogs;
    })
    .catch(err => {
        console.error(err);
    });
};

module.exports = {
    getAll,
    deleteById,
    getById,
    addBlog,
    editBlog,
    getRecentBlogs
}