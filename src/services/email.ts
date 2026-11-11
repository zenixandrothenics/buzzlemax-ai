import { COMPANY_INFO } from '@/lib/constants'

export const EMAILJS_ENV_VARIABLES = {
  publicKey: 'VITE_EMAILJS_PUBLIC_KEY',
  serviceId: 'VITE_EMAILJS_SERVICE_ID',
  templateId: 'VITE_EMAILJS_TEMPLATE_ID',
} as const

function validateEmailJsConfigValue(name: string, value: string | undefined) {
  const normalizedValue = value?.trim()

  if (!normalizedValue) {
    throw new Error(`EmailJS configuration is missing. Please fill in ${name} in .env and restart the dev server.`)
  }

  return normalizedValue
}

function getEmailJsConfig() {
  const publicKey = validateEmailJsConfigValue(
    EMAILJS_ENV_VARIABLES.publicKey,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )
  const serviceId = validateEmailJsConfigValue(
    EMAILJS_ENV_VARIABLES.serviceId,
    import.meta.env.VITE_EMAILJS_SERVICE_ID
  )
  const templateId = validateEmailJsConfigValue(
    EMAILJS_ENV_VARIABLES.templateId,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  )

  return { publicKey, serviceId, templateId }
}

type EmailTemplateParams = {
  to_email: string
  reply_to: string
  form_type: string
  from_name: string
  from_email: string
  subject: string
  message: string
  time?: string
  first_name?: string
  last_name?: string
  name?: string
  email?: string
  company?: string
  website?: string
  phone?: string
  business_type?: string
  interestedService?: string
  selectedPlan?: string
  monthlyRevenue?: string
  project_details?: string
}

async function sendEmail(templateParams: EmailTemplateParams): Promise<void> {
  const { publicKey, serviceId, templateId } = getEmailJsConfig()
  const { default: emailjs } = await import('@emailjs/browser')

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
    })

    if (response.status !== 200) {
      throw new Error('Failed to send email. Please try again.')
    }
  } catch (error) {
    const emailJsError = error as { text?: string; message?: string; status?: number }
    const errorMessage = emailJsError.text?.trim() || emailJsError.message?.trim()

    if (errorMessage) {
      throw new Error(errorMessage)
    }

    if (emailJsError.status === 400) {
      throw new Error('EmailJS rejected the request. Please verify the public key, service ID, template ID, and template variables.')
    }

    throw new Error('Failed to send email. Please try again.')
  }
}

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  service?: string
}

export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
  const firstName = data.firstName.trim()
  const lastName = data.lastName.trim()
  const email = data.email.trim()
  const subject = data.subject.trim()
  const message = data.message.trim()
  const fullName = `${firstName} ${lastName}`.trim()

  await sendEmail({
    to_email: COMPANY_INFO.contact.email,
    reply_to: email,
    form_type: 'Website Contact Form',
    from_name: fullName,
    from_email: email,
    time: new Date().toLocaleString(),
    first_name: firstName,
    last_name: lastName,
    name: fullName,
    email,
    subject,
    message,
  })
}

export type ContactSalesFormData = {
  name: string
  company: string
  website: string
  email: string
  businessType: string
  interestedService: string
  selectedPlan: string
  monthlyRevenue?: string | null
  projectDetails: string
}

export async function sendContactSalesEmail(data: ContactSalesFormData): Promise<void> {
  const name = data.name.trim()
  const company = data.company.trim()
  const website = data.website.trim()
  const email = data.email.trim()
  const businessType = data.businessType.trim()
  const interestedService = data.interestedService.trim()
  const selectedPlan = data.selectedPlan.trim()
  const monthlyRevenue = data.monthlyRevenue?.trim() ?? 'Not provided'
  const projectDetails = data.projectDetails.trim()

  await sendEmail({
    to_email: COMPANY_INFO.contact.email,
    reply_to: email,
    form_type: 'Contact Sales',
    from_name: name,
    from_email: email,
    time: new Date().toLocaleString(),
    name,
    email,
    subject: selectedPlan ? `Contact Sales Inquiry - ${selectedPlan}` : 'Contact Sales Inquiry',
    message: projectDetails,
    company,
    website,
    business_type: businessType,
    interestedService,
    selectedPlan,
    monthlyRevenue,
    project_details: projectDetails,
  })
}
