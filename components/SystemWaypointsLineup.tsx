'use client'
import React, { useMemo } from 'react';
import { getEmojiForWaypointType, normalizePosition } from './utils';
import Link from 'next/link';
import { Waypoint } from '@spacejunk/airlock';

export type SystemWaypointsLineupProps = {
  waypoints: Waypoint[]
}
export const SystemWaypointsLineup: React.FC<SystemWaypointsLineupProps> = ({waypoints}) => {
  // const normalizedWaypoints = useMemo(() => normalizePosition(waypoints ?? []), [waypoints])
  console.log({waypoints})
  if (!waypoints) {
    return null
  }

  return (
    <div className="w-full flex items-center justify-center space-x-8">
      {waypoints.map((waypoint) => (
        <div
          key={waypoint.symbol}
          className={`border-2 border-blue-500 p-2 m-1 rounded-lg text-center`}
        >
          <div className="text-xs text-gray-600">{waypoint.symbol.split('-').pop()}</div>
          <Link href={`/waypoint/${waypoint.symbol}`}>
            <span
              className="text-4xl"
              title={waypoint.type}
            >
              {getEmojiForWaypointType(waypoint.type)}
            </span>
          </Link>
          <div className="text-xs text-gray-600">
            {waypoint.x},{waypoint.y}
          </div>
        </div>
      ))}
    </div>
  );
}
