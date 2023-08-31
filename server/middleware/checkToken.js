const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(400).json({ err: "No token provided" });

    if (token && typeof token === "string") {
      const justToken = token.split(" ")[1];
      if (!justToken)
        return res.status(400).json({ err: "Invalid format or token" });
      jwt.verify(justToken, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ err: "token expired" });
        req.user = decoded;
        // if (req.user.Role === "Admin")
        //   return res.status(403).json({
        //     err: "You are an admin, for security reasons, you can't access regular routes.",
        //     Role: req.user.Role,
        //   });
        next();
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticateToken;
