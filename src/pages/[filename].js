import React from 'react';
import Head from 'next/head';
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
      <Head>
        <title>{data.title}</title>
      </Head>
      <Navbar />
      <CurriculumPage days={days} filename={filename} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { filename } = context.params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/day/${filename}`);
  const data = await response.json();
  console.log(data)

  return {
    props: { data },
  };
}

export default FilenamePage;