'use client'

import { motion } from 'framer-motion'

export default function QuoteSection() {
  return (
    <section style={{
      background: '#F5EFE6',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(40px, 8vw, 80px) clamp(24px, 8vw, 80px)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ textAlign: 'center', maxWidth: '800px' }}
      >
        {/* Top rule */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{
            height: '1.5px',
            background: '#C17D3C',
            margin: '0 auto 36px',
          }}
        />

        <blockquote style={{ margin: 0 }}>
          <p style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: 'clamp(24px, 6vw, 48px)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#2C1810',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            &ldquo;The name says it all — roasted, restless, and always moving.&rdquo;
          </p>
        </blockquote>

        {/* Bottom rule */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          style={{
            height: '1.5px',
            background: '#C17D3C',
            margin: '36px auto 0',
          }}
        />
      </motion.div>
    </section>
  )
}
