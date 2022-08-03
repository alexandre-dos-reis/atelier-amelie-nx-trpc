import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';
import { updateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';

export const ArtworkRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      return {
        artworks: await prisma.artwork.findMany({
          include: {
            categories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
      };
    },
  })

  .query('getOne', {
    input: z.number(),
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.findUniqueOrThrow({
          where: {
            id: input,
          },
          include: {
            categories: true,
          },
        }),
      };
    },
  })

  .mutation('updateOne', {
    input: updateOneSchema,
    async resolve({ input }) {
      console.log(input);
      return {
        ok: 'ok',
        // artwork: await prisma.artwork.update({
        //   where: {
        //     id: input.id,
        //   },
        //   data: {
        //     ...input,
        //   },
        // }),
      };
    },
  });
