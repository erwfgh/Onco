import { useState, useCallback } from 'react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import InfoPanel from './components/InfoPanel'
import LandingPage from './components/LandingPage'
import ReportModal from './components/ReportModal'
import CaseBar from './components/CaseBar'
import ORGANS from './data/organs'
import CLINICAL from './data/clinicalData'

export default function App() {
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [stage, setStage] = useState(1)
  const [highlights, setHighlights] = useState([])
  const [showLanding, setShowLanding] = useState(true)
  const [showReport, setShowReport] = useState(false)
  const [caseId, setCaseId] = useState('')
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  const handleOrganSelect = useCallback(key => {
    setSelectedOrgan(key)
    setHighlights([])
  }, [])

  const handleVoxelClick = useCallback(instanceId => {
    if (instanceId == null) return
    setHighlights(prev => prev.includes(instanceId) ? prev : [...prev, instanceId])
  }, [])

  const handleStageChange = useCallback(s => {
    setStage(s)
    setHighlights([])
  }, [])

  const organ = selectedOrgan ? ORGANS[selectedOrgan] : null
  const clinical = selectedOrgan ? CLINICAL[selectedOrgan] : null
  const survival = clinical?.survival5yr?.[stage]

  return (
    <div className="flex flex-col h-full bg-[#060d1a] text-white select-none relative">
      {showLanding && <LandingPage onEnter={() => setShowLanding(false)} />}

      {showReport && selectedOrgan && (
        <ReportModal
          organKey={selectedOrgan}
          stage={stage}
          highlights={highlights}
          caseId={caseId}
          notes={notes}
          onClose={() => setShowReport(false)}
        />
      )}

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-slate-700/60 bg-[#0a1525]/90 backdrop-blur-sm flex-shrink-0 z-10 relative">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-black tracking-tight cursor-pointer" onClick={() => setShowLanding(true)}>
              <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">3D Voxel Tumor Staging</p>
          </div>
          <div className="h-8 w-px bg-slate-700/60" />
          <div className="text-xs text-slate-500 leading-relaxed hidden md:block">
            <span className="text-slate-400">For oncologists · hematologists · dermatologists</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Case management */}
          <CaseBar
            caseId={caseId}
            setCaseId={setCaseId}
            notes={notes}
            setNotes={setNotes}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
          />

          {organ && (
            <>
              <div className="h-6 w-px bg-slate-700/60" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/60 border border-slate-700/60 text-sm">
                <span>{organ.icon}</span>
                <span className="font-medium text-slate-200">{organ.label}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 text-xs">{organ.system}</span>
              </div>

              {/* Survival badge */}
              {survival && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/60 border border-slate-700/60 text-xs">
                  <span className="text-slate-500">5-yr:</span>
                  <span className={`font-bold ${
                    parseInt(survival) >= 70 ? 'text-emerald-400' :
                    parseInt(survival) >= 40 ? 'text-yellow-400' :
                    parseInt(survival) >= 20 ? 'text-orange-400' : 'text-red-400'
                  }`}>{survival}</span>
                </div>
              )}
            </>
          )}

          {highlights.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-violet-400 font-medium">{highlights.length} site{highlights.length !== 1 ? 's' : ''} marked</span>
              <button
                onClick={() => setHighlights([])}
                className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-600"
              >
                ✕ Reset
              </button>
            </div>
          )}

          {/* Generate report */}
          {organ && (
            <button
              onClick={() => setShowReport(true)}
              className="text-xs px-3 py-1.5 rounded-md bg-violet-700/40 hover:bg-violet-700/60 text-violet-300 transition-colors border border-violet-700/50 font-medium"
            >
              📋 Report
            </button>
          )}

          {/* Why OncoViz */}
          <button
            onClick={() => setShowLanding(true)}
            className="text-xs px-3 py-1.5 rounded-md border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-colors hidden md:block"
          >
            Why OncoViz?
          </button>
        </div>
      </header>

      {/* Notes drawer (below header) */}
      {showNotes && (
        <div className="px-5 py-3 border-b border-slate-700/60 bg-[#0a1525]/95 flex-shrink-0 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Clinical Notes</span>
            {caseId && <span className="text-xs text-slate-600 font-mono">· {caseId}</span>}
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add clinical observations, treatment plan notes, consultation findings..."
            rows={3}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />

        <div className="flex-1 flex flex-col overflow-hidden relative">

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <OrganViewer
              organ={organ}
              stage={stage}
              highlights={highlights}
              onVoxelClick={handleVoxelClick}
            />

            {/* Empty state */}
            {!organ && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="flex gap-4 justify-center text-5xl mb-6 opacity-15">
                    🧠🫁❤️🦴🫘
                  </div>
                  <p className="text-slate-400 text-xl font-light mb-2">Select an organ to begin</p>
                  <p className="text-slate-600 text-sm">
                    {Object.keys(ORGANS).length} anatomical structures · spin · zoom · click to stage
                  </p>
                </div>
              </div>
            )}

            {/* Controls hint */}
            {organ && highlights.length === 0 && (
              <div className="absolute bottom-3 right-3 text-xs text-slate-700 space-y-0.5 pointer-events-none text-right">
                <div>🖱️ Drag to rotate</div>
                <div>⚙️ Scroll to zoom</div>
                <div>👆 Click voxel to mark</div>
              </div>
            )}

            {/* Marked sites summary overlay */}
            {highlights.length > 0 && organ && (
              <div className="absolute top-3 left-3 bg-[#0a1525]/90 border border-violet-700/40 rounded-lg px-3 py-2 text-xs pointer-events-none">
                <div className="text-violet-400 font-semibold mb-1">{highlights.length} tumor site{highlights.length !== 1 ? 's' : ''} marked</div>
                <div className="text-slate-500">Stage {['I','II','III','IV'][stage-1]} — {organ.label}</div>
                {survival && <div className="text-slate-600 mt-0.5">5-yr survival: <span className="text-slate-400">{survival}</span></div>}
              </div>
            )}
          </div>

          {/* Stage bar */}
          <div className="px-5 py-3 border-t border-slate-700/60 bg-[#0a1525]/80 backdrop-blur-sm flex-shrink-0">
            <StageSelector stage={stage} onStageChange={handleStageChange} organ={organ} clinical={clinical} />
          </div>
        </div>

        <InfoPanel organKey={selectedOrgan} stage={stage} />
      </div>
    </div>
  )
}
