import assert from "assert";
import mongoose from "mongoose";
const request = require("supertest");
import Admin = require("../../src/models/mixin/Admin");
const faker = require("faker");
import app from "../../src/app";


const url = "/v2/academy/admin";

const ids = [13471, 23770];


beforeAll((done) => {
    mongoose.connect("mongodb://localhost:27017/kroilon_local")
        .then(() => {
            console.log("Connected successfully to server");
            mongoose.connection.dropCollection("admins", () => {
                console.log(`Admin collection dropped`);
                mongoose.connection.createCollection("admins")
                    .then(() => {
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done(err);
                    });
            });
        })
        .catch(err => {
            console.log(err);
            done(err);
        });
});


describe(url, () => {
    describe("POST", () => {
        test("it should be possible to create a new resource using POST method", async done => {

            const admin = {
                "_id": 13471,
                "name": faker.name.findName(),
                "avatar": faker.image.avatar(),
                "email": faker.internet.email(),
                "password": "dummy1"
            };
            const response = await request(app)
                .post("/v2/academy/admin")
                .send(admin);
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe("application/json");
            expect(response.body._id).toEqual(admin._id);
            expect(response.body.name).toEqual(admin.name);
            expect(response.body.avatar).toEqual(admin.avatar);
            expect(response.body.email).toEqual(admin.email);
            expect(response.body.createdOn).toBeDefined();
            done();
        });

        test("it should not be possible to create a new resource without required fields", async done => {
            const admin = {
                "_id": 13471,
                "name": faker.name.findName(),
                // "avatar": faker.image.avatar(), REQUIRED
                "email": faker.internet.email(),
                "password": "dummy1"
            };
            const response = await request(app)
                .post("/v2/academy/admin")
                .send(admin);
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe("application/json");
            expect(response.body.name).toBeDefined();
            expect(response.body.message).toBeDefined();
            done();
        });

        test("it should not be possible to create a new resource with an existant ID", async done => {
            const admin = {
                "_id": 13471,
                "name": faker.name.findName(),
                "avatar": faker.image.avatar(),
                "email": faker.internet.email(),
                "password": "dummy1"
            };
            const response = await request(app)
                .post("/v2/academy/admin")
                .send(admin);
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe("application/json");
            expect(response.body.message).toBeDefined();
            done();
        });
    });
});