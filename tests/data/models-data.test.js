"use strict";

//Tests interact with a database of cities.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dummyData = require('../resources/dummy-data');

//timeout to wait for async operations
const asyncTimeout = 15000;

//local uri to db instance
const localDbInstanceUri = 'mongodb://localhost:27017/kroilon_local';


let connection;
let db;
let Academy;
let Admin;

/**
 * Path to resource files with dummy data for testing purposes.
 */
const seedFilePath = '../resources/dummy_academia.json';

beforeAll((done) => {
    mongoose.connect(localDbInstanceUri);
    connection = mongoose.connection;
    initializeDatabase(connection, done);
}, asyncTimeout);

afterAll((done) => {
    connection.db.dropDatabase(() => connection.close(done));
}, asyncTimeout);


describe('After database is seeded with dummy data', () => {
    test('it must have exactly the expected ammount of records for Admin collection', (done) => {
        Admin.find({}).exec((err, admins) => {
            if (err) {
                expect(err).toBeUndefined();
                done();
            }
            expect(admins).toBeDefined();
            expect(admins.length).toBe(1);
            done();
        });
    });

    test('it must have exactly the expected ammount of records for Academy collection', (done) => {
        Academy.find({}).exec((err, academies) => {
            if (err) {
                expect(err).toBeUndefined();
                done();
            }
            expect(academies).toBeDefined();
            expect(academies.length).toBe(1);
            done();
        });
    });

    test('the records have the same data from the seed file', () => {
        Academy.find({}).exec((err, academies) => {
            if (err) {
                expect(err).toBeUndefined();
                done();
            }

            expect(academies).toBeDefined();
            expect(academies[0].sessions.length).toBe(0);
            expect(academies[0].admins.length).toBe(1);
            expect(academies[0].trainees.length).toBe(3);
            expect(academies[0].createdOn).toBeDefined();
            expect(academies[0].name).toBe("dummy name");
            expect(academies[0].dailyMessage).toBe("dummy daily message");
            done();
        });
    });
});

function initializeDatabase(connection, done) {
    connection.on('open', () => {
        const testSchema = new Schema({
            trainees: [],
            admins: [],
            sessions: [],
            name: String,
            dailyMessage: String,
            createdOn: {
                type: Date,
                default: Date.now
            },
        });

        const testAdminSchema = new Schema({
            id: Number,
            name: String,
            email: String,
            avatar: String,
            hash: String
        });

        Academy = mongoose.model('Academy', testSchema);
        Admin = mongoose.model('Admin', testAdminSchema);

        var admin = new Admin({
            id: 1,
            name: "Pedro Crespo",
            email: "pedro.crespo@novabase.pt",
            avatar: "/february2017/13471.PNG",
            hash: "12345"
        });

        var academy = new Academy({
            trainees: dummyData.trainees,
            admins: dummyData.admins,
            sessions: dummyData.sessions,
            name: "dummy name",
            dailyMessage: "dummy daily message"
        });

        academy.save((err) => {
            if (err) {
                console.error(err);
                done();
                throw err;
            }

            console.log("Academy saved!");

            admin.save((err) => {
                if (err){
                    console.error(err);
                    done();
                    throw err;
                }
                console.log("Admin saved!");
                done();
            });

        });
    });
}