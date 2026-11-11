import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'


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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Demo() {
  const videoSrc = `${import.meta.env.BASE_URL}videos/buzzlemax-ai-demo.mp4`
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToContactSales = () => {
    const el = document.getElementById('contact-sales') || document.getElementById('contact')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="demo" className="section bg-muted/30" aria-labelledby="demo-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="eyebrow mb-4">Demo</span>
          <h2 id="demo-heading" className="section-title">
            See{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              BuzzleMax AI In Action
            </span>
          </h2>
          <p className="section-description">
            Watch how our AI employees automate customer support, lead qualification, sales and business operations.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="relative"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="glass rounded-[28px] border-white/15 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.65)] overflow-hidden group">
                {/* Poster / loading skeleton */}
                <div className="relative">
                  <div className="absolute inset-0">
                    <div className="h-full w-full bg-gradient-to-br from-primary/15 via-background/60 to-background/20" />
                    <div className="absolute inset-0 opacity-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-20 w-20 rounded-full bg-background/60 backdrop-blur-sm ring-1 ring-white/20 shadow-lg flex items-center justify-center">
                      <span className="text-2xl">▶</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-start justify-end p-5">
                    <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Powered by BuzzleMax
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-background/30 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0" />

                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    <video
                      src={videoSrc}
                      controls
                      preload="none"
                      poster="/images/demo-poster.webp"
                      playsInline
                      muted
                      width={1280}
                      height={720}
                      aria-label="BuzzleMax AI product demo video"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="h-full border-white/15 bg-background/40 glass rounded-[28px] shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  ⚡
                </div>
                <h3 className="font-semibold mb-2">AI Automation</h3>
              </CardContent>
            </Card>

            <Card className="h-full border-white/15 bg-background/40 glass rounded-[28px] shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  💬
                </div>
                <h3 className="font-semibold mb-2">AI Customer Support</h3>
              </CardContent>
            </Card>

            <Card className="h-full border-white/15 bg-background/40 glass rounded-[28px] shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  📈
                </div>
                <h3 className="font-semibold mb-2">AI Sales Assistant</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center pt-2">
            <Button
              size="lg"
              className="rounded-[28px] px-8 py-4 shadow-2xl"
              onClick={scrollToContactSales}
            >
              Book a Free Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
