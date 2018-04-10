// type imports
import { Request, Response, NextFunction } from "express";
import express from "express";
const router = express.Router();


/**
 * GET /academy
 *
 * Return the current academy.
 *
 * @param req The received request
 * @param res The response sent
 * @param next Callback
 */
const index = (req: Request, res: Response, next: NextFunction) => {

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
const getAcademyTrainees = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * GET /academy/config/story
 *
 * Devolve o conjunto de "story's" da academia mais actual
 *
 */
const getAcademyStories = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * POST /academy/config/story
 *
 * Insert a group of stories for the current academy
 *
 */
const insertAcademyStories = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.status(201).send();
};

/**
 * GET /academy/sessionpoints
 *
 * Devolve o registo/log de todas as adições/remoções de pontos
 */
const getAcademyPoints = (req: Request, res: Response, next: NextFunction) => {

};

/**
 * POST /academy
 *
 * Insere uma nova academia;
 */
const insertAcademy = (req: Request, res: Response, next: NextFunction) => {

};

router.get("/", index);
router.post("/", insertAcademy);
router.get("/sessionpoints", getAcademyPoints);
router.post("/config/story", insertAcademyStories);
router.get("/config/story", getAcademyStories);
router.get("/trainees", getAcademyTrainees);


module.exports = router;