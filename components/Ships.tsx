'use client'
import { useEffect, useState } from 'react';
import { Ship } from '../packages/space-sdk'

import { getShips } from '../api'

export const Ships = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  useEffect(() => {
    getShips().then((ships) => {setShips(ships ?? [])})
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Ships</h1>
      {ships.map((ship) => (
        <div key={ship.symbol} className="border p-4 m-2">
          <h2 className="font-bold mb-2">{ship.registration.name}</h2>
          <h3 className="text-sm">{ship.symbol}</h3>
          <p className="text-sm">Faction: {ship.registration.factionSymbol}</p>
          <p className="text-sm">Role: {ship.registration.role}</p>
          <p className="text-sm">System: {ship.nav.systemSymbol}</p>
          <p className="text-sm">Status: {ship.nav.status}</p>
          <p className="text-sm">Flight mode: {ship.nav.flightMode}</p>
        </div>
      ))}
    </div>
  );
}

