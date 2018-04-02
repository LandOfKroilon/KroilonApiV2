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
        const response = await request(app).get('/academy/trainees');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
    });

    test('It should be possible to get a list of stories', async () => {
        const response = await request(app).get('/academy/config/story');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
    });

    test('It should be possible to insert a set of stories as configuration', async () => {
        const response = await request(app)
            .post('/academy/config/story')
            .send({
                "num": 1,
                "title": "Primeira Historia",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut mauris eu orci scelerisque feugiat at a quam. Proin tincidunt est in ligula hendrerit porta. Suspendisse ut neque pellentesque, tristique mi id, iaculis metus. Vestibulum vitae massa mi. Morbi luctus sapien sit amet massa scelerisque, eget luctus massa aliquam. Ut nec risus quis nisl bibendum sodales quis ut magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse non convallis purus. Vivamus sed mauris id quam suscipit tincidunt. Nunc in libero neque. Quisque semper lectus at ligula fermentum laoreet non vitae lectus. Vestibulum efficitur leo tellus, nec scelerisque dui malesuada eu. Nullam varius turpis massa, a consectetur ipsum tempus vitae. Quisque lobortis, nisi quis iaculis blandit, justo orci fringilla libero, sed tincidunt quam nibh a mauris. Maecenas vel maximus metus, in lacinia massa. In quis lorem cursus, bibendum eros at, gravida nunc. Maecenas feugiat nisi nec ipsum ultricies rutrum. Praesent sit amet est sem. Pellentesque finibus dolor sed tellus gravida, eu euismod nunc blandit. Sed at feugiat eros. Etiam congue diam in mauris finibus, sed blandit magna hendrerit. Praesent ac orci porta, consectetur velit sit amet, venenatis lectus. "
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
        expect(response.body).toBe({
            "error": {
             "errors": [
              {
               "domain": "global",
               "reason": "required",
               "message": "Field academy_id required"
              }
             ],
             "code": 400,
             "message": "Required Field Is Missing"
             }
            });
    });

    test('It should be possible to get a list of session´s points', async () => {
        const response = await request(app).get('/academy/sessionpoints');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
    });
});

describe('Related to the current academy', () => {
    test('It should be possible to insert a new academy and make it the current one', async () => {
        const response = await request(app).post('/academy/config/story');
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        expect(response.body).toBeDefined();
    });
});