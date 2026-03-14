'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const coffeeRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.2 })

    tl.from('.hero-line-1', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from('.hero-line-2', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .from('.hero-sub', {
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.4')
    .from(coffeeRef.current, {
      x: isMobile ? 0 : 60,
      y: isMobile ? 40 : 0,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
    }, '-=0.8')
    .from(arrowRef.current, { opacity: 0, duration: 0.4 }, '-=0.2')

    // Float loop
    gsap.to(coffeeRef.current, {
      y: -16,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3.4,
    })

    // Arrow bounce
    gsap.to(arrowRef.current, {
      y: 8,
      duration: 0.85,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3.6,
    })
  }, { scope: containerRef })

  const headingSize = isMobile ? 'clamp(48px, 12vw, 96px)' : 'clamp(52px, 8vw, 110px)'

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#F5EFE6',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/interior-dining.jpg"
          alt="Roasted Nomad interior"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Parchment overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(245,239,230,0.70)' }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          padding: isMobile ? 'clamp(80px, 20vw, 120px) 20px 60px' : '0 6vw',
          gap: isMobile ? '32px' : '40px',
        }}
      >
        {/* Left — text */}
        <div style={{ maxWidth: isMobile ? '100%' : '600px', flex: '1 1 auto', textAlign: isMobile ? 'center' : 'left' }}>
          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C17D3C',
              marginBottom: '20px',
            }}
          >
            Winnipeg&apos;s Warmest Corner
          </p>

          <div style={{ lineHeight: '0.85', marginBottom: '24px' }}>
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="hero-line-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: headingSize,
                  fontWeight: 600,
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#2C1810',
                  lineHeight: '0.85',
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                ROASTED
              </h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="hero-line-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: headingSize,
                  fontWeight: 600,
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#C17D3C',
                  lineHeight: '0.85',
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                NOMAD
              </h1>
            </div>
          </div>

          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#2C1810',
              marginBottom: '36px',
            }}
          >
            Coffee · Brunch · Cocktails
          </p>

          <div
            className="hero-sub"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '28px',
              alignItems: isMobile ? 'stretch' : 'flex-start',
            }}
          >
            <Link
              href="/menu"
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: '#C17D3C',
                color: '#FFFFFF',
                padding: '14px 32px',
                textDecoration: 'none',
                transition: 'background 0.25s ease',
                textAlign: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#a86830')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C17D3C')}
            >
              Explore Menu
            </Link>
            <a
              href="#visit"
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: '#2C1810',
                border: '1.5px solid #2C1810',
                padding: '14px 32px',
                textDecoration: 'none',
                transition: 'background 0.25s ease, color 0.25s ease',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2C1810'
                e.currentTarget.style.color = '#F5EFE6'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#2C1810'
              }}
            >
              Find Us
            </a>
          </div>

          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '12px',
              color: '#2C1810',
              opacity: 0.45,
              letterSpacing: '0.08em',
            }}
          >
            {isMobile ? (
              <>Open Tue–Sun · 8:00 AM – 2:30 PM<br />393 Marion St, Winnipeg · (204) 691-4820</>
            ) : (
              'Open Tue–Sun · 8:00 AM – 2:30 PM · 393 Marion St, Winnipeg · (204) 691-4820'
            )}
          </p>
        </div>

        {/* Right — floating circle */}
        <div
          ref={coffeeRef}
          style={{
            flexShrink: 0,
            width: isMobile ? '280px' : 'clamp(300px, 35vw, 500px)',
            height: isMobile ? '280px' : 'clamp(300px, 35vw, 500px)',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(193,125,60,0.35), 0 20px 60px rgba(44,24,16,0.2)',
            position: 'relative',
            margin: isMobile ? '0 auto' : undefined,
          }}
        >
          <Image
            src="/images/food-three-lattes.jpg"
            alt="Artisan coffee"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#2C1810',
            opacity: 0.4,
          }}
        >
          Scroll
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
