const Joi = require("joi");

const createBlogPostSchemaDto = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  state: Joi.string().valid("draft", "published"),
});

const updateBlogPostSchemaDto = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().min(1),
  body: Joi.string().min(1),
  tags: Joi.array().items(Joi.string()),
  state: Joi.string().valid("draft", "published"),
});

module.exports = { createBlogPostSchemaDto, updateBlogPostSchemaDto };
