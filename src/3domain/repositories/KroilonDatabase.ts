import { Core, Model } from "iridium";
import { MasterDoc, MasterMongoSchema } from "../models/MasterSchema";
import { AcademyDoc, AcademyMongoSchema } from "../models/AcademySchema";


class KroilonDatabase extends Core {

    public Masters = new Model<MasterDoc, MasterMongoSchema>(this, MasterMongoSchema);

    public Academy = new Model<AcademyDoc, AcademyMongoSchema>(this, AcademyMongoSchema);
}

export const kroilonDatabase =
    new KroilonDatabase(process.env.MONGODB_URI, { database: process.env.DATABASE });
