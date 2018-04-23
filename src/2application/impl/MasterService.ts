import { IMasterService } from "../interfaces/IMasterService";
import { injectable, inject } from "inversify";
import TYPES from "../../config/types";
import { MasterDoc } from "../../3domain/models/MasterSchema";
import { IMasterRepository } from "../../3domain/repositories/interfaces/IMasterRepository";
import { MasterDTO } from "../dto/MasterDTO";

@injectable()
export class MasterService implements IMasterService {

    @inject(TYPES.MasterRepository)
    private masterRepository: IMasterRepository;

    getMasters(): Promise<Array<MasterDTO>> {
        return this.masterRepository.findAll()
            .then((masters) => masters.map((dto: MasterDoc) => { return this.toDTO(dto); }))
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    createMaster(content: MasterDTO): Promise<MasterDTO> {
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
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; } );
    }

    private toDTO(masterDTO: MasterDoc): MasterDTO {
        return new MasterDTO(
            masterDTO.id,
            masterDTO.name,
            masterDTO.email,
            masterDTO.avatar,
            masterDTO.password,
            masterDTO.createdOn);
    }

}