'use client'
import { Shipyard } from '@/packages/space-sdk/dist';
import { FC, useEffect, useState } from 'react';
import format from 'date-fns/format';

interface ShipyardMenuProps {
  shipyardData: Shipyard
}

type ShipyardProps = {
    systemSymbol: string;
    waypointSymbol: string;
}

// Shipyard component that fetches data and displays it in a ShipyardMenu component
export const WaypointShipyard: FC<ShipyardProps> = ({systemSymbol, waypointSymbol}) => {
    const [shipyardData] = useState<Shipyard | undefined>()
    useEffect(() => {
        function getShipyardData() {

        }
        getShipyardData()
    }, [systemSymbol, waypointSymbol])
    if (!shipyardData) {
        return null
    }
    return (
<ShipyardMenu shipyardData={shipyardData} />
    )
}

export const ShipyardMenu: FC<ShipyardMenuProps> = ({ shipyardData }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-4 text-white">
      <h2 className="text-xl font-bold mb-2">Shipyard: {shipyardData.symbol}</h2>

      <h3 className="text-lg font-bold mb-1">Ship Types</h3>
      {shipyardData.shipTypes.map((type, index) => (
        <p key={index} className="text-sm mb-2">- {type.type}</p>
      ))}

      <h3 className="text-lg font-bold mb-1">Transactions</h3>
      {shipyardData.transactions?.map((transaction, index) => (
        <div key={index} className="text-sm mb-2">
          <p>Waypoint: {transaction.waypointSymbol}</p>
          <p>Ship: {transaction.shipSymbol}</p>
          <p>Price: {transaction.price}</p>
          <p>Agent: {transaction.agentSymbol}</p>
          <p>Timestamp:  {format(transaction.timestamp, 'dd/MM/yyyy hh:mm')}</p>
        </div>
      ))}

      <h3 className="text-lg font-bold mb-1">Ships</h3>
      {shipyardData.ships?.map((ship, index) => (
        <div key={index} className="text-sm mb-2">
          <p>Name: {ship.name}</p>
          <p>Description: {ship.description}</p>
          <p>Purchase Price: {ship.purchasePrice}</p>
          <h4 className="text-md font-bold mt-2 mb-1">Frame</h4>
          <p>Symbol: {ship.frame.symbol}</p>
          <p>Name: {ship.frame.name}</p>
          <p>Description: {ship.frame.description}</p>
          {/* Add more details for frame, reactor, engine, modules, mounts */}
        </div>
      ))}
    </div>
  );
};

