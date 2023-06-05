import { Waypoint } from '@spacejunk/airlock'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { JumpGateInfo } from './JumpGateInfo'
import { MarketplaceInfo } from './MarketplaceInfo'

interface SingleWaypointProps {
  waypoint: Waypoint
}

export const SingleWaypoint: React.FC<SingleWaypointProps> = ({waypoint}) => {
  return (
    <div>
        {/* <div className="mb-2 w-1/4"> */}
          <p className="text-sm">Symbol: {waypoint.symbol}</p>
          <p className="text-sm">Type: {waypoint.type}</p>
          <p className="text-sm">System Symbol: {waypoint.systemSymbol}</p>
          <p className="text-sm">Coordinates: {waypoint.x}, {waypoint.y}</p>
          <p className="text-sm">Faction: {waypoint.faction?.symbol}</p>
          <p className="text-sm">Orbitals:</p>
          {waypoint.orbitals.map((orbital, orbitalIndex) => (
            <p key={orbitalIndex} className="text-sm ml-2">- {orbital.symbol}</p>
          ))}
          <p className="text-sm">Traits:</p>
          {waypoint.traits.map((trait, traitIndex) => (
            <div key={traitIndex} className="ml-2">
                
                {trait.symbol === "SHIPYARD" ? 
                <Link href={`/system/${waypoint.systemSymbol}/waypoints/${waypoint.symbol}/shipyard`}>
                    <p className="text-sm">- {trait.name}</p>
                </Link> :
                  (<p className="text-sm">- {trait.name}</p>)
                }
              <p className="text-sm">{trait.description}</p>
            </div>
          ))}
          <p className="text-sm">Chart:</p>
          <div className="ml-2">
        {waypoint.chart && (<>
          <p className="text-sm">Waypoint Symbol: {waypoint.chart.waypointSymbol}</p>
          <p className="text-sm">Submitted By: {waypoint.chart.submittedBy}</p>
          <p className="text-sm">Submitted On: {format(new Date(waypoint.chart.submittedOn ?? 0), 'dd/MM/yyyy hh:mm')}</p>
        </>)}
          </div>
        {/* </div> */}
  
      <div className="flex flex-row items-center justify-between mt-4">
        {waypoint.type === 'JUMP_GATE' && <JumpGateInfo waypointSymbol={waypoint.symbol}/>}
        {waypoint.traits.some(({symbol}) => symbol === 'MARKETPLACE') && <MarketplaceInfo waypointSymbol={waypoint.symbol}/>}
      </div>
        </div>
  )
}

