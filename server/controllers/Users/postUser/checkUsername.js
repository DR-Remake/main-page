const Admins = require("../../../models/Admins");
const Users = require("../../../models/Users");

const checkUsername = async (req, res) => {
  const { Username } = req.body;
  const Email = req.body.Username;
  try {
    const checkUsername = await Users.findOne({ Username });
    const adminExists = await Admins.findOne({ Email });
    if (checkUsername || adminExists) {
      return res.status(400).json({
        user: checkUsername || adminExists,
        err: `Username ${Username || Email} already exists`,
      });
    }
    return res.status(200).json({ Username });
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkUsername;
