import React from 'react'
import { Waypoint } from "@spacejunk/airlock";
import Link from 'next/link';
import { getEmojiForWaypointType } from './utils';

export type WaypointFeaturesProps = {
  waypoints: Waypoint[]
};

export const SystemFeatures: React.FC<WaypointFeaturesProps> = ({ waypoints }) => {
  const filteredWaypoints = (type: string) =>
    waypoints.filter((waypoint) => waypoint.traits.some(({symbol}) => symbol === type));

  const renderTable = (type: string) => (
    <table className="table-auto border-collapse border border-gray-300 mb-4 w-full">
      <thead>
        <tr> 
          <th className="border border-gray-300 px-2 py-1" colSpan={3}>
            {type}
          </th>
        </tr>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Symbol</th>
          <th className="border border-gray-300 px-2 py-1">X</th>
          <th className="border border-gray-300 px-2 py-1">Y</th>
        </tr>
      </thead>
      <tbody>
        {filteredWaypoints(type).map((waypoint) => (
          <tr key={waypoint.symbol}>
            <td className="border border-gray-300 px-2 py-1">
              <Link href={`/waypoint/${waypoint.symbol}`}>{waypoint.symbol} {getEmojiForWaypointType(waypoint.type)}</Link>
            </td>
            <td className="border border-gray-300 px-2 py-1">{waypoint.x}</td>
            <td className="border border-gray-300 px-2 py-1">{waypoint.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {renderTable('SHIPYARD')}
      {renderTable('MARKETPLACE')}
    </div>
  );
};
