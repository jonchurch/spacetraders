// components/Layout.js
import Head from 'next/head'

 function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <title>Galactic Fleet Manager</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-5 py-10">{children}</main>
    </>
  )
}

// components/Navbar.js
function Navbar() {
  return (
    <nav className="bg-gray-900 py-5">
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

// components/Fleet.js
 function Fleet() {
  return (
    <div className="bg-gray-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Fleet</h2>
      {/* Display the list of ships here */}
    </div>
  )
}

// components/Market.js
 function Market() {
  return (
    <div className="bg-gray-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Market</h2>
      {/* Display the available ships and resources for trading */}
    </div>
  )
}

// components/Battle.js
 function Battle() {
  return (
    <div className="bg-gray-200 p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Battle</h2>
      {/* Display the PvP or PvE battle options here */}
    </div>
  )
}

// pages/index.js
// import Layout from '../components/Layout'
// import Fleet from '../components/Fleet'
// import Market from '../components/Market'
// import Battle from '../components/Battle'

 export default function Home() {
  return (
    <Layout>
      <Fleet />
      <Market />
      <Battle />
    </Layout>
  )
}

