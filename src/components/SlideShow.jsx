import { useState, useEffect, useRef } from 'react'

/* ─── SVG Diagrams ─────────────────────────────────────────────────────── */

function LungBrainDiagram() {
  return (
    <svg viewBox="0 0 400 180" width="100%" height="180" aria-label="Lung to brain pathway diagram">
      <style>{`
        @keyframes dash-move {
          from { stroke-dashoffset: 120; }
          to   { stroke-dashoffset: 0; }
        }
        .animated-path { animation: dash-move 2s linear infinite; }
      `}</style>

      {/* Lung shape */}
      <ellipse cx="70" cy="90" rx="45" ry="65" fill="#fecdd3" stroke="#f87171" strokeWidth="2" />
      <ellipse cx="60" cy="90" rx="28" ry="50" fill="#fda4af" stroke="#f87171" strokeWidth="1" />
      <text x="70" y="170" textAnchor="middle" fontSize="11" fill="#64748b">Lung</text>

      {/* Heart shape (simplified) */}
      <path d="M195 80 C195 70 185 65 180 72 C175 65 165 70 165 80 C165 95 180 108 180 108 C180 108 195 95 195 80Z"
        fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
      <text x="180" y="125" textAnchor="middle" fontSize="10" fill="#64748b">Heart</text>

      {/* Brain shape */}
      <ellipse cx="330" cy="80" rx="42" ry="38" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
      <path d="M308 70 Q320 60 330 68 Q340 60 352 70" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M305 82 Q318 74 330 80 Q342 74 355 82" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M308 94 Q320 88 330 94 Q340 88 352 94" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <text x="330" y="135" textAnchor="middle" fontSize="11" fill="#64748b">Brain</text>

      {/* Animated path: lung → heart */}
      <path d="M118 90 L158 90" fill="none" stroke="#ef4444" strokeWidth="3"
        strokeDasharray="12 8" className="animated-path" />
      <polygon points="158,85 170,90 158,95" fill="#ef4444" />

      {/* Animated path: heart → brain */}
      <path d="M200 85 Q245 50 280 75" fill="none" stroke="#ef4444" strokeWidth="3"
        strokeDasharray="12 8" className="animated-path" />
      <polygon points="276,68 288,75 278,82" fill="#ef4444" />

      {/* Label */}
      <text x="200" y="162" textAnchor="middle" fontSize="10" fill="#64748b">
        Blood → Heart → Aorta → Brain
      </text>
    </svg>
  )
}

