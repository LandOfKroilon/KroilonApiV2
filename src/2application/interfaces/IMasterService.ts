import { Master } from "../../3domain/models/Master";

export interface IMasterService {

    getMasters(): Promise<Array<Master>>;
    createMaster(content: any): Promise<Master>;

}