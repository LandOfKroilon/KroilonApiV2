export class TraineeDTO {

    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly hash: string;
    readonly businessUnit: string;
    readonly skill: string;
    readonly profile: string;
    readonly createdOn?: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        avatar: string,
        hash: string,
        profile: string,
        businessUnit: string,
        skill: string,
        createdOn: Date = undefined) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.avatar = avatar;
            this.hash = hash;
            this.profile = profile;
            this.businessUnit = businessUnit;
            this.skill = skill;
            this.createdOn = createdOn;
    }
}