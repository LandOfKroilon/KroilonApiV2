import { inject, injectable } from "inversify";
import { MasterDoc } from "../../3domain/models/MasterSchema";
import { IAcademyRepository } from "../../3domain/repositories/interfaces/IAcademyRepository";
import { IMasterRepository } from "../../3domain/repositories/interfaces/IMasterRepository";
import TYPES from "../../config/types";
import { MasterDTO } from "../dto/MasterDTO";
import { IAcademyService } from "../interfaces/IAcademyService";
import { IMasterService } from "../interfaces/IMasterService";

@injectable()
export class MasterService implements IMasterService {

    @inject(TYPES.MasterRepository)
    private masterRepository: IMasterRepository;

    @inject(TYPES.AcademyRepository)
    private academyRepository: IAcademyRepository;

    @inject(TYPES.AcademyService)
    private academySvc: IAcademyService;

    getMasters(): Promise<Array<MasterDTO>> {
        return this.masterRepository.findAll()
            .then((masters) => masters.map((dto: MasterDoc) => { return this.toDTO(dto); }))
            .catch((err) => {
                console.log(err);
                return [];
            });
    }

    findMaster(conditions: Object = {}): Promise<MasterDTO> {
        return this.masterRepository.findOne(conditions)
            .then((doc) => {
                return doc != undefined ? this.toDTO(doc) : undefined;
            })
            .catch((err) => { throw err; });
    }

    createMaster(content: MasterDTO): Promise<MasterDTO> {
        return this.masterRepository.findOne({id: content.id})
            .then((doc) => {
                if (doc != undefined) {
                    throw new Error("Document already present");
                }
            })
            .then(() => this.academyRepository.getCurrentAcademyId())
            .then((acadId) => this.masterRepository.create({
                    id: content.id,
                    name: content.name,
                    email: content.email,
                    avatar: content.avatar,
                    academyId: `${acadId}`
                }))
            .then(async (m) => {

                await this.academySvc.updateAcademy({
                    name: "",
                    trainees: [],
                    masters: [m]
                });

                return m;
            })
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; });
    }

    private toDTO(masterDTO: MasterDoc): MasterDTO {
        return new MasterDTO(
            masterDTO.id,
            masterDTO.name,
            masterDTO.email,
            masterDTO.avatar,
            masterDTO.academyId,
            masterDTO.createdOn);
    }

}