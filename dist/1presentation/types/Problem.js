"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemJsonMediaType = "application/problem+json";
class Problem {
    constructor(status, title, detail, instance, type = "about:blank") {
        this.status = status;
        this.type = type;
        this.title = title;
        this.detail = detail;
        this.instance = instance;
    }
}
exports.Problem = Problem;
//# sourceMappingURL=Problem.js.map