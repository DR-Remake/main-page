const getApi = require("./getApiFunctions");
const postApi = require("./postApiFunctions");
const deleteApi = require("./deleteApiFunctions");
const patchApi = require("./patchApiFunctions");

//middlewares
const checkAdmin = require("../../middleware/checkAdmin");

exports.routesInit = (app) => {
  const apiHandlers = [getApi, postApi, deleteApi, patchApi];

  apiHandlers.forEach((handle) => app.use("/api", checkAdmin, handle));
};
