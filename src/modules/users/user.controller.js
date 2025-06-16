const userModel = require("./user.model");

module.exports = class UserController {
  getAllUsers() {
    return userModel
      .find()
      .select(["first_name", "last_name", "email", "blog_name"]);
  }
};
