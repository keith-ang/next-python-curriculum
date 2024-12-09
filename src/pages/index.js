import React from 'react';
import { useSelector } from 'react-redux';
import Contents from '../components/Contents';
import Navbar from '../components/Navbar';

const Home = () => {
  const days = useSelector((state) => state.days);

  return (
    <>
      <Navbar />
      <Contents days={days} />
    </>
  );
};

export default Home;