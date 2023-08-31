const router = require("express").Router();

const captchaController = require("../../controllers/Api/charactersController.js");

router.post("/characters", captchaController);

module.exports = router;
