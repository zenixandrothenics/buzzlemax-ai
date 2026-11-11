import * as React from 'react'

import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Stats } from '@/components/landing/Stats'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { WhyChooseUs } from '@/components/landing/WhyChooseUs'
import { Pricing } from '@/components/landing/Pricing'
import { Demo } from '@/components/landing/Demo'
import { CTASection } from '@/components/landing/CTASection'
import { AISolutions } from '@/components/landing/AISolutions'
import { FAQ } from '@/components/landing/FAQ'
import { Contact } from '@/components/landing/Contact'
import { Footer } from '@/components/landing/Footer'
import { PageSEO } from '@/components/common/PageSEO'
import { COMPANY_INFO } from '@/lib/constants'
import { DEFAULT_SEO, SITE_URL } from '@/lib/site'

const ContactSalesModal = React.lazy(async () => {
  const mod = await import('@/components/landing/ContactSalesModal')
  return { default: mod.ContactSalesModal }
})

export function LandingPage() {
  const [contactSalesOpen, setContactSalesOpen] = React.useState(false)
  const [contactSalesSelectedPlan, setContactSalesSelectedPlan] = React.useState<string | undefined>(undefined)

  const openContactSales = (plan?: string) => {
    setContactSalesSelectedPlan(plan)
    setContactSalesOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        {...DEFAULT_SEO}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: COMPANY_INFO.name,
          description: COMPANY_INFO.description,
          url: SITE_URL,
          email: COMPANY_INFO.contact.email,
          areaServed: 'Worldwide',
          serviceType: ['AI Automation', 'Voice AI', 'CRM Automation', 'Web Development'],
        }}
      />
      <Navbar onContactSales={openContactSales} compactLandingLayout />
      <main id="main-content">
        <Hero onContactSales={openContactSales} />
        <Stats />
        <Features />
        <HowItWorks />
        <Demo />
        <WhyChooseUs />
        <Pricing onContactSales={openContactSales} />
        <AISolutions onContactSales={openContactSales} />
        <FAQ />
        <Contact />
        <CTASection onContactSales={openContactSales} />
      </main>
      <Footer />

      {contactSalesOpen && (
        <React.Suspense fallback={null}>
          <ContactSalesModal
            open={contactSalesOpen}
            onOpenChange={setContactSalesOpen}
            selectedPlan={contactSalesSelectedPlan}
          />
        </React.Suspense>
      )}
    </div>
  )
}
