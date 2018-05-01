const messengerApi = require('./messengerApi')

const engine = {
  async processMessage (message) {
    const response = {
      text: 'reply',
      sender: message.sender
    }

    await messengerApi.sendResponse(response)
  }
}

module.exports = engine
