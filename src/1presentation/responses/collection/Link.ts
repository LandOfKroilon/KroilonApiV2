export default class Link {
    readonly name: string;
    readonly render: string;
    readonly rel: string;
    readonly href: string;
    readonly prompt: string;

    constructor(name: string, render: string, rel: string, href: string, prompt: string) {
        this.name = name;
        this.render = render;
        this.rel = rel;
        this.href = href;
        this.prompt = prompt;
    }
}