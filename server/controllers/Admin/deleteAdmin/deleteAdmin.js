const Admins = require("../../../models/Admins");

const deleteAdmin = async (req, res) => {
  const Username = req.params.id;
  try {
    const deletedAdmin = await Admins.deleteOne({ Email: Username });
    if (!deletedAdmin) return res.status(400).json({ msg: "User not found." });
    return res.status(204).json({ msg: "User deleted succesfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteAdmin;
