'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const HOURS = [
  { day: 'Monday',    hours: 'Closed' },
  { day: 'Tuesday',   hours: '8:00 AM – 2:30 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 2:30 PM' },
  { day: 'Thursday',  hours: '8:00 AM – 2:30 PM' },
  { day: 'Friday',    hours: '8:00 AM – 2:30 PM' },
  { day: 'Saturday',  hours: '8:00 AM – 2:30 PM', highlight: true },
  { day: 'Sunday',    hours: '8:00 AM – 2:30 PM' },
]

export default function VisitUs() {
  const isMobile = useIsMobile()

  return (
    <section
      id="visit"
      style={{ background: '#F5EFE6', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <p style={{
          fontFamily: 'var(--font-inter-var)',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#C17D3C',
          marginBottom: '14px',
        }}>
          Find Us
        </p>
        <h2 style={{
          fontFamily: 'var(--font-playfair-display)',
          fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
          fontWeight: 900,
          color: '#2C1810',
          margin: 0,
        }}>
          Come As You Are
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '80px',
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Hours table */}
          <h3 style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#2C1810',
            marginBottom: '20px',
          }}>
            Hours
          </h3>
          <div style={{ marginBottom: '40px' }}>
            {HOURS.map(({ day, hours, highlight }) => (
              <div
                key={day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(44,24,16,0.08)',
                  background: highlight ? 'rgba(193,125,60,0.08)' : 'transparent',
                  paddingLeft: highlight ? '8px' : '0',
                  paddingRight: highlight ? '8px' : '0',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '14px',
                  color: '#2C1810',
                  fontWeight: highlight ? 600 : 400,
                  opacity: hours === 'Closed' ? 0.4 : 1,
                }}>
                  {day}
                  {highlight && (
                    <span style={{ marginLeft: '8px', fontSize: '10px', color: '#C17D3C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Today
                    </span>
                  )}
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '14px',
                  color: hours === 'Closed' ? '#2C1810' : '#2C1810',
                  opacity: hours === 'Closed' ? 0.4 : 0.75,
                }}>
                  {hours}
                </span>
              </div>
            ))}
          </div>

          {/* Address */}
          <h3 style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#2C1810',
            marginBottom: '12px',
          }}>
            Address
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '15px',
            color: '#2C1810',
            opacity: 0.65,
            lineHeight: 1.7,
            marginBottom: '12px',
          }}>
            393 Marion Street<br />
            Winnipeg, Manitoba
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <Phone size={15} color="#C17D3C" strokeWidth={1.8} />
            <span style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '15px',
              color: '#2C1810',
              opacity: 0.65,
            }}>
              (204) 691-4820
            </span>
          </div>

          {/* No reservations callout */}
          <div style={{
            background: 'rgba(193,125,60,0.12)',
            border: '1px solid rgba(193,125,60,0.3)',
            borderLeft: '3px solid #C17D3C',
            padding: '16px 20px',
          }}>
            <p style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: '15px',
              fontStyle: 'italic',
              fontWeight: 600,
              color: '#C17D3C',
              margin: 0,
            }}>
              No reservations needed — first come, first served.
            </p>
          </div>
        </motion.div>

        {/* Right — map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(44,24,16,0.12)' }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.0!2d-97.1085!3d49.8951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea75a7b8b8b8b9%3A0x0!2s393+Marion+St%2C+Winnipeg%2C+MB!5e0!3m2!1sen!2sca!4v1"
            width="100%"
            height={isMobile ? '300' : '460'}
            style={{ border: 0, display: 'block', filter: 'sepia(40%) saturate(0.8) hue-rotate(10deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Roasted Nomad location"
          />
        </motion.div>
      </div>
    </section>
  )
}
