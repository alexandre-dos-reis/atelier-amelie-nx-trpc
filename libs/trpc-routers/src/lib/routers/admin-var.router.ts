import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const AdminVarRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      const vars = await prisma.adminVariable.findMany();
      return {
        vars,
      };
    },
  })

  .query('getOne', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const config = await prisma.adminVariable.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      return {
        config,
      };
    },
  });
