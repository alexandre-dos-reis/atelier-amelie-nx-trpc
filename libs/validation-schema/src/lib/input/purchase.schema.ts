import { z } from 'zod';

import { Purchase } from '@prisma/client';

export const updateOneSchema = z.object({
  id: z.string().uuid(),
  status: z.string(),
  trackingNumber: z.string(),
});

export type updateOrCreateOneSchemaType = z.infer<typeof updateOneSchema>;
