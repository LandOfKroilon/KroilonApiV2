import * as express from "express";
import { inject, injectable } from "inversify";
import { AcademyDTO } from "../../2application/dto/AcademyDTO";
import { IAcademyService } from "../../2application/interfaces/IAcademyService";
import { logger } from "../../config/Logger";
import { Utils } from "../../config/Utils";
import TYPES from "../../config/types";
import { Problem, ProblemJsonMediaType } from "../responses/Problem";
import Entity, { SirenMediaType } from "../responses/siren/Entity";
import Link from "../responses/siren/Link";
import { RegistrableController } from "./RegistrableController";

@injectable()
export class AcademyController implements RegistrableController {

    @inject(TYPES.AcademyService)
    private academyService: IAcademyService;

    constructor(@inject(TYPES.AcademyService) academyService: IAcademyService) {
        this.academyService = academyService;
    }

    register(app: express.Application): void {
        app.route("/academy")
            .get(this.handleGetAcademy())
            .patch(this.handleUpdateAcademy())
            .post(this.handleCreateAcademy());

        app.route("/academy/:name")
            .get(this.handleGetAcademyByName());

    }


private handleUpdateAcademy(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {

        if (Object.keys(req.body).length === 0) {
            const response = Utils.handleEmptyRequest();
            res.status(response.status)
               .type(ProblemJsonMediaType)
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
                    const response = new Problem(
                        400,
                        "/probs/defined-non-value",
                        "Some property is null or contains some unexpected value",
                        err.messages[0]);
                    res.status(400).type(ProblemJsonMediaType).send(response);
                    return;
                }

                res.status(500).send(err);
            });
    };
}

    private handleGetAcademy(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            this.academyService.getAcademy()
                .then((academy) => {
                    if (academy == undefined) {
                        const response = Utils.handleNotFoundRequest(req.params.name);
                        return res.status(response.status)
                           .type(ProblemJsonMediaType)
                           .send(response);
                    }
                    const entity = this.buildEntity(academy);
                    const selfHref = Utils.buildSelfURI(req);
                    entity.links.push(new Link("self", selfHref));
                    return res.status(200).type(SirenMediaType).send(entity);
                })
                .catch((err) => {
                    const code = 500;
                    const response = new Problem(code,
                        "/probs/object-error",
                        "object-error",
                        "object-error");
                    logger.info(JSON.stringify(err));
                    res.status(code).type(ProblemJsonMediaType).send(response);
                });
        };
    }

    private handleGetAcademyByName(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            this.academyService.getAcademyByName(req.params.name)
                .then((academy) => {
                    if (academy == undefined) {
                        const response = Utils.handleNotFoundRequest(req.params.name);
                        return res.status(response.status)
                           .type(ProblemJsonMediaType)
                           .send(response);
                    }
                    const entity = this.buildEntity(academy);
                    const selfHref = Utils.buildSelfURI(req);
                    entity.links.push(new Link("self", selfHref));
                    return res.status(200).type(SirenMediaType).send(entity);
                })
                .catch((err) => {
                    const code = 500;
                    const response = new Problem(code,
                        "/probs/object-error",
                        "object-error",
                        "object-error");
                    logger.info(JSON.stringify(err));
                    res.status(code).type(ProblemJsonMediaType).send(response);
                });
        };
    }

    private handleCreateAcademy(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (Object.keys(req.body).length === 0) {
                const response = Utils.handleEmptyRequest();
                res.status(response.status)
                   .type(ProblemJsonMediaType)
                   .send(response);
                return;
            }

            this.academyService.createAcademy(req.body)
                .then((academy) => {

                    const entity = this.buildEntity(academy);
                    const selfHref = Utils.buildSelfURI(req);
                    entity.links.push(new Link("self", selfHref));
                    return res.status(201).type(SirenMediaType).send(entity);
                })
                .catch((err) => {

                    if (err.isIvalidationError) {
                        const response = new Problem(
                            400,
                            "/probs/defined-non-value",
                            "Some property is null or contains some unexpected value",
                            err.messages[0]);
                        res.status(400).type(ProblemJsonMediaType).send(response);
                        return;
                    }

                    res.status(500).send(err);
                });
        };
    }

    private buildEntity(doc: AcademyDTO): Entity < AcademyDTO > {
        logger.info(JSON.stringify(doc));
        const entity = new Entity < AcademyDTO > ();
        entity.class = ["Academy"];
        entity.properties = doc;
        return entity;
    }

}