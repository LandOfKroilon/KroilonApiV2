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
const inversify_1 = require("inversify");
const types_1 = require("../../config/types");
const AcademyDTO_1 = require("../dto/AcademyDTO");
let AcademyService = class AcademyService {
    getAcademy() {
        return this.academyRepository.getCurrentAcademy()
            .then((doc) => {
            return doc != undefined ? this.toDTO(doc) : undefined;
        })
            .catch((err) => { throw err; });
    }
    updateAcademy(dto) {
        console.log(dto);
        return this.getAcademy().then((academy) => {
            if (!academy)
                throw new Error("Current academy not found.");
            const masters = [];
            dto.masters.forEach(doc => {
                masters.push({
                    id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    avatar: doc.avatar,
                    academyId: doc.academyId || "",
                    createdOn: doc.createdOn || new Date().getTime()
                });
            });
            const trainees = [];
            dto.trainees.forEach(doc => {
                trainees.push({
                    id: doc.id,
                    name: doc.name,
                    avatar: doc.avatar,
                    email: doc.email,
                    hash: doc.hash,
                    profile: doc.profile,
                    businessUnit: doc.businessUnit,
                    skill: {},
                    createdOn: doc.createdOn || new Date().getTime()
                });
            });
            academy.trainees.forEach(doc => {
                trainees.push({
                    id: doc.id,
                    name: doc.name,
                    avatar: doc.avatar,
                    email: doc.email,
                    hash: doc.hash,
                    profile: doc.profile,
                    businessUnit: doc.businessUnit,
                    skill: {},
                    createdOn: doc.createdOn || new Date().getTime()
                });
            });
            return this.academyRepository.update({
                name: academy.name,
                trainees: trainees,
                masters: masters,
                createdOn: academy.createdOn
            });
        })
            .then((updatedDocs) => updatedDocs)
            .catch((err) => { throw err; });
    }
    getAcademyByName(name) {
        return this.academyRepository.findOne({ name })
            .then((doc) => {
            return doc != undefined ? this.toDTO(doc) : undefined;
        })
            .catch((err) => { throw err; });
    }
    createAcademy(dto) {
        return this.academyRepository.findOne({ name: dto.name })
            .then((doc) => {
            if (doc != undefined) {
                throw new Error("Document already present");
            }
        })
            .then(() => {
            return this.academyRepository.create({
                name: dto.name,
                trainees: this.translateTrainees(dto.trainees),
                masters: this.translateMasters(dto.masters),
                createdOn: new Date().getTime()
            });
        })
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; });
    }
    toDTO(doc) {
        return new AcademyDTO_1.AcademyDTO(doc.name, doc.trainees, doc.masters, doc.createdOn);
    }
    translateTrainees(trainees) {
        const docs = [];
        trainees.forEach(doc => {
            docs.push({
                id: doc.id,
                name: doc.name,
                avatar: doc.avatar,
                email: doc.email,
                hash: doc.hash,
                profile: doc.profile,
                businessUnit: doc.businessUnit,
                skill: {},
                createdOn: doc.createdOn || new Date().getTime()
            });
        });
        return docs;
    }
    translateMasters(masters) {
        const docs = [];
        if (!masters)
            return docs;
        masters.forEach(doc => {
            docs.push({
                id: doc.id,
                name: doc.name,
                email: doc.email,
                avatar: doc.avatar,
                academyId: doc.academyId || "",
                createdOn: doc.createdOn || new Date().getTime()
            });
        });
        return docs;
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