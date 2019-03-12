# gforms-browserstack
Quick remote testing in different browsers of Gforms components

    $ npm install
    
You must create a .env file in the root of the project folder to contain the browserstack user and key and the service base url an example below:

    BROWSERSTACK_USER=<your-browserstack-user-name>
    BROWSERSTACK_KEY=<your-browserstack-key>
    SERVICE_BASE_URL=http://localhost/submissions/new-form/

To enable local testing Browserstack make a binary available for [Windows, Mac OS and Linux](https://www.browserstack.com/local-testing#command-line) - this needs to be downloaded separately and run using you browserstack automate key:

    $ ./BrowserstackLocal --key <your-browserstack-key>
    
Once the local testing binary is running ok then the script can be launched with a browser key (see browsers.js) and form id

    $ node browserstack IE11 sandbox
    
 Browser key and form id are optional - the config.js file contains defaults that will be used
