import { Router } from "express";

export abstract class BaseController {

    protected readonly router: Router;

    constructor() {
        this.router = Router();
    }

    /**
     * Get the router for a given controller
     */
    public abstract getRouter(): Router;
}