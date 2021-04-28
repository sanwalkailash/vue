const routes = require('express').Router()


routes.use("/v1/authenticate", require('./v1/authenticate'))

  module.exports = routes