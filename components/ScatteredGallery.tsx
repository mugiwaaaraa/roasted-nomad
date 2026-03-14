'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PHOTOS = [
  { src: '/images/food-benny.jpg',          alt: 'Eggs Benedict',    rotation: -7,  tx: -20, ty: 14 },
  { src: '/images/food-mushroom-toast.jpg',  alt: 'Mushroom Toast',   rotation: 6,   tx: 16,  ty: -10 },
  { src: '/images/food-burger.jpg',          alt: 'Nomad Burger',     rotation: -4,  tx: -12, ty: -16 },
  { src: '/images/food-brisket.jpg',         alt: 'Brisket',          rotation: 8,   tx: 22,  ty: 12 },
  { src: '/images/food-dessert.jpg',         alt: 'House Dessert',    rotation: -6,  tx: -8,  ty: 20 },
  { src: '/images/food-three-lattes.jpg',    alt: 'Three Lattes',     rotation: 4,   tx: 14,  ty: -8 },
]

export default function ScatteredGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useGSAP(() => {
    if (isMobile) return

    const cards = sectionRef.current!.querySelectorAll<HTMLElement>('.photo-card')

    cards.forEach((card) => {
      gsap.to(card, {
        rotation: 0,
        x: 0,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 2,
        },
      })
    })
  }, { scope: sectionRef, dependencies: [isMobile] })

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F5EFE6', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)', overflow: 'hidden' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-playfair-display)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 900,
          color: '#2C1810',
          margin: 0,
        }}>
          A Taste of What&apos;s Inside
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: isMobile ? '16px' : '32px',
        maxWidth: isMobile ? '100%' : '70%',
        margin: '0 auto',
      }}>
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="photo-card"
            style={{
              background: 'white',
              padding: isMobile ? '6px 6px 24px' : '8px 8px 32px',
              boxShadow: '0 6px 24px rgba(44,24,16,0.15)',
              borderRadius: '2px',
              transform: isMobile ? 'none' : `rotate(${photo.rotation}deg) translate(${photo.tx}px, ${photo.ty}px)`,
              willChange: 'transform',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C17D3C',
              }}>
                Roasted Nomad
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
