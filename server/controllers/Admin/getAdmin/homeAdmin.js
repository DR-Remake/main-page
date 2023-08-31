// const Admins = require("../../models/Admins");

const homeAdmin = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ Role: user.Role });
  } catch (error) {
    console.log(error);
  }
};

module.exports = homeAdmin;