function LymphSpreadDiagram() {
  const nodes = [30, 65, 100, 135, 170]
  const colors = ['#22c55e', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95']
  return (
    <svg viewBox="0 0 180 220" width="180" height="220" aria-label="Lymph node chain spread diagram">
      <style>{`
        @keyframes pulse-node {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
        .pulse { animation: pulse-node 2s ease-in-out infinite; }
      `}</style>
      {nodes.map((y, i) => (
        <g key={i}>
          {i < nodes.length - 1 && (
            <line x1="90" y1={y + 22} x2="90" y2={nodes[i + 1] - 22}
              stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
          )}
          <ellipse cx="90" cy={y} rx="32" ry="20" fill={colors[i]}
            opacity={0.85} className={i > 0 ? 'pulse' : ''} />
          <text x="90" y={y + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
            {i === 0 ? 'Normal' : `Node ${i + 1}`}
          </text>
        </g>
      ))}
      <text x="90" y="210" textAnchor="middle" fontSize="10" fill="#64748b">
        Cancer spreads down chain
      </text>
    </svg>
  )
}

function VesselHighwayDiagram() {
  return (
    <svg viewBox="0 0 380 160" width="100%" height="160" aria-label="Tumor emboli in bloodstream diagram">
      <style>{`
        @keyframes flow-right {
          from { transform: translateX(0); }
          to   { transform: translateX(300px); }
        }
        .dot1 { animation: flow-right 3s linear infinite; }
        .dot2 { animation: flow-right 3s linear 1s infinite; }
        .dot3 { animation: flow-right 3s linear 2s infinite; }
      `}</style>

      {/* Vessel walls */}
      <rect x="20" y="55" width="340" height="50" rx="25" fill="#fee2e2" stroke="#fca5a5" strokeWidth="2" />
      <rect x="20" y="65" width="340" height="30" rx="15" fill="#fecdd3" />

      {/* Flowing dots */}
      <circle cx="30" cy="80" r="8" fill="#7c3aed" opacity="0.85" className="dot1" />
      <circle cx="30" cy="80" r="8" fill="#7c3aed" opacity="0.85" className="dot2" />
      <circle cx="30" cy="80" r="8" fill="#7c3aed" opacity="0.85" className="dot3" />

      {/* Labels */}
      <text x="190" y="30" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Blood Vessel</text>
      <text x="190" y="48" textAnchor="middle" fontSize="10" fill="#94a3b8">(cross-section)</text>
      <text x="190" y="130" textAnchor="middle" fontSize="10" fill="#64748b">
        Tumor emboli traveling in bloodstream
      </text>

      {/* Arrow direction */}
      <polygon points="350,76 360,80 350,84" fill="#ef4444" />
      <line x1="340" y1="80" x2="352" y2="80" stroke="#ef4444" strokeWidth="2" />
    </svg>
  )
}

function ColonLiverLungDiagram() {
  const boxes = [
    { x: 10,  label: 'Colon', color: '#fef3c7', border: '#f59e0b' },
    { x: 90,  label: 'Portal\nVein', color: '#fee2e2', border: '#ef4444' },
    { x: 170, label: 'Liver', color: '#d1fae5', border: '#10b981' },
    { x: 250, label: 'Hepatic\nVeins', color: '#fee2e2', border: '#ef4444' },
    { x: 330, label: 'Lung', color: '#dbeafe', border: '#3b82f6' },
  ]
  return (
    <svg viewBox="0 0 420 170" width="100%" height="170" aria-label="Colon to liver to lung metastasis pathway">
      <style>{`
        @keyframes cascade {
          0%   { cx: 50;  opacity: 1; }
          20%  { cx: 130; opacity: 1; }
          40%  { cx: 210; opacity: 1; }
          60%  { cx: 290; opacity: 1; }
          80%  { cx: 370; opacity: 1; }
          100% { cx: 370; opacity: 0; }
        }
        .cascade-dot { animation: cascade 4s linear infinite; }
      `}</style>

      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="40" width="70" height="60" rx="8"
            fill={b.color} stroke={b.border} strokeWidth="1.5" />
          {b.label.split('\n').map((line, j) => (
            <text key={j} x={b.x + 35} y={68 + j * 14} textAnchor="middle"
              fontSize="10" fill="#1e293b" fontWeight="bold">{line}</text>
          ))}
          {i < boxes.length - 1 && (
            <polygon points={`${b.x + 73},67 ${b.x + 83},70 ${b.x + 73},73`} fill="#64748b" />
          )}
        </g>
      ))}

      <circle r="7" fill="#7c3aed" opacity="0.9" className="cascade-dot">
        <animateMotion dur="4s" repeatCount="indefinite"
          path="M50,70 L130,70 L210,70 L290,70 L370,70" />
      </circle>

      <text x="210" y="150" textAnchor="middle" fontSize="10" fill="#64748b">
        Classic colon cancer metastasis cascade
      </text>
    </svg>
  )
}

