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

app.use(logger(process.env.NODE_ENV));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// import controllers
import * as homeController from "./controllers/home";
import * as academyController from "./controllers/academy";
import * as adminController from "./controllers/admin";

// assign routes to actions
app.get("/", homeController.index);
// academy ctrl
app.get("/academy", academyController.index);
app.get("/academy/trainees", academyController.getAcademyTrainees);
app.get("/academy/config/story", academyController.getAcademyStories);
app.post("/academy/config/story", academyController.insertAcademyStories);
app.get("/academy/sessionpoints", academyController.getAcademyPoints);

// admin controller

app.get("/academy/admin", adminController.get);
app.post("/academy/admin", adminController.create);

import errorHandler from "errorhandler";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "dev") {
    // only use in development
    app.use(errorHandler());
}

app.get("/favicon.ico", function(req, res) {
    res.status(204);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});


export default app;