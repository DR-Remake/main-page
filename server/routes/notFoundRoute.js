exports.routesInit = (app) => {
  app.use((req, res) => {
    res.status(404).json({ msg: "Not Found" });
  });
};
