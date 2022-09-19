import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';
import 'antd/dist/antd.css';
import { redirect } from '../actions';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Layout>
          <NextNProgress
            color='#FFFF00'
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </Provider>
  );
};

export default MyApp;
