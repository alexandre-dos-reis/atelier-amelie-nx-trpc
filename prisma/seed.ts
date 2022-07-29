import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 50; i++) {
    const name = faker.random.words();

    await prisma.artwork.create({
      data: {
        filename: "Manet.jpg",
        name,
        slug: slugify(name, { lower: true }),
        description: faker.random.words(20),
        showInGallery: faker.helpers.arrayElement([true, false]),
      },
    });
  }
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
