
export interface TraineeDoc {
    id: number;
    name: string;
    avatar: string;
    email: string;
    hash: string;
    profile: string;
    businessUnit: string;
    skill: string; // TODO change to use type Skill
    createdOn: Date; // TODO extract to a base class
}

