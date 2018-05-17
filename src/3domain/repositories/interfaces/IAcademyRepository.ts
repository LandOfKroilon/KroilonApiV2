import { AcademyDoc } from "../../models/AcademySchema";
import { BaseRepository } from "./BaseRepository";

export interface IAcademyRepository extends BaseRepository<AcademyDoc> {
    getCurrentAcademy(): Promise<AcademyDoc>;
 }