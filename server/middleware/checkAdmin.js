const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const t = req.headers.authorization;
  if (!t)
    return res
      .status(401)
      .json({ err: "Authorization token not provided || failed on t" });

  const [, token] = t.split(" ");
  if (!token) {
    return res
      .status(401)
      .json({ err: "Authorization token not provided || Invalid credentials" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = decodedToken;
    if (decodedToken.Role === "Admin") {
    } else {
      return res
        .status(403)
        .json({ err: "Insufficient privileges || Invalid credentials" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ err: "Invalid token || Invalid credentials" });
  }
};

module.exports = authenticateToken;
