import instance from "mongodb";
const MongoClient = instance.MongoClient;
import assert from "assert";



// timeout to wait for async operations
const asyncTimeout = 25000;


let connection;

beforeAll((done) => {
    MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
        assert.equal(undefined, err);
        console.log("Connected successfully to server");

        connection = client.db("kroilon_local");



        done();
      });
}, asyncTimeout);


afterAll((done) => {
    connection.close(false, (err) => {
        assert.equal(undefined, err);
        console.log("Connection successfully closed");
        done();
    });
}, asyncTimeout);


describe("After database is seeded with dummy data", () => {
    test("it must have exactly the expected ammount of records for Admin collection", (done) => {

        const collection = connection.collection("Admin");
        collection.find({})
            .toArray(function(err, docs) {
                assert.equal(err, undefined);
                expect(docs).toBeDefined();
                expect(docs.length).toBe(1);
                done();
            });
    });

    test("it must have exactly the expected ammount of records for Academy collection", (done) => {
        const collection = connection.collection("Academy");
        collection.find({})
            .toArray(function(err, academies) {
                assert.equal(err, undefined);
                expect(academies).toBeDefined();
                expect(academies.length).toBe(1);
                done();
            });
    });

    test("the records have the same data from the seed file", (done) => {
        const collection = connection.collection("Academy");
        collection.find({})
            .toArray(function(err, academies) {
                assert.equal(err, undefined);
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

    test("the records have the same data from the seed file", (done) => {
        const collection = connection.collection("Academy");
        collection.find({})
            .toArray(function(err, academies) {
                assert.equal(err, undefined);
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
