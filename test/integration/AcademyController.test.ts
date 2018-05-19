import "reflect-metadata";
import { AcademyRepository } from "../../src/3domain/repositories/impl/AcademyRepository";
import { IAcademyRepository } from "../../src/3domain/repositories/interfaces/IAcademyRepository";
import app from "../../src/app";
const request = require("supertest");
const faker = require("faker");

const url = "/academy";

let academyRepo: IAcademyRepository = undefined;


const academiesToSeed = [
    {
        name: faker.name.findName(),
        trainees: [],
        createdOn: new Date().getTime()
    },
    {
        name: faker.name.findName(),
        trainees: [],
        createdOn: new Date().getTime()
    },
    {
        name: faker.name.findName(),
        trainees: [],
        createdOn: new Date().getTime()
    }
];

beforeAll((done) => {
    academyRepo = new AcademyRepository();
    academyRepo.deleteMany().then((number) => {
        console.log(`Deleted #${number} documents.`);
        academyRepo.create(academiesToSeed[0])
            .then((one) => {
                console.log(`Admin with ID ${one.name} created.`);
                academyRepo.create(academiesToSeed[1])
                    .then((two) => {
                        console.log(`Admin with ID ${two.name} created.`);
                        academyRepo.create(academiesToSeed[2])
                            .then((three) => {
                                console.log(`Admin with ID ${three.name} created.`);
                                done();
                            })
                            .catch((err) => done(err));
                    }).catch((err) => done(err));
            }).catch((err) => done(err));
    }).catch((err) => done(err));
});

describe(url, () => {
    describe("GET", () => {
        test("it should obtain the most recent resource", async done => {
            const response = await request(app).get(url);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();

            const academyResp = response.body;
            expect(academyResp.properties.createdOn < academiesToSeed[1].createdOn).toBeTruthy();
            expect(academyResp.properties.createdOn < academiesToSeed[2].createdOn).toBeTruthy();

            done();
        });

        test("it should be of media type Siren", async done => {
            const response = await request(app).get(url);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/vnd.siren+json");

            expect(response.body).toBeDefined();

            expect(response.body.class.length).toBe(1);
            expect(response.body.class[0]).toBe("Academy");

            expect(response.body.properties).toBeDefined();
            expect(response.body.properties.name).toBe(academiesToSeed[0].name);
            expect(response.body.properties.trainees.length).toBeGreaterThanOrEqual(0);
            expect(response.body.properties.createdOn).toBe(academiesToSeed[0].createdOn);

            expect(response.body.actions).toBeUndefined();
            expect(response.body.links.length).toBe(1);

            done();
        });
    });
});

describe(url + "/:id", () => {
    describe("GET", () => {
        test("It should return 404 for not found", async done => {
            const response = await request(app).get(url + "/not_exists");

            expect(response.statusCode).toBe(404);
            expect(response.type).toBe("application/problem+json");

            expect(response.body).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.status).toBeDefined();
            expect(response.body.detail).toBeDefined();

            done();
        });

        test("It should return a valid Siren resource when academy is found", async done => {
            const response = await request(app).get(url + "/" + academiesToSeed[0].name);

            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/vnd.siren+json");

            expect(response.body).toBeDefined();

            expect(response.body.class.length).toBe(1);
            expect(response.body.class[0]).toBe("Academy");

            expect(response.body.properties).toBeDefined();
            expect(response.body.properties.name).toBe(academiesToSeed[0].name);
            expect(response.body.properties.trainees.length).toBeGreaterThanOrEqual(0);
            expect(response.body.properties.createdOn).toBe(academiesToSeed[0].createdOn);

            expect(response.body.actions).toBeUndefined();
            expect(response.body.links.length).toBe(1);


            done();
        });
    });
});


describe(url, () => {
    describe("POST", () => {
        test("it should be possible to create a new resource", async done => {
            const academy = {
                name: faker.name.findName(),
                trainees: []
            };
            const response = await request(app).post(url).send(academy);
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe("application/vnd.siren+json");

            expect(response.body).toBeDefined();

            expect(response.body.class.length).toBe(1);
            expect(response.body.class[0]).toBe("Academy");

            expect(response.body.properties).toBeDefined();
            expect(response.body.properties.name).toBe(academy.name);
            expect(response.body.properties.trainees.length).toBeGreaterThanOrEqual(0);
            expect(response.body.properties.createdOn).toBeDefined();

            expect(response.body.actions).toBeUndefined();
            expect(response.body.links.length).toBe(1);

            done();
        });

        test("it should return 400 when cannot create resource due to bad request", async done => {
            const response = await request(app).post(url);
            expect(response.statusCode).toBe(400);

            expect(response.type).toBe("application/problem+json");

            expect(response.body).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.status).toBeDefined();
            expect(response.body.detail).toBeDefined();

            done();
        });

        test("it should not be possible to create an academy without a valid name", async done => {
            const academy = {
                name: "",
                trainees: []
            };
            const response = await request(app).post(url);
            expect(response.statusCode).toBe(400);

            expect(response.type).toBe("application/problem+json");

            expect(response.body).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.status).toBeDefined();
            expect(response.body.detail).toBeDefined();

            done();
        });
    });
});

