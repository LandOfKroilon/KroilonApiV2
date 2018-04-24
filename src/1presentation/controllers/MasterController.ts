// type imports
import * as express from "express";
import { RegistrableController } from "./RegistrableController";
import { injectable, inject } from "inversify";
import { IMasterService } from "../../2application/interfaces/IMasterService";
import TYPES from "../../config/types";
import { Problem } from "../types/Problem";
import { MasterDTO } from "../../2application/dto/MasterDTO";
import { Collection, MediaType } from "../collection/Collection";
import Item from "../collection/Item";
import Data from "../collection/Data";

@injectable()
export class MasterController implements RegistrableController {

    private masterService: IMasterService;

    constructor(@inject(TYPES.MasterService) masterService: IMasterService) {
        this.masterService = masterService;
    }

    register(app: express.Application): void {
        app.route("/academy/admin")
            .get(this.handleGetMasterResource())
            .post(this.handleCreateMasterResource());
    }

    /**
     * Method to handle the POST request to the uri "/academy/admin".
     * The process of data is expected to create a new Master resource.
     */
    private handleCreateMasterResource(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            // TODO validate body received
            this.masterService.createMaster(req.body)
                .then((newMaster) => res.status(201).send(newMaster))
                .catch((_) => {
                    // TODO Log message
                    // TODO check if error is from request
                    const code = 400;
                    const response = new Problem(code,
                        "/probs/master-already-exists",
                        "Resource already exists",
                        `Master with id ${req.body.id} already exists.`);

                    res.status(code)
                        .type(response.contentType)
                        .send(response);
                });
        };
    }

    /**
     * Method to handle the GET request to the uri "/academy/admin".
     * It returns an array with all the masters found in DB.
     */
    private handleGetMasterResource(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            this.masterService.getMasters()
                .then((masters: MasterDTO[]) => {

                    res.type(MediaType);
                    const collectionHref = req.originalUrl;
                    const collection: Collection = new Collection(collectionHref);

                    masters.forEach(master => {
                        const item = new Item();
                        item.href = `${collectionHref}/${master.id}`;
                        item.data.push(new Data("id", master.id.toString(), "Admin's id"));
                        item.data.push(new Data("name", master.name, "Admin's name"));
                        item.data.push(new Data("avatar", master.avatar, "Admin's avatar uri"));
                        item.data.push(new Data("email", master.email, "Admin's email"));
                        item.data.push(new Data("createdOn", master.createdOn.toLocaleDateString(), "When the admin was created"));

                        collection.items.push(item);
                    });


                    return res.status(200).send({collection});
                })
                // TODO handle better this error
                .catch((err) => res.send(err));
        };
    }
}


