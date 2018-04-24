import Link from "./Link";
import Query from "./Query";
import Template from "./Template";
import Item from "./Item";


export const MediaType = "application/vnd.collection+json";

export class Collection {

    readonly href: string;
    readonly version: string;

    readonly items: Item[];
    readonly links: Link[];
    readonly queries: Query[];
    template: Template;
    error: Error;

    constructor( href: string) {
        this.items = [];
        this.links = [];
        this.queries = [];
        this.version = "1.0";

        this.href = href;
    }
}

