const debug = require('debug-levels')('messenger:router')
const router = require('express').Router()
const engine = require('./engine')
const config = require('../config')

router.get('/receive', (req, res) => {
  debug.debug('query: ', req.query)
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge'])
    return
  }
  res.end()
})

router.post('/receive', (req, res) => {
  res.end()

  const {entry} = req.body
  const message = entry[0].messaging[0]

  if (message.message) {
    const generalMessage = {
      ...message,
      text: message.message.text,
      quick_reply: message.message.quick_reply
    }
    engine.processMessage(generalMessage).catch(e => {
      debug.error('error: ', e)
    })
    return
  }

  if (message.postback) {
    const postbackMessage = {
      ...message,
      payload: message.postback.payload,
      text: message.postback.title
    }
    engine.processMessage(postbackMessage).catch(e => {
      debug.error('error: ', e)
    })
  }
})

module.exports = router
