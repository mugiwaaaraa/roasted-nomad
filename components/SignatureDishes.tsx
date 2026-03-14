'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

const DISHES = [
  { name: 'The Nomad Burger',    price: '$24', img: '/images/food-burger.jpg',        description: 'Two smash patties, bacon, mushrooms, mozzarella, garlic aioli' },
  { name: 'Eggs Benedict',       price: '$20', img: '/images/food-benny.jpg',          description: 'Two soft-poached eggs, hollandaise, choice of ham/bacon/spinach' },
  { name: 'The Brandon Brisket', price: '$24', img: '/images/food-brisket.jpg',        description: 'BBQ brisket burnt ends, poached eggs, spicy aioli, hashbrowns' },
  { name: 'Mushroom Toast',      price: '$19', img: '/images/food-mushroom-toast.jpg', description: 'Multigrain sourdough, whipped feta, sautéed mushrooms, poached eggs' },
  { name: 'House Dessert',       price: '',    img: '/images/food-dessert.jpg',        description: "Ask your server about today's dessert" },
  { name: 'Huevos Rancheros',    price: '$18', img: '/images/food-huevos.jpg',         description: 'Soft basted eggs, house salsa, crispy tortillas, feta, avocado' },
]

export default function SignatureDishes() {
  const isMobile = useIsMobile()

  return (
    <section style={{ background: '#F5EFE6', padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '16px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-playfair-display)',
          fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
          fontWeight: 900,
          color: '#2C1810',
          margin: '0 0 16px 0',
        }}>
          Signature Dishes
        </h2>
        <div style={{ width: '60px', height: '3px', background: '#C17D3C', margin: '0 auto 12px' }} />
        <p style={{
          fontFamily: 'var(--font-inter-var)',
          fontSize: '15px',
          color: '#2C1810',
          opacity: 0.55,
        }}>
          A taste of what awaits.
        </p>
      </motion.div>

      {/* 3×2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '24px',
        maxWidth: '1100px',
        margin: '48px auto 0',
      }}>
        {DISHES.map((dish, i) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group"
            style={{
              background: 'transparent',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
              cursor: 'default',
            }}
            whileHover={{
              y: -6,
              boxShadow: '0 20px 50px rgba(44,24,16,0.18)',
            }}
          >
            {/* Photo top */}
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <Image
                src={dish.img}
                alt={dish.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Info bottom */}
            <div style={{ padding: '20px 22px' }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#2C1810',
                margin: '0 0 6px 0',
                lineHeight: 1.2,
              }}>
                {dish.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: '13px',
                color: '#6B4C35',
                lineHeight: 1.55,
                margin: '0 0 8px 0',
              }}>
                {dish.description}
              </p>
              {dish.price && (
                <p style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#C17D3C',
                  margin: 0,
                }}>
                  {dish.price}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        style={{ textAlign: 'center', marginTop: '52px' }}
      >
        <a
          href="/menu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: '1.5px solid #C17D3C',
            color: '#C17D3C',
            padding: '14px 36px',
            fontFamily: 'var(--font-playfair-display)',
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#C17D3C'
            e.currentTarget.style.color = '#2C1810'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#C17D3C'
          }}
        >
          View Full Menu →
        </a>
      </motion.div>
    </section>
  )
}
