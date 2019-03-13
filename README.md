# gforms-browserstack

Quick remote testing in different browsers of Gforms components, these scripts are tightly coupled with Gform schematics.

The initial purpose of this tool is to test layout and rendering of components in different browsers. It is *not* to test the functionality of the Gforms engine.
To this end custom, anonymous, form templates should be used to render Gforms components and, initially, the webdriver operations depend on a custom naming convention for form controls that require input. For example, in order to expand `optionHelpText` content from a radio input it is necessary to click on the radio input, also things like Gform addresses cannot be optional and require first line and postcode to be entered to enable the driver to proceed. The naming convention for custom ids is

    uniqueFormId_<contentType>_required

The contentTypes currently supported are number, bigNumber, shortText, longText, choice, email and address - the script will find content from `config.js` to use in the form.

## Usage

Firstly, after cloning the repository, install the required dependencies:

    $ cd gforms-browserstack && npm install
    
You can either run with environmental variables set as below or, to avoid having to do this each time, create a .env file in the root of the project folder to contain the browserstack user and key and the service base url an example below:

    BROWSERSTACK_USER=<your-browserstack-user-name>
    BROWSERSTACK_KEY=<your-browserstack-key>
    SERVICE_BASE_URL=http://localhost/submissions/new-form/

To enable local testing Browserstack make a binary available for [Windows, Mac OS and Linux](https://www.browserstack.com/local-testing#command-line) - this needs to be downloaded separately and run using your Browserstack automate key:

    $ ./BrowserstackLocal --key <your-browserstack-key>
    
Once the local testing binary is running ok then the script can be launched with a browser key (see browsers.js) and form id

    $ node browserstack IE11 sandbox
    
 Browser key and form id are optional - the `config.js` file contains defaults that will be used.

 Whilst running the console will output progress and screenshots will be captured into a new folder. For each form id a folder will be created at `/screenshots/<formId>/<browserKey>/<timestamp>`

 ### Future enhancements

 - Support of custom input tables for specific form ids, this will negate the need for custom ids and allow original form ids to be used
 - Auth wizard support for non-anonymous forms
 - Full screenshots of browsers that currently only support viewport screenshots
