const env = require('node-env-file')

env(__dirname + '/.env.default')
env(__dirname + '/.env')
const config = require('./config')

const debug = require('debug-levels')('server:index')

debug.log('config: ', config)

// const messengerApi = require('./messenger/messengerApi')
const express  = require('express')
const bodyParser = require('body-parser')
const messengerRouter = require('./messenger/router')

const app = express()
app.use(bodyParser.json())


app.use('/messenger', messengerRouter)

app.all((req, res) => {
  debug.debug('req path: ', req.path)
  res.end()
})

// messengerApi.setGetStartedPayload(config.MESSENGER_GET_STARTED_PAYLOAD)

app.listen(config.PORT, () => {
  console.log('started listening on port: ', config.PORT)
})
