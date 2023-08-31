const Admins = require("../../../models/Admins");

const getAdmins = async (req, res) => {
  try {
    const adminList = await Admins.find({});
    return res.status(200).json({ adminList });
    
  } catch (error) {
    return res.status(500).json({ err: "Internal error occured " });
  }
};

module.exports = getAdmins;
