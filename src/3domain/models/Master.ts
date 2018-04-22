export class Master {

    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly password: string;
    readonly createdOn?: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        avatar: string,
        password: string,
        createdOn: Date = undefined) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.avatar = avatar;
            this.password = password;
            this.createdOn = createdOn;
    }
}