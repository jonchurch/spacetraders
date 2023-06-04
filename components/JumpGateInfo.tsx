import { getJumpGate } from '@/api'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

type JumpGateInfoProps = {
  waypointSymbol: string
}

export const JumpGateInfo: React.FC<JumpGateInfoProps> = ({ waypointSymbol }) => {
  const { data: jumpgate } = useQuery({
    queryFn: () => getJumpGate(waypointSymbol),
    queryKey: ['jumpGate', waypointSymbol]
  })
  if (!jumpgate) {
    return <p>No data found</p>
  }
  return (
    <table className="max-w-7xl table-auto border-collapse border border-gray-300 mb-4 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1" colSpan={7}>
            Connected Systems (Jump Range: {jumpgate.jumpRange})
          </th>
        </tr>
        <tr>
          <th className="border border-gray-300 px-2 py-1">System</th>
          <th className="border border-gray-300 px-2 py-1">Sector</th>
          <th className="border border-gray-300 px-2 py-1">Type</th>
          <th className="border border-gray-300 px-2 py-1">Faction</th>
          <th className="border border-gray-300 px-2 py-1">X</th>
          <th className="border border-gray-300 px-2 py-1">Y</th>
          <th className="border border-gray-300 px-2 py-1">Distance</th>
        </tr>
      </thead>
      <tbody>
        {jumpgate.connectedSystems.map((system) => (
          <tr key={system.symbol}>
            <td className="border border-gray-300 px-2 py-1">
              <Link href={`/system/${system.symbol}`}>{system.symbol}</Link>
            </td>
            <td className="border border-gray-300 px-2 py-1">{system.sectorSymbol}</td>
            <td className="border border-gray-300 px-2 py-1">{system.type}</td>
            <td className="border border-gray-300 px-2 py-1">{system.factionSymbol}</td>
            <td className="border border-gray-300 px-2 py-1">{system.x}</td>
            <td className="border border-gray-300 px-2 py-1">{system.y}</td>
            <td className="border border-gray-300 px-2 py-1">{system.distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
