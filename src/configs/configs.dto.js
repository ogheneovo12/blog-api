const Joi = require("joi");

const configSchemaDto = Joi.object({
  VERSION: Joi.number().required(),
  BUILD: Joi.number(),
  URL: Joi.string().required(),
  API_PATH: Joi.string().required(),
  PORT: Joi.number().required(),
  saltRounds: Joi.number().required(),
  SECRET: Joi.string().required(),
  DB_URL: Joi.string().required(),
});

module.exports = { configSchemaDto };
