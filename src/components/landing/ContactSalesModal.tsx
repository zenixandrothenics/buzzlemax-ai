import * as React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  AI_SERVICE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  REVENUE_OPTIONS,
  SALES_PLAN_OPTIONS,
  WEB_DEVELOPMENT_SERVICE_OPTIONS,
} from '@/lib/site'
import { normalizeWebsite } from '@/lib/navigation'
import { contactSalesSchema, type ContactSalesSchema } from '@/lib/validation'
import { sendContactSalesEmail, type ContactSalesFormData } from '@/services/email'
import { getPendingLeadData } from '@/services/chat-lead'

interface ContactSalesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPlan?: string
}

export function ContactSalesModal({ open, onOpenChange, selectedPlan }: ContactSalesModalProps) {
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = React.useState('')
  const closeTimerRef = React.useRef<number | null>(null)

  const form = useForm<ContactSalesSchema>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      company: '',
      website: '',
      email: '',
      businessType: undefined,
      interestedService: undefined,
      selectedPlan: (selectedPlan as ContactSalesSchema['selectedPlan']) ?? undefined,
      monthlyRevenue: undefined,
      projectDetails: '',
    },
  })

  const projectDetailsLength = form.watch('projectDetails')?.length ?? 0

  const serviceOptions = React.useMemo(
    () => [...AI_SERVICE_OPTIONS, ...WEB_DEVELOPMENT_SERVICE_OPTIONS],
    []
  )

  const setSchemaErrors = (values: ContactSalesSchema) => {
    const result = contactSalesSchema.safeParse(values)

    if (result.success) {
      return {
        ...result.data,
        website: normalizeWebsite(result.data.website || ''),
      } as ContactSalesFormData
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0]
      if (typeof fieldName === 'string') {
        form.setError(fieldName as keyof ContactSalesSchema, {
          type: 'manual',
          message: issue.message,
        })
      }
    })

    return null
  }

  React.useEffect(() => {
    if (!open) {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
      return
    }

    setStatus('idle')
    setStatusMessage('')

    const pending = getPendingLeadData()
    if (pending) {
      if (pending.name) form.setValue('name', pending.name)
      if (pending.email) form.setValue('email', pending.email)
      if (pending.company) form.setValue('company', pending.company)
      if (pending.requirement) form.setValue('projectDetails', pending.requirement)
    }

    if (selectedPlan) {
      form.setValue('selectedPlan', selectedPlan as ContactSalesSchema['selectedPlan'], {
        shouldDirty: true,
      })
    }
  }, [form, open, selectedPlan])

  React.useEffect(() => {
    const subscription = form.watch(() => {
      if (status !== 'idle') {
        setStatus('idle')
        setStatusMessage('')
      }
    })

    return () => subscription.unsubscribe()
  }, [form, status])

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = async (values: ContactSalesSchema) => {
    setStatus('idle')
    setStatusMessage('')

    const parsedValues = setSchemaErrors(values)
    if (!parsedValues) {
      setStatus('error')
      setStatusMessage('Please review the highlighted fields before submitting your request.')
      toast.error('Please review the highlighted fields before submitting your request.')
      return
    }

    try {
      await sendContactSalesEmail(parsedValues)
      setStatus('success')
      setStatusMessage('Request sent successfully. We will follow up from hello@buzzlemax.site.')
      toast.success("Thank you! Your request has been sent successfully. We'll contact you within 24 hours.")

      form.reset({
        name: '',
        company: '',
        website: '',
        email: '',
        businessType: undefined,
        interestedService: undefined,
        selectedPlan: (selectedPlan as ContactSalesSchema['selectedPlan']) ?? undefined,
        monthlyRevenue: undefined,
        projectDetails: '',
      })

      closeTimerRef.current = window.setTimeout(() => {
        onOpenChange(false)
      }, 2200)
    } catch (err) {
      const message =
        (err as { message?: string })?.message || 'Failed to send message. Please try again.'
      setStatus('error')
      setStatusMessage(message)
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto rounded-[32px] border-white/15 bg-background/95 p-0 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.65)] sm:max-w-[760px]">
        <DialogHeader>
          <div className="border-b border-border/60 px-6 pb-5 pt-6 sm:px-8">
            <span className="eyebrow mb-4">Contact Sales</span>
            <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tell us about your growth goals
            </DialogTitle>
            <DialogDescription className="mt-2 text-base leading-7">
              Share a few details and we will recommend the right plan, scope, or implementation path. Typical response time: within 24 hours.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5 px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href="mailto:hello@buzzlemax.site" className="hover:text-foreground transition-colors">
              hello@buzzlemax.site
            </a>
          </div>

          {status !== 'idle' && statusMessage ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border px-4 py-4 ${
                status === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-destructive/30 bg-destructive/10'
              }`}
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    status === 'success' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-destructive/15 text-destructive'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {status === 'success' ? 'Request Sent Successfully' : 'Submission Needs Attention'}
                  </h3>
                  <p className="text-sm text-muted-foreground">{statusMessage}</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" autoComplete="name" aria-required="true" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Acme Inc"
                          autoComplete="organization"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="yourcompany.com"
                          autoComplete="url"
                          inputMode="url"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormDescription>We validate and normalize the URL automatically.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@company.com"
                          autoComplete="email"
                          inputMode="email"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormDescription>We follow up only by email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger aria-required="true">
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUSINESS_TYPE_OPTIONS.map((option: string) => (
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
                  name="interestedService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interested Service</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger aria-required="true">
                            <SelectValue placeholder="Choose the main service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((option) => (
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
                  name="selectedPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selected Plan</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger aria-required="true">
                            <SelectValue placeholder="Select a plan or engagement type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SALES_PLAN_OPTIONS.map((option) => (
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
                  name="monthlyRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Revenue</FormLabel>
                      <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Optional" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {REVENUE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Optional, but helpful for scoping and prioritization.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3">
                      <FormLabel>Project Details</FormLabel>
                      <span className="text-xs text-muted-foreground">{projectDetailsLength}/1500</span>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={7}
                        placeholder="What are you trying to improve? Share your goals, current funnel, channels, timeline, and any constraints."
                        aria-required="true"
                      />
                    </FormControl>
                    <FormDescription>
                      The more context you share, the more precise our recommendation will be.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 font-medium"
                  onClick={() => onOpenChange(false)}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 font-semibold"
                  disabled={form.formState.isSubmitting}
                  aria-busy={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Request
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
