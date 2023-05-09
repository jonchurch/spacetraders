import React, { FC } from 'react';
import { Waypoint } from '@/packages/space-sdk';
import format from 'date-fns/format';

interface WaypointsProps {
  waypointsData: Waypoint[];  // Assuming WaypointsData is the type of your API response
}

export const Waypoints: FC<WaypointsProps> = ({ waypointsData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Waypoints</h2>
      {waypointsData.map((waypoint, index) => (
        <div key={index} className="mb-2">
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
              <p className="text-sm">- {trait.name}</p>
              <p className="text-sm">{trait.description}</p>
            </div>
          ))}
          <p className="text-sm">Chart:</p>
          <div className="ml-2">
                        {waypoint.chart && (<>
            <p className="text-sm">Waypoint Symbol: {waypoint.chart.waypointSymbol}</p>
            <p className="text-sm">Submitted By: {waypoint.chart.submittedBy}</p>
            <p className="text-sm">Submitted On: {format(waypoint.chart.submittedOn ?? 0, 'dd/MM/yyyy hh:mm')}</p>
                    </>)}
          </div>
        </div>
      ))}
    </div>
  );
};

