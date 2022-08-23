import { prisma } from '../libs/prisma/src';
import { gallerySeeds, shopSeeds, settingsSeed } from './seeds';

async function main() {
  await gallerySeeds();
  await shopSeeds();
  await settingsSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
