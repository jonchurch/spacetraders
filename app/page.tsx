'use client'
import { Asteroids, SystemInfo } from '@/components/SystemInfo'
import { Ships } from '../components/Ships'
import Contracts from '@/components/Contracts'
import { useQuery } from '@tanstack/react-query'
import { getSystemAndWaypoints } from '@/api'
import { MakeError } from '@/components/ActionButtons'
import AppShell from '@/components/AppShell'

export default function Home() {
  const systemSymbol = 'X1-DC54'
    const { data } = useQuery({
        queryKey: ['systemAndWaypoints', systemSymbol],
        queryFn: () => getSystemAndWaypoints(systemSymbol)
    })
    const {systemData: _, waypointData} = data ?? {}
  return (
    <>
      <AppShell />
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}
      <main>
        <div className="flex flex-col items-center justify-between min-h-screen mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* <MakeError /> */}
          <Ships />
          <Asteroids waypoints={waypointData ?? []}/>
          <Contracts />
          <SystemInfo systemSymbol={systemSymbol}/>
        </div>
      </main>
    </>
  )
}
