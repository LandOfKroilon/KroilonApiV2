export class Error {

    readonly  code: number;
    readonly  message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

