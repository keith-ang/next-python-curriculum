// pages/index.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDays } from '../lib/redux/reducers';
import Contents from '../components/Contents';
import Navbar from '../components/Navbar';

const Home = ({ days }) => {
  const dispatch = useDispatch();

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

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/days`);
  if (!response.ok) {
    console.error(`Failed to fetch. Status: ${response.status}`);
    return { props: { days: [] } };
  }
  const days = await response.json();

  return {
    props: { days },
  };
}

export default Home;