"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
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
        const res = await (0, supertest_1.default)(app_1.default).get('/ideas');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /users returns 200', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
