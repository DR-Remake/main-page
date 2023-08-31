const router = require("express").Router();

const loginAdmin = require("../../controllers/Admin/postAdmin/loginAdmin");
const postNewAdmin = require("../../controllers/Admin/postAdmin/postNewAdmin");
const postAdminNoPass = require("../../controllers/Admin/postAdmin/postAdminNoPass.js");
const removeCode = require("../../controllers/Admin/postAdmin/removeCode");
const nodeMailer = require("../../controllers/Admin/postAdmin/nodeMailer");
const postNews = require("../../controllers/Admin/postAdmin/postNews");
const postNotification = require("../../controllers/Admin/postAdmin/postNotification");

//middleware
const checkAdmin = require("../../middleware/checkAdmin");
const checkToken = require("../../middleware/checkToken");
const rateLimit = require("../../middleware/rateLimit");

router.post("/loginAdmin", loginAdmin);
router.post("/postAdminCode", postNewAdmin, removeCode);
router.post("/postAdminNoPass", checkAdmin, postAdminNoPass, nodeMailer);
router.post("/postNews", checkAdmin, checkToken, postNews);
router.post("/postNotification", checkAdmin, checkToken, postNotification);
// router.post("/postAdmin", checkAdmin, postAdmin);

module.exports = router;
