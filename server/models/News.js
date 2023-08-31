const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  Author: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("news", NewsSchema);
