'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

const cards = [
  {
    id: 'coffee',
    title: 'Coffee',
    descriptor: 'Single origin. Crafted daily.',
    image: '/images/food-three-lattes.jpg',
    link: '/menu#coffee',
    button: 'Explore Coffee',
  },
  {
    id: 'brunch',
    title: 'Brunch',
    descriptor: 'Morning plates worth waking up for.',
    image: '/images/food-mushroom-toast.jpg',
    link: '/menu#brunch',
    button: 'Explore Brunch',
  },
  {
    id: 'cocktails',
    title: 'Cocktails',
    descriptor: 'Day drinks with depth.',
    image: '/images/interior-bar.jpg',
    link: '/menu#cocktails',
    button: 'Explore Cocktails',
  },
]

export default function ScrollStory() {
  const [hovered, setHovered] = useState<string | null>(null)
  const isMobile = useIsMobile()

  return (
    <section style={{
      background: '#F5EFE6',
      padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: '#C17D3C',
            letterSpacing: '0.2em',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          What We Serve
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(48px, 6vw, 88px)',
            color: '#2C1810',
            fontStyle: 'italic',
            fontWeight: 700,
            marginBottom: '64px',
            lineHeight: 1.1,
          }}
        >
          Coffee. Brunch. Cocktails.
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr 1fr',
          gap: isMobile ? '16px' : '20px',
          alignItems: 'center',
        }}>
          {cards.map((card, i) => {
            const isHovered = hovered === card.id
            const isOther = hovered !== null && !isHovered
            const isCenter = i === 1

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative',
                  height: isMobile ? '400px' : (isCenter ? '620px' : '520px'),
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: isHovered
                    ? 'scale(1.03)'
                    : isOther
                    ? 'scale(0.97)'
                    : 'scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
                  boxShadow: isHovered
                    ? '0 40px 80px rgba(44,24,16,0.3)'
                    : isCenter
                    ? '0 20px 50px rgba(44,24,16,0.15)'
                    : '0 8px 24px rgba(44,24,16,0.1)',
                  zIndex: isHovered ? 10 : isCenter ? 2 : 1,
                }}
              >
                {/* Image with zoom on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: card.id === 'cocktails' ? 'center 60%' : 'center',
                      filter: isOther ? 'brightness(0.7)' : 'brightness(1)',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isHovered
                    ? 'linear-gradient(to bottom, transparent 20%, rgba(10,5,2,0.88) 100%)'
                    : 'linear-gradient(to bottom, transparent 30%, rgba(10,5,2,0.82) 100%)',
                  transition: 'background 0.5s ease',
                }} />

                {/* Amber border on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                  border: isHovered ? '2px solid rgba(193,125,60,0.8)' : '2px solid transparent',
                  transition: 'border 0.4s ease',
                  pointerEvents: 'none',
                  zIndex: 3,
                }} />

                {/* Center card amber top accent */}
                {isCenter && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#C17D3C',
                    zIndex: 3,
                  }} />
                )}

                {/* Text */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 28px',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.5s ease',
                  zIndex: 2,
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isCenter ? '52px' : '42px',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 6px 0',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.75)',
                    margin: '0 0 18px 0',
                    fontWeight: 400,
                  }}>
                    {card.descriptor}
                  </p>
                  <Link href={card.link}>
                    <span style={{
                      display: 'inline-block',
                      background: '#C17D3C',
                      color: '#FFFFFF',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '10px 20px',
                      borderRadius: '3px',
                      opacity: isHovered ? 1 : 0.75,
                      transform: isHovered ? 'translateY(0)' : 'translateY(3px)',
                      transition: 'all 0.4s ease',
                    }}>
                      {card.button} →
                    </span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
