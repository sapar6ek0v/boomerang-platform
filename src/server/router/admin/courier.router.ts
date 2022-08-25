import * as trpc from '@trpc/server'
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
  .query('get', {
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
