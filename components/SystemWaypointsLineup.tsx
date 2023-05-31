'use client'
import React, { useMemo } from 'react';
import { getSystemWaypoints } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { getEmojiForWaypointType, normalizePosition } from './utils';

export type SystemWaypointsLineupProps = {
  systemSymbol: string
}
export const SystemWaypointsLineup: React.FC<SystemWaypointsLineupProps> = ({systemSymbol}) => {
    const { data: waypoints } = useQuery({
        queryKey: ['systemWaypoints', systemSymbol],
        queryFn: () => getSystemWaypoints(systemSymbol)
    })
  const normalizedWaypoints = useMemo(() => normalizePosition(waypoints ?? []), [waypoints])
  console.log({waypoints})
  if (!waypoints) {
    return null
  }

  return (
    <div className="w-full flex items-center justify-center">
      {normalizedWaypoints.map((waypoint, index) => (
        <div
          key={waypoint.symbol}
          className={`border-2 border-blue-500 p-2 m-1 rounded-lg text-center ${
            index === normalizedWaypoints.length - 1 ? '' : 'mr-16'
          }`}
        >
          <div className="text-xs text-gray-600">{waypoint.symbol.split('-').pop()}</div>
          <span
            className="text-4xl"
            title={waypoint.type}
          >
            {getEmojiForWaypointType(waypoint.type)}
          </span>
          <div className="text-xs text-gray-600">
            {waypoint.x},{waypoint.y}
          </div>
        </div>
      ))}
    </div>
  );
}
