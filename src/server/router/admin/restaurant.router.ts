import * as trpc from '@trpc/server'
import { z } from 'zod'
import { RestaurantInputSchema } from '../../../schemes/restaurant.schema'
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
          message: `Sorry, We coudn\`t find restaurant with  id ${id}`,
        })
      }
    },
  })
  .mutation('create', {
    input: RestaurantInputSchema,
    async resolve({ ctx, input }) {
      try {
        const newRestaurant = await ctx.prisma.restaurant.create({
          data: { ...input },
        })

        return newRestaurant
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t create restaurant ${error}`,
        })
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
        const updatedRestaurant = await ctx.prisma.restaurant.update({
          where: { id },
          data,
        })

        return updatedRestaurant
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t update restaurant with id ${id}`,
        })
      }
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input: { id } }) {
      try {
        const deletedRestaurant = await ctx.prisma.restaurant.delete({
          where: { id },
        })

        return deletedRestaurant
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t delete restaurant with id ${id}`,
        })
      }
    },
  })
