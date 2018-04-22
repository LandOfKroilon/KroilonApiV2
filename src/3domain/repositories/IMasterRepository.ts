import { MasterDoc } from "../models/MasterSchema";

export interface IMasterRepository {
    findAll(): Promise<Array<MasterDoc>>;
    create(masterDto: MasterDoc): Promise<MasterDoc>;
    findOne(conditions?: Object): Promise<MasterDoc>;
    deleteMany(conditions?: Object): Promise<number>;
}