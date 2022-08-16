import { z } from 'zod';

const charsMinMessage = 'Au moins trois caractères sont requis !';

export const updateOrCreateOneSchema = z.object({
  id: z.number().int(),
  name: z.string().min(3, charsMinMessage).max(255),
  slug: z.string().min(3, charsMinMessage).max(255),
  description: z.string().min(3, charsMinMessage).nullish(),
  showInGallery: z.boolean(),
});
export type updateOrCreateOneSchemaType = z.infer<typeof updateOrCreateOneSchema>;

export const updateShowInGallerySchema = z.object({
  id: z.number().positive(),
  isChecked: z.boolean(),
});

export type updateShowInGallerySchemaType = z.infer<typeof updateShowInGallerySchema>;
