const adminNoPass = require("../../../models/adminNoPass");

const removeCode = async (req, res) => {
  try {
    const code = req.codeDelete;
    console.log(code);
    if (!code) return res.status(400).json({ err: "No code was provided" });

    await adminNoPass.deleteOne({vCode: code});

    return res.status(200).json({ msg: "deleted code succesfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeCode;
