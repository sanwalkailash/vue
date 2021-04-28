const routes = require('express').Router()


routes.post('/v1/authenticate', async (req, res) => {
    try {
      const { username, password } = req.body
      res.json({ username, password })

    }catch(err) {
      console.log('ERROR in /authenticate')
      console.log(err.stack)
    }
  })
  
routes.get('/', async(req,res) => {
    res.send("API attached")
})

  module.exports = routes