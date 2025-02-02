const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
  windowMs: 69 * 1000,
  max: 5,
  message: {
    message: 'Too many attempts from this IP, please try again later.'
  },
  handler: (req, res, next, options) => {
    logEvents(`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    req.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
