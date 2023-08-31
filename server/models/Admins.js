const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admins", AdminSchema);
