
[![Build Status](https://travis-ci.org/LandOfKroilon/KroilonApiV2.svg?branch=dev)](https://travis-ci.org/LandOfKroilon/KroilonApiV2)

An hypermedia API that supports [Collection+JSON](https://github.com/collection-json/spec) and [Siren](https://github.com/kevinswiber/siren) as media types.


## Main Libraries

- [Express](http://expressjs.com/) - web framework
- [InversifyJS](https://github.com/inversify/InversifyJS) - TypeScript DI/IoC framework
- [Iridium](https://github.com/SierraSoftworks/Iridium) - TypeScript Mongo ODM
- [winston](https://github.com/winstonjs/winston) - logging framework

## Architecture

* controller -> service -> repository

The repository layer produces and accepts DTOs, the service and controller layers produce and accept models.




## Install dependencies

`npm install`

## Start your mongoDB local server

`mongod`

## Build and run the project

`npm run build && npm start`

Navigate to `_http://localhost:3000_`

## Run tests

`npm run build && npm run test`

