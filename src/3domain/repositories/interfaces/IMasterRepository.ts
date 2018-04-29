import { MasterDoc } from "../../models/MasterSchema";

export interface IMasterRepository {
    // TODO extract common operations to a base class and turn classes into generics
    findAll(): Promise<Array<MasterDoc>>;
    findOne(conditions?: Object): Promise<MasterDoc>;
    deleteMany(conditions?: Object): Promise<number>;

    create(masterDto: MasterDoc): Promise<MasterDoc>;
}