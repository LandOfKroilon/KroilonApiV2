import { AcademyDoc } from "../../models/AcademySchema";
import { BaseRepository } from "./BaseRepository";

export interface IAcademyRepository extends BaseRepository<AcademyDoc> {
    getCurrentAcademy(): Promise<AcademyDoc>;
    getCurrentAcademyId(): Promise<number>;
    update(doc: AcademyDoc): Promise<number>;
 }