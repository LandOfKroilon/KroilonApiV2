export class Skill {

    readonly people: number;
    readonly communication: number;
    readonly problemSolving: number;
    readonly management: number;
    readonly android: number;

    constructor(_people: number,
                _communication: number,
                _problemSolving: number,
                _management: number,
                _android: number) {
            this.people = _people;
            this.android = _android;
            this.communication = _communication;
            this.management = _management;
            this.problemSolving = _problemSolving;
    }
}