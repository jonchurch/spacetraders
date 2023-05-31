'use client'
import AppShell from '@/components/AppShell'

type SystemParams = {
  systemSymbol: string;
}

export default function SystemPage({params}: {params: SystemParams} ) {
  const { systemSymbol } = params
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
