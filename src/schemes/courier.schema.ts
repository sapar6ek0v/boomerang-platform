import { z } from 'zod';
import { OrderSchema } from './order.schema';

export const CourierSchema = z.object({
  id: z.string().cuid(),
  courierId: z.string({
    required_error: 'CourierId is required',
    invalid_type_error: 'CourierId must be a string',
  }),
  firstName: z.string({
    required_error: 'First Name is required',
    invalid_type_error: 'First Name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last Name is required',
    invalid_type_error: 'Last Name must be a string',
  }),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
    })
    .optional(),
  orders: z.array(OrderSchema),
});

export const CourierInputSchema = CourierSchema.omit({
  id: true,
});

export type CourierReturnType = z.TypeOf<typeof CourierSchema>;

export type CourierInput = z.TypeOf<typeof CourierInputSchema>;
