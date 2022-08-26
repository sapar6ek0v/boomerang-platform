import * as trpc from '@trpc/server';
import { CategoryInputSchema } from '../../../schemes/category.schema';
import { createRouter } from '../context';

export const categoryRouter = createRouter()
  .mutation('create', {
    input: CategoryInputSchema,
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.category.create({
          data: {
            ...input,
          },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any restaurant branches! ${error}`,
        });
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.category.findMany();
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any catagories! ${error}`,
        });
      }
    },
  });
