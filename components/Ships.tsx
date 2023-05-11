'use client'
import { Ship } from '../packages/space-sdk'

import { getShips } from '../api'
import { useQuery, } from '@tanstack/react-query';
import { displayFuel } from './utils';
import { Countdown } from './Countdown';
import { DockShip, NavigateShip,  OrbitShip } from './ActionButtons';

export const ShipCard = ({ship}: {ship: Ship}) => {
  return (
    <div key={ship.symbol} className="border p-4 m-2">
      <h2 className="font-bold mb-2">{ship.registration.name}</h2>
      <h3 className="text-sm">{ship.symbol}</h3>
      {/* <p className="text-sm">Faction: {ship.registration.factionSymbol}</p> */}
      <p className="text-sm">Role: {ship.registration.role}</p>
      <p className='text-sm'>System: {ship.nav.systemSymbol}</p>
      <p className={`text-sm ${ship.nav.status === 'IN_TRANSIT' && 'text-orange-300'}`}>Waypoint: {ship.nav.waypointSymbol}</p>
      <p className='text-sm'>Fuel: {displayFuel(ship.fuel.current, ship.fuel.capacity)} {(100 * ship.fuel.current) / ship.fuel.capacity}%</p>
      <p className="text-sm">Status: {ship.nav.status}</p>
      <p className="text-sm">Flight mode: {ship.nav.flightMode}</p>
      <ShipControls ship={ship} />
    </div>
  )
}

export const ShipControls = ({ship}: {ship: Ship}) => {
  return (
    <div>
      {ship.nav.status === 'DOCKED' && (
        <OrbitShip shipSymbol={ship.symbol}/>
      )}
      {ship.nav.status === 'IN_ORBIT' && (
        <DockShip shipSymbol={ship.symbol}/> 
      )}
      {ship.nav.status !== 'IN_TRANSIT' &&
        <NavigateShip shipSymbol={ship.symbol}/>
      }
      {ship.nav.status === 'IN_TRANSIT' && 
        <Countdown hideWhenComplete={false} targetDate={ship.nav.route.arrival}/>
      }
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

