'use client'
import React from 'react';
import { System } from '@spacejunk/airlock';
import AppShell from '@/components/AppShell'
import { SystemCard } from '@/components/SystemCard';
import { SystemWaypointsLineup } from '@/components/SystemWaypointsLineup';

import systemsData from '../../../data/systems.json'

type SystemParams = {
  systemSymbol: string;
}

// grr idk man, I was getting into an infinite loop when going back
// I guess it's just not worth trying to optimize this stuff rn
// export async function getStaticParams() {
//   return systemsData.map((system) => ({systemSumbol: system.symbol}))
// }

function getSystemData(systemSymbol: string) {
  return systemsData.find((system) => system.symbol === systemSymbol) as System
}

export default function SystemPage({params}: {params: SystemParams} ) {
  const { systemSymbol } = params

  const systemData = getSystemData(systemSymbol)
  console.log("SystemPage rendering...")

  if (!systemData) {
    return (<p>No system data found</p>)
  }
  return (
    <>
      <AppShell />
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}
      <main>
        <div className="flex flex-col items-center justify-between min-h-screen mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
          <SystemWaypointsLineup systemSymbol={systemSymbol}/>
          {/* <Asteroids waypoints={waypointData} /> */}
          <SystemCard system={systemData}/>
          {/* <Waypoints waypointsData={waypointData}/> */}
        </div>
      </main>
    </>
  )
}

