import Data from "./Data";

export default class Query {

    href: string;
    rel: string;
    rt: string;
    prompt: string;

    readonly data: Data[];

    constructor(rel: string, href: string, prompt: string) {
        this.data = [];
        this.rel = rel;
        this.href = href;
        this.prompt = prompt;
    }

}