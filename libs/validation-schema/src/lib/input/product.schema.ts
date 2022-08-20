import { z } from 'zod';

const charsMinMessage = 'Au moins trois caractères sont requis !';

export const updateOrCreateOneSchema = z.object({
  id: z.number().int(),
  name: z.string().min(3, charsMinMessage).max(255),
  slug: z.string().min(3, charsMinMessage).max(255),
  description: z.string().min(3, charsMinMessage),
  stock: z.number().min(0),
  width: z.number().nullish(),
  height: z.number().nullish(),
  price: z.number().min(0),
  forSale: z.boolean(),
  shopCategory: z.object({
    value: z.number(),
    label: z.string(),
  }),
});
export type updateOrCreateOneSchemaType = z.infer<typeof updateOrCreateOneSchema>;

export const updateForSaleSchema = z.object({
  id: z.number().positive().int(),
  isChecked: z.boolean(),
});
export type updateForSaleSchemaType = z.infer<typeof updateForSaleSchema>;
