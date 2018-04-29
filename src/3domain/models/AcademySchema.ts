import { Collection, Index, Instance, ObjectID, Property } from "iridium";
import { TraineeDoc } from "./TraineeSchema";

export interface AcademyDoc {
    name: string;
    trainees: TraineeDoc[];
    createdOn?: Date; // TODO extract to a base class
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

    @Property(Date, false)
    public createdOn: Date;

    static onCreating(doc: AcademyDoc) {
        doc.createdOn = new Date();
    }
}