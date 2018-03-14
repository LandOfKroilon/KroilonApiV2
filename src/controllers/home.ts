import { Request, Response, NextFunction } from "express";

/**
 * Get /
 * Home Page
 *
 * @param req The request received
 * @param res The response sent
 * @param next Callback to move in the pipeline
 */
export let index = (req: Request, res: Response, next: NextFunction) => {
    res.send("root");
};