// type imports
import * as express from "express";
import { inject, injectable } from "inversify";
import { MasterDTO } from "../../2application/dto/MasterDTO";
import { IMasterService } from "../../2application/interfaces/IMasterService";
import { logger } from "../../config/Logger";
import { Utils } from "../../config/Utils";
import TYPES from "../../config/types";
import { Problem, ProblemJsonMediaType } from "../responses/Problem";
import { CJMediaType, Collection } from "../responses/collection/Collection";
import Data from "../responses/collection/Data";
import Item from "../responses/collection/Item";
import CjLink from "../responses/collection/Link";
import Template from "../responses/collection/Template";
import Entity, { SirenMediaType } from "../responses/siren/Entity";
import Link from "../responses/siren/Link";
import { RegistrableController } from "./RegistrableController";

@injectable()
export class MasterController implements RegistrableController {

    private masterService: IMasterService;

    // routes
    private adminsResource: string = Object.freeze("/academy/admin");

    constructor(@inject(TYPES.MasterService) masterService: IMasterService) {
        this.masterService = masterService;
    }

    register(app: express.Application): void {
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
    private handleCreateResource(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            this.masterService.createMaster(req.body)
                .then((newMaster) => {
                    const entity = this.buildEntity(newMaster);
                    const selfHref = Utils.buildSelfURI(req);
                    entity.links.push(new Link("self", selfHref));
                    entity.links.push(new Link("collection",
                        `${req.protocol}://${req.hostname}:${process.env.PORT}${this.adminsResource}`));
                    res.status(201).type(SirenMediaType).send(entity);
                })
                .catch((error) => {
                    logger.info(error);
                    // some property is null or of some unexpected value
                    if (error.isIvalidationError) {
                        const response = new Problem(
                            400,
                            "/probs/defined-non-value",
                            "Some property is null or contains some unexpected value",
                            error.messages[0]);
                        return res.status(400).type(ProblemJsonMediaType).send(response);
                    }

                    // TODO Log message
                    // TODO check if error is from request
                    const code = 400;
                    const response = new Problem(code,
                        "/probs/master-already-exists",
                        "Resource already exists",
                        `Master with id ${req.body.id} already exists.`);

                    return res.status(code).type(ProblemJsonMediaType).send(response);
                });
        };
    }

    /**
     * Method to handle the GET request to the uri "/academy/admin".
     * It returns an array with all the masters found in DB.
     */
    private handleGetMasters(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            this.masterService.getMasters()
                .then((masters: MasterDTO[]) => {

                    res.type(CJMediaType);
                    const collectionHref = Utils.buildSelfURI(req);
                    const collection: Collection = new Collection(collectionHref);

                    masters.forEach(master => {
                        collection.items.push(
                            this.buildNewItem(`${collectionHref}/${master.id}`, master));
                    });

                    collection.template = this.buildTemplate();
                    collection.links.push(new CjLink("self", collectionHref));

                    return res.status(200).send({collection});
                })
                // TODO handle better this error
                .catch((error) => {
                    logger.error(error);
                    res.send(error);
                });
        };
    }

    private handleGetMasterById(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            const id = parseInt(req.params.id);
            this.masterService.findMaster({id})
                .then((master) => {
                    if (!master) {
                        const response = Utils.handleNotFoundRequest(req.params.id);
                        return res.status(response.status)
                           .type(ProblemJsonMediaType)
                           .send(response);
                    }
                    const entity = this.buildEntity(master);
                    const selfHref = Utils.buildSelfURI(req);
                    entity.links.push(new Link("self", selfHref));
                    entity.links.push(new Link("collection",
                        `${req.protocol}://${req.hostname}:${process.env.PORT}${this.adminsResource}`));
                    return res.status(200).type(SirenMediaType).send(entity);
                })
                .catch((error) => {
                    logger.error(error);
                    res.send(error);
                });
        };
    }


    private buildTemplate(): Template {
        const template = new Template();
        template.data.push(new Data("id", "", "Id"));
        template.data.push(new Data("name", "", "Name"));
        template.data.push(new Data("avatar", "", "Avatar"));
        template.data.push(new Data("email", "", "Email"));
        template.data.push(new Data("password", "", "Password"));
        return template;
    }

    private buildNewItem(href: string, master: MasterDTO): Item {
        const item = new Item();
        item.href = href;
        item.data.push(new Data("id", master.id.toString(), "Admin's id"));
        item.data.push(new Data("name", master.name, "Admin's name"));
        item.data.push(new Data("avatar", master.avatar, "Admin's avatar uri"));
        item.data.push(new Data("email", master.email, "Admin's email"));
        item.data.push(new Data("academyId", master.academyId, "Admin's active academy id"));
        item.data.push(new Data("createdOn", master.createdOn.toLocaleDateString(), "When the admin was created"));
        return item;
    }

    private buildEntity(newMaster: MasterDTO): Entity<MasterDTO> {
        const entity = new Entity<MasterDTO>();
        entity.class = ["Admin"];
        entity.properties = newMaster;
        return entity;
    }
}


