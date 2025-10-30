import { CurrentIncidents } from '@/components/current-incidents'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PastIncidents } from '@/components/past-incidents'
import { StatusList } from '@/components/status-list'

export default function Home() {
  return (
    <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4'>
      <Header />

      {/* Active incidents appear first, before service status */}
      <CurrentIncidents />

      <StatusList />

      {/* Past incidents appear after service status */}
      <PastIncidents />

      <Footer />
    </main>
  )
}
