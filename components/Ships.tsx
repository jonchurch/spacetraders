'use client'
import { useCallback, useEffect, useState } from 'react';
import { Ship } from '../packages/space-sdk'

import { getShips, orbitShip } from '../api'

const OrbitShip = ({shipSymbol}: {shipSymbol: string}) => {
  useCallback(() => {
    orbitShip(shipSymbol)
  }, [shipSymbol])
  return (
    <button onClick={() => orbitShip(shipSymbol)} 
      className='bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
    >Orbit</button>
  )
}

export const ShipCard = ({ship}: {ship: Ship}) => {
  return (
      <div key={ship.symbol} className="border p-4 m-2">
        <h2 className="font-bold mb-2">{ship.registration.name}</h2>
        <h3 className="text-sm">{ship.symbol}</h3>
        <p className="text-sm">Faction: {ship.registration.factionSymbol}</p>
        <p className="text-sm">Role: {ship.registration.role}</p>
        <p className="text-sm">System: {ship.nav.systemSymbol}</p>
        <p className="text-sm">Status: {ship.nav.status}</p>
        <p className="text-sm">Flight mode: {ship.nav.flightMode}</p>
      {ship.nav.status === 'DOCKED' && (
        <OrbitShip shipSymbol={ship.symbol}/>
      )}
      </div>
  )
}

export const Ships = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  useEffect(() => {
    getShips().then((ships) => {setShips(ships ?? [])})
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Ships</h1>
      <div className="flex flex-wrap">
      {ships.map((ship) => <ShipCard key={ship.symbol} ship={ship} />)}
      </div>
    </div>
  );
}

