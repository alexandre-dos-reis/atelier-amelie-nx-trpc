import { z } from 'zod';

export const productsListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  updatedAt: z.date(),
  forSale: z.boolean(),
  stock: z.number(),
  artwork: z.object({
    name: z.string(),
    id: z.number(),
  }),
  shopCategory: z.object({
    id: z.number(),
    name: z.string(),
    parentCategory: z.object({
      id: z.number(),
      name: z.string(),
    }).nullish()
  })
});

export const productsListSchema = z.array(productsListItemSchema);