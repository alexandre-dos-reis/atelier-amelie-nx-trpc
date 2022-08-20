import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  const catsName = [
    'Calligraphies',
    'Enluminures',
    'Marques-pages',
    'Evènements',
    'Autres techniques',
  ];

  await prisma.category.createMany({
    data: catsName.map((c, i) => ({
      name: c,
      disposition: i + 1,
      slug: slugify(c, { lower: true }),
      description: faker.random.words(20),
      showInGallery: true,
    })),
  });

  const categories = await prisma.category.findMany();

  for (let i = 0; i < 50; i++) {
    const name = faker.random.words();

    await prisma.artwork.create({
      data: {
        filename: 'Manet.jpg',
        name,
        slug: slugify(name, { lower: true }),
        description: faker.random.words(20),
        showInGallery: faker.helpers.arrayElement([true, false]),
        categories: {
          connect: faker.helpers.arrayElements(categories.map((c) => ({ id: c.id }))),
        },
      },
    });
  }

  const shopCategories = [
    {
      parent: 'Oeuvres originales',
      children: ['Enluminures', 'Calligraphies', 'Cartes', 'Marques-pages'],
    },
    {
      parent: 'Reproductions',
      children: ['Marques-pages', 'Cartes-Postales', 'Cartes A5', 'Cartes A4', 'Autres formats'],
    },
  ];

  // SHOP PARENT CATEGORIES
  await prisma.shopCategory.createMany({
    data: shopCategories.map((c, i) => ({
      name: c.parent,
      slug: slugify(c.parent, { lower: true }),
      disposition: i + 1,
    })),
  });

  // SHOP CHILDREN CATEGORIES
  for (let i = 0; i < shopCategories.length; i++) {
    await prisma.shopCategory.createMany({
      data: shopCategories[i].children.map((c, j) => ({
        name: c,
        slug: slugify(c, { lower: true }),
        disposition: j + 1,
        parentCategoryId: i + 1,
      })),
    });
  }

  // PRODUCTS
  const artworks = await prisma.artwork.findMany();
  const shopCategoriesEntities = await prisma.shopCategory.findMany({
    where: {
      parentCategoryId: {
        not: null
      }
    },
  });

  for (let i = 0; i < artworks.length; i++) {
    await prisma.product.createMany({
      data: Array.from({
        length: faker.datatype.number({
          min: 1,
          max: 3,
        }),
      }).map((empty) => {
        const name = faker.random.words();
        return {
          name,
          slug: slugify(name, { lower: true }),
          description: faker.random.words(20),
          price: faker.datatype.number({
            min: 1000,
            max: 50000,
          }),
          // mm
          width: faker.datatype.number({
            min: 10,
            max: 500,
          }),
          height: faker.datatype.number({
            min: 10,
            max: 500,
          }),
          forSale: faker.helpers.arrayElement([true, false]),
          stock: faker.datatype.number({
            min: 0,
            max: 20,
          }),
          artworkId: artworks[i].id,
          shopCategoryId: faker.helpers.arrayElement(shopCategoriesEntities.map((c) => c.id)),
        };
      }),
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
