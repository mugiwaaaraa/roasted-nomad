'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: '#2C1810', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px) 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
          gap: isMobile ? '40px' : '60px',
          paddingBottom: '60px',
          borderBottom: '1px solid rgba(245,239,230,0.1)',
        }}>
          {/* Left — brand */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Image
              src="/logo.png"
              alt="Roasted Nomad"
              width={180}
              height={70}
              style={{
                objectFit: 'contain',
                height: '60px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                marginBottom: '20px',
                display: 'block',
                margin: isMobile ? '0 auto 20px' : '0 0 20px',
              }}
            />
            <p style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 900,
              color: '#F5EFE6',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              ROASTED NOMAD
            </p>
            <p style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '14px',
              color: '#F5EFE6',
              opacity: 0.5,
              lineHeight: 1.65,
              maxWidth: isMobile ? '100%' : '320px',
              margin: isMobile ? '0 auto 12px' : '0 0 12px',
            }}>
              Coffee, brunch & cocktails at the corner of Marion Street.
              Winnipeg&apos;s warmest corner, open since day one.
            </p>
            <p style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '13px',
              color: '#F5EFE6',
              opacity: 0.4,
              marginTop: '12px',
            }}>
              Tue–Sun · 8:00 AM – 2:30 PM · 393 Marion St<br />(204) 691-4820
            </p>
          </div>

          {/* Center — links */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <p style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C17D3C',
              marginBottom: '20px',
            }}>
              Navigate
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {[
                { label: 'Menu', href: '/menu' },
                { label: 'Our Story', href: '#our-story' },
                { label: 'Visit Us', href: '#visit' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-inter-var)',
                    fontSize: '14px',
                    color: '#F5EFE6',
                    opacity: 0.55,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — social */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <p style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C17D3C',
              marginBottom: '20px',
            }}>
              Follow Along
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {['Instagram', 'Facebook'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-inter-var)',
                    fontSize: '14px',
                    color: '#F5EFE6',
                    opacity: 0.55,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '28px', textAlign: isMobile ? 'center' : 'left' }}>
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '12px',
            color: '#F5EFE6',
            opacity: 0.2,
            letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} Roasted Nomad. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
