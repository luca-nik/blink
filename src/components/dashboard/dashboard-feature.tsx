'use client'

import { AppHero } from '../ui/ui-layout'


export default function DashboardFeature() {
  return (
    <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center text-yellow-200">
      <AppHero title="Welcome to the Hive" subtitle="Where DeScientists work to democratize science." />
      <div className="space-y-2">
        <p className="text-yellow-200 text-lg">Here is our manifesto</p>
      </div>
    </div>
  )
}
