const { Router } = require("express");
const asyncHandler = require("../../utils/async-handler");
const PostController = require("./post.controller");
const validateDto = require("../../middlewares/validate-dto.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const {
  createBlogPostSchemaDto,
  updateBlogPostSchemaDto,
} = require("./post.dto");
const validateParams = require("../../middlewares/validate-params.middleware");
const { idParamSchema } = require("../../common/id-param.dto");

const blogPostRouter = Router();

blogPostRouter
  .post(
    "/",
    authMiddleware,
    validateDto(createBlogPostSchemaDto),
    asyncHandler(PostController.createBlogPost)
  )
  .patch(
    "/:id",
    authMiddleware,
    validateParams(idParamSchema),
    validateDto(updateBlogPostSchemaDto),
    asyncHandler(PostController.updateBlogPost)
  )
  .get("/", asyncHandler(PostController.getPublishedPosts))
  .get("/mine", authMiddleware, asyncHandler(PostController.getMyBlogPosts))
  .get(
    "/mine/:id",
    authMiddleware,
    validateParams(idParamSchema),
    asyncHandler(PostController.getMySingleBlog)
  )
  .get(
    "/view/:id",
    authMiddleware,
    validateParams(idParamSchema),
    asyncHandler(PostController.getSinglePublishedBlog)
  )
  .delete(
    "/:id",
    authMiddleware,
    validateParams(idParamSchema),
    asyncHandler(PostController.deleteBlogPost)
  );

module.exports = blogPostRouter;
