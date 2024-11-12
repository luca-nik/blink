'use client'

import { AppHero } from '../ui/ui-layout'

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
]

export default function DashboardFeature() {
  return (
    <div className="min-h-screen bg-black text-yellow-400" style={{ backgroundImage: "url('/hive.jpeg')", backgroundSize: 'cover' }}>
      <AppHero title="Welcome to the Hive" subtitle="Where DeScientists work to democratize science." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <p className="text-yellow-200 text-lg">Here is our manifesto</p>
        </div>
      </div>
    </div>
  )
}
