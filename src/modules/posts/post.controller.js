const calculateReadingTime = require("../../utils/reading-time.utils");
const AppError = require("../../common/app-error");
const postModel = require("./post.model");

const author_populate_option = [
  { path: "author", select: ["first_name", "last_name", "email", "blog_name"] },
];

module.exports = class PostController {
  static async createBlogPost(req, res) {
    const reading_time = calculateReadingTime(req.body.body);
    const newBlogPost = await postModel.create({
      ...req.body,
      reading_time,
      author: req.user._id,
    });

    const populated = await newBlogPost.populate(author_populate_option);

    return res.json({
      data: { blog_post: populated },
      message: "Blog Post Created Successfully",
    });
  }

  static async updateBlogPost(req, res) {
    const blog_post = await postModel
      .findOne({
        _id: req.params.id,
        author: req.user._id,
      })
      .populate(author_populate_option);

    if (!blog_post)
      throw new AppError(`Blog Post with id ${req.params.id} Not Found`, 404);

    Object.assign(blog_post, req.body);

    if (req.body.body)
      blog_post.reading_time = calculateReadingTime(req.body.body);

    await blog_post.save();

    return res.json({
      data: { blog_post },
      message: "blog post updated successfully",
    });
  }

  static async deleteBlogPost(req, res) {
    const blog_post = await postModel.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    return res.json({
      data: { blog_post, message: "blog post deleted successfully" },
    });
  }

  static async getMyBlogPosts(req, res) {
    const data = await PostController.getBlogPosts({
      ...req.query,
      author: req.user._id,
    });
    return res.json(data);
  }

  static async getMySingleBlog(req, res) {
    const blog_post = await postModel
      .findOne({ _id: req.params.id, author: req.user._id })
      .populate(author_populate_option);

    if (!blog_post) {
      throw new AppError(`Blog Post with id ${req.params.id} Not Found`, 404);
    }

    return res.json({
      data: { blog_post },
      message: "Blog Post returned successfully",
    });
  }

  static async getPublishedPosts(req, res) {
    const data = await PostController.getBlogPosts({
      ...req.query,
      state: "published",
    });
    return res.json(data);
  }

  static async getSinglePublishedBlog(req, res) {
    const blog_post = await postModel
      .findOneAndUpdate(
        { _id: req.params.id, state: "published" },
        { $inc: { read_count: 1 } },
        { new: true }
      )
      .populate(author_populate_option);

    if (!blog_post) {
      throw new AppError(`Blog Post with id ${req.params.id} Not Found`, 404);
    }

    return res.json({
      data: { blog_post },
      message: "Blog Post returned successfully",
    });
  }

  static async getBlogPosts(query = {}) {
    const {
      page = 1,
      limit = 20,
      order_by = "createdAt",
      order = "desc",
      ...filterParams
    } = query;

    const numericPage = Math.max(1, parseInt(page, 10));
    const numericLimit = Math.max(1, parseInt(limit, 10));

    const filter = PostController.buildPostFilter(filterParams);

    const total = await postModel.countDocuments(filter);

    const blog_posts = await postModel
      .find(filter)
      .sort({ [order_by || "createdAt"]: order === "desc" ? -1 : 1 })
      .skip((numericPage - 1) * numericLimit)
      .limit(numericLimit)
      .populate(author_populate_option);

    return {
      data: {
        blog_posts,
        pagination_meta: {
          page: numericPage,
          limit: numericLimit,
          total,
          total_pages: Math.ceil(total / numericLimit),
        },
      },
    };
  }

  static buildPostFilter(filters = {}) {
    const query = {};
    const { author, title, tags, state } = filters;

    if (author) query["author"] = author;
    if (title) query["title"] = new RegExp(title, "i");
    if (tags) query["tags"] = { $in: tags.split(",") };
    if (state) query["state"] = state;
    return query;
  }
};
