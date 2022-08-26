﻿/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { withTRPC } from '@trpc/next';
import { useEffect, useState } from 'react';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';
import Layout from '../components/Layout';
import CustomLoader from '../components/CustomLoader';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  if (loading) return <CustomLoader />;

  return (
    <SessionProvider session={session}>
      <NotificationsProvider>
        {!loading && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </NotificationsProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
