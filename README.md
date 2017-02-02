# GoMobileCT
Simple Web App that shows the dates and locations of the mobile unit for Caring Families.

## Installing

* clone repo
* `npm install`

## Structure

- public (files to deploy site)
- server
  - app.js (express entry point)
- react (all source javascript files, pretranspiled)

## Starting the webpack dev server

`npm run dev`

(runs at http://localhost:8080)

## Spinning up Express, Webpack watch and Mongo

- Open a terminal tab for Mongo: `mongod`
- Open another terminal tab for webpack: `gulp webpack`
- Open a third for the express server: `gulp`

(runs at http://localhost:3000)

## Running Tests

GoMobileCT uses Protractor for all the tests. Make sure it's installed, webdriver is updated and running before running tests:

`npm install -g protractor`
`webdriver-manager update`
`webdriver-manager start`

Then run tests with: `protractor tests/config.js`
