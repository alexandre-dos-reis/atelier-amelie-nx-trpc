import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';
import { artwork } from '@atelier-amelie-nx-trpc/validation-schema';
import { ucFirst } from '@atelier-amelie-nx-trpc/helpers';
import { Prisma } from '@prisma/client';

export const ArtworkRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      const artworks = await prisma.artwork.findMany({
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        artworks: artworks.map((a) => ({
          ...a,
          categories: a.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        })),
      };
    },
  })

  .query('getOne', {
    input: z.number(),
    async resolve({ input }) {
      const artwork = await prisma.artwork.findUniqueOrThrow({
        where: {
          id: input,
        },
        select: {
          id: true,
          madeAt: true,
          description: true,
          name: true,
          slug: true,
          showInGallery: true,
          showInPortfolio: true,
          categories: true,
        },
      });
      return {
        ...artwork,
        categories: artwork.categories.map((c) => ({
          label: c.name,
          value: c.id,
        })),
      };
    },
  })

  .query('getCategoriesForSelect', {
    async resolve() {
      const categories = await prisma.category.findMany();
      return {
        categories: categories.map((c) => ({
          label: c.name,
          value: c.id,
        })),
      };
    },
  })

  .mutation('updateOne', {
    input: artwork.updateOrCreateOneSchema,
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.update({
          where: {
            id: input.id,
          },
          include: {
            categories: true,
          },
          data: {
            name: ucFirst(input.name),
            slug: input.slug,
            description: input.description,
            showInGallery: input.showInGallery,
            showInPortfolio: input.showInPortfolio,
            madeAt: input.madeAt,
            categories: {
              set: input.categories.map((c) => ({ id: c.value })),
            },
          },
        }),
      };
    },
  })

  .mutation('updateShowInGallery', {
    input: artwork.updateShowInGallerySchema,
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.update({
          where: {
            id: input.id,
          },
          data: {
            showInGallery: input.isChecked,
          },
          include: {
            categories: true,
          },
        }),
      };
    },
  })

  .mutation('deleteOne', {
    input: z.number(),
    async resolve({ input }) {
      try {
        const artwork = await prisma.artwork.delete({
          where: {
            id: input,
          },
        });
        return {
          artwork,
        };
      } catch (e) {
        let message = '';
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2003') {
            message =
              'Il y a des produits associés à cette oeuvre. Supprimez les ou désactivez la publication. ';
          }
        }

        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message,
          cause: e,
        });
      }
    },
  })

  .mutation('createOne', {
    input: artwork.updateOrCreateOneSchema,
    async resolve({ input }) {
      const artwork = await prisma.artwork.create({
        include: {
          categories: true,
        },
        data: {
          name: ucFirst(input.name),
          slug: input.slug,
          description: input.description,
          showInGallery: input.showInGallery,
          showInPortfolio: input.showInPortfolio,
          madeAt: input.madeAt,
          filename: '',
          categories: {
            connect: input.categories.map((c) => ({ id: c.value })),
          },
        },
      });
      return {
        artwork: {
          ...artwork,
          categories: artwork.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        },
      };
    },
  });
