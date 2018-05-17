import { TraineeDTO } from "./TraineeDTO";


export class AcademyDTO {
    readonly name: string;
    readonly trainees: TraineeDTO[];
    readonly createdOn: number;

    constructor(name: string, trainees: TraineeDTO[], createdOn: number) {
        this.name = name;
        this.trainees = trainees;
        this.createdOn = createdOn;
    }
}