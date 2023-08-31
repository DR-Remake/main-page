const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getPostLobby = async (req, res, next) => {
  const { Role } = req.user;
  try {
    return res.status(200).json({ Role: Role });
  } catch (error) {
    next(error);
  }
};

module.exports = getPostLobby;
