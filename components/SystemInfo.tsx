'use client'
import React, { useEffect, useState } from 'react'
import { SystemCard } from './SystemCard'
import { Waypoints } from './Waypoints'

import { getSystemAndWaypoints } from '@/api'
import { System, Waypoint } from '@spacejunk/airlock'

export const SystemInfo = ({systemSymbol}: {systemSymbol: string}) => {
    const [systemData, setSystemData] = useState<System>()
    const [waypointData, setWaypointData] = useState<Waypoint[]>()

    useEffect(() => {
        async function getData() {
            try {
                const {systemData, waypointData} = await getSystemAndWaypoints(systemSymbol) ?? {}
                setSystemData(systemData)
                setWaypointData(waypointData)
            } catch(err) {
                console.log(err)
            }
        }
        getData()
    }, [systemSymbol])

    if (!systemData || !waypointData) {
        return null
    }
    return (
    <div>
        <SystemCard system={systemData}/>
        <Waypoints waypointsData={waypointData}/>
    </div>
    )
}
