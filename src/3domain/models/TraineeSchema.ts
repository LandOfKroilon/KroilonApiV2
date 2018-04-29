import { Instance, Collection, Property, ObjectID, Index } from "iridium";


export interface TraineeDoc {
    id: number;
    name: string;
    avatar: string;
    email: string;
    hash: string;
    profile: string;
    businessUnit: string;
    skill: string; // TODO change to use type Skill
    createdOn?: Date; // TODO extract to a base class
}


@Collection("trainees")
@Index({ id: 1 }, { unique: true })
@Index({ email: 1 }, { unique: true })
export class TraineeMongoSchema extends Instance<TraineeDoc, TraineeMongoSchema> implements TraineeDoc {
    @ObjectID
    public _id: string;

    @Property(Number, true)
    public id: number;

    @Property(String, true)
    public name: string;

    @Property(String, true)
    public email: string;

    @Property(String, true)
    public avatar: string;

    @Property(String, true)
    public hash: string;

    @Property(String, true)
    public profile: string;

    @Property(String, true)
    public businessUnit: string;

    @Property(String, false) // TODO make it required later on
    public skill: string;

    @Property(Date, false)
    public createdOn: Date;

    static onCreating(doc: TraineeDoc) {
        // auto assign when a document is created
        doc.createdOn = new Date();
    }
}
