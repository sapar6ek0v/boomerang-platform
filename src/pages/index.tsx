import { useState } from 'react'
import {
  Box,
  Button,
  Group,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from '@mantine/core'
import type { NextPage } from 'next'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

import Layout from '../components/layout/Layout'
import { trpc } from '../utils/trpc'
import { OrderInputSchema } from '../schemes/order.schema'
import OverlayLoader from '../components/OverlayLoader'

export type FormValues = z.infer<typeof OrderInputSchema>

const Home: NextPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      courierId: '',
      restaurant: '',
      branch: '',
      price: 0,
      orderPlace: '',
      orderPrice: 0,
      comment: '',
    },
    validate: zodResolver(OrderInputSchema),
  })
  const [visible, setVisible] = useState(false)

  const { mutate: createOrder } = trpc.useMutation(['order.create'], {
    onSuccess() {
      setVisible(false)
    },
  })
  const couriersQuery = trpc.useQuery(['courier.getAll'])
  const couriers = couriersQuery.data || []
  const restaurantsQuery = trpc.useQuery(['restaurant.getAll'])
  const restaurants = restaurantsQuery.data || []
  const branchesQuery = trpc.useQuery([
    'restaurant.getById',
    { id: form.values.restaurant },
  ])
  const restaurantBranches = branchesQuery.data?.branches || []

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
    <Layout>
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
            <Input.Wrapper label="Цена" required mt="md">
              <NumberInput {...form.getInputProps('price')} />
            </Input.Wrapper>
            <Input.Wrapper label="Место доставки" required mt="md">
              <Input {...form.getInputProps('orderPlace')} />
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
    </Layout>
  )
}

export default Home
