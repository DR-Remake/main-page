const router = require("express").Router();
const captchaController = require("../../controllers/Captcha/captchaController.js");

router.post("/captcha", captchaController);

module.exports = router;
