import { Request, Response, NextFunction } from "express";

/**
 * GET /academy
 *
 * Return the current academy.
 *
 * @param req The received request
 * @param res The response sent
 * @param next Callback
 */
export let index = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * GET /academy/trainees
 *
 * Return the set of trinees alocated to the current academy.
 *
 * @param req The received request
 * @param res The response sent
 * @param next Callback
 */
export let getAcademyTrainees = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * GET /academy/config/story
 *
 * Devolve o conjunto de "story's" da academia mais actual
 *
 */
export let getAcademyStories = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * POST /academy/config/story
 *
 * Insert a group of stories for the current academy
 *
 */
export let insertAcademyStories = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * GET /academy/sessionpoints
 *
 * Devolve o registo/log de todas as adições/remoções de pontos
 */
export let getAcademyPoints = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * POST /academy
 *
 * Insere uma nova academia;
 */
export let insertAcademy = (req: Request, res: Response, next: NextFunction) => {

};
