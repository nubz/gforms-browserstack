require('dotenv').config()

const config = {
  remoteClientURL: 'http://hub-cloud.browserstack.com/wd/hub',
  serviceBaseURL: process.env.SERVICE_BASE_URL,
  defaultFormId: 'superForm2019',
  defaultBrowser: 'IE11',
  coreCapabilities: {
    'browserstack.user' : process.env.BROWSERSTACK_USER,
    'browserstack.key' : process.env.BROWSERSTACK_KEY,
    'browserstack.debug': true,
    'browserstack.local': true
  },
  inputs: {
    number: '2',
    shortText: 'Bewildered Wonderbeast',
    longText: 'A bewildered herd of wonderbeast.',
    bigNumber: '204000',
    choice: 'checked',
    email: 'test@example.com',
    address: 'address'
  }
}

module.exports = config