'use client'
import AppShell from '@/components/AppShell'
import { SystemCard } from '@/components/SystemCard';

import systemsData from '../../../data/systems.json'
import { System } from '@spacejunk/airlock';

type SystemParams = {
  systemSymbol: string;
}

export async function getStaticParams() {
  return systemsData.map((system) => ({systemSumbol: system.symbol}))
}

async function getSystemData(systemSymbol: string) {
  return systemsData.find((system) => system.symbol === systemSymbol) as System
}

export default async function SystemPage({params}: {params: SystemParams} ) {
  const { systemSymbol } = params

  const systemData = await getSystemData(systemSymbol)
  console.log({systemData})
  if (!systemData) {
    return (<p>No system data found</p>)
  }
  return (
    <>
      <AppShell />
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}
      <main>
        <div className="flex flex-col items-center justify-between min-h-screen mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* <Asteroids waypoints={waypointData} /> */}
        <SystemCard system={systemData}/>
        {/* <Waypoints waypointsData={waypointData}/> */}
        </div>
      </main>
    </>
  )
}
