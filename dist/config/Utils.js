"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils;
(function (Utils) {
    function buildSelfURI(req) {
        return `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
    }
    Utils.buildSelfURI = buildSelfURI;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=Utils.js.map