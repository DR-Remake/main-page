const Admins = require("../../../models/Admins");
const adminNoPass = require("../../../models/adminNoPass");
const bcrypt = require("bcrypt");

const postNewAdmin = async (req, res, next) => {
  const { vCode, Password } = req.body;
  try {
    const checkCode = await adminNoPass.find({ vCode });
    console.log(checkCode[0]);
    if (checkCode.length === 0)
      return res.status(400).json({ err: "No code provided" });

    const { Email, Username } = checkCode[0];
    // console.log(Email)

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(Password)) {
      return res.status(400).json({
        err: "Weak password, please enter a password by the format that is included when you hover on the 'i' near the password chapter.",
      });
    }
    const protectedPassword = await bcrypt.hash(Password, 10);

    const newAdminCode = new Admins({
      Email,
      Username,
      Password: protectedPassword,
      Role: "Admin",
    });
    await newAdminCode.save();
    req.codeDelete = vCode;
    next();
    // return res.status(200).json('')
  } catch (error) {
    console.log(error);
  }
};

module.exports = postNewAdmin;
