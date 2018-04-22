/**
 *
 */
export class Problem {

    /**
     * A URI reference that identifies the
     * problem type.  This specification encourages that, when
     * dereferenced, it provide human-readable documentation for the
     * problem type. When this member is not present, its value is assumed to be
     * "about:blank".
     */
    readonly type?: string;

    /**
     * A short, human-readable summary of the problem
     * type. It SHOULD NOT change from occurrence to occurrence of the
     * problem, except for purposes of localization.
     */
    readonly title: string;

    /**
     * A human-readable explanation specific to this
     * occurrence of the problem.
     */
    readonly detail: string;

    /**
     * The HTTP status code
     * generated by the origin server for this occurrence of the problem.
     */
    readonly status: Number;

    /**
     * A URI reference that identifies the specific
     * occurrence of the problem.  It may or may not yield further
     * information if dereferenced.
     */
    readonly instance: string;

    /**
     * Content-Type used by this response type.
     */
    readonly contentType: string =  "application/problem+json";

    constructor(status: Number, title: string, detail: string, instance: string, type: string = "about:blank") {
        this.status = status;
        this.type = type;
        this.title = title;
        this.detail = detail;
        this.instance = instance;
    }


    /*updatWith(conditions: Object) {}
    */

}