import express from "express";
require("dotenv").config();
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));


// TODO add routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

import errorHandler from "errorhandler";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler());
  }


export default app;