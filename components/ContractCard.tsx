'use client'
import React from 'react'
import format from 'date-fns/format';
import { Contract } from '@/packages/space-sdk';
import { Countdown } from './Countdown';

export const ContractCard = ({ contract }: {contract: Contract}) => {
    console.log({contract})
    return (
        <div className="rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{contract.factionSymbol}</h2>
            <p className="text-sm mb-2">Type: {contract.type}</p>
            <p className="text-sm mb-2">Deadline: <Countdown targetDate={contract.terms.deadline} /></p>
            <p className="text-sm mb-2">Payment on acceptance: {contract.terms.payment.onAccepted}</p>
            <p className="text-sm mb-2">Payment on fulfillment: {contract.terms.payment.onFulfilled}</p>
            {contract.terms.deliver?.map((item, index) => (
                <div key={index} className="mb-2">
                    <p className="text-sm">Trade Symbol: {item.tradeSymbol}</p>
                    <p className="text-sm">Destination: {item.destinationSymbol}</p>
                    <p className="text-sm">Units required: {item.unitsRequired}</p>
                    <p className="text-sm">Units fulfilled: {item.unitsFulfilled}</p>
                </div>
            ))}
            <p className="text-sm mb-2">Accepted: {contract.accepted ? 'Yes' : 'No'}</p>
            <p className="text-sm mb-2">Fulfilled: {contract.fulfilled ? 'Yes' : 'No'}</p>
            <p className="text-sm mb-2">Expiration: {format(new Date(contract.expiration), 'dd/MM/yyyy hh:mm')}</p>
        </div>
    );
};

