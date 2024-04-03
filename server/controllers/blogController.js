const blogController = require("express").Router();

const { getAll, getRecentBlogs, addBlog, deleteById, getById, editBlog } = require("../services/blogService");
const { parseError } = require("../utils/parseError");

blogController.get("/archives", async (req, res) => {
  try {
    res.json(await getAll());
    console.log("All blogs were sent.");
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
  const recentBlogs = await getRecentBlogs();
  res.json(recentBlogs);
  console.log("Recent blogs were sent.");
});

blogController.post("/archives/add", async (req, res) => {
  try {
    const blog = req.body;

    if (!req.body || req.body.length <= 0) {
      throw new Error("Please, enter your new blog");
    }

    const newBlog = await addBlog(blog);
    console.log("new blog added");
    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

blogController.get('/archives/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await getById(id);   
        res.json(blog).end();
            console.log('blog send')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

blogController.delete("/archives/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    console.log("blog deleted");
    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

blogController.put('/archives/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        if(!req.body || req.body.length <= 0) {
            throw new Error('Missing info about blog');
        };
        const editedBlog = req.body;
        const updatedBlog = await editBlog(blogId, editedBlog);
        res.status(204).end();
        console.log(`blog edited`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    };
});

module.exports = blogController;
