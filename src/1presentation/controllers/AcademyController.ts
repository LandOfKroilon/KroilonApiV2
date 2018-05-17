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
            .post(this.handleCreateAcademy());

        app.route("/academy/:name")
            .get(this.handleGetAcademyByName());

        app.route("/academy/sessionpoints")
            .get(async (_: express.Request, __: express.Response) => {});

        app.route("/academy/trainees")
            .get(async (_: express.Request, __: express.Response) => {});

        app.route("/academy/config/story")
            .get(async (_: express.Request, __: express.Response) => {})

            .post(async (_: express.Request, __: express.Response) => {});
    }

    /**
     * Method to handle the GET request to the uri "/academy".
     * It returns the most.
     */
    private handleGetAcademy(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            this.academyService.getAcademy()
                .then((academy) => {
                    if (academy == undefined) {
                        return this.handleNotFoundRequest(req.params.name, res);
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
                        return this.handleNotFoundRequest(req.params.name, res);
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
                this.handleEmptyRequest(res);
                return;
            }

            this.academyService.createAcademy(req.body)
                .then((academy) => res.status(201).send(academy))
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

    private handleEmptyRequest(res: express.Response) {
        const code = 400;
        const response = new Problem(code,
            "/probs/properties-not-found",
            "Request body cannot be empty",
            "Request body cannot be empty");
        logger.info(JSON.stringify(response));
        res.status(code).type(ProblemJsonMediaType).send(response);
    }

    private handleNotFoundRequest(param: string, res: express.Response) {
        const code = 404;
        const response = new Problem(code,
            "/probs/resource-not-found",
            "Resource not found",
            `Resource with id ${param} could not be found`);
        logger.info(JSON.stringify(response));
        res.status(code).type(ProblemJsonMediaType).send(response);
    }

}