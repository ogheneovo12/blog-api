const { verifyPassword } = require("../../utils");
const AppError = require("../../common/app-error");
const configs = require("../../configs");
const userModel = require("../users/user.model");
const jwt = require("jsonwebtoken");

module.exports = class AuthController {
  static async login(req, res, next) {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      throw new AppError("Invalid Login Credentials", 400);
    }
    const isValidPassword = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      throw new AppError("Invalid Login Credentials", 400);
    }

    return res.json({
      data: { user, access_token: AuthController.generateJwtToken(user) },
      message: "User Loggedin Successfully",
    });
  }

  static async registerUser(req, res) {
    const exists = await userModel.exists({
      email: req.body.email?.toLowerCase(),
    });

    if (exists) {
      throw new AppError("email already exists", 400, {
        email: "email already exists",
      });
    }

    const blog_name_taken = await userModel.exists({
      blog_name: req.body.blog_name?.toLowerCase(),
    });

    if (blog_name_taken) {
      throw new AppError("blog name already taken", 400, {
        email: "blog name already taken",
      });
    }

    const user = new userModel(req.body);
    await user.save();
    const token = AuthController.generateJwtToken(user);
    return res.json({
      data: { user, access_token: token },
      message: "User Registered Successfully",
    });
  }
  static async getLoginProfile(req, res) {
    return res.json({
      data: { user: req.user },
      message: "User Profile Fetched Successfully",
    });
  }
  static generateJwtToken(user) {
    return jwt.sign({ id: user._id }, configs.SECRET, {
      expiresIn: "1h",
    });
  }
};
