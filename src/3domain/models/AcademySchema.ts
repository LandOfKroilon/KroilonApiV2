import { Collection, Index, Instance, ObjectID, Property } from "iridium";
import { TraineeDoc } from "./TraineeSchema";

export interface AcademyDoc {
    name: string;
    trainees: TraineeDoc[];
    createdOn?: number; // TODO extract to a base class
}

@Collection("academy")
@Index({ name: 1 }, { unique: true })
export class AcademyMongoSchema extends Instance<AcademyDoc, AcademyMongoSchema> implements AcademyDoc {
    @ObjectID
    public _id: string;

    @Property(String, true)
    public name: string;

    @Property(Array, true)
    public trainees: TraineeDoc[];

    @Property(Number, false)
    public createdOn: number;

    static onCreating(doc: AcademyDoc) {
        doc.createdOn = new Date().getTime();
    }
}