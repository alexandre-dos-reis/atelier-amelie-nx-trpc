import { prisma } from '../../libs/prisma/src';

export async function settingsSeed() {
  // SHIPPING COSTS
  const shippingCostsArray = [
    [3000, 500, 0],
    [5000, 500, 250],
    [20000, 500, 400],
    [30000, 500, 500],
    [40000, 500, 600],
    [50000, 500, 700],
    [60000, 500, 800],
    [70000, 500, 900],
    [80000, 500, 1000],
    [90000, 500, 1100],
    [100000, 500, 1200],
  ];

  await prisma.shippingCost.createMany({
    data: shippingCostsArray.map((sc) => ({
      max: sc[0],
      weightCost: sc[1],
      insuranceCost: sc[2],
    })),
  });

  // App Variables
  await prisma.adminVariable.create({
    data: {
      key: 'cgv',
      value: '<div>CGV</div>',
    },
  });
}
