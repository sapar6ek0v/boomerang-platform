import { z } from 'zod'
import { BranchSchema } from './branch.schema'

export const RestaurantSchema = z.object({
  id: z.string().cuid(),
  name: z.string({
    required_error: 'Restaurant name is required',
    invalid_type_error: 'Restaurant name must be a string',
  }),
  branches: z.array(BranchSchema),
})

export const RestaurantInputSchema = RestaurantSchema.omit({
  id: true,
})

export type CourierInput = z.TypeOf<typeof RestaurantInputSchema>
