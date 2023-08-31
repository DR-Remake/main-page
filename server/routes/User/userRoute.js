const getUser = require("./getUserFunctions");
const postUser = require("./postUserFunctions");
const deleteUser = require("./deleteUserFunctions");
const patchUser = require("./patchUserFunctions");

exports.routesInit = (app) => {
  const userHandlers = [getUser, postUser, deleteUser, patchUser];

  userHandlers.forEach((handle) => app.use("/users", handle));
};
