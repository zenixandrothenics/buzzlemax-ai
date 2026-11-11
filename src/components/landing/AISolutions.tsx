import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MessageSquare, Phone, Headphones, TrendingUp, Filter, Calendar, Database, Mail, MessageCircle, Instagram, BookOpen, Cog, ArrowRight } from 'lucide-react'

type AISolution = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

type AISolutionsProps = {
  onContactSales: (plan?: string) => void
}

const solutions: AISolution[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that handle customer inquiries, qualify leads, and provide 24/7 support across your website and messaging platforms.',
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    description: 'Natural-sounding voice assistants that answer calls, schedule appointments, and convert conversations into qualified opportunities.',
    icon: <Phone className="h-6 w-6" />,
  },
  {
    id: 'customer-support-ai',
    title: 'Customer Support AI',
    description: 'Automated support systems that resolve common issues instantly while routing complex queries to your team with full context.',
    icon: <Headphones className="h-6 w-6" />,
  },
  {
    id: 'sales-ai',
    title: 'Sales AI',
    description: 'AI-powered sales assistants that engage prospects, follow up on leads, and close deals faster with personalized conversations.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification',
    description: 'Smart lead scoring and qualification systems that identify high-intent prospects and automatically route them to your sales team.',
    icon: <Filter className="h-6 w-6" />,
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking',
    description: 'Automated scheduling systems that handle bookings, send reminders, and sync with your calendar to eliminate back-and-forth emails.',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    id: 'crm-automation',
    title: 'CRM Automation',
    description: 'Streamline your customer relationship management with AI that updates records, tracks interactions, and maintains your pipeline automatically.',
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Intelligent email workflows that nurture leads, follow up on conversations, and maintain relationships without manual effort.',
    icon: <Mail className="h-6 w-6" />,
  },
  {
    id: 'whatsapp-ai',
    title: 'WhatsApp AI',
    description: 'Automated WhatsApp business messaging that handles customer queries, processes orders, and drives engagement on the world\'s most popular chat platform.',
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    id: 'instagram-ai',
    title: 'Instagram AI',
    description: 'AI-powered Instagram automation that responds to DMs, comments, and stories while maintaining your brand voice and converting followers to customers.',
    icon: <Instagram className="h-6 w-6" />,
  },
  {
    id: 'internal-knowledge-base',
    title: 'Internal Knowledge Base AI',
    description: 'Smart internal assistants that help your team find answers, access documentation, and get instant help with company processes and policies.',
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    id: 'custom-ai-automation',
    title: 'Custom AI Automation',
    description: 'Tailored AI solutions built for your unique business workflows, processes, and automation needs that don\'t fit standard categories.',
    icon: <Cog className="h-6 w-6" />,
  },
]

export function AISolutions({ onContactSales }: AISolutionsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToContactSales = () => {
    onContactSales()
  }

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Solutions We Build
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Custom AI systems built to automate sales, customer support, operations, and business workflows.
          </p>
        </motion.div>

        {/* ── Solution cards grid ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <Card
                className={cn(
                  'h-full border-border/50 bg-background/60 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer'
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {solution.icon}
                    </div>
                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-4 text-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={scrollToContactSales}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}