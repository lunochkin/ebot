const debug = require('debug-levels')('messenger:MessengerApi')
const rp = require('request-promise-native')
const config = require('../config')

const messengerApi = {
  async sendResponse (message) {
    const result = await rp({
      method: 'POST',
      json: true,
      uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${config.PAGE_TOKEN}`,
      body: {
        messaging_type: 'RESPONSE',
        recipient: {
          id: message.sender.id
        },
        message
      }
    })
    debug.debug('reply result: ', result)
  },
  async setGetStartedPayload (payload) {
    const result = await rp({
      method: 'POST',
      json: true,
      uri: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${config.PAGE_TOKEN}`,
      body: {
        get_started: {payload}
      }
    })
    debug.debug('setGetStartedPayload result: ', result)
  }
}

module.exports = messengerApi
