const router = require("express").Router();

const getLobby = require("../../controllers/Lobby/getPostLobby");

router.get("/", getLobby);

module.exports = router;
