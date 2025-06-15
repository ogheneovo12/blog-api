const { Router } = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const blogPostRouter = require("../modules/posts/post.routes");
// const userRoutes = require("./users/user.routes");

const apiRouter = Router();

// welcome route
apiRouter.get("/", (req, res) => {
  res.json({
    mesage: "welcome to the api route",
  });
});

apiRouter.use("/auth", authRoutes);
apiRouter.use("/blog-posts",blogPostRouter)
// apiRouter.use(userRoutes);

module.exports = apiRouter;
