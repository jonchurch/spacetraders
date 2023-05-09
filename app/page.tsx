import Image from 'next/image'

import { Ships } from '../components/Ships'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Ships />
    </main>
  )
}
