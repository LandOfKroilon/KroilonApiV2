const request = require('supertest');
const app = require('../../app');

describe('Request the current academy', () => {
    test('It should respond with a valid representation of an academy resource', async () => {
        const response = await request(app).get('/academy');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
});