const router = require("express").Router();

const postUser = require("../../controllers/Users/postUser/postUser");
const loginUser = require("../../controllers/Users/postUser/loginUser");
const checkUsername = require("../../controllers/Users/postUser/checkUsername");
const logoutUser = require("../../controllers/Users/postUser/logoutUser");
const checkToken = require("../../middleware/checkToken");
const rateLimit = require("../../middleware/rateLimit");

router.post("/loginUser", loginUser);
router.post("/postUser", rateLimit, postUser);
router.post("/checkUsername", checkUsername);
router.post("/logout", checkToken, logoutUser);

module.exports = router;
