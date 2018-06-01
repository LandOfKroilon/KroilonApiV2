import "reflect-metadata";
import { MasterRepository } from "../../src/3domain/repositories/impl/MasterRepository";
import { IMasterRepository } from "../../src/3domain/repositories/interfaces/IMasterRepository";
import app from "../../src/app";
const request = require("supertest");
const faker = require("faker");

const url = "/academy/admin";

let masterRepo: IMasterRepository = undefined;

const adminsToSeed = [
    {
        id: faker.random.number(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email()
    },
    {
        id: faker.random.number(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email()
    },
    {
        id: faker.random.number(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email()
    }
];

beforeAll((done) => {
    masterRepo = new MasterRepository();
    masterRepo.deleteMany().then((number) => {
        console.log(`Deleted #${number} documents.`);
        masterRepo.create(adminsToSeed[0])
            .then((one) => {
                console.log(`Admin with ID ${one.id} created.`);
                masterRepo.create(adminsToSeed[1])
                .then((two) => {
                    console.log(`Admin with ID ${two.id} created.`);
                    masterRepo.create(adminsToSeed[2])
                    .then((three) => {
                        console.log(`Admin with ID ${three.id} created.`);
                        done();
                    })
                    .catch((err) => done(err));
                }).catch((err) => done(err));
            }).catch((err) => done(err));
    }).catch((err) => done(err));
});

afterAll((done) => {
    masterRepo = new MasterRepository();
    masterRepo.deleteMany()
        .then((number) => {
            console.log(`Deleted #${number} documents.`);
        })
        .catch((err) => done(err));
});



describe(url, () => {
    describe("POST", () => {
        test("it should be possible to create a new resource using POST method", async done => {

            const admin = {
                id: 13471,
                name: faker.name.findName(),
                avatar: faker.image.avatar(),
                email: faker.internet.email()
            };
            const response = await request(app).post(url).send(admin);
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe("application/vnd.siren+json");

            expect(response.body.class).toBeDefined();
            expect(response.body.class.length).toBe(1);
            expect(response.body.class[0]).toBe("Admin");

            expect(response.body.properties).toBeDefined();
            expect(response.body.links).toBeDefined();
            expect(response.body.links.length).toBe(2);

            done();
        });

        test("it should not be possible to create a new resource without required fields", async done => {
            const admin = {
                id: 13471,
                name: faker.name.findName(),
                email: faker.internet.email()
            };
            const response = await request(app).post(url).send(admin);
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe("application/problem+json");
            // TODO assert specific title
            expect(response.body.title).toBeTruthy();
            expect(response.body.detail).toBeTruthy();
            expect(response.body.instance).toBeTruthy();
            expect(response.body.status).toBe(400);
            done();
        });

        test("it should not be possible to create a new resource with an existant ID", async done => {
            const admin = {
                id: 13471,
                name: faker.name.findName(),
                avatar: faker.image.avatar(),
                email: faker.internet.email()
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

    describe("GET", () => {
        test("It should display a collection of resources", async done => {

            const response = await request(app).get(url);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/vnd.collection+json");
            expect(response.body).toBeDefined();
            expect(response.body.collection.href).toBe(`http://127.0.0.1:3000${url}`);
            expect(response.body.collection.version).toBe("1.0");
            expect(response.body.collection.items.length).toBeGreaterThanOrEqual(3);
            // collection must provide a template for clients
            expect(response.body.collection.template).toBeDefined();
            expect(response.body.collection.template.data.length).toBe(5);
            expect(response.body.collection.links).toBeDefined();
            expect(response.body.collection.links.length).toBe(1);

            done();
        });
    });

    describe("GET by ID", () => {
        test("It should return a specific resource", async done => {

            const response = await request(app).get(`${url}/${adminsToSeed[0].id}`);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("application/vnd.siren+json");
            expect(response.body).toBeDefined();

            expect(response.body.class.length).toBe(1);
            expect(response.body.class[0]).toBe("Admin");

            expect(response.body.properties).toBeDefined();

            expect(response.body.actions).toBeUndefined();
            expect(response.body.links.length).toBe(2);

            done();
        });

        test("It should return 404 error when resource with specific id is not found", async done => {

            const response = await request(app).get(`${url}/inexistent_id`);
            expect(response.statusCode).toBe(404);
            expect(response.type).toBe("application/problem+json");

            expect(response.body).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.status).toBeDefined();
            expect(response.body.detail).toBeDefined();
            done();
        });
    });
});