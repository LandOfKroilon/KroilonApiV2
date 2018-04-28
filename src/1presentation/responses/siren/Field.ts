export default class Field {
    readonly name: string;
    readonly type: string;
    readonly value?: string;

    constructor(name: string, type: string, value: string = undefined) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}