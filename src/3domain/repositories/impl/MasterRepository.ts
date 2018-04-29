import { IMasterRepository } from "../interfaces/IMasterRepository";
import { MasterDoc } from "../../models/MasterSchema";
import { injectable } from "inversify";
import { kroilonDatabase } from "../KroilonDatabase";

@injectable()
export class MasterRepository implements IMasterRepository {

    async deleteMany(conditions: Object = {}): Promise<number> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.remove(conditions))
            .catch((err) => { throw err; });
    }

    async findOne(conditions: Object = {}): Promise<MasterDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.findOne(conditions))
            .catch((err) => { throw err; });
    }

    async create(masterDto: MasterDoc): Promise<MasterDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.create(masterDto))
            .catch((err) => { throw err; });
    }

    async findAll(): Promise<MasterDoc[]> {
        const masterDTOs: MasterDoc[] = await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.find().toArray())
            .catch((_) => {
                // log err
                return [];
            });
        return masterDTOs;
    }

}