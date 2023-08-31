const router = require("express").Router();

const homeAdmin = require("../../controllers/Admin/getAdmin/homeAdmin");
const getAdmins = require("../../controllers/Admin/getAdmin/getAdmins");
const getSpecificAdmin = require("../../controllers/Admin/getAdmin/getSpecificAdmin");
const getPendingAdmins = require("../../controllers/Admin/getAdmin/getPendingAdmins");
const getNews = require("../../controllers/Admin/getAdmin/getNews");
const getNotifications = require("../../controllers/Admin/getAdmin/getNotifications");

//middlewares
const checkAdmin = require("../../middleware/checkAdmin");
const checkToken = require("../../middleware/checkToken");
const checkCode = require("../../middleware/checkCode");

router.get("/home", checkAdmin, homeAdmin);
router.get("/getNews", checkAdmin, getNews);
router.get("/getNotifications", checkAdmin, getNotifications);
router.get("/getAdmins", checkAdmin, getAdmins);
router.get("/getSpecificAdmin", checkAdmin, checkToken, getSpecificAdmin);
router.get("/getPendingAdmins", checkAdmin, getPendingAdmins);
router.get("/checkCode", checkCode);

module.exports = router;
