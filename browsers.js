const browsers = {
  IE11: {
    'browserName' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1280x1024'
  },
  MSEDGE: {
    'browserName' : 'Edge',
    'browser_version' : '18.0',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1280x1024'
  },
  WINCHROME: {
    'browserName' : 'Chrome',
    'browser_version' : '62.0',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1600x1200'
  },
  WINFF: {
  'os' : 'Windows',
  'os_version' : '10',
  'browserName' : 'Firefox',
  'browser_version' : '65.0',
  'resolution' : '1600x1200',
  },
  MACFF: {
    'browserName': 'Firefox',
    'browser_version': '65.0',
    'os': 'OS X',
    'os_version': 'Mojave',
    'resolution': '1600x1200'
  },
  SAFARI: {
    'browserName' : 'Safari',
    'browser_version' : '12.0',
    'os' : 'OS X',
    'os_version' : 'Mojave',
    'browserstack.safari.allowAllCookies': true,
    'resolution' : '1280x1024'
  },
  IPADPRO: {
    'os_version' : '11',
    'device' : 'iPad Pro 9.7 2016',
    'real_mobile' : 'true',
    'browserName': 'Safari'
  },
  IPADMINI: {
    'os_version' : '11',
    'device' : 'iPad Mini 4',
    'real_mobile' : 'true',
    'browserName': 'Safari'
  }
}

module.exports = browsers