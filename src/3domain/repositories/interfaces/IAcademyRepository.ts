import { AcademyDoc } from "../../models/AcademySchema";

export interface IAcademyRepository {

    findOne(conditions?: Object): Promise<AcademyDoc>;

    getCurrentAcademy(): Promise<AcademyDoc>;
    create(doc: AcademyDoc): Promise<AcademyDoc>;
}