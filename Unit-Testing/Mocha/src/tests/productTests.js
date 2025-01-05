const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Product API', () => {
    it('should fetch all products', (done) => {
        request(app)
            .get('/api/products')
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.ok(Array.isArray(res.body));
                done();
            });
    });

    it('should add a new product', (done) => {
        const product = { name: 'Tablet' };
        request(app)
            .post('/api/products')
            .send(product)
            .end((err, res) => {
                assert.strictEqual(res.status, 201);
                assert.deepStrictEqual(res.body.name, 'Tablet');
                assert.ok(res.body.id);
                done();
            });
    });
});
