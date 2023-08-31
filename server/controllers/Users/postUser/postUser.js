const Users = require("../../../models/Users");
const Admins = require("../../../models/Admins");
const bcrypt = require("bcrypt");
const theDate = new Date();
const currentYear = theDate.getFullYear();
const currentMonth = theDate.getMonth() + 1;
const currentDate = theDate.getDate();

const postUser = async (req, res) => {
  const { Username, Email, Password, ConfirmPassword, Date, Role } =
    req.body.data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  try {
    if (Role === "User") {
      if (
        !Username ||
        !Email ||
        !Password ||
        !ConfirmPassword ||
        !Date ||
        !Role
      ) {
        return res
          .status(400)
          .json({ err: "Please fill all inputs.", req: req.body });
      }

      const userExists = await Users.findOne({ Username });
      const adminExists = await Admins.findOne({ Username });
      if (userExists || adminExists)
        return res.status(400).json({ err: "User already exists." });

      if (Username.length >= 17) {
        return res.status(400).json({
          err: "Username too long, max characters are 16.",
        });
      }

      const emailExists = await Users.findOne({ Email });

      if (emailExists) {
        return res.status(400).json({
          err: "Email is already being used, please pick another email.",
        });
      }

      if (!emailRegex.test(Email)) {
        return res.status(400).json({
          err: "Invalid email, please enter a valid email.",
        });
      }
      if (!passwordRegex.test(Password)) {
        return res.status(400).json({
          err: "Weak password, please enter a password by the format that is included when you hover on the 'i' near the password chapter.",
        });
      }

      if (Password !== ConfirmPassword) {
        return res.status(400).json({
          err: "The passwords you provided do not match to each other, please recheck them.",
        });
      }

      const [year, month, day] = Date?.split("-");
      if (
        currentYear - Number(year) <= 12 ||
        currentYear - Number(year) > 120
      ) {
        return res.status(400).json({
          err: "Invalid year. Please recheck the year inside Date of birth.",
        });
      }
      //  else if (Number(month) - currentMonth > 0) {
      //   return res.status(400).json({
      //     err: "Invalid month. Please recheck the month inside Date of birth.",
      //   });
      //   //17 - 7
      // } else if (Number(day) - currentDate > 0) {
      //   return res.status(400).json({
      //     err: "Invalid day. Please recheck the day inside Date of birth.",
      //   });
      // }

      if ((day <= 0 && day > 31) || (month <= 0 && month > 12)) {
        return res.status(400).json({
          err: "Please enter a valid date.",
        });
      }

      const protectedPassword = await bcrypt.hash(Password, 10);

      const newUser = new Users({
        Username,
        Email,
        Password: protectedPassword,
        ConfirmPassword: protectedPassword,
        Date,
        Role,
      });
      await newUser.save();
      return res.status(200).json({ success: "user created!" });
    } else {
      return res.status(400).json({ err: "Insufficient privileges." });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = postUser;
