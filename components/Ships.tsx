'use client'
import { Ship, Waypoint, WaypointTrait, WaypointType } from '@spacejunk/airlock'

import { getShipCooldown, getShips, getSystemWaypoints } from '../api'
import { useQuery, } from '@tanstack/react-query';
import { displayFuel, isFuelFull } from './utils';
import { Countdown } from './Countdown';
import { DockShip, Mine, NavigateShip,  OrbitShip, Refuel, SellAllCargo } from './ActionButtons';

export const ShipCard = ({ship}: {ship: Ship}) => {
  const { systemSymbol, waypointSymbol } = ship.nav
  const shipSymbol = ship.symbol
  const { data: waypoint } = useQuery({
    queryKey: ['waypoints', ],
    queryFn: () => getSystemWaypoints(systemSymbol),
    select: (waypoints) => waypoints.find((wp) => wp.symbol === waypointSymbol)
  })
  const { data: cooldown } = useQuery({
    queryKey: ['shipCooldown', shipSymbol],
    queryFn: () => getShipCooldown(shipSymbol)
  })
  const transiting = ship.nav.status === "IN_TRANSIT"
  return (
    <div key={shipSymbol} className="border p-4 m-2">
      <h2 className="font-bold mb-2">{ship.registration.name}</h2>
      {/* <h3 className="text-sm">{shipSymbol}</h3> */}
      {/* <p className="text-sm">Faction: {ship.registration.factionSymbol}</p> */}
      <p className="text-sm">Role: {ship.registration.role}</p>
      <p className='text-sm'>System: {ship.nav.systemSymbol}</p>
      <p className={`text-sm ${transiting && 'animate-pulse text-orange-300'}`}>Waypoint: {ship.nav.waypointSymbol}</p>
      {/* lets display the location type for each ship */}
      <p className={`text-sm ${transiting && 'text-orange-300'}`}>Location: {waypoint?.type}</p>
      <p className='text-sm'>Fuel: <span className={`${transiting ? 'animate-pulse' : null}`}>{displayFuel(ship.fuel.current, ship.fuel.capacity)} {(100 * ship.fuel.current) / ship.fuel.capacity}%</span></p>
      <p className="text-sm">Status: {ship.nav.status}</p>
      <p className="text-sm">Flight mode: {ship.nav.flightMode}</p>
      <p className="text-sm">Cargo: {`${ship.cargo.units}/${ship.cargo.capacity}`}</p>
      {cooldown && <Countdown label='Cooldown' hideWhenComplete={false} targetDate={cooldown?.expiration} />}
      <ShipControls ship={ship} waypoint={waypoint}/>
      {ship.nav.status === 'IN_TRANSIT' && 
        <Countdown label='Transit' hideWhenComplete={false} targetDate={ship.nav.route.arrival}/>
      }

    </div>
  )
}

export const ShipControls = ({ship, waypoint}: {ship: Ship; waypoint?: Waypoint}) => {
  console.log(ship.cargo)
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
      {ship.nav.status === "DOCKED" && !isFuelFull(ship) && 
        waypoint && waypoint.type === WaypointType.AsteroidField &&
        <Refuel shipSymbol={ship.symbol}/>
      }
      {ship.nav.status === "DOCKED" && ship.cargo.units > 0 && 
        <SellAllCargo ship={ship}/>
      }
      {waypoint?.type === "ASTEROID_FIELD" && 
        <Mine shipSymbol={ship.symbol}/>
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

