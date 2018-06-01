"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const inversify_config_1 = require("./config/inversify.config");
const errorHandler = require("errorhandler");
const types_1 = require("./config/types");
const Logger_1 = require("./config/Logger");
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// grabs the Controller from IoC container and registers all the endpoints
const controllers = inversify_config_1.default.getAll(types_1.default.Controller);
controllers.forEach(controller => controller.register(app));
/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "dev") {
    // only use in development
    app.use(errorHandler());
}
else {
    // setup express middleware logging and error handling
    app.use(function (err, _, __, next) {
        Logger_1.logger.error(err.stack);
        next(err);
    });
}
app.get("/favicon.ico", function (_, res) {
    res.status(204);
});
// catch 404 and forward to error handler
app.use(function (_, res, next) {
    const err = new Error("Not Found");
    res.status(404);
    next(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map