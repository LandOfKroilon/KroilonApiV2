import { Core, Model, Instance, Collection, Property, ObjectID, Index } from "iridium";


export interface MasterDoc {
    id: number;
    name: string;
    email: string;
    avatar: string;
    password: string;
    createdOn?: Date;
}


@Collection("masters")
@Index({ id: 1 }, { unique: true })
@Index({ email: 1 }, { unique: true })
export class MasterMongoSchema extends Instance<MasterDoc, MasterMongoSchema> implements MasterDoc {
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
    public password: string;

    @Property(Date, false)
    public createdOn: Date;

    static onCreating(doc: MasterDoc) {
        // auto assign when a document is created
        doc.createdOn = new Date();
    }
}

class KroilonDatabase extends Core {
    public Masters = new Model<MasterDoc, MasterMongoSchema>(this, MasterMongoSchema);
}

export const kroilonDatabase = new KroilonDatabase(process.env.MONGODB_URI, { database: process.env.DATABASE });
