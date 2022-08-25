import * as trpc from '@trpc/server'
import { OrderInputSchema } from '../../../schemes/order.schema'
import { createRouter } from '../context'

export const orderRouter = createRouter().mutation('create', {
  input: OrderInputSchema,
  async resolve({ ctx, input: { courierId, ...data } }) {
    try {
      const order = await ctx.prisma.order.create({
        data: { ...data, courier: { connect: { id: courierId } } },
      })

      return order
    } catch (error) {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Something went wrong, we coudnn\`t create an Order! ${error}`,
      })
    }
  },
})
