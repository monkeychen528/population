import React from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { CountyInterface } from "@/interface/data"

import mockData from '@/mock/data.json';
import countyData from '@/api/county.json';
import ClientForm from './clientForm';

export const getStaticProps = (async (context) => {
  const res = await fetch('./api/county.json')
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: CountyInterface
}>

async function defaultCountyData() {
  const data = await import('@/api/county.json')
  return data.default
}


export default async function Home() {
  const repo = await defaultCountyData()
  return (
    <div>
      {process.env.NODE_ENV === "development" && mockData && countyData
        && <ClientForm initData={mockData} countyData={countyData} />}
      {process.env.NODE_ENV === "production" && <ClientForm countyData={repo} />}
    </div>
  );
}
