import request from 'supertest';
import app from '../src/app';

jest.mock('../src/prismaClient', () => ({
  __esModule: true,
  default: {
    idea: { findMany: jest.fn().mockResolvedValue([]), create: jest.fn(), findUnique: jest.fn().mockResolvedValue(null) },
    user: { findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Alice', email: 'a@x' }]) },
    vote: { create: jest.fn() },
    comment: { create: jest.fn() }
  }
}));

describe('Ideas API (mocked prisma)', () => {
  it('GET /ideas returns 200', async () => {
    const res = await request(app).get('/ideas');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /users returns 200', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
