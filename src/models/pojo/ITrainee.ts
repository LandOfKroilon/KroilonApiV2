import ISkill from "./ISkill";
import ISession from "./ISkill";

interface ITrainee {
    id: number;
    name: string;
    avatar: string;
    email: string;
    hash: string;
    profile: string;
    business_unit: string;
    skills: ISkill[];
    score: ISession[];
}

export = ITrainee;