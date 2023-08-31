const router = require("express").Router();

const patchUser = require("../../controllers/Admin/patchAdmin/patchUser");
const checkAdmin = require("../../middleware/checkAdmin");

router.patch("/patchUser/:new", checkAdmin, patchUser);

module.exports = router;
