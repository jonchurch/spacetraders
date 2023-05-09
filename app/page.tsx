import { Ships } from '../components/Ships'
import Contracts from '@/components/Contracts'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Ships />
      <Contracts />
    </main>
  )
}
