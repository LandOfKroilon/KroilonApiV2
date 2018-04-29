import { RegistrableController } from "./RegistrableController";
import * as express from "express";
import { injectable, inject } from "inversify";
import { IAcademyService } from "../../2application/interfaces/IAcademyService";
import TYPES from "../../config/types";

@injectable()
export class AcademyController implements RegistrableController {

    @inject(TYPES.AcademyService)
    private academyService: IAcademyService;

    constructor(@inject(TYPES.AcademyService) academyService: IAcademyService) {
        this.academyService = academyService;
    }

    register(app: express.Application): void {
        app.route("/academy")
            .get(async(_: express.Request, res: express.Response) => {
                this.academyService.getAcademy()
                    .then((academy) => res.status(200).send(academy))
                    .catch((err) => res.status(500).send(err));
            })
            .post(async(req: express.Request, res: express.Response) => {
                this.academyService.createAcademy(req.body)
                    .then((academy) => res.status(201).send(academy))
                    .catch((err) => res.status(500).send(err));
            });
    }

}