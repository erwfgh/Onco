import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import OrganModel from './OrganModel'
import ORGANS from '../data/organs'

/* ─── Embedded 3D organ viewer ──────────────────────────────────────────── */

function SlideOrganView({ organKey, stage, xray, animKey }) {
  const organ = ORGANS[organKey]
  if (!organ) return null

  return (
    <div
      key={animKey}
      className="w-full h-full slide-organ-anim"
    >
      <Canvas
        camera={{ position: [0, 3, 28], fov: 50 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={xray ? 2.8 : 1.4} />
        <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow />
        <directionalLight position={[-12, 8, -8]} intensity={0.5} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={0.3} color="#ffe0d0" />
        {xray && (
          <>
            <pointLight position={[0, 0, 0]}  intensity={3.5} color="#ffffff" distance={35} decay={0.6} />
            <pointLight position={[8, 0, 0]}  intensity={2.0} color="#fff5f0" distance={30} decay={0.8} />
            <pointLight position={[-8, 0, 0]} intensity={2.0} color="#fff5f0" distance={30} decay={0.8} />
          </>
        )}

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={[]}
          onVoxelClick={() => {}}
          crossSection={false}
          insideMode={false}
          exploreMode={false}
          xrayMode={xray}
          interior={organ.interior}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2.0}
          makeDefault
        />
      </Canvas>
    </div>
  )
}

/* ─── SlideShow Component ───────────────────────────────────────────────── */

export default function SlideShow({ deck, organKey, stage, onClose }) {
  const [current, setCurrent] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [intervalSec, setIntervalSec] = useState(5)
  const timerRef = useRef(null)

  const total = deck.slides.length
  const slide = deck.slides[current]
  const isLast = current === total - 1

  // Per-slide organ: use slide.organKey if detected, else fall back to the passed-in organKey
  const slideOrganKey = slide.organKey || organKey
  const xray = slide.viewMode === 'xray'

  useEffect(() => {
    if (!autoAdvance) { clearTimeout(timerRef.current); return }
    timerRef.current = setTimeout(() => {
      if (!isLast) setCurrent(c => c + 1)
      else setAutoAdvance(false)
    }, intervalSec * 1000)
    return () => clearTimeout(timerRef.current)
  }, [autoAdvance, current, intervalSec, isLast])

  const goBack = () => { if (current > 0) setCurrent(c => c - 1) }
  const goNext = () => { if (!isLast) setCurrent(c => c + 1) }
  const progressPct = Math.round(((current + 1) / total) * 100)
  const organ = ORGANS[slideOrganKey]

  return (
    <>
      {/* Animation styles injected once */}
      <style>{`
        @keyframes slideOrganIn {
          from { opacity: 0; transform: scale(0.93) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
          50%       { box-shadow: 0 0 24px 4px rgba(59,130,246,0.22); }
        }
        .slide-organ-anim {
          animation: slideOrganIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        .organ-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 z-30 flex flex-col bg-white overflow-hidden">
        <div className="flex flex-col h-full w-full overflow-hidden">

          {/* Progress bar */}
          <div className="h-1.5 bg-blue-100 flex-shrink-0">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>

          {/* Header */}
          <div className="px-5 py-3 flex items-center justify-between flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' }}>
            <div className="flex items-center gap-3 min-w-0">
              {organ && <span className="text-white/70 text-lg flex-shrink-0">{organ.icon}</span>}
              <span className="text-white font-bold text-sm truncate">{deck.title}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <span className="text-white/60 text-xs">{current + 1} / {total}</span>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-xs font-medium px-2 py-1 rounded hover:bg-white/20 transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* 3D organ — full width, taller since we're full screen */}
          <div
            className="flex-shrink-0 relative organ-glow border-b border-blue-100 bg-[#f0f6ff]"
            style={{ height: '52vh' }}
          >
            {/* Remount canvas when slide or organ changes to retrigger animation */}
            <SlideOrganView
              key={`${current}-${slideOrganKey}-${xray}`}
              organKey={slideOrganKey}
              stage={stage}
              xray={xray}
              animKey={current}
            />

            {/* Organ label badge */}
            {organ && (
              <div className="absolute top-2 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-full px-2.5 py-1 pointer-events-none shadow-sm">
                <span className="text-blue-500 text-xs">{organ.icon}</span>
                <span className="text-slate-700 text-xs font-semibold">{organ.label}</span>
              </div>
            )}

            {xray && (
              <div className="absolute top-2 right-3 bg-blue-900/70 text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm">
                X-Ray — interior anatomy
              </div>
            )}

            <div className="absolute bottom-2 right-3 text-[9px] text-slate-400 pointer-events-none">
              Drag to rotate · Scroll to zoom
            </div>
          </div>

          {/* Slide content */}
          <div className="flex-1 overflow-y-auto px-8 py-5 space-y-4 min-h-0">
            <h2 className="text-2xl font-bold text-slate-800 leading-snug">{slide.title}</h2>
            <ul className="space-y-2.5">
              {slide.narrative
                .split(/(?<=[.!?])\s+/)
                .map(s => s.trim())
                .filter(s => s.length > 10)
                .map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 text-base leading-relaxed">{bullet.replace(/[.!?]$/, '')}</span>
                  </li>
                ))
              }
            </ul>
            {slide.doctorTip && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                <p className="text-blue-800 text-sm leading-relaxed italic">
                  <span className="not-italic font-semibold">💡 Doctor tip: </span>
                  {slide.doctorTip}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-blue-100 px-5 py-3 flex-shrink-0 bg-blue-50 space-y-2.5">

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {deck.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 flex-shrink-0 ${
                    i === current ? 'w-5 h-2.5 bg-blue-500' : 'w-2.5 h-2.5 bg-blue-200 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>

            {/* Nav + auto */}
            <div className="flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={current === 0}
                className="text-sm px-4 py-1.5 rounded-lg border border-blue-200 text-blue-700 disabled:opacity-30 hover:bg-blue-100 transition-colors font-medium"
              >
                ← Back
              </button>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <div
                    onClick={() => setAutoAdvance(a => !a)}
                    className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${autoAdvance ? 'bg-blue-500' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${autoAdvance ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-[10px] text-slate-500">Auto</span>
                </label>
                {autoAdvance && (
                  <>
                    <input type="range" min="3" max="10" value={intervalSec}
                      onChange={e => setIntervalSec(Number(e.target.value))}
                      className="w-16 accent-blue-500" />
                    <span className="text-[10px] text-slate-400">{intervalSec}s</span>
                  </>
                )}
              </div>

              {isLast ? (
                <button onClick={onClose} className="text-sm px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
                  Done ✓
                </button>
              ) : (
                <button onClick={goNext} className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
