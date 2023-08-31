const adminNoPass = require("../models/adminNoPass");

const checkCode = async (req, res, next) => {
  try {
    const adminList = await adminNoPass.find({});
    // const adminList = await adminNoPass.find({ vCode });
    const currentTime = Math.floor(Date.now() / 1000);
    const { vCodeExp, Email } = adminList;
    if (vCodeExp < currentTime) {
      return res.status(403).json({ err: "the token has expired" });
    }
    // req.info = adminList;
    return res.status(200).json(adminList);
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkCode;
