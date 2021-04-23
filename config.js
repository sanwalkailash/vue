const env = process.env.NODE_ENV

console.log(`ENV = ${env}`)

const dev = {
  env: 'dev',
  port: 3000,
  secretKey: 'abcd',
  db: {
    host: '127.0.0.1',
    port: 5432,
    dbName: 'chana',
    username: 'demo',
    password: 'demo',
    encrypt: true,
    requestTimeout: 30000
  }
}


const stage = {
    env: 'stage',
    port: 3000,
    secretKey: 'abcd',
    db: {
      host: '127.0.0.1',
      port: 5432,
      dbName: 'chana',
      username: 'demo',
      password: 'demo',
      encrypt: true,
      requestTimeout: 30000
    }
  }


const config = {
  dev,
  stage,
}

module.exports = config[env]
