'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    document.documentElement.classList.add('loading')

    // Logo fades in
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.8 }
    )

    // After 1.8s, two panels slide simultaneously
    gsap.to(topPanelRef.current, {
      y: '-100%',
      duration: 0.7,
      ease: 'power2.inOut',
      delay: 1.8,
    })
    gsap.to(bottomPanelRef.current, {
      y: '100%',
      duration: 0.7,
      ease: 'power2.inOut',
      delay: 1.8,
      onComplete: () => {
        document.documentElement.classList.remove('loading')
        setDone(true)
      },
    })
  }, { scope: containerRef })

  if (done) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundColor: '#2C1810',
      }}
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#2C1810',
          zIndex: 1,
        }}
      />
      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#2C1810',
          zIndex: 1,
        }}
      />
      {/* Logo centered */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <Image
          src="/logo.png"
          alt="Roasted Nomad"
          width={280}
          height={280}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  )
}
