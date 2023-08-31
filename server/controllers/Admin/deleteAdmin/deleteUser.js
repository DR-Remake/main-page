const Users = require("../../../models/Users");

const deleteUser = async (req, res) => {
  const Username = req.params.id;
  try {
    const deletedUser = await Users.deleteOne({ Username });
    if (!deletedUser) return res.status(400).json({ msg: "User not found." });
    return res.status(204).json({ msg: "User deleted succesfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteUser;
