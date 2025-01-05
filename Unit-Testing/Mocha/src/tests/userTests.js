const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    it('should fetch all users', (done) => {
        request(app)
            .get('/api/users')
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.ok(Array.isArray(res.body));
                done();
            });
    });

    it('should add a new user', (done) => {
        const user = { name: 'Alice' };
        request(app)
            .post('/api/users')
            .send(user) // sends the user object as the body of the request (equivalent to sending JSON in a POST request).
            .end((err, res) => { 
                assert.strictEqual(res.status, 201); // you can check one value at a time using strictEqual.
                assert.deepStrictEqual(res.body.name, 'Alice'); // you can compare objects(ex. json, array, ...) using deepStrictEqual.
                assert.ok(res.body.id); // theck if value exists(not null nor undefined) using ok.
                done();
            });
    });
});
