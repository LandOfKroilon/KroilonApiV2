"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const KroilonDatabase_1 = require("../KroilonDatabase");
let MasterRepository = class MasterRepository {
    deleteMany(conditions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KroilonDatabase_1.kroilonDatabase.connect()
                .then(() => KroilonDatabase_1.kroilonDatabase.Masters.remove(conditions))
                .catch((err) => { throw err; });
        });
    }
    findOne(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KroilonDatabase_1.kroilonDatabase.connect()
                .then(() => KroilonDatabase_1.kroilonDatabase.Masters.findOne(conditions))
                .then((theOne) => theOne)
                .catch((err) => { throw err; });
        });
    }
    create(masterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KroilonDatabase_1.kroilonDatabase.connect()
                .then(() => KroilonDatabase_1.kroilonDatabase.Masters.create(masterDto))
                .catch((err) => { throw err; });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KroilonDatabase_1.kroilonDatabase.connect()
                .then(() => KroilonDatabase_1.kroilonDatabase.Masters.find().toArray())
                .then((docs) => docs)
                .catch((_) => {
                // log err
                return [];
            });
        });
    }
};
MasterRepository = __decorate([
    inversify_1.injectable()
], MasterRepository);
exports.MasterRepository = MasterRepository;
//# sourceMappingURL=MasterRepository.js.map