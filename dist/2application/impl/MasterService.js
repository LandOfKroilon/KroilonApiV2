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
const types_1 = require("../../config/types");
const MasterDTO_1 = require("../dto/MasterDTO");
let MasterService = class MasterService {
    getMasters() {
        return this.masterRepository.findAll()
            .then((masters) => masters.map((dto) => { return this.toDTO(dto); }))
            .catch((err) => {
            console.log(err);
            return [];
        });
    }
    findMaster(conditions = {}) {
        return this.masterRepository.findOne(conditions)
            .then((doc) => {
            return doc != undefined ? this.toDTO(doc) : undefined;
        })
            .catch((err) => { throw err; });
    }
    createMaster(content) {
        return this.masterRepository.findOne({ id: content.id })
            .then((doc) => {
            if (doc != undefined) {
                throw new Error("Document already present");
            }
        })
            .then(() => this.academyRepository.getCurrentAcademyId())
            .then((acadId) => this.masterRepository.create({
            id: content.id,
            name: content.name,
            email: content.email,
            avatar: content.avatar,
            academyId: `${acadId}`
        }))
            .then((m) => __awaiter(this, void 0, void 0, function* () {
            yield this.academySvc.updateAcademy({
                name: "",
                trainees: [],
                masters: [m]
            });
            return m;
        }))
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; });
    }
    toDTO(masterDTO) {
        return new MasterDTO_1.MasterDTO(masterDTO.id, masterDTO.name, masterDTO.email, masterDTO.avatar, masterDTO.academyId, masterDTO.createdOn);
    }
};
__decorate([
    inversify_1.inject(types_1.default.MasterRepository),
    __metadata("design:type", Object)
], MasterService.prototype, "masterRepository", void 0);
__decorate([
    inversify_1.inject(types_1.default.AcademyRepository),
    __metadata("design:type", Object)
], MasterService.prototype, "academyRepository", void 0);
__decorate([
    inversify_1.inject(types_1.default.AcademyService),
    __metadata("design:type", Object)
], MasterService.prototype, "academySvc", void 0);
MasterService = __decorate([
    inversify_1.injectable()
], MasterService);
exports.MasterService = MasterService;
//# sourceMappingURL=MasterService.js.map