"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iridium_1 = require("iridium");
const AcademySchema_1 = require("../models/AcademySchema");
const MasterSchema_1 = require("../models/MasterSchema");
class KroilonDatabase extends iridium_1.Core {
    constructor() {
        super(...arguments);
        this.Masters = new iridium_1.Model(this, MasterSchema_1.MasterMongoSchema);
        this.Academy = new iridium_1.Model(this, AcademySchema_1.AcademyMongoSchema);
    }
}
exports.kroilonDatabase = new KroilonDatabase(process.env.MONGODB_URI, { database: process.env.DATABASE });
//# sourceMappingURL=KroilonDatabase.js.map