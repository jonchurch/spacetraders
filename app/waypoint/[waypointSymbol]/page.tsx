'use client'
import { getWaypoint } from "@/api"
import AppShell from "@/components/AppShell"
import { SingleWaypoint } from "@/components/SingleWaypoint"
import { useQuery } from "@tanstack/react-query"

type WaypointParams = {
  waypointSymbol: string
}

export default function WaypointPage({params}: {params: WaypointParams}) {
  const { waypointSymbol } = params
  const { data: waypoint } = useQuery({
    queryKey: ['waypoints', waypointSymbol],
    queryFn: () => getWaypoint(waypointSymbol)
  })

  if (!waypoint) {
    return (<p>No waypoint data found</p>)
  }
  return (
    <>
      <AppShell />
      {/* <main className="flex min-h-screen flex-col items-center justify-between "> */}
      <main>
        <div className="flex flex-col items-center justify-between min-h-screen mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <SingleWaypoint waypoint={waypoint}/>
        </div>
      </main>
    </>
  )
}

