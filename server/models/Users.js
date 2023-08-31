const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ConfirmPassword: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", Users);
