import assert from "assert";
import mongoose from "mongoose";
const request = require("supertest");
import Admin = require("../../src/models/mixin/Admin");
import faker from "faker";

const predefinedAdmins = [{
    "_id": "13471",
    "name": faker.name.findName(),
    "avatar": faker.image.avatar(),
    "email": faker.internet.email(),
    "password": "dummy1",
    "profile": "Admin"
},
{
    "_id": "23770",
    "name": faker.name.findName(),
    "avatar": faker.image.avatar(),
    "email": faker.internet.email(),
    "password": "dummy1",
    "profile": "Admin"
}];


beforeAll((done) => {
    mongoose.connect("mongodb://localhost:27017/kroilon_local")
            .then(() => {
                console.log("Connected successfully to server");
                seedData(done);
            },
            err => {
                console.error(err);
                done();
            });
});


function seedData(done: Function) {
    mongoose.connection.createCollection("Admin").then(() => {

        predefinedAdmins.forEach(element => {
            const admin = new Admin(element);
            admin.save();
        });

        done();
    },
    err => {
        console.error(err);
    });
}


/*
afterAll((done) => {
    mongoose.connection.dropCollection("Admin", () => {
        console.log(`Admin collection dropped`);
        done();
    });
}, );
*/

describe("/v1/academy/admin", () => {
    test("POST", async (done) => {

        // it should be possible to create a new resource using POST method

        const newAdmin = {
            "_id": "23616",
            "name": faker.name.findName(),
            "avatar": faker.image.avatar(),
            "email": faker.internet.email(),
            "password": "dummy1",
            "profile": "Admin"
        };



    });
});