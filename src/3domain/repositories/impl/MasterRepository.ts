import { injectable } from "inversify";
import { MasterDoc } from "../../models/MasterSchema";
import { kroilonDatabase } from "../KroilonDatabase";
import { IMasterRepository } from "../interfaces/IMasterRepository";

@injectable()
export class MasterRepository implements IMasterRepository {

    async deleteMany(conditions: Object = {}): Promise<number> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.remove(conditions))
            .catch((err) => { throw err; });
    }

    async findOne(conditions: Object): Promise<MasterDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.findOne(conditions))
            .then((theOne) => theOne )
            .catch((err) => { throw err; });
    }

    async create(masterDto: MasterDoc): Promise<MasterDoc> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.create(masterDto))
            .catch((err) => { throw err; });
    }

    async findAll(): Promise<MasterDoc[]> {
        return await kroilonDatabase.connect()
            .then(() => kroilonDatabase.Masters.find().toArray())
            .then((docs) => docs)
            .catch((_) => {
                // log err
                return [];
            });
    }

}