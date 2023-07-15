const UsersRoute = require("../routes/userRoute");

exports.routesInit = (app) => {
  app.use("/users", UsersRoute);
  app.use((req, res) => {
    res.status(404).json({ msg: "Not Found" });
  });
};
