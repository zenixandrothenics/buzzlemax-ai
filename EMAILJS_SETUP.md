# Buzzlemax AI - EmailJS Setup Guide

This project uses EmailJS only for website messages. There is no Supabase, no Resend, and no backend email handler in the active contact flow.

## Required `.env` variables

Fill these exact variables in `.env`:

```env
VITE_EMAILJS_PUBLIC_KEY=deVyHFSLAlhqDKplG
VITE_EMAILJS_SERVICE_ID=service_e8jhsh3
VITE_EMAILJS_TEMPLATE_ID=template_sv6kvnh
```

Where to find them:
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS Dashboard → Account / API Keys
- `VITE_EMAILJS_SERVICE_ID`: EmailJS Dashboard → Email Services
- `VITE_EMAILJS_TEMPLATE_ID`: EmailJS Dashboard → Email Templates

## Recipient

All form submissions are sent to:

`hello@buzzlemax.site`

## Template variables

Create one EmailJS template that supports these variables:

- `to_email`
- `reply_to`
- `form_type`
- `from_name`
- `from_email`
- `subject`
- `message`
- `time`
- `first_name`
- `last_name`
- `name`
- `email`
- `company`
- `website`
- `phone`
- `business_type`
- `interestedService`
- `selectedPlan`
- `monthlyRevenue`
- `project_details`

## Suggested EmailJS template

Set the EmailJS `To Email` field to:

```txt
{{to_email}}
```

Use this as the template body:

```txt
New {{form_type}}

Reply-To: {{reply_to}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Time: {{time}}

Message:
{{message}}

First Name: {{first_name}}
Last Name: {{last_name}}
Name: {{name}}
Email: {{email}}
Company: {{company}}
Website: {{website}}
Phone: {{phone}}
Business Type: {{business_type}}
Interested Service: {{interestedService}}
Selected Plan: {{selectedPlan}}
Monthly Revenue: {{monthlyRevenue}}
Project Details: {{project_details}}
```

## Connected files

- `src/components/landing/Contact.tsx`
- `src/components/landing/ContactSalesModal.tsx`
- `src/services/email.ts`

## Expected behavior

- Required fields validate before send
- Submit button shows a loading state
- Success toast appears on success
- Error toast appears on failure
- The landing contact form clears after success

After updating `.env`, restart the dev server so Vite picks up the EmailJS variables.
