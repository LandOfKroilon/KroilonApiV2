import { inject, injectable } from "inversify";
import { AcademyDoc } from "../../3domain/models/AcademySchema";
import { MasterDoc } from "../../3domain/models/MasterSchema";
import { TraineeDoc } from "../../3domain/models/TraineeSchema";
import { IAcademyRepository } from "../../3domain/repositories/interfaces/IAcademyRepository";
import TYPES from "../../config/types";
import { AcademyDTO } from "../dto/AcademyDTO";
import { MasterDTO } from "../dto/MasterDTO";
import { TraineeDTO } from "../dto/TraineeDTO";
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

    updateAcademy(dto: AcademyDTO): Promise<number> {
        console.log(dto);
        return this.getAcademy().then((academy) => {
            if (!academy)
                throw new Error("Current academy not found.");


            const masters = [];
            dto.masters.forEach(doc => {
                masters.push({
                    id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    avatar: doc.avatar,
                    academyId: doc.academyId || "",
                    createdOn: doc.createdOn || new Date().getTime()
                });
            });


            const trainees = [];
            dto.trainees.forEach(doc => {
                    trainees.push({
                        id: doc.id,
                        name: doc.name,
                        avatar: doc.avatar,
                        email: doc.email,
                        hash: doc.hash,
                        profile: doc.profile,
                        businessUnit: doc.businessUnit,
                        skill: {},
                        createdOn: doc.createdOn || new Date().getTime()
                    });
                }
            );

            academy.trainees.forEach(doc => {
                    trainees.push({
                        id: doc.id,
                        name: doc.name,
                        avatar: doc.avatar,
                        email: doc.email,
                        hash: doc.hash,
                        profile: doc.profile,
                        businessUnit: doc.businessUnit,
                        skill: {},
                        createdOn: doc.createdOn || new Date().getTime()
                    });
                }
            );

            return this.academyRepository.update({
                    name: academy.name,
                    trainees: trainees,
                    masters: masters,
                    createdOn: academy.createdOn
                  });

        })
        .then((updatedDocs) => updatedDocs)
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
            .then(() => {
                return this.academyRepository.create({
                    name: dto.name,
                    trainees: this.translateTrainees(dto.trainees),
                    masters: this.translateMasters(dto.masters),
                    createdOn: new Date().getTime()
                    });
            })
            .then((m) => this.toDTO(m))
            .catch((err) => { throw err; } );
    }

    private toDTO(doc: AcademyDoc): AcademyDTO {
        return new AcademyDTO(doc.name, doc.trainees, doc.masters, doc.createdOn);
    }

    private translateTrainees(trainees: TraineeDTO[]): TraineeDoc[] {
        const docs = [];
        trainees.forEach(doc => {
            docs.push({
                id: doc.id,
                name: doc.name,
                avatar: doc.avatar,
                email: doc.email,
                hash: doc.hash,
                profile: doc.profile,
                businessUnit: doc.businessUnit,
                skill: {},
                createdOn: doc.createdOn || new Date().getTime()
            });
           }
        );
        return docs;
    }

    private translateMasters(masters: MasterDTO[]): MasterDoc[] {
        const docs = [];
        if (!masters) return docs;
        masters.forEach(doc => {
            docs.push({
                id: doc.id,
                name: doc.name,
                email: doc.email,
                avatar: doc.avatar,
                academyId: doc.academyId || "",
                createdOn: doc.createdOn || new Date().getTime()
            });
           }
        );
        return docs;
    }

}