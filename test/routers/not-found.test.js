const request = require('supertest');
const app = require('../../src/app')

describe('Send a request to an uri that does not exists', () => {
    test('It should respond with 404 status code', async () => {
        const response = await request(app).get('/some_dummy_uri');
        expect(response.statusCode).toBe(404);
    });
});

