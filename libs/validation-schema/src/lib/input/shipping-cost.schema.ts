import { z } from 'zod';

const positiveMessage = 'La valeur doit être être positive !';

export const updateOrCreateOneSchema = z.object({
  id: z.number(),
  max: z.number().positive(positiveMessage),
  weightCost: z.number().positive(positiveMessage),
  insuranceCost: z.number().positive(positiveMessage),
});

export type updateOrCreateOneSchemaType = z.infer<typeof updateOrCreateOneSchema>;
