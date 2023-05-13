'use client'
import React, { useEffect, useState } from 'react'
import { SystemCard } from './SystemCard'
import { Waypoints } from './Waypoints'

import { getSystemAndWaypoints } from '@/api'
import { System, Waypoint } from '@spacejunk/airlock'
import Copy from './copyToClipboard'
import { useQuery } from '@tanstack/react-query'

export const Asteroids = ({waypoints}: {waypoints: Waypoint[]}) => {
    console.log({waypoints})
  const asteroids = waypoints.map(({symbol, type}) => {
  if (type === "ASTEROID_FIELD") {
      return <p key={symbol}>
        {symbol}
        <Copy emoji={"💎"} toCopy={symbol} />
      </p>
    }
  })

  if (!asteroids.length) {
    return null
  }
  return (
        <div>
        {asteroids}
        </div>)
}

export const SystemInfo = ({systemSymbol}: {systemSymbol: string}) => {
    const { data } = useQuery({
        queryKey: ['systemAndWaypoints', systemSymbol],
        queryFn: () => getSystemAndWaypoints(systemSymbol)
    })
    const {systemData, waypointData} = data ?? {}
    if (!systemData || !waypointData) {
        return null
    }
    return (
    <div>
        <Asteroids waypoints={waypointData} />
        <SystemCard system={systemData}/>
        <Waypoints waypointsData={waypointData}/>
    </div>
    )
}
