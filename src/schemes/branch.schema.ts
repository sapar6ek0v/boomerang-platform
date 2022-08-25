import { z } from 'zod'

export const BranchSchema = z.object({
  id: z.string().cuid(),
  name: z.string({
    required_error: 'Restaurant Branch name is required',
    invalid_type_error: 'Restaurant name must be a string',
  }),
  restaurantId: z.string({
    required_error: 'RestaurantId name is required',
    invalid_type_error: 'RestaurantId name must be a string',
  }),
  branchName: z.string({
    required_error: 'Branch Name name is required',
    invalid_type_error: 'Branch Name name must be a string',
  }),
})

export const BranchInputSchema = BranchSchema.omit({
  id: true,
})

export type BranchInput = z.TypeOf<typeof BranchInputSchema>
