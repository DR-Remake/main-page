const Admins = require("../../../models/Admins");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  const { Email } = req.body;

  try {
    const findEmail = await Admins.findOne({ Email });
    const { Username } = findEmail;

    if (!findEmail) {
      return res.status(400).json({ err: "Invalid email or password." });
    }

    const payload = { Email, Username, Role: "Admin" };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ findEmail, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginAdmin;
