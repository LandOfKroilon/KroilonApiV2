import Data from "./Data";
import Link  from "./Link";

export default class Item {

    href: string;
    rel: string;
    rt: string;

    readonly data: Data[];
    readonly links: Link[];

    constructor() {
        this.data = [];
        this.links = [];
    }

}