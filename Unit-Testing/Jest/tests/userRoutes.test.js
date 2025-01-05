const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user');

// Configure a separate database for testing to avoid deleting production data.

describe('User API Tests', () => {
// beforeAll => connects to the database before tests run.
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
// afterAll => disconnects from the database after all tests are complete.
  afterAll(async () => {
    await mongoose.connection.close();
  });
// beforeEach => clears the User collection to ensure tests are isolated.
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should create a new user', async () => {
    const user = { name: 'Alice', email: 'alice@example.com' };
    const res = await request(app).post('/api/users').send(user);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Alice');
    expect(res.body.email).toBe('alice@example.com');
  });

  it('should fetch all users', async () => {
    await User.create([{ name: 'Alice', email: 'alice@example.com' }]);
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Alice');
  });

  it('should fetch a user by ID', async () => {
    const user = await User.create({ name: 'Bob', email: 'bob@example.com' });
    const res = await request(app).get(`/api/users/${user._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Bob');
  });

  it('should delete a user', async () => {
    const user = await User.create({ name: 'Charlie', email: 'charlie@example.com' });
    const res = await request(app).delete(`/api/users/${user._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });
});
