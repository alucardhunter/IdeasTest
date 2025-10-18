import prisma from '../src/prismaClient';

async function main() {
  await prisma.user.createMany({ data: [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Carol', email: 'carol@example.com' }
  ]});

  await prisma.idea.create({ data: { title: 'Produto A', description: 'Descrição A', createdBy: 1 }});
}

main().catch(e=>{ console.error(e); process.exit(1);}).finally(()=>prisma.$disconnect());
