import { z } from 'zod';

export const updateOneSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().nullable(),
  madeAt: z.date().nullable(),
  showInGallery: z.boolean(),
  showInPortfolio: z.boolean(),
  categories: z.object({
    value: z.number(),
    label: z.string()
  }).array(),
});
