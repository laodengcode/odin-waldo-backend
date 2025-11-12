import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const game = await prisma.gameImage.create({
    data: {
      title: 'Find Waldo - Beach',
      imageUrl: 'https://res.cloudinary.com/dlhr9tbva/image/upload/v1762676267/main-sample.png',
      naturalW: 4000,
      naturalH: 3000,
      characters: {
        create: [
          { name: 'Waldo', x_pct: 0.124, y_pct: 0.553, w_pct: 0.03, h_pct: 0.06 },
          { name: 'Wizard', x_pct: 0.44, y_pct: 0.60, w_pct: 0.03, h_pct: 0.06 }
        ]
      }
    }
  });
  console.log('Seeded game:', game.id);
}

main().finally(() => prisma.$disconnect());
