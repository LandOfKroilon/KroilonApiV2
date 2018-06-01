import * as express from "express";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { RegistrableController } from "./RegistrableController";

@injectable()
export class HomeController implements RegistrableController {

    register(app: express.Application): void {
        app.route("/")
            .get(async(_: Request, res: Response) => {
                const apiDiscoveryRes = {
                    admins_url: `${process.env.BASE_URI}/academy/admin`,
                    admin_url: `${process.env.BASE_URI}/academy/admin/{id}`,
                    academy_url: `${process.env.BASE_URI}/academy`,
                };
                res.send(apiDiscoveryRes);
            });
    }

}



