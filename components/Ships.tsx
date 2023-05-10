'use client'
import { useCallback, useEffect, useState } from 'react';
import { Ship } from '../packages/space-sdk'

import { getShips, orbitShip, dockShip} from '../api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const OrbitShip = ({shipSymbol}: {shipSymbol: string}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
      mutationFn: orbitShip,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['ships'] })
      },
    })
  return (
    <button onClick={() => mutation.mutate(shipSymbol)} 
      className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded'
    >Orbit</button>
  )
}

const DockShip = ({shipSymbol}: {shipSymbol: string}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
      mutationFn: dockShip,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['ships'] })
      },
    })
  return (
    <button onClick={() => mutation.mutate(shipSymbol)} 
      className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded'
    >Dock</button>
  )
}

export const ShipCard = ({ship}: {ship: Ship}) => {
  return (
      <div key={ship.symbol} className="border p-4 m-2">
        <h2 className="font-bold mb-2">{ship.registration.name}</h2>
        <h3 className="text-sm">{ship.symbol}</h3>
        <p className="text-sm">Faction: {ship.registration.factionSymbol}</p>
        <p className="text-sm">Role: {ship.registration.role}</p>
        <p className='text-sm'>System: {ship.nav.systemSymbol}</p>
        <p className={`text-sm ${ship.nav.status === 'IN_TRANSIT' && 'text-orange-300'}`}>Waypoint: {ship.nav.waypointSymbol}</p>
        <p className="text-sm">Status: {ship.nav.status}</p>
        <p className="text-sm">Flight mode: {ship.nav.flightMode}</p>
        {ship.nav.status === 'DOCKED' && (
          <OrbitShip shipSymbol={ship.symbol}/>
        )}
        {ship.nav.status === 'IN_ORBIT' && (
        <DockShip shipSymbol={ship.symbol}/> 
        )}
      </div>
  )
}

export const Ships = () => {
  const {data: ships} = useQuery({queryKey: ['ships'], queryFn: getShips})

  return (
    <div className="flex flex-col items-center">
      <h1>Ships</h1>
      <div className="flex flex-wrap">
      {ships?.map((ship) => <ShipCard key={ship.symbol} ship={ship} />)}
      </div>
    </div>
  );
}

