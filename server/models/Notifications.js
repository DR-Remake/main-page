const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  Author: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notifications", NotificationsSchema);
