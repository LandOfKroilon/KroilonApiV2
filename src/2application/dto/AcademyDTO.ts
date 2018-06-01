import { MasterDTO } from "./MasterDTO";
import { TraineeDTO } from "./TraineeDTO";


export class AcademyDTO {
    readonly name: string;
    readonly trainees: TraineeDTO[];
    readonly masters: MasterDTO[];
    readonly createdOn?: number;

    constructor(name: string, trainees: TraineeDTO[], masters: MasterDTO[], createdOn: number) {
        this.name = name;
        this.trainees = trainees;
        this.masters = masters;
        this.createdOn = createdOn;
    }
}