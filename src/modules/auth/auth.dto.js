const Joi = require("joi");

const loginSchemaDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchemaDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  blog_name: Joi.string().required(),
});

module.exports = { loginSchemaDto, registerSchemaDto };
