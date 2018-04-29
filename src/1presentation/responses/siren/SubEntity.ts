import Link from "./Link";

export default class SubEntity<A> {

    readonly class: Array<string>;
    readonly rel: Array<string>;
    readonly links: Array<Link>;
    properties?: A;

    constructor(props: A = undefined) {
        this.class = [];
        this.rel = [];
        this.links = [];
        this.properties = props;
    }

}