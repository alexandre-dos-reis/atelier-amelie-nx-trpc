import { z } from 'zod';

const charsMinMessage = 'Au moins trois caractères sont requis !';

export const updateOrCreateOneSchema = z.object({
  id: z.number().int(),
  name: z.string().min(3, charsMinMessage).max(255),
  slug: z.string().min(3, charsMinMessage).max(255),
  description: z.string().min(3, charsMinMessage),
  madeAt: z.date().nullish(),
  showInGallery: z.boolean(),
  showInPortfolio: z.boolean(),
  categories: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .array()
    .min(1, 'Au moins une catégorie est requise !'),
});
export type updateOrCreateOneSchemaType = z.infer<typeof updateOrCreateOneSchema>;

export const updateShowInGallerySchema = z.object({
  id: z.number().positive(),
  isChecked: z.boolean(),
});
export type updateShowInGallerySchemaType = z.infer<typeof updateShowInGallerySchema>;
