import * as express from "express";
import { Request, Response } from "express";
import { RegistrableController } from "./RegistrableController";
import { injectable } from "inversify";

@injectable()
export class HomeController implements RegistrableController {

    register(app: express.Application): void {
        app.route("/")
            .get(async(_: Request, res: Response) => {
                res.send("root");
            });
    }

}



