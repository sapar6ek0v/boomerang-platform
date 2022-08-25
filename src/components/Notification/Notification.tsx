import React from 'react'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'

export const notification = (title: string, message: string) => {
  return showNotification({
    id: 'hello-there',
    disallowClose: true,
    autoClose: 5000,
    title: `${title}`,
    message: `${message}`,
    color: 'red',
    icon: <IconX />,
    className: 'my-notification-class',
    style: { backgroundColor: 'white' },
    sx: { backgroundColor: 'red' },
    loading: false,
  })
}
