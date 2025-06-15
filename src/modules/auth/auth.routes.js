const { Router } = require("express");
const asyncHandler = require("../../utils/async-handler");
const AuthController  = require("./auth.controller");
const validateDto = require("../../middlewares/validate-dto.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const { loginSchemaDto, registerSchemaDto } = require("./auth.dto")

const authRouter = Router();

authRouter
  .post(
    "/login",
    validateDto(loginSchemaDto),
    asyncHandler(AuthController.login)
  )
  .post(
    "/register",
    validateDto(registerSchemaDto),
    asyncHandler(AuthController.registerUser)
  )
  .get("/me", authMiddleware, asyncHandler(AuthController.getLoginProfile));

module.exports = authRouter;
