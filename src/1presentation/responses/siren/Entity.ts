import SubEntity from "./SubEntity";
import Action from "./Action";
import Link from "./Link";



export const SirenMediaType: string = "application/vnd.siren+json";

/**
 * An Entity is a URI-addressable resource that has properties and actions associated with it.
 * It may contain sub-entities and navigational links.
 */
export default class Entity<A> {

    /**
     * Describes the nature of an entity's content based on the current representation.
     * Possible values are implementation-dependent and should be documented.
     * MUST be an array of strings.
     * Optional.
     */
    class?: Array<string>;

    /**
     * A set of key-value pairs that describe the state of an entity.
     */
    properties?: A;

    /**
     * A collection of related sub-entities.
     * Optional.
     */
    entities?: Array<SubEntity<A>>;

    /**
     * A collection of action objects, represented in JSON Siren as an array.
     */
    actions?: Array<Action>;

    links: Array<Link>;


    constructor() {
        this.links = [];
    }

}