function BoneMarrowDiagram() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-label="Cancer in bone marrow diagram">
      <style>{`
        @keyframes blob-pulse {
          0%, 100% { r: 7; opacity: 0.9; }
          50%       { r: 9; opacity: 0.7; }
        }
        .blob { animation: blob-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Bone cortex (outer) */}
      <rect x="60" y="20" width="80" height="160" rx="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />

      {/* Bone marrow (inner) */}
      <rect x="78" y="35" width="44" height="130" rx="22" fill="#fecdd3" stroke="#fca5a5" strokeWidth="1.5" />

      {/* Cancer blobs in marrow */}
      {[
        { cx: 100, cy: 65 },
        { cx: 92,  cy: 90 },
        { cx: 110, cy: 110 },
        { cx: 96,  cy: 135 },
        { cx: 108, cy: 80 },
      ].map((pos, i) => (
        <circle key={i} cx={pos.cx} cy={pos.cy} r="8" fill="#7c3aed"
          opacity="0.85" className="blob"
          style={{ animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* Labels */}
      <text x="100" y="13" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">Bone</text>
      <text x="145" y="92" fontSize="9" fill="#64748b">← Cortex</text>
      <text x="145" y="108" fontSize="9" fill="#fca5a5">← Marrow</text>

      {/* Legend */}
      <circle cx="62" cy="192" r="6" fill="#7c3aed" />
      <text x="73" y="196" fontSize="9" fill="#64748b">Cancer cells in marrow</text>
    </svg>
  )
}

function DiagramRenderer({ type }) {
  if (type === 'lung-brain')       return <div className="flex justify-center py-2"><LungBrainDiagram /></div>
  if (type === 'lymph-spread')     return <div className="flex justify-center py-2"><LymphSpreadDiagram /></div>
  if (type === 'vessel-highway')   return <div className="flex justify-center py-2"><VesselHighwayDiagram /></div>
  if (type === 'colon-liver-lung') return <div className="flex justify-center py-2"><ColonLiverLungDiagram /></div>
  if (type === 'bone-marrow')      return <div className="flex justify-center py-2"><BoneMarrowDiagram /></div>
  return null
}

/* ─── SlideShow Component ───────────────────────────────────────────────── */

export default function SlideShow({ deck, onClose }) {
  const [current, setCurrent] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [interval, setIntervalSec] = useState(5)
  const timerRef = useRef(null)

  const total = deck.slides.length
  const slide = deck.slides[current]
  const isLast = current === total - 1

  // Auto-advance logic
  useEffect(() => {
    if (!autoAdvance) {
      clearTimeout(timerRef.current)
      return
    }
    timerRef.current = setTimeout(() => {
      if (!isLast) setCurrent(c => c + 1)
      else setAutoAdvance(false)
    }, interval * 1000)
    return () => clearTimeout(timerRef.current)
  }, [autoAdvance, current, interval, isLast])

  const goBack = () => { if (current > 0) setCurrent(c => c - 1) }
  const goNext = () => { if (!isLast) setCurrent(c => c + 1) }

  const progressPct = Math.round(((current + 1) / total) * 100)

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Progress bar */}
        <div className="h-1.5 bg-blue-100 flex-shrink-0">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
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

          {/* Step indicator */}
          <div className="text-xs text-slate-400 font-medium">
            Step {current + 1} of {total}
          </div>

          {/* Slide title */}
          <h2 className="text-xl font-bold text-slate-800 leading-tight">{slide.title}</h2>

          {/* Diagram */}
          {slide.diagram && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 overflow-hidden">
              <DiagramRenderer type={slide.diagram} />
            </div>
          )}

          {/* Narrative */}
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

        {/* Footer: dot indicators + controls */}
        <div className="border-t border-blue-100 px-5 py-3 flex-shrink-0 bg-blue-50 space-y-3">

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5">
            {deck.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? 'w-5 h-2.5 bg-blue-500'
                    : 'w-2.5 h-2.5 bg-blue-200 hover:bg-blue-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={current === 0}
              className="text-sm px-4 py-1.5 rounded-lg border border-blue-200 text-blue-700 disabled:opacity-30 hover:bg-blue-100 transition-colors font-medium"
            >
              ← Back
            </button>

            {/* Auto-advance controls */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <div
                  onClick={() => setAutoAdvance(a => !a)}
                  className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                    autoAdvance ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${
                    autoAdvance ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
                <span className="text-[10px] text-slate-500">Auto</span>
              </label>
              {autoAdvance && (
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={interval}
                  onChange={e => setIntervalSec(Number(e.target.value))}
                  className="w-16 accent-blue-500"
                  title={`${interval}s per slide`}
                />
              )}
              {autoAdvance && (
                <span className="text-[10px] text-slate-400">{interval}s</span>
              )}
            </div>

            {isLast ? (
              <button
                onClick={onClose}
                className="text-sm px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
              >
                Done ✓
              </button>
            ) : (
              <button
                onClick={goNext}
                className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
