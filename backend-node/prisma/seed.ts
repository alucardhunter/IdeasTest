import prisma from '../src/prismaClient';

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Carol', email: 'carol@example.com' }
    ]
  });

  await prisma.idea.create({ data: { title: 'Utilização de IA no dia a dia.', description: 'Aplicação de ferramentas e processos utilizando IA para aumentar a produtividade da empresa.', createdBy: 1 } });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
