"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../src/prismaClient"));
async function main() {
    await prismaClient_1.default.user.createMany({ data: [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Carol', email: 'carol@example.com' }
        ] });
    await prismaClient_1.default.idea.create({ data: { title: 'Produto A', description: 'Descrição A', createdBy: 1 } });
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prismaClient_1.default.$disconnect());
