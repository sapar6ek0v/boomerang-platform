import * as trpc from '@trpc/server';
import { z } from 'zod';
import { RestaurantInputSchema } from '../../../schemes/restaurant.schema';
import { createRouter } from '../context';

export const restaurantRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.restaurant.findMany();
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any restaurants! ${error}`,
        });
      }
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input: { id } }) {
      try {
        return await ctx.prisma.restaurant.findUnique({
          where: { id },
          include: {
            branches: true,
          },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find restaurant with  id ${id}`,
        });
      }
    },
  })
  .mutation('create', {
    input: RestaurantInputSchema,
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.restaurant.create({
          data: { ...input },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t create restaurant ${error}`,
        });
      }
    },
  })
  .mutation('update', {
    input: z.object({
      data: RestaurantInputSchema,
      id: z.string(),
    }),
    async resolve({ ctx, input: { id, data } }) {
      try {
        return await ctx.prisma.restaurant.update({
          where: { id },
          data,
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t update restaurant with id ${id}`,
        });
      }
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input: { id } }) {
      try {
        return await ctx.prisma.restaurant.delete({
          where: { id },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t delete restaurant with id ${id}`,
        });
      }
    },
  });
