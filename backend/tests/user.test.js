import request from 'supertest';
import app from '../src/app.js';

describe('User API', () => {
  it('should register a user and return a token', async () => {
    const res = await request(app).post('/api/users/register').send({
      email: 'new@example.com',
      password: 'password@123',
    });
    expect(res.statusCode).toBe(200); // Ensure API success
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          token: expect.any(String),
        }),
        message: 'User created successfully',
        metadata: null,
      })
    );
  });
  it('should fail if email exist', async () => {
    const res = await request(app).post('/api/users/register').send({
      email: 'new@example.com',
      password: 'password@123',
    });
    expect(res.statusCode).toBe(409); // Ensure API success
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User already exists',
      })
    );
  });

  it('should fail if email or password is missing', async () => {
    const res = await request(app).post('/api/users/register').send({});
    expect(res.statusCode).toBe(400); // Expect validation error
  });
});

