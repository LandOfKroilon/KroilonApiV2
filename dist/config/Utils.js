"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Problem_1 = require("../1presentation/responses/Problem");
const Logger_1 = require("./Logger");
var Utils;
(function (Utils) {
    function buildSelfURI(req) {
        return `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
    }
    Utils.buildSelfURI = buildSelfURI;
    /**
     * Utility method to handle request where body cannot be empty.
     */
    function handleEmptyRequest() {
        const code = 400;
        const response = new Problem_1.Problem(code, "/probs/properties-not-found", "Request body cannot be empty", "Request body cannot be empty");
        Logger_1.logger.info(JSON.stringify(response));
        return response;
    }
    Utils.handleEmptyRequest = handleEmptyRequest;
    /**
     * Utility method to handle request where resource could not be found.
     * @param param Resource identifier
     * @param res Response instance
     */
    function handleNotFoundRequest(param) {
        const code = 404;
        const response = new Problem_1.Problem(code, "/probs/resource-not-found", "Resource not found", `Resource with id ${param} could not be found`);
        Logger_1.logger.info(JSON.stringify(response));
        return response;
    }
    Utils.handleNotFoundRequest = handleNotFoundRequest;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=Utils.js.map