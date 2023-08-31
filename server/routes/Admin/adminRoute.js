const getAdmin = require("./getAdminFunctions");
const postAdmin = require("./postAdminFunctions");
const deleteAdmin = require("./deleteAdminFunctions");
const patchAdmin = require("./patchAdminFunctions");

exports.routesInit = (app) => {
  const adminHandlers = [getAdmin, postAdmin, deleteAdmin, patchAdmin];

  adminHandlers.forEach((handle) => app.use("/admin", handle));
};
