const blogController = require("express").Router();

const { getAll, getRecentBlogs, addBlog, deleteById, getById, editBlog } = require("../services/blogService");
const { parseError } = require("../utils/parseError");

blogController.get("/archives", async (req, res) => {
  try {
    const user = JSON.parse(req.headers.user);
    res.json(await getAll());
    console.log(`Successfully sent all blogs to ${user.email}.`);
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

blogController.get("/archives/recent", async (req, res) => {
  try {
    const user = JSON.parse(req.headers.user);
    const recentBlogs = await getRecentBlogs();
    res.json(recentBlogs);
    console.log(`The latest blogs were sent to ${user.email}.`);
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }

});

blogController.post("/archives/add", async (req, res) => {
  try {
    const user = JSON.parse(req.headers.user);
    const blog = req.body;

    if (!req.body || req.body.length <= 0) {
      throw new Error("Blog content cannot be empty.");
    }

    const newBlog = await addBlog(blog);
    console.log(`A new blog has been successfully added for ${user.email}.`);
    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

blogController.get('/archives/:id', async (req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const id = req.params.id;
        const blog = await getById(id);   
        res.json(blog).end();
            console.log(`Blog with ${id} has been successfully sent to ${user.email}.`)
    } catch (error) {
      const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
    }
});

blogController.delete("/archives/:id", async (req, res) => {
  try {
    const user = JSON.parse(req.headers.user);
    const id = req.params.id;
    await deleteById(id);
    console.log(`Blog with ${id} has been successfully removed from ${user.email}.`);
    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
  }
});

blogController.put('/archives/:id', async (req, res) => {
    try {
      const user = JSON.parse(req.headers.user);
        const blogId = req.params.id;
        if(!req.body || req.body.length <= 0) {
            throw new Error(`Blog details are missing from the request.`);
        };
        const editedBlog = req.body;
        const updatedBlog = await editBlog(blogId, editedBlog);
        res.status(204).end();
        console.log(`${user.email} edited the blog with ${blogId}.`);
    } catch (error) {
      const message = parseError(error);
      console.log(message);
      if (message.includes("\n")) {
        const errors = message.split("\n");
        return res.status(400).json({ message: errors }).end();
      }
      res.status(400).json({ message }).end();
    };
});

module.exports = blogController;
