'use client'
import { Asteroids, SystemInfo } from '@/components/SystemInfo'
import { Ships } from '../components/Ships'
import Contracts from '@/components/Contracts'
import { useQuery } from '@tanstack/react-query'
import { getSystemAndWaypoints } from '@/api'

export default function Home() {
  const systemSymbol = 'X1-DF55'
    const { data } = useQuery({
        queryKey: ['systemAndWaypoints', systemSymbol],
        queryFn: () => getSystemAndWaypoints(systemSymbol)
    })
    const {systemData, waypointData} = data ?? {}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Ships />
      <Asteroids waypoints={waypointData ?? []}/>
      <Contracts />
      <SystemInfo systemSymbol={systemSymbol}/>
    </main>
  )
}
