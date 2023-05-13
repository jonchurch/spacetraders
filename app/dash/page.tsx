'use client'
import { Fleet } from '@/components/dash/Fleet';
import React from 'react';

 function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-5 py-10">{children}</main>
    </>
  )
}

function Navbar() {
  return (
    <nav className="dark:bg-slate-800 bg-gray-900 py-5">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <h1 className="text-xl text-white font-semibold">Galactic Fleet Manager</h1>
        <ul className="flex items-center space-x-3">
          <li><a href="#" className="text-gray-300 hover:text-white">Fleet</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Market</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Battle</a></li>
        </ul>
      </div>
    </nav>
  )
}

 function Market() {
  return (
    <div className="dark:bg-slate-700 bg-gray-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Market</h2>
      {/* Display the available ships and resources for trading */}
    </div>
  )
}

 function Battle() {
  return (
    <div className="bdark:bg-slate-200 g-gray-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Battle</h2>
      {/* Display the PvP or PvE battle options here */}
    </div>
  )
}

 export default function Home() {
  return (
    <Layout>
      <div className='flex'>
      <Fleet />
      <Market />
      <Battle />
      </div>
    </Layout>
  )
}

