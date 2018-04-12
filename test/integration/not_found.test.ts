const request = require("supertest");
import app from "../../src/app";

describe("Send a request to an uri that does not exists", () => {
    test("It should respond with 404 status code", async () => {
        expect((await request(app).get("/some_dummy_uri")).statusCode).toBe(404);
    });
});