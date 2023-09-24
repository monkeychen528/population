import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Home from "./[...search]/page";
import { CountyInterface } from "@/interface/data"

import countyData from '@/api/county.json';

export const getStaticProps = (async (context) => {
    const res = await fetch('./api/county.json')
    const repo = await res.json()
    return { props: { repo } }
}) satisfies GetStaticProps<{
    repo: CountyInterface
}>


function Index({
    repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Home repo={repo} />
}

export default Index