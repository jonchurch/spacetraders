'use client'
import React from 'react';
import { System } from '@spacejunk/airlock';
import AppShell from '@/components/AppShell'
import { SystemCard } from '@/components/SystemCard';
import { SystemWaypointsLineup } from '@/components/SystemWaypointsLineup';

import systemsData from '../../../data/systems.json'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSystemWaypoints } from '@/api';
import { SystemFeatures } from '@/components/SystemFeatures';

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

  const queryClient = useQueryClient()
  const systemData = getSystemData(systemSymbol)
    const { data: waypoints, isLoading, error } = useQuery({
        queryKey: ['systemWaypoints', systemSymbol],
        queryFn: () => getSystemWaypoints(systemSymbol)
    })

  if (!isLoading && !error && waypoints) {
    waypoints.forEach((waypoint) => {
      queryClient.setQueryData(['waypoint', waypoint.symbol], waypoint)
    })
  }
  console.log({systemData})
  if (!systemData) {
    return (<p>No system data found</p>)
  }
  if (!waypoints) {
    return (<p>No waypoint data found</p>)
  }
  return (
    <>
      <AppShell />
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}
      <main>
        <div className="flex flex-row items-center justify-between  mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
          <SystemCard system={systemData}/>
          <SystemWaypointsLineup waypoints={waypoints}/>
          {/* <Asteroids waypoints={waypointData} /> */}
          {/* <Waypoints waypointsData={waypointData}/> */}
        </div>
          <SystemFeatures waypoints={waypoints}/>
      </main>
    </>
  )
}

