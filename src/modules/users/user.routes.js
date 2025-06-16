const { Router } = require("express");
const asyncHandler = require("../../utils/async-handler");
const UserController = require("./user.controller");

const userRouter = Router();

userRouter.get("/", asyncHandler(UserController.getAllUser));

module.exports = userRouter;
