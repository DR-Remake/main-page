const Users = require("../../../models/Users");
const Admins = require("../../../models/Admins");

const patchUser = async (req, res) => {
  const { Username } = req.body;
  const newUsername = req.params.new;
  const Email = Username;

  try {
    const findUsers = await Users.findOne({ Username });
    const findAdmins = await Admins.findOne({ Email });
    if (!findUsers && !findAdmins)
      return res.status(400).json({ err: "User not found to edit." });

    if (findUsers) {
      await Users.updateOne({ Username }, { $set: { Username: newUsername } });
      return res.status(200).json({ msg: "User was changed!" });
    }

    if (findAdmins) {
      await Admins.updateOne({ Email }, { $set: { Email: newUsername } });
      return res.status(200).json({ msg: "Admin was changed!" });
    }
  } catch (error) {}
};

module.exports = patchUser;
