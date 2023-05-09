'use client'
import { useEffect, useState } from 'react';
import { Contract, ContractsApi } from '@/packages/space-sdk';
import {config} from '../api'

import { ContractCard } from './ContractCard';

export const Contracts = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);

    useEffect(() => {
        const fetchContracts = async () => {
            const contractApi = new ContractsApi(config)
            try {
                const response = await contractApi.getContracts()
                setContracts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchContracts();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Contracts</h1>
            {contracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
            ))}
        </div>
    );
};

export default Contracts;

