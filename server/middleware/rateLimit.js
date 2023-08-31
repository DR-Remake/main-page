const expressRateLimit = require("express-rate-limit");

const rateLimitMiddleware = expressRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    err: "Too many requests to the server, plesae try again later.",
  },
});

module.exports = rateLimitMiddleware;
