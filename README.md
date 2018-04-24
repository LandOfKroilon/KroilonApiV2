
[![Build Status](https://travis-ci.org/LandOfKroilon/KroilonApiV2.svg?branch=dev)](https://travis-ci.org/LandOfKroilon/KroilonApiV2)

An hypermedia API that supports [Collection+JSON](https://github.com/collection-json/spec) as media types.

Uses TravisCI as CI build tool. [InversifyJS](https://inversify.io/) is responsible to handle dependency injection. Jest is the testing framework.


## Install dependencies

`cd <project_name>`

`npm install`

## Start your mongoDB local server

`mongod`

## Build and run the project

`npm run build`

`npm start`

Navigate to `_http://localhost:3000_`

## Run tests

`npm install -g node-mongo-seeds`

`seed`

`npm run build`

`npm run test`


## Packages

* TravisCI as CI tool

* [InversifyJS](https://inversify.io/) to handle Dependency Injection.

* Jest as the testing framework.