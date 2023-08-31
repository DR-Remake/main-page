const mongoose = require("mongoose");

const adminNoPass = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  vCode: {
    type: String,
    required: true,
    unique: true,
  },
  vCodeExp: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("adminsNoPass", adminNoPass);
