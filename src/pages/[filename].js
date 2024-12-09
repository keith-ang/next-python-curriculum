import React from 'react';
import { useRouter } from 'next/router';
import CurriculumPage from '../components/CurriculumPage';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const FilenamePage = ({ data }) => {
  const router = useRouter();
  const { filename } = router.query;
  const days = useSelector((state) => state.days);

  return (
    <>
      <Navbar />
      <CurriculumPage days={days} filename={filename} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { filename } = context.params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/day/${filename}`);
  const data = await response.json();

  return {
    props: { data },
  };
}

export default FilenamePage;