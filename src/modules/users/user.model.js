const mongoose = require("mongoose");
const { hashPassword, verifyPassword } = require("../../utils");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    blog_name: { type: String, unique: true, lowercase: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

module.exports = mongoose.model("User", userSchema);
