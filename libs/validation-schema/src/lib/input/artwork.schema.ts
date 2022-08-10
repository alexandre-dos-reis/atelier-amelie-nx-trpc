import { z } from 'zod';

export const updateOrCreateOneSchema = z.object({
  id: z.number().int(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3),
  madeAt: z.date().nullable().optional(),
  showInGallery: z.boolean(),
  showInPortfolio: z.boolean(),
  categories: z.object({
    value: z.number(),
    label: z.string(),
  }).array(),
});

export type updateOrCreateOneSchemaType = z.infer<typeof updateOrCreateOneSchema>;
