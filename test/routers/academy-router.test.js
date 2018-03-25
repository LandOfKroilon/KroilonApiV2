const request = require('supertest');
const app = require('../../app');

describe('Related to the current academy', () => {
    test('It should be possible to get a representation', async () => {
        const response = await request(app).get('/academy');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
        // TODo assert content of body
    });

    test('It should be possible to get a list of trainees', async () => {

    });

    test('It should be possible to get a list of stories', async () => {

    });

    test('It should be possible to insert a set of stories as configuration', async () => {

    });

    test('It should be possible to get a list of session´s points', async () => {

    });

});

describe('Related to the current academy', () => {

    test('It should be possible to insert a new academy and make it the current one', async () => {

    });

});