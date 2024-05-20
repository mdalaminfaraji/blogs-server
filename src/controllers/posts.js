const { Pool } = require("pg");
const { z } = require("zod");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid Image URL "),
  author: z.string().min(1, "Author is required"),
  readTime: z.number().positive("Read time must be a positive number"),
});

const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.status(200).json({
      success: true,
      message: "Successfully Retrieve all Blog post",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `Post not found id=${id}` });
    }
    res.status(200).json({
      success: true,
      message: `Successfully Retrieve Specific Blog post id=${id}`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const parsedData = postSchema.parse(req.body);
    const { title, subtitle, description, imageUrl, author, readTime } =
      parsedData;
    const result = await pool.query(
      "INSERT INTO posts (title, subtitle, description, imageUrl, author, readTime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, subtitle, description, imageUrl, author, readTime]
    );
    res.status(201).json({
      success: true,
      message: "Successfully Create Blog post",
      data: result.rows[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ success: false, message: error?.errors[0]?.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const parsedData = postSchema.parse(req.body);
    const { title, subtitle, description, imageUrl, author, readTime } =
      parsedData;
    const result = await pool.query(
      "UPDATE posts SET title = $1, subtitle = $2, description = $3, imageUrl = $4, author = $5, readTime = $6 WHERE id = $7 RETURNING *",
      [title, subtitle, description, imageUrl, author, readTime, id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({
      success: true,
      message: `Successfully Update Specific Blog post id=${id}`,
      data: result.rows[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ success: false, message: error?.errors[0]?.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: `Post deleted successfully Id=${id}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
