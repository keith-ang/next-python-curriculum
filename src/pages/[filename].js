// pages/[filename].js
import React from 'react';
import Head from 'next/head';
import CurriculumPage from '../components/CurriculumPage';
import Navbar from '../components/Navbar';

const FilenamePage = ({ data, filename }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Navbar />
      <CurriculumPage dayContent={data} filename={filename} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { filename } = context.params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/day/${filename}`);
  const data = await response.json();

  // Pass day content and filename as props
  return {
    props: { data, filename },
  };
}

export default FilenamePage;