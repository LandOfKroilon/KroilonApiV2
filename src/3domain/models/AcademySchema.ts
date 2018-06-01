import { Collection, Index, Instance, ObjectID, Property } from "iridium";
import { MasterDoc } from "./MasterSchema";
import { TraineeDoc } from "./TraineeSchema";

export interface AcademyDoc {
    _id?: string;
    name: string;
    trainees: TraineeDoc[];
    masters: MasterDoc[];
    createdOn?: number; // TODO extract to a base class
}

@Collection("academy")
@Index({ name: 1 }, { unique: true })
export class AcademyMongoSchema extends Instance<AcademyDoc, AcademyMongoSchema> implements AcademyDoc {
    @ObjectID
    public _id: string;

    @Property(String, true)
    public name: string;

    @Property(Array, false)
    public masters: MasterDoc[];

    @Property(Array, false)
    public trainees: TraineeDoc[];

    @Property(Number, false)
    public createdOn: number;

    static onCreating(doc: AcademyDoc) {
        doc.createdOn = new Date().getTime();
    }
}