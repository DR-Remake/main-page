const adminNoPass = require("../../../models/adminNoPass");

const getPendingAdmins = async (req, res) => {
  try {
    const adminList = await adminNoPass.find({});
    return res.status(200).json({ adminList });
  } catch (error) {
    return res.status(500).json({ err: "Internal error occured " });
  }
};

module.exports = getPendingAdmins;
