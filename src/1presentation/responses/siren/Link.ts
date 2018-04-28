export default class Link {
    readonly rel: Array<string>;
    readonly href: string;

    constructor(rel: string, href: string) {
        this.rel = [];
        this.rel.push(rel);
        this.href = href;
    }
}