'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    document.documentElement.classList.add('loading')

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('loading')
        gsap.set(containerRef.current, { display: 'none' })
      },
    })

    // Logo fades in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
    )
    // Hold
    tl.to({}, { duration: 0.9 })
    // Logo fades out + panels split
    tl.to(logoRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 'split')
    tl.to(topPanelRef.current, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, 'split+=0.1')
    tl.to(bottomPanelRef.current, { yPercent: 100, duration: 0.8, ease: 'power3.inOut' }, 'split+=0.1')
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
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
          height={120}
          style={{ objectFit: 'contain', width: '280px', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.15))' }}
          priority
        />
      </div>
    </div>
  )
}
