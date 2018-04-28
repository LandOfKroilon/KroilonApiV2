export default class Error {

    readonly title: string;
    readonly message: string;
    readonly code: string;

    constructor(title: string, message: string, code: string) {
        this.title = title;
        this.message = message;
        this.code = code;
    }

}