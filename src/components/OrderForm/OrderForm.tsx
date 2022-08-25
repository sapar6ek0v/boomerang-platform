import React, { useState } from 'react'
import { z } from 'zod'
import {
  Box,
  Button,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { trpc } from '../../utils/trpc'
import { OrderInputSchema } from '../../schemes/order.schema'
import OverlayLoader from '../OverlayLoader/'
import { notification } from '../Notification/Notification'

export type FormValues = z.infer<typeof OrderInputSchema>

const OrderForm = () => {
  const form = useForm<FormValues>({
    initialValues: {
      courierId: '',
      restaurant: '',
      branch: '',
      price: 0,
      orderPlace: '',
      orderPrice: 0,
      comment: '',
      categories: [],
    },
    validate: zodResolver(OrderInputSchema),
  })

  const [visible, setVisible] = useState(false)

  const { mutate: createOrder } = trpc.useMutation(['order.create'], {
    onSuccess() {
      setVisible(false)
    },
    onError(error) {
      notification('Error', `${error.message}`)
      setVisible(false)
    },
  })
  const couriersQuery = trpc.useQuery(['courier.getAll'], {
    onError(error) {
      notification('Error', `${error.message}`)
      setVisible(false)
    },
  })
  const couriers = couriersQuery.data || []
  const restaurantsQuery = trpc.useQuery(['restaurant.getAll'], {
    onError(error) {
      notification('Error', `${error.message}`)
      setVisible(false)
    },
  })
  const restaurants = restaurantsQuery.data || []
  const branchesQuery = trpc.useQuery(
    ['restaurant.getById', { id: form.values.restaurant }],
    {
      onError(error) {
        notification('Error', `${error.message}`)
        setVisible(false)
      },
    }
  )
  const restaurantBranches = branchesQuery.data?.branches || []
  const categoriesQuery = trpc.useQuery(['category.getAll'], {
    onError(error) {
      notification('Error', `${error.message}`)
      setVisible(false)
    },
  })
  const categories = categoriesQuery.data || []

  const couriersSelectItems: SelectItem[] = couriers.map<SelectItem>(
    (item) => ({
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    })
  )

  const restaurantsSelectItems: SelectItem[] = restaurants.map<SelectItem>(
    (item) => ({
      value: item.id,
      label: `${item.name}`,
    })
  )

  const branchesSelectItems: SelectItem[] = restaurantBranches?.map<SelectItem>(
    (item) => ({
      value: item.id,
      label: `${item.branchName}`,
    })
  )

  const categoriesSelectItems: SelectItem[] = categories.map<SelectItem>(
    (item) => ({
      value: item.id,
      label: `${item.name}`,
    })
  )

  const handleSubmit = (values: FormValues) => {
    setVisible(true)
    try {
      createOrder(values)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box
      sx={{
        maxWidth: 500,
        backgroundColor: '#EEEEEE',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      }}
      mx="auto"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <OverlayLoader visible={visible}>
          <Select
            label="Выберите курьера"
            placeholder="Выберите одного курьера"
            data={couriersSelectItems}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            {...form.getInputProps('courierId')}
          />
          <Select
            label="Выберите ресторан"
            placeholder="Выберите один ресторан"
            data={restaurantsSelectItems}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            {...form.getInputProps('restaurant')}
            mt="md"
          />
          {!!restaurantBranches.length && (
            <Select
              label="Выберите филиал"
              placeholder="Выберите один филиал"
              data={branchesSelectItems}
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('branch')}
              mt="md"
            />
          )}
          <MultiSelect
            label="Выберите категорию"
            placeholder="Выберите одну категорию"
            data={categoriesSelectItems}
            {...form.getInputProps('categories')}
            mt="md"
          />
          <Input.Wrapper label="Цена" required mt="md">
            <NumberInput {...form.getInputProps('price')} />
          </Input.Wrapper>
          <Input.Wrapper label="Место доставки" required mt="md">
            <TextInput {...form.getInputProps('orderPlace')} />
          </Input.Wrapper>
          <Input.Wrapper label="Цена доставки" required mt="md">
            <NumberInput {...form.getInputProps('orderPrice')} />
          </Input.Wrapper>
          <Textarea
            placeholder="Коментарий курьеру"
            label="Коментарий курьеру"
            {...form.getInputProps('comment')}
            mt="md"
          />
        </OverlayLoader>

        <Group position="center" mt="md">
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default OrderForm
