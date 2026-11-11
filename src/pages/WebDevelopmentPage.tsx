import * as React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Globe,
  Layout,
  Layers,
  Search,
  ShoppingCart,
  Sparkles,
  Zap,
} from 'lucide-react'

import { PageSEO } from '@/components/common/PageSEO'
import { Footer } from '@/components/landing/Footer'
import { Navbar } from '@/components/landing/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { navigateToHref } from '@/lib/navigation'
import { COMPANY_INFO } from '@/lib/constants'
import { SITE_URL, WEB_DEVELOPMENT_SEO } from '@/lib/site'

const ContactSalesModal = React.lazy(async () => {
  const mod = await import('@/components/landing/ContactSalesModal')
  return { default: mod.ContactSalesModal }
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}


const services = [
  {
    icon: Layout,
    title: 'Landing Pages',
    price: 'Starting at $300 (25,000 Rupees)',
    description: 'High-converting landing pages designed to capture leads and drive action.',
    features: [
      'Custom design & copy',
      'Mobile responsive',
      'Fast loading speed',
      'Lead capture forms',
      'A/B testing ready',
      'Analytics integration'
    ],
    cta: 'Get Started'
  },
  {
    icon: Globe,
    title: 'Business Websites',
    price: 'Starting at $1,000 (90,000 Rupees)',
    description: 'Professional multi-page websites that establish your brand and convert visitors.',
    features: [
      '5-10 custom pages',
      'CMS integration',
      'SEO optimization',
      'Contact forms',
      'Blog functionality',
      'Social media integration'
    ],
    cta: 'Get Started'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Stores',
    price: 'Starting at $5,000 (4.5 Lakhs)',
    description: 'Complete online stores with payment processing and inventory management.',
    features: [
      'Product catalog',
      'Payment integration',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Marketing tools'
    ],
    cta: 'Get Started'
  },
  {
    icon: Code2,
    title: 'Custom Web Applications & SaaS Interfaces',
    price: 'Custom Quote based on scope',
    description: 'Bespoke web applications built for your specific business requirements.',
    features: [
      'Custom architecture',
      'Advanced functionality',
      'API integrations',
      'Database design',
      'Authentication systems',
      'Scalable infrastructure'
    ],
    cta: 'Request Quote'
  }
]

const processSteps = [
  { number: '01', title: 'Discovery', description: 'Understanding your goals, audience, and requirements' },
  { number: '02', title: 'Wireframes', description: 'Planning the structure and user flow' },
  { number: '03', title: 'UI Design', description: 'Creating beautiful, functional interfaces' },
  { number: '04', title: 'Development', description: 'Building your solution with modern technologies' },
  { number: '05', title: 'Testing', description: 'Ensuring quality, performance, and security' },
  { number: '06', title: 'Launch', description: 'Deploying your project to production' },
  { number: '07', title: 'Support', description: 'Ongoing maintenance and optimization' }
]

const whyChooseUs = [
  { icon: Sparkles, title: 'Premium UI', description: 'Beautiful, modern interfaces that delight users' },
  { icon: Zap, title: 'Fast Performance', description: 'Optimized for speed and Core Web Vitals' },
  { icon: Search, title: 'SEO Optimized', description: 'Built to rank well in search engines' },
  { icon: Cpu, title: 'Modern Technologies', description: 'Latest frameworks and best practices' },
  { icon: Layers, title: 'Scalable Architecture', description: 'Built to grow with your business' },
  { icon: Brain, title: 'AI Ready', description: 'Prepared for AI integration and automation' }
]

const technologies = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind', category: 'Styling' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Anthropic', category: 'AI' },
  { name: 'Google Gemini', category: 'AI' }
]

