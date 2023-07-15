const router = require("express").Router();
const getUsers = require("../controllers/Users/getUsers");
// const postUsers = require("../controllers/Users/postUsers");
// const protectedUser = require("../middlewares/protectUser");

router.get("/getUsers", getUsers);
// router.post("/postUsers", postUsers);

module.exports = router;
