// ensure BrowserStackLocal binary is installed and running
// then in a new terminal run with
// $ node browserstack [browserKey] [formId]
// browserKey is optional and must enumerate to a key in browsers.js
// formId is optional and will be the id of a form running in your
// service environment e.g. localhost

const {Builder, By, WebDriver } = require('selenium-webdriver')
const fs = require('fs')
const path = require('path')
const browsers = require('./browsers')
const config = require('./config')
const runTime = (Date.now()/1e3)|0

const args = process.argv.slice(2);
const browser = args[0] || config.defaultBrowser;
const FORM_ID = args[1] || config.defaultFormId;

if (!browsers[browser]) {
  const supportedBrowsers = Object.keys(browsers);
  console.error('\x1b[41m', browser + ' is not a supported browser option, use one of: ' + supportedBrowsers.join(', '))
  process.exitCode = 1;
  process.exit()
}

const capabilities = { ...config.coreCapabilities, ...browsers[browser] };

const makeSlug = title => title
  .split('-')[0]
  .trim()
  .toLowerCase()
  .replace(/\s+/g, '-');

const getTypeValue = name => {
  const parts = name.split('_');
  const type = parts[parts.length - 2]
  console.log('\x1b[35m%s\x1b[0m', 'found required field of type ' + type)
  return config.inputs[type] || config.inputs.number
};

(async function runBrowser() {
  let driver = await new Builder()
    .usingServer(config.remoteClientURL)
    .withCapabilities(capabilities)
    .build();

  /*
  * TODO: the screenshots are only of the viewport in most browsers
  * TODO: we need to get full scroll-height screenshots - not sure how?
   */
  WebDriver.prototype.saveScreenshot = filename => {

    const screenshotPath = path.join(__dirname, 'screenshots', FORM_ID, browser, runTime.toString())

    if (!fs.existsSync(screenshotPath)){
      fs.mkdirSync(screenshotPath, {recursive: true});
    }

    return driver.takeScreenshot().then(data =>  {
      fs.writeFile(`${screenshotPath}/${filename}`, data.replace(/^data:image\/png;base64,/,''), 'base64', err => {
        if(err) throw err
      })
    })
  }

  async function handlePage() {
    const now = (Date.now()/1e3)|0
    const title = await driver.getTitle()
    console.log("\x1b[41m%s\x1b[0m", browser,' < ' + title)
    const slug = makeSlug(title)
    if (slug.substr(0,5) === "error") {
      return false
    }
    const required = await driver.findElements(By.css('[name$="_required"]:not([type~="hidden"]), [id$="_required-fieldset"]'))
    if (required.length > 0) {
      try {
        const names = []
        for (let field of required) {
          let name = await field.getAttribute("name")
          if (!name) {
            // then we have a fieldset
            name = await field.getAttribute("id")
            name = name.split('-')[0]
          }
          if (names.includes(name)) {
            continue
          }
          names.push(name)
          try {
            const typeValue = getTypeValue(name)
            if (typeValue === "checked") {
              await driver.findElement(By.css("label[for^='" + name + "']:first-of-type")).click();
            } else if (typeValue === "address") {
              await driver.findElement(By.css("[name='" + name + "-postcode']")).sendKeys("NNN N12");
              await driver.findElement(By.css("[name='" + name + "-street1']")).sendKeys("Street 1");
            } else {
              await field.sendKeys(typeValue)
            }
          } catch (err) {
            console.error(err);
          }
        }
      }catch (err) {
        console.error(err);
      }
    } else {
      await driver.findElement(By.css('summary')).then(async summary => {
        return summary.click()
      }, () => false)
    }
    await driver.saveScreenshot(`${browser}_${FORM_ID}_${slug}_${now}.png`)
    return await driver.findElement(By.css('[type="submit"]')).catch(() => false)
  }

  try {
    await driver.get(config.serviceBaseURL + FORM_ID);
    let submittable = await handlePage()
    while(submittable) {
      await submittable.click()
      submittable = await handlePage()
    }
  } finally {
    await driver.quit();
  }

})();
