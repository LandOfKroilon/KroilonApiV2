import * as assert from "assert";
const request = require("supertest");
const faker = require("faker");
import app from "../../src/app";
import { IMasterRepository } from "../../src/3domain/repositories/IMasterRepository";
import { MasterRepository } from "../../src/3domain/repositories/impl/MasterRepository";

const url = "/academy/admin";

let masterRepo: IMasterRepository = undefined;

beforeAll((done) => {
    masterRepo = new MasterRepository();
    masterRepo.deleteMany().then((number) => {
        console.log(`Deleted #${number} documents.`);
        done();
    }).catch((err) => done(err));
});


describe(url, () => {
    describe("POST", () => {
        test("it should be possible to create a new resource using POST method", async done => {

            const admin = {
                id: 13471,
                name: faker.name.findName(),
                avatar: faker.image.avatar(),
                email: faker.internet.email(),
                password: "dummy1"
            };
            const response = await request(app).post(url).send(admin);
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe("application/json");
            expect(response.body.id).toEqual(admin.id);
            expect(response.body.name).toEqual(admin.name);
            expect(response.body.avatar).toEqual(admin.avatar);
            expect(response.body.email).toEqual(admin.email);
            expect(response.body.createdOn).toBeDefined();
            done();
        });

        test("it should not be possible to create a new resource without required fields", async done => {
            const admin = {
                id: 13471,
                name: faker.name.findName(),
                // "avatar": faker.image.avatar(), REQUIRED
                email: faker.internet.email(),
                password: "dummy1"
            };
            const response = await request(app).post(url).send(admin);
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe("application/problem+json");
            // TODO assert specific title
            expect(response.body.title).toBeDefined();
            expect(response.body.detail).toBeDefined();
            expect(response.body.instance).toBeDefined();
            expect(response.body.status).toBe(400);
            done();
        });

        test("it should not be possible to create a new resource with an existant ID", async done => {
            const admin = {
                id: 13471,
                name: faker.name.findName(),
                avatar: faker.image.avatar(),
                email: faker.internet.email(),
                password: "dummy1"
            };
            const response = await request(app).post(url).send(admin);
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe("application/problem+json");
            // TODO assert specific title
            expect(response.body.title).toBeDefined();
            expect(response.body.detail).toBeDefined();
            expect(response.body.instance).toBeDefined();
            expect(response.body.status).toBe(400);
            done();
        });
    });
});