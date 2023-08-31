const getLobby = require("./getLobbyFunctions");
const postLobby = require("./postLobbyFunctions");

//middlewares
const checkToken = require("../../middleware/checkToken");

exports.routesInit = (app) => {
  const adminHandlers = [getLobby, postLobby];

  adminHandlers.forEach((handle) => app.use("/dashboard", checkToken, handle));
};
