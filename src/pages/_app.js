import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/redux/store';
import { DaysProvider } from '../lib/DaysContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <DaysProvider>
      <Component {...pageProps} />
    </DaysProvider>
  </Provider>
);

export default MyApp;