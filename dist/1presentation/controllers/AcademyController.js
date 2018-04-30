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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
let AcademyController = class AcademyController {
    constructor(academyService) {
        this.academyService = academyService;
    }
    register(app) {
        app.route("/academy")
            .get((_, res) => __awaiter(this, void 0, void 0, function* () {
            this.academyService.getAcademy()
                .then((academy) => res.status(200).send(academy))
                .catch((err) => res.status(500).send(err));
        }))
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            this.academyService.createAcademy(req.body)
                .then((academy) => res.status(201).send(academy))
                .catch((err) => res.status(500).send(err));
        }));
    }
};
__decorate([
    inversify_1.inject(types_1.default.AcademyService),
    __metadata("design:type", Object)
], AcademyController.prototype, "academyService", void 0);
AcademyController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.AcademyService)),
    __metadata("design:paramtypes", [Object])
], AcademyController);
exports.AcademyController = AcademyController;
//# sourceMappingURL=AcademyController.js.map