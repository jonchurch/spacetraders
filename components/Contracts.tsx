'use client'
import { useQuery } from '@tanstack/react-query';
import { getContracts } from '../api'
import { ContractCard } from './ContractCard';

export const Contracts = () => {
    const { data: contracts } = useQuery({
        queryFn: () => getContracts(),
        queryKey: ['contracts']
    })
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Contracts</h1>
            {contracts?.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
            ))}
        </div>
    );
};

export default Contracts;

