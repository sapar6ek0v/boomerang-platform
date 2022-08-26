import * as trpc from '@trpc/server';
import { z } from 'zod';
import { CourierInputSchema } from '../../../schemes/courier.schema';
import { createRouter } from '../context';

export const courierRouter = createRouter()
  .mutation('create', {
    input: CourierInputSchema,
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.courier.create({
          data: { ...input },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Something went wrong! ${error}`,
        });
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.courier.findMany();
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find couriers! ${error}`,
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
        return await ctx.prisma.courier.findUnique({
          where: { id },
          include: {
            orders: true,
          },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any courier with id ${id}`,
        });
      }
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      data: CourierInputSchema.partial(),
    }),
    async resolve({ ctx, input: { data, id } }) {
      try {
        return await ctx.prisma.courier.update({
          where: { id },
          data,
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coudn\`t update courier with id! ${id}`,
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
        return await ctx.prisma.courier.delete({
          where: { id },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coudn\`t delete courier with id! ${id}`,
        });
      }
    },
  });
