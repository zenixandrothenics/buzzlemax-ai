import { Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import { navigateToHref } from '@/lib/navigation'
import { FOOTER_LINK_GROUPS } from '@/lib/site'

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/buzzlemax.official/', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/BuzzleMax', label: 'X' },
  { icon: Github, href: 'https://github.com/BuzzleMax', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/buzzle-max-24955441b/', label: 'LinkedIn' },
]


export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <picture>
                <source type="image/webp" srcSet="/buzzlemax-logo-128.webp" />
                <img
                  src="/buzzlemax-logo.png"
                  alt="Buzzlemax AI Logo"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-9 object-contain rounded-md"
                />
              </picture>
              <span className="text-xl font-bold tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              {COMPANY_INFO.description}
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}

            </div>
          </div>

          {Object.entries(FOOTER_LINK_GROUPS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        navigateToHref(navigate, link.href)
                      }}
                      className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="hover:text-foreground transition-colors"
              >
                {COMPANY_INFO.contact.email}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
