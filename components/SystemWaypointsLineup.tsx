'use client'
import React, { useMemo } from 'react';
import { getSystemWaypoints } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface System {
  symbol: string;
  type: string;
  x: number;
  y: number;
}

const normalizePosition = (systems: System[]): System[] => {
  const minX = Math.min(...systems.map(({ x }) => x));
  const minY = Math.min(...systems.map(({ y }) => y));

  return systems.map(system => ({
    ...system,
    x: system.x - minX,
    y: system.y - minY,
  }));
};

export type SystemWaypointsLineupProps = {
  systemSymbol: string
}
export const SystemWaypointsLineup: React.FC<SystemWaypointsLineupProps> = ({systemSymbol}) => {
    const { data: waypoints } = useQuery({
        queryKey: ['systemWaypoints', systemSymbol],
        queryFn: () => getSystemWaypoints(systemSymbol)
    })
  const normalizedSystems = useMemo(() => normalizePosition(waypoints ?? []), [waypoints])
  console.log({waypoints})
  if (!waypoints) {
    return null
  }


  return (
    <div className="w-full flex items-center justify-center">
      {normalizedSystems.map((system, index) => (
        <div
          key={system.symbol}
          className={`border-2 border-blue-500 p-2 m-1 rounded-lg text-center ${
            index === normalizedSystems.length - 1 ? '' : 'mr-16'
          }`}
        >
          <div className="text-xs text-gray-600">{system.symbol}</div>
          <div className="text-sm font-bold">{system.type}</div>
          <div className="text-xs text-gray-600">
            x: {system.x}, y: {system.y}
          </div>
        </div>
      ))}
    </div>
  );
}
