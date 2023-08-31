const router = require("express").Router();

const postLobby = require("../../controllers/Lobby/getPostLobby");

router.post("/", postLobby);

module.exports = router;
