const AppError = require("../common/app-error");
const { formatJoiError } = require("../utils");

function validateDto(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(new AppError("Bad Request Exception", 400, formatJoiError(error)));
    }
    next();
  };
}

module.exports = validateDto;
