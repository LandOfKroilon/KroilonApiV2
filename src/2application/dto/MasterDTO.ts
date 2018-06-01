export class MasterDTO {

    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly academyId?: string;
    readonly createdOn?: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        avatar: string,
        academyId: string = undefined,
        createdOn: Date = undefined) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.avatar = avatar;
            this.academyId = academyId;
            this.createdOn = createdOn;
    }
}