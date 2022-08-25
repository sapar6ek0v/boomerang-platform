import * as trpc from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '../context'

export const restaurantRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        const restaurants = await ctx.prisma.restaurant.findMany()

        return restaurants
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any restaurants! ${error}`,
        })
      }
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input: { id } }) {
      try {
        const restaurant = await ctx.prisma.restaurant.findUnique({
          where: { id },
          include: {
            branches: true,
          },
        })

        return restaurant
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find restaurants with  id ${id}`,
        })
      }
    },
  })
