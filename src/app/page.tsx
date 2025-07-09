import PersonalIntroSection from '@/components/personal-intro-section'
import posthog from 'posthog-js'

export default function HomePage() {

  return (
    <main className="min-h-screen">
      <PersonalIntroSection />
    </main>
  )
}