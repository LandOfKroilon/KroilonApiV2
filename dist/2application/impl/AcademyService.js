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
const AcademyDTO_1 = require("../dto/AcademyDTO");
const inversify_1 = require("inversify");
const types_1 = require("../../config/types");
let AcademyService = class AcademyService {
    getAcademy() {
        return this.academyRepository.getCurrentAcademy()
            .then((doc) => this.toDTO(doc))
            .catch((err) => { throw err; });
    }
    createAcademy(dto) {
        return this.academyRepository.findOne({ name: dto.name })
            .then((doc) => {
            if (doc != undefined) {
                throw new Error("Document already present");
            }
        })
            .then(() => this.academyRepository.create({
            name: dto.name,
            trainees: []
        }))
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; });
    }
    toDTO(doc) {
        return new AcademyDTO_1.AcademyDTO(doc.name, doc.trainees, doc.createdOn);
    }
};
__decorate([
    inversify_1.inject(types_1.default.AcademyRepository),
    __metadata("design:type", Object)
], AcademyService.prototype, "academyRepository", void 0);
AcademyService = __decorate([
    inversify_1.injectable()
], AcademyService);
exports.AcademyService = AcademyService;
//# sourceMappingURL=AcademyService.js.map