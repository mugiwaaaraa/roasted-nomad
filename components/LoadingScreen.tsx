'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)

  // Vine refs
  const vine1Ref = useRef<SVGPathElement>(null)
  const vine2Ref = useRef<SVGPathElement>(null)
  const vine3Ref = useRef<SVGPathElement>(null)
  const vine4Ref = useRef<SVGPathElement>(null)

  // Flower refs
  const flower1Ref = useRef<SVGGElement>(null)
  const flower2Ref = useRef<SVGGElement>(null)
  const flower3Ref = useRef<SVGGElement>(null)
  const flower4Ref = useRef<SVGGElement>(null)

  // Text refs
  const roastedRef = useRef<HTMLDivElement>(null)
  const nomadRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)

  // Get real dimensions client-side
  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  useGSAP(() => {
    if (!dims) return

    const vines = [vine1Ref.current, vine2Ref.current, vine3Ref.current, vine4Ref.current]
    const flowers = [flower1Ref.current, flower2Ref.current, flower3Ref.current, flower4Ref.current]

    // Set up vine stroke-dashoffset (invisible, ready to draw)
    vines.forEach((vine) => {
      if (!vine) return
      const len = vine.getTotalLength()
      gsap.set(vine, { strokeDasharray: len, strokeDashoffset: len })
    })

    // Flowers start at scale 0
    flowers.forEach((flower) => {
      if (!flower) return
      gsap.set(flower, { scale: 0, transformOrigin: '0px 0px' })
    })

    const tl = gsap.timeline()

    // Vines draw in — staggered 0.1s between each corner
    vines.forEach((vine, i) => {
      if (!vine) return
      tl.to(vine, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, i * 0.1)
    })

    // Flowers bloom at vine tips — spring animation
    flowers.forEach((flower, i) => {
      if (!flower) return
      tl.to(flower, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      }, 0.8 + i * 0.1)
    })

    // Center text fades in
    tl.to(roastedRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.2)
    tl.to(nomadRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.45)
    tl.to(subRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.8)

    // At 2.5s, fade out entire screen
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => setVisible(false),
    }, 2.5)

  }, { scope: containerRef, dependencies: [dims] })

  if (!visible) return null

  const w = dims?.w ?? 1440
  const h = dims?.h ?? 900

  // Vine paths in pixel coords matching actual viewport
  const topLeftPath    = `M 0 0 C 50 20, 80 60, 120 100 C 140 130, 130 160, 150 200`
  const topRightPath   = `M ${w} 0 C ${w-50} 20, ${w-80} 60, ${w-120} 100 C ${w-140} 130, ${w-130} 160, ${w-150} 200`
  const bottomLeftPath = `M 0 ${h} C 50 ${h-20}, 80 ${h-60}, 120 ${h-100} C 140 ${h-130}, 130 ${h-160}, 150 ${h-200}`
  const bottomRightPath= `M ${w} ${h} C ${w-50} ${h-20}, ${w-80} ${h-60}, ${w-120} ${h-100} C ${w-140} ${h-130}, ${w-130} ${h-160}, ${w-150} ${h-200}`

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F5EFE6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* SVG botanical overlay — only rendered after dims are known */}
      {dims && (
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox={`0 0 ${w} ${h}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Top-left vine ── */}
          <path ref={vine1Ref} d={topLeftPath} stroke="#C17D3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="55"  cy="42"  rx="9" ry="4" fill="#7A9B5A" transform="rotate(-35 55 42)"   opacity="0.65" />
          <ellipse cx="105" cy="90"  rx="8" ry="3.5" fill="#7A9B5A" transform="rotate(-50 105 90)"  opacity="0.6"  />
          <ellipse cx="138" cy="150" rx="7" ry="3"   fill="#7A9B5A" transform="rotate(-65 138 150)" opacity="0.55" />
          <g ref={flower1Ref} transform="translate(150,200)">
            <circle r="3" fill="#C17D3C" />
            <ellipse cx="0"  cy="-7" rx="2.5" ry="4" fill="#E8A96D" opacity="0.9" />
            <ellipse cx="6.65"  cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(72 6.65 -2.17)"  opacity="0.9" />
            <ellipse cx="4.11"  cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(144 4.11 5.68)"  opacity="0.9" />
            <ellipse cx="-4.11" cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(216 -4.11 5.68)" opacity="0.9" />
            <ellipse cx="-6.65" cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(288 -6.65 -2.17)" opacity="0.9" />
          </g>

          {/* ── Top-right vine ── */}
          <path ref={vine2Ref} d={topRightPath} stroke="#C17D3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx={w-55}  cy="42"  rx="9" ry="4" fill="#7A9B5A" transform={`rotate(215 ${w-55} 42)`}   opacity="0.65" />
          <ellipse cx={w-105} cy="90"  rx="8" ry="3.5" fill="#7A9B5A" transform={`rotate(230 ${w-105} 90)`}  opacity="0.6"  />
          <ellipse cx={w-138} cy="150" rx="7" ry="3"   fill="#7A9B5A" transform={`rotate(245 ${w-138} 150)`} opacity="0.55" />
          <g ref={flower2Ref} transform={`translate(${w-150},200)`}>
            <circle r="3" fill="#C17D3C" />
            <ellipse cx="0"  cy="-7" rx="2.5" ry="4" fill="#E8A96D" opacity="0.9" />
            <ellipse cx="6.65"  cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(72 6.65 -2.17)"  opacity="0.9" />
            <ellipse cx="4.11"  cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(144 4.11 5.68)"  opacity="0.9" />
            <ellipse cx="-4.11" cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(216 -4.11 5.68)" opacity="0.9" />
            <ellipse cx="-6.65" cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(288 -6.65 -2.17)" opacity="0.9" />
          </g>

          {/* ── Bottom-left vine ── */}
          <path ref={vine3Ref} d={bottomLeftPath} stroke="#C17D3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="55"  cy={h-42}  rx="9" ry="4" fill="#7A9B5A" transform={`rotate(145 55 ${h-42})`}   opacity="0.65" />
          <ellipse cx="105" cy={h-90}  rx="8" ry="3.5" fill="#7A9B5A" transform={`rotate(130 105 ${h-90})`}  opacity="0.6"  />
          <ellipse cx="138" cy={h-150} rx="7" ry="3"   fill="#7A9B5A" transform={`rotate(115 138 ${h-150})`} opacity="0.55" />
          <g ref={flower3Ref} transform={`translate(150,${h-200})`}>
            <circle r="3" fill="#C17D3C" />
            <ellipse cx="0"  cy="-7" rx="2.5" ry="4" fill="#E8A96D" opacity="0.9" />
            <ellipse cx="6.65"  cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(72 6.65 -2.17)"  opacity="0.9" />
            <ellipse cx="4.11"  cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(144 4.11 5.68)"  opacity="0.9" />
            <ellipse cx="-4.11" cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(216 -4.11 5.68)" opacity="0.9" />
            <ellipse cx="-6.65" cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(288 -6.65 -2.17)" opacity="0.9" />
          </g>

          {/* ── Bottom-right vine ── */}
          <path ref={vine4Ref} d={bottomRightPath} stroke="#C17D3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx={w-55}  cy={h-42}  rx="9" ry="4" fill="#7A9B5A" transform={`rotate(35 ${w-55} ${h-42})`}   opacity="0.65" />
          <ellipse cx={w-105} cy={h-90}  rx="8" ry="3.5" fill="#7A9B5A" transform={`rotate(50 ${w-105} ${h-90})`}  opacity="0.6"  />
          <ellipse cx={w-138} cy={h-150} rx="7" ry="3"   fill="#7A9B5A" transform={`rotate(65 ${w-138} ${h-150})`} opacity="0.55" />
          <g ref={flower4Ref} transform={`translate(${w-150},${h-200})`}>
            <circle r="3" fill="#C17D3C" />
            <ellipse cx="0"  cy="-7" rx="2.5" ry="4" fill="#E8A96D" opacity="0.9" />
            <ellipse cx="6.65"  cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(72 6.65 -2.17)"  opacity="0.9" />
            <ellipse cx="4.11"  cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(144 4.11 5.68)"  opacity="0.9" />
            <ellipse cx="-4.11" cy="5.68"  rx="2.5" ry="4" fill="#E8A96D" transform="rotate(216 -4.11 5.68)" opacity="0.9" />
            <ellipse cx="-6.65" cy="-2.17" rx="2.5" ry="4" fill="#E8A96D" transform="rotate(288 -6.65 -2.17)" opacity="0.9" />
          </g>
        </svg>
      )}

      {/* Center text — opacity 0 initially, GSAP animates in */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div
          ref={roastedRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 600,
            color: '#2C1810',
            lineHeight: 0.85,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          ROASTED
        </div>
        <div
          ref={nomadRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 600,
            color: '#C17D3C',
            lineHeight: 0.85,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          NOMAD
        </div>
        <div
          ref={subRef}
          style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#2C1810',
            marginTop: '16px',
            opacity: 0,
          }}
        >
          Coffee · Brunch · Cocktails
        </div>
      </div>
    </div>
  )
}
