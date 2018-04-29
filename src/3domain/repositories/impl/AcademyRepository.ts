import { IAcademyRepository } from "../interfaces/IAcademyRepository";
import { AcademyDoc } from "../../models/AcademySchema";
import { kroilonDatabase } from "../KroilonDatabase";
import { injectable } from "inversify";

@injectable()
export class AcademyRepository implements IAcademyRepository {

    async findOne(conditions?: Object): Promise<AcademyDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Academy.findOne(conditions))
            .catch((err) => { throw err; });
    }

    async create(doc: AcademyDoc): Promise<AcademyDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Academy.create(doc))
            .catch((err) => { throw err; });
    }

    async getCurrentAcademy(): Promise<AcademyDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Academy.find().sort({createdOn: -1}).one)
            .catch((err) => { return err; });
    }

}