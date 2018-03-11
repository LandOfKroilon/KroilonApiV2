"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
// TODO add routes
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error("Not Found");
    res.status(404);
    next(err);
});
const errorhandler_1 = __importDefault(require("errorhandler"));
/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorhandler_1.default());
}
exports.default = app;
//# sourceMappingURL=app.js.map