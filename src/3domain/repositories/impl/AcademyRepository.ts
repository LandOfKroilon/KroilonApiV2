import { injectable } from "inversify";
import { AcademyDoc } from "../../models/AcademySchema";
import { kroilonDatabase } from "../KroilonDatabase";
import { IAcademyRepository } from "../interfaces/IAcademyRepository";

@injectable()
export class AcademyRepository implements IAcademyRepository {

    private ASCENDING: number = 1;

    async findAll(): Promise<AcademyDoc[]> {
        const masterDTOs: AcademyDoc[] = await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Academy.find().toArray())
            .catch((_) => {
                // log err
                return [];
            });
        return masterDTOs;
    }

    async deleteMany(conditions?: Object): Promise<number> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Academy.remove(conditions))
            .catch((err) => { throw err; });
    }

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
            .then(() => kroilonDatabase.Academy.find()
                    .sort({createdOn: this.ASCENDING})
                    .one())
            .then((doc) => doc)
            .catch((err) => { return err; });
    }

}