import * as express from "express";
import { Problem } from "../1presentation/responses/Problem";
import { logger } from "./Logger";


export namespace Utils {

    export function buildSelfURI(req: express.Request): string {
        return `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`;
    }

    /**
     * Utility method to handle request where body cannot be empty.
     */
    export function handleEmptyRequest(): Problem {
        const code = 400;
        const response = new Problem(code,
            "/probs/properties-not-found",
            "Request body cannot be empty",
            "Request body cannot be empty");
        logger.info(JSON.stringify(response));
        return response;
    }

    /**
     * Utility method to handle request where resource could not be found.
     * @param param Resource identifier
     * @param res Response instance
     */
    export function handleNotFoundRequest(param: string): Problem {
        const code = 404;
        const response = new Problem(code,
            "/probs/resource-not-found",
            "Resource not found",
            `Resource with id ${param} could not be found`);
        logger.info(JSON.stringify(response));
        return response;
    }

}