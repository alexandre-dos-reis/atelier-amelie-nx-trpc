import * as trpc from '@trpc/server';
import { z } from 'zod';
import prisma from "@atelier-amelie-nx-trpc/prisma"

export const ArtworkRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      return {
        artworks: await prisma.artwork.findMany(),
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
        }),
      };
    },
  });

//   .query('getOne', {
//     input:
//     async resolve()
//   });
