const Users = require("../../../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  const { Email, Username } = req.body;

  try {
    const findEmail = await Users.findOne({ Email });

    if (!findEmail) {
      return res.status(400).json({ err: "Invalid email or password." });
    }

    const payload = { Email, Username, Role: "User" };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ findEmail, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUsers;
