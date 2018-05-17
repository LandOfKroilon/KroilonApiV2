import { inject, injectable } from "inversify";
import { AcademyDoc } from "../../3domain/models/AcademySchema";
import { IAcademyRepository } from "../../3domain/repositories/interfaces/IAcademyRepository";
import TYPES from "../../config/types";
import { AcademyDTO } from "../dto/AcademyDTO";
import { IAcademyService } from "../interfaces/IAcademyService";

@injectable()
export class AcademyService implements IAcademyService {

    @inject(TYPES.AcademyRepository)
    private academyRepository: IAcademyRepository;

    getAcademy(): Promise<AcademyDTO> {
        return this.academyRepository.getCurrentAcademy()
            .then((doc) => {
                return doc != undefined ? this.toDTO(doc) : undefined;
            })
            .catch((err) => { throw err; });
    }


    getAcademyByName(name: string): Promise<AcademyDTO> {
        return this.academyRepository.findOne({name})
            .then((doc) => {
                return doc != undefined ? this.toDTO(doc) : undefined;
            })
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