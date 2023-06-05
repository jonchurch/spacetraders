import { getMarketplace } from '@/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Seperator } from './Separator'

interface MarketplaceInfoProps  {
  waypointSymbol: string
}

export const MarketplaceInfo: React.FC<MarketplaceInfoProps> = ({ waypointSymbol }) => {
const {data: marketplaceData} = useQuery({
    queryFn: () => getMarketplace(waypointSymbol),
    queryKey: ['marketplace', waypointSymbol],
    staleTime: 6000
  })

  console.log({marketplaceData})
  const isImport = (symbol: string) => marketplaceData?.imports.some((item) => item.symbol === symbol);
  const isExport = (symbol: string) => marketplaceData?.exports.some((item) => item.symbol === symbol);

  if (!marketplaceData) {
    return <p>No data found</p>
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-semibold mb-6">Marketplace Data</h2>

      <h3 className="text-xl font-semibold mb-4">Trade Goods</h3>

      <table className="table-auto border-collapse border border-gray-300 w-full mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Symbol</th>
            <th className="border border-gray-300 px-2 py-1">Trade Volume</th>
            <th className="border border-gray-300 px-2 py-1">Supply</th>
            <th className="border border-gray-300 px-2 py-1">Purchase Price</th>
            <th className="border border-gray-300 px-2 py-1">Sell Price</th>
          </tr>
        </thead>
        <tbody>
          {marketplaceData.tradeGoods?.map((good) => (
            <tr key={good.symbol}>
              <td className="border border-gray-300 px-2 py-1">{`${good.symbol} ${isImport(good.symbol) ? '📦' : isExport(good.symbol) ? '🏭' : ''}`}</td>
              <td className="border border-gray-300 px-2 py-1">{good.tradeVolume}</td>
              <td className="border border-gray-300 px-2 py-1">{good.supply}</td>
              <td className="border border-gray-300 px-2 py-1">{good.purchasePrice}</td>
              <td className="border border-gray-300 px-2 py-1">{good.sellPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Seperator text='Exchange' />
      <table className="table-auto border-collapse border border-gray-300 w-full mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Symbol</th>
            <th className="border border-gray-300 px-2 py-1">Name</th>
            <th className="border border-gray-300 px-2 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          {marketplaceData.exchange.map((item) => (
            <tr key={item.symbol}>
              <td className="border border-gray-300 px-2 py-1">{item.symbol}</td>
              <td className="border border-gray-300 px-2 py-1">{item.name}</td>
              <td className="border border-gray-300 px-2 py-1">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
