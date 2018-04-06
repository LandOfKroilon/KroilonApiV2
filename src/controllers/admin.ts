// type imports
import AdminModel from "../models/mixin/Admin";
import { Request, Response, NextFunction } from "express";

/**
 * GET /academy/admin
 *
 * Return the admin users for the current academy.
 *
 * @param req The received request
 * @param res The response sent
 * @param next Callback
 */
export let get = (req: Request, res: Response, next: NextFunction) => {
    AdminModel.find({})
    .limit(10)
    .sort("-_id")
    .then(docs => {
        res.status(200).send(docs);
    })
    .catch(err => {
        res.status(500).send(err);
    });
};

/**
 * POST /academy/admin
 *
 * Create a new admin user for the current academy.
 *
 * @param req The received request
 * @param res The response sent
 * @param next Callback
 */
export let create = (req: Request, res: Response, next: NextFunction) => {
    const admin = new AdminModel(req.body);
    admin.save().then(() => {
        res.status(201).send(admin.toJSON());
    })
    .catch(err => {
        if (err.name === "ValidationError") {
            return res.status(400).send({
                name: err.name,
                message: err.message
            });
        }

        // TODO add if index exists

        res.status(500).send();
    });
};