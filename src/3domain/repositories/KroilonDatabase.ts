import { Core, Model } from "iridium";
import { AcademyDoc, AcademyMongoSchema } from "../models/AcademySchema";
import { MasterDoc, MasterMongoSchema } from "../models/MasterSchema";


class KroilonDatabase extends Core {

    public Masters = new Model<MasterDoc, MasterMongoSchema>(this, MasterMongoSchema);

    public Academy = new Model<AcademyDoc, AcademyMongoSchema>(this, AcademyMongoSchema);
}

export const kroilonDatabase =
    new KroilonDatabase("mongodb://localhost:27017/kroilon_local", { database: process.env.DATABASE });
