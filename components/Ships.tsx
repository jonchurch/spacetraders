import { useEffect, useState } from 'react';
import {createConfiguration, FleetApi, Ship} from '../packages/space-sdk'

const config = createConfiguration({
  authMethods: {
    AgentToken:  {
      tokenProvider: {
        getToken() {
            return process.env.TOASTY ?? 'NO_API_TOKEN_PROVIDED'
        },
      }
    }
  }
})

const getShips = async () => {
  const fleet= new FleetApi(config)
  try {
    const { data } = await fleet.getMyShips()
    return data
  } catch (error) {
    console.error(error);
  }
}

export default function ShipsDisplay() {
  const [ships, setShips] = useState<Ship[]>([]);
  useEffect(() => {
    getShips().then((ships) => {setShips(ships ?? [])})
  }, []);

  return (
    <div className="flex flex-col items-center">
      {ships.map((ship) => (
        <div key={ship.symbol} className="border p-4 m-2 w-1/2">
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

