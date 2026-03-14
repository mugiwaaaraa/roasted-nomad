'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const TEXT = 'ROASTED NOMAD · 393 MARION ST · OPEN TUE–SUN · FIRST COME FIRST SERVE · WINNIPEG\'S WARMEST CORNER · '

export default function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 60,
      repeat: -1,
    })
  }, [])

  const repeated = TEXT.repeat(8)

  return (
    <div style={{
      background: '#E8D5B7',
      overflow: 'hidden',
      padding: '16px 0',
      whiteSpace: 'nowrap',
    }}>
      <div ref={trackRef} style={{ display: 'inline-block' }}>
        <span style={{
          fontFamily: 'var(--font-inter-var)',
          fontSize: '14px',
          letterSpacing: '0.25em',
          color: '#2C1810',
          textTransform: 'uppercase',
        }}>
          {repeated}
        </span>
      </div>
    </div>
  )
}
