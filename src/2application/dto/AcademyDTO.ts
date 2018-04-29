import { TraineeDTO } from "./TraineeDTO";


export class AcademyDTO {
    readonly name: string;
    readonly trainees: TraineeDTO[];
    readonly createdOn: Date;

    constructor(name: string, trainees: TraineeDTO[], createdOn: Date) {
        this.name = name;
        this.trainees = trainees;
        this.createdOn = createdOn;
    }
}