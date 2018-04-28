import * as express from "express";


export namespace Utils {

    export function buildSelfURI(req: express.Request): string {
        return `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
    }

}