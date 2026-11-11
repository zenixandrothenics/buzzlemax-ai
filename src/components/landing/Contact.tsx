import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COMPANY_INFO } from '@/lib/constants'
import { contactFormSchema, type ContactFormSchema, CONTACT_SERVICE_OPTIONS } from '@/lib/validation'
import { sendContactFormEmail, type ContactFormData } from '@/services/email'

import { getPendingLeadData } from '@/services/chat-lead'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Contact() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const contactEmail = COMPANY_INFO.contact.email
  const [submitState, setSubmitState] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = React.useState('')

  const form = useForm<ContactFormSchema>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      service: 'Other',
      subject: '',
      message: '',
    },
  })

  React.useEffect(() => {
    const pending = getPendingLeadData()
    if (pending) {
      if (pending.name) {
        const parts = pending.name.split(' ')
        form.setValue('firstName', parts[0] || '')
        if (parts.length > 1) {
          form.setValue('lastName', parts.slice(1).join(' '))
        }
      }
      if (pending.email) form.setValue('email', pending.email)
      if (pending.requirement) {
        form.setValue('service', 'Custom AI')
        form.setValue('subject', 'Project Inquiry from AI Chat Assistant')
        form.setValue('message', pending.requirement)
      }
    }
  }, [form])

  const messageLength = form.watch('message')?.length ?? 0

  const setSchemaErrors = (values: ContactFormSchema) => {
    const result = contactFormSchema.safeParse(values)

    if (result.success) return result.data as ContactFormData

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0]
      if (typeof fieldName === 'string') {
        form.setError(fieldName as keyof ContactFormSchema, {
          type: 'manual',
          message: issue.message,
        })
      }
    })

    return null
  }

  const handleSubmit = async (values: ContactFormSchema) => {
    setSubmitState('idle')
    setSubmitMessage('')

    const parsedValues = setSchemaErrors(values)
    if (!parsedValues) {
      setSubmitState('error')
      setSubmitMessage('Please review the highlighted fields and try again.')
      toast.error('Please review the highlighted fields and try again.')
      return
    }

    try {
      await sendContactFormEmail(parsedValues)
      form.reset()
      setSubmitState('success')
      setSubmitMessage('Your message is on its way. We usually reply within one business day.')
      toast.success('Your message has been sent successfully. We’ll get back to you within 24 hours.')
    } catch (error) {
      const message =
        (error as { message?: string })?.message || 'Failed to send message. Please try again.'
      setSubmitState('error')
      setSubmitMessage(message)
      toast.error(message)
    }
  }

  React.useEffect(() => {
    const subscription = form.watch(() => {
      if (submitState !== 'idle') {
        setSubmitState('idle')
        setSubmitMessage('')
      }
    })

    return () => subscription.unsubscribe()
  }, [form, submitState])

  return (
    <section id="contact" className="section bg-muted/30" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="eyebrow mb-4">Contact</span>
          <h2 id="contact-heading" className="section-title">
            Get in{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="section-description">
            Whether you need an intelligent lead-generation chatbot or a complete enterprise automation system, share your goals and we'll engineer a tailored solution with transparent, custom-scoped pricing.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
        >
          <motion.div variants={itemVariants}>
            <Card className="surface-card h-full overflow-hidden">
              <CardContent className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="eyebrow">Contact Us</span>
                    <div className="space-y-3">
                      <h3 className="max-w-sm text-3xl font-bold tracking-tight sm:text-4xl">
                        Have a project in mind?
                      </h3>
                      <p className="max-w-md text-base leading-7 text-muted-foreground">
                        Tell us what you are building, what is blocking growth, and where you need custom AI, automation, or development support.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/15">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Email
                        </p>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="block break-all text-lg font-semibold text-foreground transition-colors hover:text-primary sm:text-xl"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    No spam. No outsourcing maze. You hear directly from the team at {contactEmail}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="surface-card">
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5" noValidate>
                    {submitState !== 'idle' && submitMessage ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                          submitState === 'success'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-destructive/30 bg-destructive/10 text-destructive'
                        }`}
                        aria-live="polite"
                      >
                        {submitState === 'success' ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        ) : (
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        )}
                        <span>{submitMessage}</span>
                      </motion.div>
                    ) : null}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John"
                                autoComplete="given-name"
                                aria-required="true"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Doe"
                                autoComplete="family-name"
                                aria-required="true"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="john@example.com"
                              autoComplete="email"
                              inputMode="email"
                              aria-required="true"
                            />
                          </FormControl>
                          <FormDescription>We reply directly to this address.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are you looking for?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONTACT_SERVICE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="How can we help you?"
                              aria-required="true"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between gap-3">
                            <FormLabel>Message</FormLabel>
                            <span className="text-xs text-muted-foreground">{messageLength}/1200</span>
                          </div>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder="Tell us about your goals, current funnel, and what you want to improve."
                              aria-required="true"
                            />
                          </FormControl>
                          <FormDescription>
                            Include your timeline, current challenges, and desired outcome.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full font-semibold"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      aria-busy={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Message
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
