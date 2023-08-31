const router = require("express").Router();

const getUsers = require("../../controllers/Users/getUser/getUsers.js");
const checkAdmin = require("../../middleware/checkAdmin.js");

router.get("/getUsers", checkAdmin, getUsers);

module.exports = router;
