"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CJMediaType = "application/vnd.collection+json";
class Collection {
    constructor(href) {
        this.items = [];
        this.links = [];
        // this.queries = [];
        this.version = "1.0";
        this.href = href;
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map