const solutionShowcases = [
  {
    title: 'Conversion-Focused Landing Page',
    category: 'Travel Agency',
    description: 'Premium landing pages engineered around trust signals, clear messaging, and stronger CTA hierarchy.',
    tags: ['Next.js', 'Stripe', 'AI'],
    image: 'gradient-1',
    href: 'https://buzzlemax.github.io/meghalaya-holidays/'
  },
  {
    title: 'Fast Portfolio Website',
    category: 'Portfolio & Personal Branding',
    description: 'High-performance Portfolio websites that makes you stand out and makes your Portfolio stand out.',
    tags: ['React', 'TypeScript', 'D3.js'],
    image: 'gradient-2',
    href: 'https://buzzlemax.github.io/swapnanil-dowarah-portfolio/'
  },
  {
    title: 'Real Estate Marketplace prototype',
    category: 'Real Estate mock up',
    description: 'Fast storefront experiences with polished UX, stronger product storytelling, and scalable architecture mock up made in 3 hours.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    image: 'gradient-3',
    href: 'https://buzzlemax.github.io/ghy-realtors-prototype/'
  }
]

export function WebDevelopmentPage() {
  const [isSticky, setIsSticky] = React.useState(false)
  const [contactSalesOpen, setContactSalesOpen] = React.useState(false)
  const [contactSalesSelectedPlan, setContactSalesSelectedPlan] = React.useState<string>('Web Development')
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openContactSales = (plan = 'Web Development') => {
    setContactSalesSelectedPlan(plan)
    setContactSalesOpen(true)
  }

  const handleGetEstimate = () => openContactSales('Web Development')
  const handleBookCall = () => openContactSales('Custom Solution')

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        {...WEB_DEVELOPMENT_SEO}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Custom Web Development',
          name: 'Buzzlemax AI Web Development',
          provider: {
            '@type': 'Organization',
            name: COMPANY_INFO.name,
            url: SITE_URL,
            email: COMPANY_INFO.contact.email,
          },
          description: WEB_DEVELOPMENT_SEO.description,
          url: `${SITE_URL}/web-development`,
          areaServed: 'Worldwide',
        }}
      />
      <Navbar onContactSales={openContactSales} compactLandingLayout />

      {/* Sticky CTA */}
      {isSticky && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl"
        >
          <div className="container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-foreground sm:text-base">Ready to build a premium website that converts?</span>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleGetEstimate}
                className="font-semibold"
              >
                Get Free Estimate
              </Button>
              <Button
                variant="outline"
                onClick={handleBookCall}
              >
                Book a Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>Premium Web Development Services</span>
            </motion.div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build Stunning Websites That
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {' '}
                Convert & Scale
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              From landing pages to complex web applications, we deliver premium solutions
              that drive results and grow your business.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                size="lg"
                onClick={handleGetEstimate}
                className="font-semibold"
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBookCall}
              >
                Book a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Choose the perfect solution for your business needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group"
              >
                <Card className="h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-lg font-semibold text-primary">{service.price}</p>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full font-semibold"
                      onClick={() => openContactSales(service.title)}
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gradient-to-b from-background to-primary/5 py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A proven methodology that ensures success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="relative"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              What sets us apart from the competition
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
              >
                <Card className="h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Technologies We Use
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Building with the best tools in the industry
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                variants={cardVariants}
              >
                <Card className="border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-lg font-bold">{tech.name}</div>
                    <div className="text-sm text-muted-foreground">{tech.category}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Showcases Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Work
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              See what we've built for our clients
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {solutionShowcases.map((showcase) => (
              <motion.div
                key={showcase.title}
                variants={cardVariants}
              >
                <Card className="h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-3 text-sm font-medium text-primary">
                      {showcase.category}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{showcase.title}</h3>
                    <p className="text-muted-foreground">{showcase.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {showcase.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigateToHref(navigate, showcase.href)}
                    >
                      View Live
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-primary/10 py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let's discuss how we can help you achieve your goals with a premium web solution.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                size="lg"
                onClick={handleGetEstimate}
                className="font-semibold"
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBookCall}
              >
                Book a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Sales Modal */}
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
