// type imports
import AdminModel from "../models/mixin/Admin";
import { Request, Response, NextFunction } from "express";
import * as errors from "../config/MongoErrors";
import * as messages from "../config/ErrorMessages";
const statusCodes = require("http").STATUS_CODES;

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
        res.status(500).send({
            message: messages.KroilonServerError
        });
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
        if (err.name === errors.ValidationError) {
            return res.status(400).send({
                name: err.name,
                message: err.message
            });
        }

        if (err.code === errors.DuplicatedKey) {
            return res.status(400).send({
                message: "Record with the same id already exists."
            });
        }

        res.status(500).send({
            message: messages.KroilonServerError
        });
    });
};