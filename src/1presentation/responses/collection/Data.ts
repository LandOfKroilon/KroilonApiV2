export default class Data {
    readonly name: string;
    readonly value: string;
    readonly prompt: string;

    constructor(name: string, value: string, prompt: string) {
        this.name = name;
        this.value = value;
        this.prompt = prompt;
    }
}