import * as trpc from '@trpc/server'
import { BranchInputSchema } from '../../../schemes/branch.schema'
import { createRouter } from '../context'

export const branchRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        const branches = await ctx.prisma.restaurantBranch.findMany()

        return branches
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any restaurant branches! ${error}`,
        })
      }
    },
  })
  .mutation('create', {
    input: BranchInputSchema,
    async resolve({ ctx, input: { restaurantId, ...data } }) {
      try {
        const branches = await ctx.prisma.restaurantBranch.create({
          data: {
            ...data,
            restaurant: { connect: { id: restaurantId } },
          },
        })

        return branches
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `${error}`,
        })
      }
    },
  })
