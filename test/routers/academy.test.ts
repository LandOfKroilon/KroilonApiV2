import assert from "assert";
import mongoose from "mongoose";
const request = require("supertest");
import Admin = require("../../src/models/mixin/Admin");


// timeout to wait for async operations
const asyncTimeout = 25000;


beforeAll((done) => {
    mongoose.connect("mongodb://localhost:27017/kroilon_local")
            .then(() => {
                console.log("Connected successfully to server");
                done();
            },
            err => {
                console.error(err);
                done();
            });
});

/*
afterAll((done) => {
    connection.close(false, (err) => {
        assert.equal(undefined, err);
        console.log("Connection successfully closed");
        done();
    });
}, asyncTimeout);
*/

describe("Admin", () => {
    test("Create", async (done) => {
        mongoose.connection.createCollection("Admin").then(() => {
            const admin = new Admin({
                "name": "Pedro Crespo",
                "email": "pedro.crespo@novabase.pt",
                "avatar": "/february2017/13471.PNG",
                "hash": "12345"
            });
            admin.save();
            console.log(`Admin ${admin._id}-${admin.name} saved`);
            done();
        },
        err => {
            console.error(err);
        });
    });
});