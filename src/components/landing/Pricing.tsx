import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PRICING_PLANS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { navigateToHref } from '@/lib/navigation'

type PricingProps = {
  onContactSales: (plan?: string) => void
}

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

export function Pricing({ onContactSales }: PricingProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  return (
    <section id="pricing" className="section bg-black" aria-labelledby="pricing-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Pricing
          </span>
          <h2 id="pricing-heading" className="section-title text-white">
            Bespoke AI Solutions & Transparent Quotes
          </h2>
          <p className="section-description text-gray-400">
            Invest in targeted AI capabilities engineered to drive measurable business outcomes. From 24/7 lead qualification and automated FAQ resolution to omnichannel workflows and custom systems, get an exact proposal tailored to your requirements.
          </p>
        </motion.div>

        {/* Entry-Level Custom AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-50" />
            <CardContent className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Bespoke AI Architecture
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Custom AI Chatbots & Workflow Automation
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed mb-4">
                    Accelerate your revenue engine with custom-trained AI assistants that qualify leads, answer FAQs in real time, and route prospects into your CRM. Pay only for the specific capabilities your business needs.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>24/7 Lead Capture & Intent Scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Automated FAQ & Support Resolution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Custom Knowledge Base Ingestion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Seamless CRM & Calendar Integration</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 text-center md:text-right shrink-0">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">Custom Quote</div>
                    <div className="text-xs font-medium text-primary">Scoped to Your Business Scope</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Value-driven, transparent pricing</div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => onContactSales('Custom AI Chatbot')}
                  >
                    Request a Custom Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 text-center">
                  *Every project is individually scoped based on required integrations, workflow complexity, and volume. Never pay for unused SaaS bloat.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Tailored AI Automation Packages</h3>
            <p className="text-sm text-gray-400">
              Enterprise-ready AI systems configured for multi-channel scaling, CRM sync, and advanced automations.
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20"
        >
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className="relative"
            >
              <Card
                className={cn(
                  'h-full transition-all duration-500 backdrop-blur-xl border-white/10 bg-white/5 hover:bg-white/10',
                  'border-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5'
                )}
              >
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-xl font-semibold mb-4 text-white tracking-wider">
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {plan.priceRupees && (
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {plan.priceRupees}
                      </p>
                    )}
                    <div className="flex flex-col items-center justify-center gap-1">
                      {plan.setupFeeRupees ? (
                        <span className="text-4xl font-bold text-white tracking-tight">
                          {plan.setupFeeRupees}
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-white tracking-tight">
                          Custom Quote
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li 
                       key={`${feature}-${index}`} 
                        className="flex items-start gap-3"
                      >
                        <Check className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.usage && plan.usage.length > 0 && (
                    <div className="mb-8 pt-4 border-t border-white/10">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                        Usage Included
                      </p>
                      <ul className="space-y-2">
                        {plan.usage.map((usage, index) => (
                          <li 
                            key={`${usage}-${index}`} 
                            className="flex items-start gap-3"
                          >
                            <Check className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-400 leading-relaxed">{usage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button
                    className="w-full font-semibold tracking-wide transition-all duration-300 active:scale-95 bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg"
                    size="lg"
                    onClick={() => onContactSales(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom AI Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
            <CardContent className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Need Something More Specific?
                </h3>
                <p className="text-base text-gray-300 leading-relaxed mb-6">
                  Don't pay for expensive AI subscriptions packed with features you don't need. We build custom AI solutions around exactly what your business needs — so you only pay for what you actually need.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  From AI chatbots and lead qualification to knowledge assistants, customer support systems, automation workflows, and AI tools integrated into your existing systems, we can build around your specific requirements.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-3 font-semibold bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Talk About Your AI
                </Button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-6">
                Custom pricing based on your requirements.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Web Development Cross-link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="text-sm text-gray-400 mb-3">
            Need a website first?
          </p>
          <Button variant="outline" onClick={() => navigateToHref(navigate, '/web-development')}>
            Explore Custom Web Development
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Every solution is custom-built for your business. We focus on measurable ROI, increased conversions, reduced workload, and scalable AI automation.
          </p>
        </motion.div>

        {/* Usage Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-sm text-gray-400 leading-relaxed">
            Plans include generous monthly AI usage. Additional AI conversations, voice minutes or third-party platform costs may incur overage charges depending on usage.
          </p>
        </motion.div>

        {/* Comparison Line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              Hiring one employee often costs <span className="text-white font-semibold">$3,000–$6,000/month</span>. A BuzzleMax AI employee works 24/7 for a fraction of that cost.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
