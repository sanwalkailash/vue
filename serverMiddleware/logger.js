const winston = require('winston')
winston.add(new winston.transports.File({ filename: './log/server.log' }));
module.exports = function (req, res, next) {
    winston.log('info', '--SERVER MIDDLEWARE--')
    // const token = req.cookies.auth
    // winston.log('info', `toke = ${token}`)
    winston.log('info', `secret = ${process.env.SECRET_KEY}`)
    next()
  }
  