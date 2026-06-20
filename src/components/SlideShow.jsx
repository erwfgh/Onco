import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import OrganModel from './OrganModel'
import ORGANS from '../data/organs'

/* ─── Embedded 3D organ viewer for presentation slides ─────────────────── */

function SlideOrganView({ organKey, stage, xray }) {
  const organ = ORGANS[organKey]
  if (!organ) return null

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 3, 28], fov: 50 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={xray ? 2.5 : 1.2} />
        <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow />
        <directionalLight position={[-12, 8, -8]} intensity={0.5} color="#c0d8ff" />
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
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.2}
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

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Progress bar */}
        <div className="h-1.5 bg-blue-100 flex-shrink-0">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' }}>
          <span className="text-white font-bold text-sm truncate pr-4">{deck.title}</span>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/80 hover:text-white text-xs font-medium px-2 py-1 rounded hover:bg-white/20 transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          <div className="text-xs text-slate-400 font-medium">Step {current + 1} of {total}</div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">{slide.title}</h2>

          {/* 3D organ model */}
          {organKey && (
            <div className="rounded-xl border border-blue-100 bg-[#f0f6ff] overflow-hidden relative" style={{ height: 220 }}>
              <SlideOrganView organKey={organKey} stage={stage} xray={xray} />
              {xray && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm whitespace-nowrap">
                  X-Ray view — interior anatomy visible
                </div>
              )}
              <div className="absolute bottom-2 right-2 text-[9px] text-slate-400 pointer-events-none">
                Drag to rotate
              </div>
            </div>
          )}

          {/* Plain-English narrative */}
          <p className="text-slate-700 text-sm leading-relaxed">{slide.narrative}</p>

          {/* Doctor tip */}
          {slide.doctorTip && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
              <p className="text-blue-800 text-xs leading-relaxed italic">
                <span className="not-italic font-semibold">💡 Doctor tip: </span>
                {slide.doctorTip}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-blue-100 px-5 py-3 flex-shrink-0 bg-blue-50 space-y-3">

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5">
            {deck.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-5 h-2.5 bg-blue-500' : 'w-2.5 h-2.5 bg-blue-200 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>

          {/* Nav + auto-advance */}
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
                    className="w-16 accent-blue-500" title={`${intervalSec}s per slide`} />
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
  )
}
