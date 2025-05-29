const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogs");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");
const upload = require("../middleware/multer");
const { getBlogById } = require("../models/Blog");

router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlog);

router.use(authMiddleware);
router.post("/create", upload.single("image"), createBlog);
router
  .route("/:id")
  .patch(upload.single("image"), updateBlog)
  .delete(deleteBlog);
router.route("/my-blog/:id").get(getUserBlogs);
module.exports = router;
