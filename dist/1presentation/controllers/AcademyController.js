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
const Logger_1 = require("../../config/Logger");
const Utils_1 = require("../../config/Utils");
const types_1 = require("../../config/types");
const Problem_1 = require("../responses/Problem");
const Entity_1 = require("../responses/siren/Entity");
const Link_1 = require("../responses/siren/Link");
let AcademyController = class AcademyController {
    constructor(academyService) {
        this.academyService = academyService;
    }
    register(app) {
        app.route("/academy")
            .get(this.handleGetAcademy())
            .patch(this.handleUpdateAcademy())
            .post(this.handleCreateAcademy());
        app.route("/academy/:name")
            .get(this.handleGetAcademyByName());
    }
    handleUpdateAcademy() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                const response = Utils_1.Utils.handleEmptyRequest();
                res.status(response.status)
                    .type(Problem_1.ProblemJsonMediaType)
                    .send(response);
                return;
            }
            this.academyService.updateAcademy(req.body)
                .then((updatedRows) => {
                console.log(updatedRows);
                return res.status(200).send();
            })
                .catch((err) => {
                if (err.isIvalidationError) {
                    const response = new Problem_1.Problem(400, "/probs/defined-non-value", "Some property is null or contains some unexpected value", err.messages[0]);
                    res.status(400).type(Problem_1.ProblemJsonMediaType).send(response);
                    return;
                }
                res.status(500).send(err);
            });
        });
    }
    handleGetAcademy() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.academyService.getAcademy()
                .then((academy) => {
                if (academy == undefined) {
                    const response = Utils_1.Utils.handleNotFoundRequest(req.params.name);
                    return res.status(response.status)
                        .type(Problem_1.ProblemJsonMediaType)
                        .send(response);
                }
                const entity = this.buildEntity(academy);
                const selfHref = Utils_1.Utils.buildSelfURI(req);
                entity.links.push(new Link_1.default("self", selfHref));
                return res.status(200).type(Entity_1.SirenMediaType).send(entity);
            })
                .catch((err) => {
                const code = 500;
                const response = new Problem_1.Problem(code, "/probs/object-error", "object-error", "object-error");
                Logger_1.logger.info(JSON.stringify(err));
                res.status(code).type(Problem_1.ProblemJsonMediaType).send(response);
            });
        });
    }
    handleGetAcademyByName() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.academyService.getAcademyByName(req.params.name)
                .then((academy) => {
                if (academy == undefined) {
                    const response = Utils_1.Utils.handleNotFoundRequest(req.params.name);
                    return res.status(response.status)
                        .type(Problem_1.ProblemJsonMediaType)
                        .send(response);
                }
                const entity = this.buildEntity(academy);
                const selfHref = Utils_1.Utils.buildSelfURI(req);
                entity.links.push(new Link_1.default("self", selfHref));
                return res.status(200).type(Entity_1.SirenMediaType).send(entity);
            })
                .catch((err) => {
                const code = 500;
                const response = new Problem_1.Problem(code, "/probs/object-error", "object-error", "object-error");
                Logger_1.logger.info(JSON.stringify(err));
                res.status(code).type(Problem_1.ProblemJsonMediaType).send(response);
            });
        });
    }
    handleCreateAcademy() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                const response = Utils_1.Utils.handleEmptyRequest();
                res.status(response.status)
                    .type(Problem_1.ProblemJsonMediaType)
                    .send(response);
                return;
            }
            this.academyService.createAcademy(req.body)
                .then((academy) => {
                const entity = this.buildEntity(academy);
                const selfHref = Utils_1.Utils.buildSelfURI(req);
                entity.links.push(new Link_1.default("self", selfHref));
                return res.status(201).type(Entity_1.SirenMediaType).send(entity);
            })
                .catch((err) => {
                if (err.isIvalidationError) {
                    const response = new Problem_1.Problem(400, "/probs/defined-non-value", "Some property is null or contains some unexpected value", err.messages[0]);
                    res.status(400).type(Problem_1.ProblemJsonMediaType).send(response);
                    return;
                }
                res.status(500).send(err);
            });
        });
    }
    buildEntity(doc) {
        Logger_1.logger.info(JSON.stringify(doc));
        const entity = new Entity_1.default();
        entity.class = ["Academy"];
        entity.properties = doc;
        return entity;
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