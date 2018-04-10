import { Request, Response, NextFunction } from "express";
import express from "express";
const router = express.Router();

/**
 * Get /
 * Home Page
 *
 * @param req The request received
 * @param res The response sent
 * @param next Callback to move in the pipeline
 */
const index = (req: Request, res: Response, next: NextFunction) => {
    res.send("root");
};

router.get("/", index);


module.exports = router;