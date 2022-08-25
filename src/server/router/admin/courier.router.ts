import * as trpc from '@trpc/server'
import { z } from 'zod'
import { CourierInputSchema } from '../../../schemes/courier.schema'
import { createRouter } from '../context'

export const courierRouter = createRouter()
  .mutation('create', {
    input: CourierInputSchema,
    async resolve({ input, ctx }) {
      try {
        const courier = await ctx.prisma.courier.create({
          data: { ...input },
        })

        return courier
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Something went wrong! ${error}`,
        })
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        const couriers = await ctx.prisma.courier.findMany()

        return couriers
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find couriers! ${error}`,
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
        const courier = await ctx.prisma.courier.findUnique({
          where: { id },
          include: {
            orders: true,
          },
        })

        return courier
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Sorry, We coudn\`t find any courier with id ${id}`,
        })
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
        const updatedCourier = await ctx.prisma.courier.update({
          where: { id },
          data,
        })

        return updatedCourier
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coudn\`t update courier with id! ${id}`,
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
        const deletedCourier = await ctx.prisma.courier.delete({
          where: { id },
        })

        return deletedCourier
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We coudn\`t delete courier with id! ${id}`,
        })
      }
    },
  })
