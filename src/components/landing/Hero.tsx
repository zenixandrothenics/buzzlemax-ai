import * as React from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Bot, BarChart3, Zap, Sparkles, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'


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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const featureCards = [
  { title: 'Website Chatbots', description: '24/7 lead capture & FAQ automation', icon: Bot },
  { title: 'WhatsApp & Instagram AI', description: 'Instant conversion & smart routing', icon: BarChart3 },
  { title: 'Voice AI Agents', description: 'Inbound booking & client triage', icon: Zap },
]


type HeroProps = {
  onContactSales: (plan?: string) => void
}

export function Hero({ onContactSales }: HeroProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()
  const [isAnimated, setIsAnimated] = React.useState(false)

  React.useEffect(() => {
    if (isInView && !isAnimated) {
      setIsAnimated(true)
    }
  }, [isInView, isAnimated])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0813]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Deep Obsidian Black Base (#0B0813) */}
        <div className="absolute inset-0 bg-[#0B0813]" />

        {/* Ethereal Violet Aurora Wave 1: Neon Amethyst (#A855F7) & Royal Purple (#581C87) Top-Left Stream */}
        <motion.div
          animate={prefersReducedMotion ? undefined : {
            x: ['-6%', '6%', '-6%'],
            y: ['-3%', '5%', '-3%'],
            scale: [1, 1.15, 1],
            rotate: [-5, 5, -5],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[25%] left-[-15%] h-[40rem] md:h-[50rem] w-[50rem] md:w-[60rem] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.42)_0%,rgba(88,28,135,0.36)_45%,rgba(11,8,19,0)_75%)] blur-[60px] md:blur-[100px]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Ethereal Violet Aurora Wave 2: Royal Purple (#581C87) & Neon Amethyst (#A855F7) Top-Right Stream */}
        <motion.div
          animate={prefersReducedMotion ? undefined : {
            x: ['5%', '-5%', '5%'],
            y: ['4%', '-4%', '4%'],
            scale: [1.1, 0.95, 1.1],
            rotate: [6, -4, 6],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] right-[-15%] h-[45rem] md:h-[55rem] w-[55rem] md:w-[65rem] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.48)_0%,rgba(168,85,247,0.32)_50%,rgba(11,8,19,0)_75%)] blur-[60px] md:blur-[100px]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Ethereal Violet Aurora Wave 3: Bottom Amethyst Flow */}
        <motion.div
          animate={prefersReducedMotion ? undefined : {
            x: ['-4%', '4%', '-4%'],
            y: ['5%', '-3%', '5%'],
            scale: [0.95, 1.08, 0.95],
            opacity: [0.55, 0.75, 0.55],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[25%] left-[10%] h-[35rem] md:h-[45rem] w-[55rem] md:w-[70rem] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.32)_0%,rgba(88,28,135,0.40)_55%,rgba(11,8,19,0)_80%)] blur-[70px] md:blur-[110px]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Darkened Center Vignette for High Headline Contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_42%,rgba(11,8,19,0.82)_0%,rgba(11,8,19,0.40)_60%,transparent_100%)]" />

        {/* Smooth Bottom Fade to Background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center rounded-full border border-[#A855F7]/30 bg-gradient-to-r from-[#581C87]/25 to-[#A855F7]/20 px-3.5 py-1.5 text-sm font-medium text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.25)] mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_10px_#A855F7]" />
              {COMPANY_INFO.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            id="hero-heading"
          >
            <span className="block text-white">Custom AI, Built Around</span>
            <span className="block bg-gradient-to-r from-[#A855F7] via-purple-300 to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              What You Actually Need
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            From intelligent website chatbots to WhatsApp, Instagram, voice and custom AI assistants — BuzzleMax engineers bespoke AI solutions that qualify leads, automate FAQs, and scale operations.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground/60 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Every solution is custom-scoped around your exact business requirements, so you only pay for the capabilities that deliver measurable ROI.
          </motion.p>


          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => onContactSales('Custom AI Solution')}
            >
              Request a Custom Quote
            </Button>
            <a
              href="https://zenixandrothenics.github.io/buzzlemax-chatbot-showcase-website/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg text-base font-semibold px-8 py-3',
                'bg-gradient-to-r from-violet-600 to-indigo-600',
                'text-white shadow-md shadow-violet-500/25',
                'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/35',
                'active:scale-[0.98] transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2'
              )}
              aria-label="Explore AI Demos — opens in a new tab"
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>Explore AI Demos</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
            </a>
          </motion.div>
        </motion.div>

        <div className="relative mt-16 lg:mt-24 h-64 sm:h-80 lg:h-96">
          {featureCards.map((card, index) => {
            const floatY = index % 2 === 0 ? ['-8px', '8px', '-8px'] : ['8px', '-8px', '8px']
            const floatDuration = index % 2 === 0 ? 4 : 5
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isAnimated ? { opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : floatY } : { opacity: 0, scale: 0.8 }}
                transition={{
                  scale: { duration: 0.6, delay: 0.8 + index * 0.2 },
                  y: prefersReducedMotion ? undefined : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
                }}
                className={cn(
                  'absolute glass rounded-2xl p-4 shadow-2xl border border-white/10',
                  index === 0 && 'left-4 sm:left-10 top-0 w-56 sm:w-64',
                  index === 1 && 'left-1/2 -translate-x-1/2 top-4 sm:top-8 w-60 sm:w-72',
                  index === 2 && 'right-4 sm:right-10 top-0 w-56 sm:w-64'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{card.title}</h4>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xs text-primary font-medium">Custom Scoped Solution</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
