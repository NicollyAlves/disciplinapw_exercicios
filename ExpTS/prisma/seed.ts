import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const major = await prisma.major.findFirst({
    where: { code: 'IE17' },
  });

  if (!major) {
    await prisma.major.create({
      data: {
        name: 'Engenharia de Software',
        code: 'IE17',
        description: 'Descrição do curso',
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
