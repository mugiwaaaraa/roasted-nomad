'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function OurStory() {
  const isMobile = useIsMobile()

  return (
    <section
      id="our-story"
      style={{
        background: '#F5EFE6',
        padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '32px' : '80px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C17D3C',
            marginBottom: '16px',
          }}>
            Our Story
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#2C1810',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '24px',
          }}>
            Roasted, Restless, and Always Moving.
          </h2>

          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '16px',
            color: '#2C1810',
            opacity: 0.65,
            lineHeight: 1.75,
            marginBottom: '18px',
          }}>
            Tucked into the heart of St. Boniface on Marion Street, Roasted Nomad
            was born from a wanderer&apos;s spirit and a deep love of honest food.
            We wanted a place that felt like coming home — even if you&apos;d never
            been before.
          </p>
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '16px',
            color: '#2C1810',
            opacity: 0.65,
            lineHeight: 1.75,
            marginBottom: '28px',
          }}>
            Every item on our menu is made with care — hollandaise from scratch,
            locally roasted single-origin beans pulled slow, cocktails that actually
            taste like something. We&apos;re not in a hurry. Neither should you be.
          </p>

          <blockquote style={{
            borderLeft: '3px solid #C17D3C',
            paddingLeft: '20px',
            margin: '0',
          }}>
            <p style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#C17D3C',
              lineHeight: 1.6,
              margin: 0,
            }}>
              &ldquo;We believe the best mornings start slow, with something worth savoring.&rdquo;
            </p>
          </blockquote>
        </motion.div>

        {/* Right — image stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ position: 'relative', minHeight: isMobile ? '300px' : '560px' }}
        >
          {/* Main image */}
          <div style={{
            position: 'relative',
            width: '100%',
            minHeight: isMobile ? '300px' : '560px',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <Image
              src="/images/interior-patio.jpg"
              alt="Roasted Nomad patio"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Polaroid accent — hidden on mobile */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: '-32px',
              width: '44%',
              background: 'white',
              padding: '8px 8px 32px',
              boxShadow: '0 8px 32px rgba(44,24,16,0.22)',
              transform: 'rotate(-3deg)',
              borderRadius: '3px',
              zIndex: 10,
            }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                <Image
                  src="/images/vibe-lets-brunch.jpg"
                  alt="Let's brunch"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="25vw"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
