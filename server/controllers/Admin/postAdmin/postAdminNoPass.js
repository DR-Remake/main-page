const AdminNoPass = require("../../../models/adminNoPass");
const Users = require("../../../models/Users");
const Admins = require("../../../models/Admins");
const ShortUniqueId = require("short-unique-id");
// const cryptoRandomString = require("crypto-random-string");

const postAdminNoPass = async (req, res, next) => {
  const { Username, Email } = req.body;
  const uid = new ShortUniqueId();
  const randomCode = uid.randomUUID(6);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!Username || !Email)
      return res.status(400).json({ err: "Please fill all inputs." });

    const findUsers = await Users.findOne({ Email });
    const findAdmins = await Admins.findOne({ Email });
    const findAdminsNoPass = await AdminNoPass.findOne({ Email });
    if (findUsers || findAdmins || findAdminsNoPass)
      return res.status(400).json({ err: "Can't add an existing user." });

    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        err: "Invalid email, please enter a valid email.",
      });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    //create the pending admin with the vCode and exp time
    const newAdminWithoutPassword = new AdminNoPass({
      Username,
      Email,
      vCode: randomCode,
      // vCodeExp: currentTime + 1,
      vCodeExp: currentTime + 24 * 60 * 60,
      // Expiration: 24 hours from now
    });

    req.vCode = randomCode;

    await newAdminWithoutPassword.save();
    next();
    return res.status(200).json({
      msg: "Created their account, but they must set the password themselves with the email you provided.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postAdminNoPass;
