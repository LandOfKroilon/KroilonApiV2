"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const iridium_1 = require("iridium");
let MasterMongoSchema = class MasterMongoSchema extends iridium_1.Instance {
    static onCreating(doc) {
        // auto assign when a document is created
        doc.createdOn = new Date();
    }
};
__decorate([
    iridium_1.ObjectID,
    __metadata("design:type", String)
], MasterMongoSchema.prototype, "_id", void 0);
__decorate([
    iridium_1.Property(Number, true),
    __metadata("design:type", Number)
], MasterMongoSchema.prototype, "id", void 0);
__decorate([
    iridium_1.Property(String, true),
    __metadata("design:type", String)
], MasterMongoSchema.prototype, "name", void 0);
__decorate([
    iridium_1.Property(String, true),
    __metadata("design:type", String)
], MasterMongoSchema.prototype, "email", void 0);
__decorate([
    iridium_1.Property(String, true),
    __metadata("design:type", String)
], MasterMongoSchema.prototype, "avatar", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], MasterMongoSchema.prototype, "academyId", void 0);
__decorate([
    iridium_1.Property(Date, false),
    __metadata("design:type", Date)
], MasterMongoSchema.prototype, "createdOn", void 0);
MasterMongoSchema = __decorate([
    iridium_1.Collection("masters"),
    iridium_1.Index({ id: 1 }, { unique: true }),
    iridium_1.Index({ email: 1 }, { unique: true })
], MasterMongoSchema);
exports.MasterMongoSchema = MasterMongoSchema;
//# sourceMappingURL=MasterSchema.js.map