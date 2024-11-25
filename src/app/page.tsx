import CarpetCalculator from '@/components/carpet-calculator'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Carpet Calculator</h1>
      <CarpetCalculator />
      <div>
        <Image src="/Prposed Corrections_Page1.jpg" alt="Requirements Image" width={1000} height={1500} />
      </div>
    </main>
  )
}

