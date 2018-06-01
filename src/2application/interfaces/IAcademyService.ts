import { AcademyDTO } from "../dto/AcademyDTO";

export interface IAcademyService {
    getAcademy(): Promise<AcademyDTO>;
    createAcademy(content: AcademyDTO): Promise<AcademyDTO>;
    getAcademyByName(name: string): Promise<AcademyDTO>;
    updateAcademy(dto: AcademyDTO): Promise<number>;
}