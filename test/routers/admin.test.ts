import assert from "assert";
import mongoose from "mongoose";
const request = require("supertest");
import Admin = require("../../src/models/mixin/Admin");

const predefinedAdmins = [{
    "_id": "13471",
    "name": "Pedro Crespo",
    "avatar": "13471.png",
    "email": "pedro.crespo@novabase.pt",
    "password": "dummy1",
    "profile": "Admin"
},
{
    "_id": "23770",
    "name": "Rúben Rego",
    "avatar": "23770.png",
    "email": "nb23770@novabase.pt",
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
            console.log(`Admin ${admin._id}-${admin.name} saved`);
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
            "name": "Fábio Ribeiro ",
            "avatar": "nb23616.png",
            "email": "nb23616@novabase.pt",
            "password": "dummy1",
            "profile": "Admin"
        };



    });
});