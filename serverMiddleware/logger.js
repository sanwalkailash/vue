const winston = require('winston')
winston.add(new winston.transports.File({ filename: '../backend/log/server.log' }));
module.exports = function (req, res, next) {
    winston.log('info', '--SERVER MIDDLEWARE--')
    winston.log('info', `secret = ${process.env.SECRET_KEY}`)
    next()
  }
  