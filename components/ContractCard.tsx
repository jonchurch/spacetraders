'use client'
import React, { useCallback } from 'react'
import { Contract } from '@spacejunk/airlock'
import { Countdown } from './Countdown';

import { acceptContract } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ContractCard = ({ contract }: {contract: Contract}) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: acceptContract,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['contracts'] })
        },
    })
    const handleClick = () => {
        mutation.mutate(contract.id)
    }

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
            {!contract.accepted && 
                <button 
                    onClick={handleClick} 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >Accept</button>
            }
            <p className="text-sm mb-2">Fulfilled: {contract.fulfilled ? 'Yes' : 'No'}</p>
            <p className="text-sm mb-2">Expiration: <Countdown targetDate={contract.expiration} /></p>

        </div>
    );
};

