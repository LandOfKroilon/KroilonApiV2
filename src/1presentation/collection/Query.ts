import Data from "./Data";

export default class Query {

    href: string;
    rel: string;
    rt: string;
    prompt: string;

    readonly data: Data[];

    constructor() {
        this.data = [];
    }

}