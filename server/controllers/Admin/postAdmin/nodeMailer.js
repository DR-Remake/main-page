const nodemailer = require("nodemailer");
require("dotenv").config();

const nodeMailer = async (req, res) => {
  const { Username, Email } = req.body;
  const vCode = req.vCode;
  console.log(vCode);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.GEN_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADD,
      to: Email,
      subject: "Test Email",
      text: `Hello ${Username}.
    Welcome to the DRR Administration team.
    To grant full access to the website as an admin, please visit the following link http://localhost:5173/user/setNewPassword
    and put there the following code: ${vCode}
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = nodeMailer;
