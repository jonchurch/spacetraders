import { SystemInfo } from '@/components/SystemInfo'
import { Ships } from '../components/Ships'
import Contracts from '@/components/Contracts'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Ships />
      <Contracts />
      <SystemInfo systemSymbol='X1-DF55'/>
    </main>
  )
}
