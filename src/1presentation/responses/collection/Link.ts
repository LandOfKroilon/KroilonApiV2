export default class CjLink {
    name?: string;
    render?: string;
    readonly rel: string;
    readonly href: string;
    prompt?: string;

    constructor(rel: string, href: string) {
        this.rel = rel;
        this.href = href;
    }
}
