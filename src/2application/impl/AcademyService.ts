import { IAcademyService } from "../interfaces/IAcademyService";
import { AcademyDTO } from "../dto/AcademyDTO";
import { injectable, inject } from "inversify";
import TYPES from "../../config/types";
import { IAcademyRepository } from "../../3domain/repositories/interfaces/IAcademyRepository";
import { AcademyDoc } from "../../3domain/models/AcademySchema";

@injectable()
export class AcademyService implements IAcademyService {

    @inject(TYPES.AcademyRepository)
    private academyRepository: IAcademyRepository;

    getAcademy(): Promise<AcademyDTO> {
        return this.academyRepository.getCurrentAcademy()
            .then((doc) => this.toDTO(doc))
            .catch((err) => { throw err; });
    }

    createAcademy(dto: AcademyDTO): Promise<AcademyDTO> {
        return this.academyRepository.findOne({name: dto.name})
            .then((doc) => {
                if (doc != undefined) {
                    throw new Error("Document already present");
                }
            })
            .then(() => this.academyRepository.create({
                name: dto.name,
                trainees: []
            }))
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; } );
    }

    private toDTO(doc: AcademyDoc): AcademyDTO {
        return new AcademyDTO(doc.name, doc.trainees, doc.createdOn);
    }
}