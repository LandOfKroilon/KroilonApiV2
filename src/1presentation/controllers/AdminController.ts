// type imports
import express from "express";
import { BaseController } from "./BaseController";


export class AdminController extends BaseController {

    get() {

    }

    post() {

    }

    getRouter(): express.Router {
        this.router.get("/", this.get);
        this.router.post("/", this.post);
        return this.router;
    }
}