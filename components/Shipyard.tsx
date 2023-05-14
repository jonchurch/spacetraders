'use client'
import { Shipyard } from '@spacejunk/airlock'
import { FC, useEffect, useState } from 'react';

import { getAgent, getShipyard } from '@/api';
import { PurchaseShip } from './ActionButtons';
import { useQuery } from '@tanstack/react-query';

interface ShipyardMenuProps {
  shipyardData: Shipyard
}

type ShipyardProps = {
    systemSymbol: string;
    waypointSymbol: string;
}

// Shipyard component that fetches data and displays it in a ShipyardMenu component
export const WaypointShipyard: FC<ShipyardProps> = ({systemSymbol, waypointSymbol}) => {
  const { data: shipyardData } = useQuery({
    queryFn: () => getShipyard({systemSymbol, waypointSymbol}),
    queryKey: ['shipyard', waypointSymbol]
  })
  if (!shipyardData) {
    return null
  }
    return (
    <ShipyardMenu shipyardData={shipyardData} />
    )
}

export const ShipyardMenu: FC<ShipyardMenuProps> = ({ shipyardData }) => {
  console.log({shipyardData})
  const { data: agentData } = useQuery({
    queryFn: getAgent,
    queryKey: ['agent']
  })
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-4 text-white">
      <h2 className="text-xl font-bold mb-2">Shipyard: {shipyardData.symbol}</h2>

      <h3 className="text-lg font-bold mb-1">Ship Types</h3>
      {shipyardData.shipTypes.map((type, index) => (
        <p key={index} className="text-sm mb-2">- {type.type}</p>
      ))}

      <h3 className="text-lg font-bold mb-1">Transactions</h3>
        {/* not really interested in transactions rn
      <div className="container flex flex-wrap">
      {shipyardData.transactions?.map((transaction, index) => (
        <div key={index} className="text-sm w-1/4 mb-2">
          <p>Waypoint: {transaction.waypointSymbol}</p>
          <p>Ship: {transaction.shipSymbol}</p>
          <p>Price: {transaction.price}</p>
          <p>Agent: {transaction.agentSymbol}</p>
          <p>Timestamp:  {format(transaction.timestamp, 'dd/MM/yyyy hh:mm')}</p>
        </div>
      ))}
      </div>
        */}
      <h3 className="text-lg font-bold mb-1">Ships</h3>
      <div className="flex flex-wrap"> 
      {shipyardData.ships?.map((ship, index) => (
        <div key={index} className="text-sm w-1/2 p-2 mb-2">
          <p className="text-md font-bold mt-2 mb-1">{ship.name}</p>
          <p>Description: {ship.description}</p>
          <p>Purchase Price: {ship.purchasePrice}</p>
          <p className="text-md font-bold mt-2 mb-1">Frame</p>
          <p>Symbol: {ship.frame.symbol}</p>
          <p>Name: {ship.frame.name}</p>
          <p>Description: {ship.frame.description}</p>
            {ship.type 
              && <PurchaseShip disabled={(agentData?.credits ?? 0) < ship.purchasePrice} shipType={ship.type} waypointSymbol={shipyardData.symbol}/>}
          {/* Add more details for frame, reactor, engine, modules, mounts */}
        </div>
      ))}
      </div>
    </div>
  );
};

