import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import OrganModel from './OrganModel'
import ORGANS from '../data/organs'

function AnimatedGroup({ children }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(t * 1.1) * 0.6
    groupRef.current.rotation.y = t * 0.35
  })
  return <group ref={groupRef}>{children}</group>
}

/* ─── Embedded 3D organ viewer ──────────────────────────────────────────── */

function SlideOrganView({ organKey, targetStage, xray, animKey }) {
  const organ = ORGANS[organKey]
  // Animate: start at stage 1, step up to targetStage to show cancer spread
  const [stageAnim, setStageAnim] = useState(1)
  const timerRef = useRef(null)

  // Pick a few center voxels to always highlight as the tumor
  const tumorHighlights = organ
    ? organ.voxels
        .map((v, i) => ({ i, d: Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, Math.max(1, Math.floor(organ.voxels.length * 0.04)))
        .map(x => x.i)
    : []

  useEffect(() => {
    setStageAnim(1)
    clearInterval(timerRef.current)
    if (targetStage > 1) {
      let s = 1
      timerRef.current = setInterval(() => {
        s += 1
        setStageAnim(s)
        if (s >= targetStage) clearInterval(timerRef.current)
      }, 700)
    } else {
      setStageAnim(1)
    }
    return () => clearInterval(timerRef.current)
  }, [animKey, targetStage])

  if (!organ) return null

  return (
    <div className="w-full h-full slide-organ-anim">
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

        <AnimatedGroup>
          <OrganModel
            voxels={organ.voxels}
            baseColor={organ.color}
            zones={organ.zones}
            stage={stageAnim}
            highlights={tumorHighlights}
            onVoxelClick={() => {}}
            crossSection={false}
            insideMode={false}
            exploreMode={false}
            xrayMode={xray}
            interior={organ.interior}
          />
        </AnimatedGroup>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
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

          {/* Header — patient-facing presentation bar */}
          <div className="px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-blue-100 bg-white">
            <div className="flex items-center gap-3 min-w-0">
              {organ && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                  <span className="text-blue-500">{organ.icon}</span>
                  <span className="text-blue-800 font-semibold text-sm">{organ.label}</span>
                  <span className="text-blue-300 text-xs">·</span>
                  <span className="text-blue-600 text-xs font-medium">Stage {['I','II','III','IV'][stage-1]}</span>
                </div>
              )}
              <span className="text-slate-500 text-sm font-medium hidden md:block">{deck.title}</span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-slate-400 text-sm">{current + 1} of {total}</span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
              >
                ✕ End presentation
              </button>
            </div>
          </div>

          {/* 3D organ — compact so bullet content has room */}
          <div
            className="flex-shrink-0 relative organ-glow border-b border-blue-100 bg-[#f0f6ff]"
            style={{ height: '38vh' }}
          >
            <SlideOrganView
              key={`${current}-${slideOrganKey}-${xray}`}
              organKey={slideOrganKey}
              targetStage={stage}
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
              <div className="absolute top-2 right-3 bg-blue-700/80 text-white text-xs px-3 py-1 rounded-full pointer-events-none backdrop-blur-sm font-medium">
                Showing inside the organ
              </div>
            )}

            {stage > 1 && (
              <div className="absolute bottom-2 left-3 text-[10px] text-blue-400 pointer-events-none font-medium">
                ▶ Showing cancer growth from Stage I → Stage {['I','II','III','IV'][stage-1]}
              </div>
            )}
            <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 pointer-events-none">
              Drag to rotate · scroll to zoom
            </div>
          </div>

          {/* Slide content — written for the patient */}
          <div className="flex-1 overflow-y-auto px-10 py-6 space-y-5 min-h-0">
            <h2 className="text-3xl font-bold text-slate-800 leading-snug">{slide.title}</h2>
            <ul className="space-y-3">
              {(slide.bullets || []).map((raw, i) => {
                const clean = raw.replace(/[.!?:]+$/, '').trim()
                const text = clean.charAt(0).toUpperCase() + clean.slice(1) + '.'
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-2.5 w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 text-xl leading-relaxed">{text}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-6 py-4 flex-shrink-0 bg-white space-y-3">

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {deck.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 flex-shrink-0 ${
                    i === current ? 'w-6 h-3 bg-blue-500' : 'w-3 h-3 bg-slate-200 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>

            {/* Nav + auto */}
            <div className="flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={current === 0}
                className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors font-medium"
              >
                ← Previous
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
                <button onClick={onClose} className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
                  All done ✓
                </button>
              ) : (
                <button onClick={goNext} className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
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
