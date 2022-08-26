import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string({
    required_error: 'Restaurant name is required',
    invalid_type_error: 'Restaurant name must be a string',
  }),
  restaurantId: z.string({
    required_error: 'RestaurantId name is required',
    invalid_type_error: 'RestaurantId name must be a string',
  }),
});

export const CategoryInputSchema = CategorySchema.omit({
  id: true,
});

export type CategoryReturnType = z.TypeOf<typeof CategorySchema>;

export type CourierInput = z.TypeOf<typeof CategoryInputSchema>;
