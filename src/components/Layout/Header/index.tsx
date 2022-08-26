﻿/* eslint-disable security/detect-non-literal-fs-filename */
import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100%',
    padding: '0',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

const HeaderColored = ({ links }: HeaderSimpleProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0]?.link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => setActive(link.link)}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
};

export default HeaderColored;
