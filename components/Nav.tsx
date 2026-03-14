'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? '#F5EFE6' : 'transparent',
        borderBottom: scrolled ? '1px solid #E8D5B7' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 32px',
          height: scrolled ? (isMobile ? '56px' : '64px') : (isMobile ? '72px' : '88px'),
          transition: 'height 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image
            src="/logo.png"
            alt="Roasted Nomad"
            width={200}
            height={70}
            style={{
              objectFit: 'contain',
              height: scrolled ? (isMobile ? '28px' : '36px') : (isMobile ? '50px' : '70px'),
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
            priority
          />
        </Link>

        {/* Links — only when scrolled */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '32px',
            opacity: scrolled ? 1 : 0,
            pointerEvents: scrolled ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          <Link
            href="/menu"
            style={{
              fontFamily: 'var(--font-inter-var)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#2C1810',
              opacity: 0.65,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
          >
            Menu
          </Link>
          {!isMobile && (
            <a
              href="#our-story"
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#2C1810',
                opacity: 0.65,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
            >
              Our Story
            </a>
          )}
          {!isMobile && (
            <a
              href="#visit"
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#2C1810',
                opacity: 0.65,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
            >
              Visit Us
            </a>
          )}
          <Link
            href="/menu"
            style={{
              fontFamily: 'var(--font-playfair-display)',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#2C1810',
              background: '#C17D3C',
              padding: '8px 20px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#a86830')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C17D3C')}
          >
            See Menu
          </Link>
        </div>
      </div>
    </nav>
  )
}
