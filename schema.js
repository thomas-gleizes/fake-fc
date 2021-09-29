const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    name: String,
    firstname: String,
    email: String,
    phone: String,
    password: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", schema);
