import * as trpc from '@trpc/server'
import { OrderInputSchema } from '../../../schemes/order.schema'
import { createRouter } from '../context'

export const orderRouter = createRouter()
  .mutation('create', {
    input: OrderInputSchema,
    async resolve({ ctx, input: { courierId, categories, ...data } }) {
      try {
        const order = await ctx.prisma.order.create({
          data: {
            ...data,
            courier: {
              connect: {
                id: courierId,
              },
            },
            categories: {
              create: categories.map((id) => ({
                category: {
                  connect: {
                    id: id,
                  },
                },
              })),
            },
          },
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
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        const orders = await ctx.prisma.order.findMany({
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        })

        return orders
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any catagories! ${error}`,
        })
      }
    },
  })
