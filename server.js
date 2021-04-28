/* eslint-disable no-debugger */
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = require('express')()
const cookieParser = require('cookie-parser')
const nuxtConfig = require('./nuxt.config.js')
const serverConfig = require('./config.js')
const routes = require('./backend/routes')
const cors = require('cors')

console.log('/***SERVER STARTING***/\n')
console.log(`DATABASE: ${serverConfig.db.dbName}`)
console.log(`NODE API BASE: ${nuxtConfig.env.nodeApiBase}`)
console.log(`REPORT API BASE: ${nuxtConfig.env.reportApiBase}`)
console.log(`FILE UPLOAD URL: ${nuxtConfig.env.uploadUrl}`)
if(process.env.SECRET_KEY){
  console.log("-->Updating nuxtConfig.env.secretKey by given command line arg.")
  nuxtConfig.env.secretKey = process.env.SECRET_KEY
}
if(process.env.USE_MOCK){
  console.log("-->Updating USE_MOCK with ",process.env.USE_MOCK);
  nuxtConfig.env.useMockData = process.env.USE_MOCK
}
console.log(`SECRET KEY: ${nuxtConfig.env.secretKey}`)
console.log(`MAIN LOGO URL: ${nuxtConfig.env.mainLogoUrl}`)
console.log(`STATIC BASE: ${nuxtConfig.env.staticBase}`)
console.log(`ISDEV: ${nuxtConfig.dev}`)

app.use(cors({ exposedHeaders: ['Content-Disposition'] }))
app.options('*',cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

app.set('serverKey', nuxtConfig.env.secretKey)
app.use('/', routes)

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) { 
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(serverConfig.port)
console.log('\n*********************')
console.log(`Server is listening on http://localhost:${serverConfig.port}`)
