// pages/index.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDays } from '../lib/redux/reducers';
import Contents from '../components/Contents';
import Navbar from '../components/Navbar';
import { useDays } from '../lib/DaysContext';

const Home = () => {
  const dispatch = useDispatch();
  const { days } = useDays();

  React.useEffect(() => {
    if (days && days.length > 0) {
      dispatch(setDays(days));
    }
  }, [days, dispatch]);

  return (
    <>
      <Navbar />
      <Contents />
    </>
  );
};

export default Home;