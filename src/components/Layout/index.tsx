import { AppShell } from '@mantine/core';
import { FC, ReactNode } from 'react';
import HeaderColored from './Header';
import NavbarColored from './Navbar';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarColored />}
      header={
        <HeaderColored
          links={[
            { link: '/', label: 'Оформит Заказ' },
            { link: '/orders', label: 'Все Заказы' },
            { link: '/couriers', label: 'Курьеры' },
            { link: '/restaurants', label: 'Рестораны' },
          ]}
        />
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
