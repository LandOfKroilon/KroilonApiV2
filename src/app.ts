import * as express from "express";
import "reflect-metadata";
require("dotenv").config();
import * as path from "path";
import * as bodyParser from "body-parser";
import container from "./config/inversify.config";
const errorHandler = require("errorhandler");
import TYPES from "./config/types";
import { RegistrableController } from "./1presentation/controllers/RegistrableController";

const app: express.Application = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
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
    app.use(function (err: Error, _: express.Request, __: express.Response, next: express.NextFunction) {
        // Replace with Winston _logger.error(err.stack);~
        console.log(err.stack);
        next(err);
    });
}

app.get("/favicon.ico", function(_, res) {
    res.status(204);
});

// catch 404 and forward to error handler
app.use(function(_, res, next) {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});



export default app;