import Field from "./Field";

export default class Action {

    readonly name: string;
    readonly href: string;

    title?: string;
    type?: string;
    fields?: Array<Field>;
    class?: Array<string>;
    method?: string;

    constructor(name: string, href: string) {
        this.name = name;
        this.href = href;
    }


}