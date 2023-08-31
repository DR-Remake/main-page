const router = require("express").Router();
const setNewPassword = require("../../controllers/Users/patchUser/setNewPassword");

router.patch("/setNewPassword/:new", setNewPassword);

module.exports = router;
