import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { prisma } from '../../libs/prisma/src';

export async function shopSeeds() {
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
        not: null,
      },
    },
  });

  for (let i = 0; i < artworks.length; i++) {
    await prisma.product.createMany({
      data: Array.from({
        length: faker.datatype.number({
          min: 1,
          max: 3,
        }),
      }).map((_) => {
        const name = faker.random.words();
        return {
          name,
          slug: slugify(name, { lower: true }),
          description: faker.random.words(20),
          price: faker.datatype.number({
            min: 1000,
            max: 50000,
          }),
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

  const products = await prisma.product.findMany();

  const numberOfImages = faker.datatype.number({
    min: 1,
    max: 5,
  });

  products.forEach(async (p) => {
    await prisma.productImage.createMany({
      data: Array.from({ length: numberOfImages }).map((_) => ({
        filename: faker.system.commonFileName('jpg'),
        productId: p.id,
        showInGallery: faker.helpers.arrayElement([true, false]),
      })),
    });
  });
}
