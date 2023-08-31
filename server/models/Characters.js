const mongoose = require("mongoose");

const Characters = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Rarity: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Users", Characters);
