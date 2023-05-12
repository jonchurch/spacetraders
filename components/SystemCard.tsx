import React, { FC } from 'react';
import { System } from '@spacejunk/airlock'
import Copy from './copyToClipboard';

type SystemCardProps = {
    system: System
}

export const SystemCard: FC<SystemCardProps> = ({ system }) => {
  return (
    <div className="rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">System: {system.symbol}</h2>
      <p className="text-sm mb-2">Sector: {system.sectorSymbol}</p>
      <p className="text-sm mb-2">Type: {system.type}</p>
      <p className="text-sm mb-2">Coordinates: {system.x}, {system.y}</p>
      <h3 className="text-lg font-bold mb-2">Waypoints</h3>
      <div className='container flex flex-wrap'>
      {system.waypoints.map((waypoint, index) => (
        <div key={index} className="mb-2 w-1/4">
          <p className="text-sm">Symbol: {waypoint.symbol}</p><Copy emoji='📎' toCopy={waypoint.symbol}/>
          <p className="text-sm">Type: {waypoint.type}</p>
          <p className="text-sm">Coordinates: {waypoint.x}, {waypoint.y}</p>
        </div>
      ))}
      <h3 className="text-lg font-bold mb-2">Factions</h3>
      {system.factions.map((faction, index) => (
        <p key={index} className="text-sm mb-2">Symbol: {faction.symbol}</p>
      ))}
      </div>
    </div>
  );
};

