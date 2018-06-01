import { MasterDTO } from "../dto/MasterDTO";

export interface IMasterService {

    getMasters(): Promise<Array<MasterDTO>>;
    createMaster(content: any): Promise<MasterDTO>;
    findMaster(conditions: Object): Promise<MasterDTO>;
}