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
const Collection_1 = require("../responses/collection/Collection");
const Data_1 = require("../responses/collection/Data");
const Item_1 = require("../responses/collection/Item");
const Link_1 = require("../responses/collection/Link");
const Template_1 = require("../responses/collection/Template");
const Entity_1 = require("../responses/siren/Entity");
const Link_2 = require("../responses/siren/Link");
let MasterController = class MasterController {
    constructor(masterService) {
        // routes
        this.adminsResource = Object.freeze("/academy/admin");
        this.masterService = masterService;
    }
    register(app) {
        app.route(this.adminsResource)
            .get(this.handleGetMasters())
            .post(this.handleCreateResource());
        app.route(`${this.adminsResource}/:id`)
            .get(this.handleGetMasterById());
    }
    /**
     * Method to handle the POST request to the uri "/academy/admin".
     * The process of data is expected to create a new Master resource.
     */
    handleCreateResource() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.masterService.createMaster(req.body)
                .then((newMaster) => {
                const entity = this.buildEntity(newMaster);
                const selfHref = Utils_1.Utils.buildSelfURI(req);
                entity.links.push(new Link_2.default("self", selfHref));
                entity.links.push(new Link_2.default("collection", `${req.protocol}://${req.hostname}:${process.env.PORT}${this.adminsResource}`));
                res.status(201).type(Entity_1.SirenMediaType).send(entity);
            })
                .catch((error) => {
                Logger_1.logger.info(error);
                // some property is null or of some unexpected value
                if (error.isIvalidationError) {
                    const response = new Problem_1.Problem(400, "/probs/defined-non-value", "Some property is null or contains some unexpected value", error.messages[0]);
                    return res.status(400).type(Problem_1.ProblemJsonMediaType).send(response);
                }
                // TODO Log message
                // TODO check if error is from request
                const code = 400;
                const response = new Problem_1.Problem(code, "/probs/master-already-exists", "Resource already exists", `Master with id ${req.body.id} already exists.`);
                return res.status(code).type(Problem_1.ProblemJsonMediaType).send(response);
            });
        });
    }
    /**
     * Method to handle the GET request to the uri "/academy/admin".
     * It returns an array with all the masters found in DB.
     */
    handleGetMasters() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.masterService.getMasters()
                .then((masters) => {
                res.type(Collection_1.CJMediaType);
                const collectionHref = Utils_1.Utils.buildSelfURI(req);
                const collection = new Collection_1.Collection(collectionHref);
                masters.forEach(master => {
                    collection.items.push(this.buildNewItem(`${collectionHref}/${master.id}`, master));
                });
                collection.template = this.buildTemplate();
                collection.links.push(new Link_1.default("self", collectionHref));
                return res.status(200).send({ collection });
            })
                // TODO handle better this error
                .catch((error) => {
                Logger_1.logger.error(error);
                res.send(error);
            });
        });
    }
    handleGetMasterById() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            this.masterService.findMaster({ id })
                .then((master) => {
                if (!master) {
                    const response = Utils_1.Utils.handleNotFoundRequest(req.params.id);
                    return res.status(response.status)
                        .type(Problem_1.ProblemJsonMediaType)
                        .send(response);
                }
                const entity = this.buildEntity(master);
                const selfHref = Utils_1.Utils.buildSelfURI(req);
                entity.links.push(new Link_2.default("self", selfHref));
                entity.links.push(new Link_2.default("collection", `${req.protocol}://${req.hostname}:${process.env.PORT}${this.adminsResource}`));
                return res.status(200).type(Entity_1.SirenMediaType).send(entity);
            })
                .catch((error) => {
                Logger_1.logger.error(error);
                res.send(error);
            });
        });
    }
    buildTemplate() {
        const template = new Template_1.default();
        template.data.push(new Data_1.default("id", "", "Id"));
        template.data.push(new Data_1.default("name", "", "Name"));
        template.data.push(new Data_1.default("avatar", "", "Avatar"));
        template.data.push(new Data_1.default("email", "", "Email"));
        template.data.push(new Data_1.default("password", "", "Password"));
        return template;
    }
    buildNewItem(href, master) {
        const item = new Item_1.default();
        item.href = href;
        item.data.push(new Data_1.default("id", master.id.toString(), "Admin's id"));
        item.data.push(new Data_1.default("name", master.name, "Admin's name"));
        item.data.push(new Data_1.default("avatar", master.avatar, "Admin's avatar uri"));
        item.data.push(new Data_1.default("email", master.email, "Admin's email"));
        item.data.push(new Data_1.default("academyId", master.academyId, "Admin's active academy id"));
        item.data.push(new Data_1.default("createdOn", master.createdOn.toLocaleDateString(), "When the admin was created"));
        return item;
    }
    buildEntity(newMaster) {
        const entity = new Entity_1.default();
        entity.class = ["Admin"];
        entity.properties = newMaster;
        return entity;
    }
};
MasterController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.MasterService)),
    __metadata("design:paramtypes", [Object])
], MasterController);
exports.MasterController = MasterController;
//# sourceMappingURL=MasterController.js.map