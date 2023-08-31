const postVerification = require("./postVerificationFunctions");

exports.routesInit = (app) => {
  const userHandlers = [postVerification];

  userHandlers.forEach((handle) => app.use("/verify", handle));
};
