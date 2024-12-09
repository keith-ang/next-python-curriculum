import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '../lib/redux/store';
import { setDays } from '../lib/redux/reducers';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <FetchDaysWrapper>
      <Component {...pageProps} />
    </FetchDaysWrapper>
  </Provider>
);

const FetchDaysWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const files = await response.json();

        const dayDataPromises = files.map(async (file) => {
          const response = await fetch(`/api/day/${file.replace('.json', '')}`);
          if (response.ok) {
            const day = await response.json();
            return { ...day, filename: file.replace('.json', '') };
          } else {
            console.error(`Failed to fetch ${file}: ${response.statusText}`);
          }
        });

        const dayData = await Promise.all(dayDataPromises);
        dispatch(setDays(dayData.filter(day => day !== null)));
      } catch (error) {
        console.error('Error fetching JSON files:', error);
      }
    };

    fetchDays();
  }, [dispatch]);

  return children;
};

export default MyApp;