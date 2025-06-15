const mongoose = require("mongoose");

module.exports = ({ DB_URL }) =>
  mongoose.connect(DB_URL).catch((err) => console.log(err));
