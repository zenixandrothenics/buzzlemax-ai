import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const teamMembers = [
  {
    name: 'Swapnanil',
    role: 'Founder & AI Solutions',
    bio: 'Building modern AI systems, automation solutions, and premium web experiences for businesses worldwide.',
    skills: ['AI Automation', 'React', 'Next.js', 'Tailwind CSS', 'UI/UX'],
    image: '/images/swapnanil.jpg',
  },
  {
    name: 'Dibyajyoti',
    role: 'Frontend Developer',
    bio: 'Focused on building responsive, fast, scalable frontend applications and beautiful user interfaces.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Frontend Development'],
  },
]

export function MeetTheTeam() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="section relative" aria-labelledby="team-heading">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 h-[18rem] w-[18rem] rounded-full bg-primary/20 blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/4 h-[18rem] w-[18rem] rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
        />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="eyebrow mb-4">Team</span>
          <h2 id="team-heading" className="section-title">
            Meet the Team
          </h2>
          <p className="section-description">
            The people building modern AI solutions and premium digital experiences.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <article
                className={cn(
                  'surface-card p-8',
                  'transition-all duration-300',
                  'hover:shadow-3xl hover:border-white/20'
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-6"
                  >
                    {member.image ? (
                      <>
                        <picture>
                          <source type="image/webp" srcSet="/images/swapnanil.webp" />
                          <img
                            src={member.image}
                            alt={member.name}
                            loading="lazy"
                            decoding="async"
                            width="144"
                            height="144"
                            className="h-36 w-36 rounded-full object-cover border-2 border-amber-500/50 shadow-2xl"
                            style={{
                              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.1)',
                            }}
                          />
                        </picture>
                        <div className="absolute inset-0 h-36 w-36 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-xl -z-10 opacity-50" />
                      </>
                    ) : (
                      <>
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/20 flex items-center justify-center shadow-2xl">
                          <span className="text-4xl font-bold text-foreground">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute inset-0 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl -z-10 opacity-50" />
                      </>
                    )}
                  </motion.div>

                  <h3 className="mb-2 text-2xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + skillIndex * 0.1, duration: 0.3 }}
                        className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
