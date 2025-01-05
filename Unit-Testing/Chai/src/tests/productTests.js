const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Product API', () => {
    it('should fetch all products', (done) => {
        chai.request(app)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should add a new product', (done) => {
        const product = { name: 'Tablet' };
        chai.request(app)
            .post('/api/products')
            .send(product)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('Tablet');
                done();
            });
    });
});
