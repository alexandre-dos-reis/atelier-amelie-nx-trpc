import { prisma } from '../../libs/prisma/src';
import { faker } from '@faker-js/faker';
import { Product, PURCHASE_STATUS } from '@prisma/client';

export async function purchasesSeed() {
  const products = await prisma.product.findMany();
  const sc = faker.helpers.arrayElement(await prisma.shippingCost.findMany());

  const purchasesRange = faker.datatype.number({
    min: 20,
    max: 50,
  });

  const itemsRange = faker.datatype.number({
    min: 1,
    max: 3,
  });

  for (let i = 0; i < purchasesRange; i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const hasSingleAddress = faker.helpers.arrayElement([true, false]);

    await prisma.purchase.create({
      data: {
        email: faker.internet.email(firstname, lastname),
        insuranceCost: sc.insuranceCost,
        weightCost: sc.weightCost,
        status: faker.helpers.objectValue(PURCHASE_STATUS),
        stripeId: faker.datatype.uuid(),
        trackingNumber: faker.datatype.uuid(),
        addresses: {
          createMany: {
            data: hasSingleAddress
              ? [
                  {
                    type: 'SINGLE',
                    addressLine1: faker.address.streetAddress(),
                    addressLine2: faker.address.secondaryAddress(),
                    city: faker.address.cityName(),
                    country: faker.address.country(),
                    fullname: `${firstname} ${lastname}`,
                    postalCode: faker.address.zipCode(),
                    phone: faker.phone.number(),
                  },
                ]
              : [
                  {
                    type: 'BILLING',
                    addressLine1: faker.address.streetAddress(),
                    addressLine2: faker.address.secondaryAddress(),
                    city: faker.address.cityName(),
                    country: faker.address.country(),
                    fullname: `${firstname} ${lastname}`,
                    postalCode: faker.address.zipCode(),
                    phone: faker.phone.number(),
                  },
                  {
                    type: 'DELIVERY',
                    addressLine1: faker.address.streetAddress(),
                    addressLine2: faker.address.secondaryAddress(),
                    city: faker.address.cityName(),
                    country: faker.address.country(),
                    fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    postalCode: faker.address.zipCode(),
                    phone: faker.phone.number(),
                  },
                ],
          },
        },
        items: {
          createMany: {
            data: faker.helpers.arrayElements(products, itemsRange).map((p) => ({
              name: p.name,
              price: p.price,
              quantity: faker.datatype.number({
                min: 1,
                max: 10,
              }),
            })),
          },
        },
      },
    });
  }
}
