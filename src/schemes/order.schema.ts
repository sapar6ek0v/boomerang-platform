import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.string().cuid(),
  courierId: z
    .string({
      required_error: 'Имя курьера не должен быть пустым',
      invalid_type_error: 'Имя курьера должо быть строкой',
    })
    .min(1, 'Имя курьера не должен быть пустым'),
  restaurant: z
    .string({
      required_error: 'Ресторан не должен быть пустым',
      invalid_type_error: 'Ресторан должен быть строкой',
    })
    .min(1, 'Ресторан не должен быть пустым'),
  branch: z.string({
    required_error: 'Филиал не должен быть пустым',
    invalid_type_error: 'Филиал должен быть строкой',
  }),
  comment: z
    .string({
      invalid_type_error: 'Комментарий должен быть строкой',
    })
    .optional(),
  price: z
    .number({
      required_error: 'Цена не должно быть пустым',
      invalid_type_error: 'Цена должно быть числом',
    })
    .min(1, 'Цена не должно быть меньше 1 сома'),
  orderPlace: z
    .string({
      required_error: 'Место доставки не должно быть пустым',
      invalid_type_error: 'Место доставки должно быть сторокой',
    })
    .min(1, 'Место доставки не должно быть пустым'),
  orderPrice: z
    .number({
      required_error: 'Цена за доставку не должно быть пустым ',
      invalid_type_error: 'Цена за доставку должно быть числом',
    })
    .min(1, 'Цена за доставку не должно быть меньше 1 сома'),
})

export const OrderInputSchema = OrderSchema.omit({
  id: true,
})

export type OrderInput = z.TypeOf<typeof OrderInputSchema>
