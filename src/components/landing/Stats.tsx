import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'
import { Users, Target, TrendingUp, DollarSign } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  'Active Users': Users,
  'Leads Captured': Target,
  'Conversion Rate': TrendingUp,
  'Revenue Generated': DollarSign,
}

function AnimatedCounter({ value, active }: { value: string; active: boolean }) {
  const [display, setDisplay] = React.useState(0)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    if (!active || hasAnimated.current) return
    hasAnimated.current = true

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    const duration = 2000
    const steps = 40
    const stepTime = duration / steps
    let current = 0
    const increment = numericValue / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        current = numericValue
        clearInterval(timer)
      }
      setDisplay(current)
    }, stepTime)

    return () => clearInterval(timer)
  }, [value, active])

  const formatNumber = (num: number) => {
    if (value.includes('.')) return num.toFixed(1)
    return Math.round(num).toString()
  }

  const match = value.match(/^([^0-9]*)([0-9.]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const suffix = match ? match[3] : ''

  return (
    <span className="tabular-nums">
      {prefix}{formatNumber(display)}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="stats-heading">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/5" />
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwVjYwSDBaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">Statistics</h2>
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12"
        >
          {STATS.map((stat, index) => {
            const Icon = iconMap[stat.label] || null
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center text-primary-foreground"
              >
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                    {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} active={isInView} />
                </div>
                <p className="text-primary-foreground/80 text-xs sm:text-sm lg:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
