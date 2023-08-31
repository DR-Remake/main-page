const pendingAdmins = require("../../../models/adminNoPass");

const deletePending = async (req, res) => {
  const Code = req.params.vCode;
  try {
    const deletePendingAdmin = await pendingAdmins.deleteOne({ Code });
    if (!deletePendingAdmin)
      return res.status(400).json({ msg: "Admin not found." });

      
    return res.status(204).json({ msg: "Admin deleted succesfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deletePending;
