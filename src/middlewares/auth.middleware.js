const jwt = require("jsonwebtoken");
const userModel = require("../modules/users/user.model");
const configs = require("../configs");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, configs.SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
