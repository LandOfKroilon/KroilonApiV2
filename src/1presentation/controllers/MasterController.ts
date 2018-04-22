// type imports
import * as express from "express";
import { RegistrableController } from "./RegistrableController";
import { injectable, inject } from "inversify";
import { IMasterService } from "../../2application/interfaces/IMAsterService";
import TYPES from "../../types";
import { Problem } from "./types/Problem";

@injectable()
export class MasterController implements RegistrableController {

    private masterService: IMasterService;

    constructor(@inject(TYPES.MasterService) masterService: IMasterService) {
        this.masterService = masterService;
    }

    register(app: express.Application): void {
        app.route("/academy/admin")
            .get(async(_: express.Request, res: express.Response) => {
                this.masterService.getMasters()
                    .then((masters) => res.status(200).send(masters))
                    .catch((err) => res.send(err));
            })
            .post(async(req: express.Request, res: express.Response) => {

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
            });
    }
}