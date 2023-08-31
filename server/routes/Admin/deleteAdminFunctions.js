const router = require("express").Router();

const deleteAdmin = require("../../controllers/Admin/deleteAdmin/deleteAdmin");
const deletePending = require("../../controllers/Admin/deleteAdmin/deletePending");
const checkAdmin = require("../../middleware/checkAdmin");

router.delete("/deletePending/:code", checkAdmin, deletePending);
router.delete("/deleteAdmin/:id", checkAdmin, deleteAdmin);

module.exports = router;
