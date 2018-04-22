import { IMasterService } from "../interfaces/IMasterService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import { MasterDoc } from "../../3domain/models/MasterSchema";
import { Master } from "../../3domain/models/Master";
import { IMasterRepository } from "../../3domain/repositories/IMasterRepository";

@injectable()
export class MasterService implements IMasterService {

    @inject(TYPES.MasterRepository)
    private masterRepository: IMasterRepository;

    getMasters(): Promise<Array<Master>> {
        return this.masterRepository.findAll()
            .then((masters) => masters.map((dto: MasterDoc) => { return this.toMasterDoc(dto); }))
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    createMaster(content: any): Promise<Master> {
        return this.masterRepository.findOne({id: content.id})
            .then((doc) => {
                if (doc != undefined) {
                    throw new Error("Document already present");
                }
            })
            .then(() => this.masterRepository.create({
                id: content.id,
                name: content.name,
                email: content.email,
                avatar: content.avatar,
                password: content.password
            }))
            .then((m) => m)
            .catch((err) => { throw err; } );
    }

    private toMasterDoc(masterDTO: MasterDoc): Master {
        return new Master(
            masterDTO.id,
            masterDTO.name,
            masterDTO.email,
            masterDTO.avatar,
            masterDTO.password,
            masterDTO.createdOn);
    }

}