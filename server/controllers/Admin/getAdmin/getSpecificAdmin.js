const jwt = require("jsonwebtoken");

const getSpecificAdmin = async (req, res) => {
  const { Username, Role } = req.user;
  try {
    return res.status(200).json({ Username, Role });
    // console.log(req.user.decoded);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getSpecificAdmin;
