const axios = require("axios");
require("dotenv").config();
const recaptchaSecretKey = process.env.reSecretKey;

const captchaController = async (req, res) => {
  try {
    const { token } = req.body;

    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await axios.get(verifyUrl, {
      params: {
        secret: recaptchaSecretKey,
        response: token,
      },
    });

    console.log("reCAPTCHA verification result:", response.data);

    const verificationResult = response.data;
    const score = verificationResult.score;

    console.log(score)

    if (score > 0.5) {
      res.status(200).json({ success: true });
    } else if (score < 0.5) {
      res.status(400).json({ success: false });
    } else {
      res.status(401).json({ msg: "some weird error idk" });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = captchaController;
