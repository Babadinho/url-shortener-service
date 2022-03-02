import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { NextUIProvider } from '@nextui-org/react';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </Provider>
  );
};
export default MyApp;
