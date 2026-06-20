import { useState, useCallback } from 'react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import InfoPanel from './components/InfoPanel'
import LandingPage from './components/LandingPage'
import ReportModal from './components/ReportModal'
import SlideShow from './components/SlideShow'
import CaseBar from './components/CaseBar'
import RoleSelector from './components/RoleSelector'
import ORGANS from './data/organs'
import CLINICAL from './data/clinicalData'

const SESSION_VERSION = 4

function loadUser() {
  try {
    const u = JSON.parse(localStorage.getItem('oncoviz_user'))
    if (!u || !u.role || u.v !== SESSION_VERSION) {
      localStorage.removeItem('oncoviz_user')
      return null
    }
    return u
  } catch { return null }
}

export default function App() {
  const [user, setUser] = useState(loadUser)
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [stage, setStage] = useState(1)
  const [highlights, setHighlights] = useState([])
  const [showLanding, setShowLanding] = useState(true)
  const [showReport, setShowReport] = useState(false)
  const [caseId, setCaseId] = useState('')
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [slideShow, setSlideShow] = useState(null)
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

  const isPatient = user?.role === 'patient'

  if (!user) return <RoleSelector onAuth={u => { setUser(u); setShowLanding(false) }} />

  return (
    <div className="flex flex-col h-full bg-[#f0f6ff] text-slate-800 select-none relative">
      {showLanding && !isPatient && <LandingPage onEnter={() => setShowLanding(false)} />}

      {slideShow && <SlideShow deck={slideShow} onClose={() => setSlideShow(null)} />}

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
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-blue-200 bg-white shadow-sm flex-shrink-0 z-10 relative">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-black tracking-tight cursor-pointer" onClick={() => setShowLanding(true)}>
              <span className="text-blue-900">ONCO</span><span className="text-blue-500">VIZ</span>
            </h1>
            <p className="text-xs text-slate-400 -mt-0.5">3D Voxel Tumor Staging</p>
          </div>
          <div className="h-8 w-px bg-blue-100" />
          <div className="text-xs text-slate-400 leading-relaxed hidden md:block">
            <span className="text-slate-500">For oncologists · hematologists · dermatologists</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isPatient && <CaseBar
            caseId={caseId}
            setCaseId={setCaseId}
            notes={notes}
            setNotes={setNotes}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
          />}

          {!isPatient && organ && (
            <>
              <div className="h-6 w-px bg-blue-100" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-sm">
                <span className="text-blue-500">{organ.icon}</span>
                <span className="font-medium text-slate-700">{organ.label}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-400 text-xs">{organ.system}</span>
              </div>

              {survival && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-xs">
                  <span className="text-slate-400">5-yr:</span>
                  <span className={`font-bold ${
                    parseInt(survival) >= 70 ? 'text-emerald-600' :
                    parseInt(survival) >= 40 ? 'text-amber-600' :
                    parseInt(survival) >= 20 ? 'text-orange-600' : 'text-red-600'
                  }`}>{survival}</span>
                </div>
              )}
            </>
          )}

          {!isPatient && highlights.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600 font-medium">{highlights.length} site{highlights.length !== 1 ? 's' : ''} marked</span>
              <button
                onClick={() => setHighlights([])}
                className="text-xs px-3 py-1.5 rounded-md bg-white hover:bg-blue-50 text-slate-600 transition-colors border border-blue-200"
              >
                ✕ Reset
              </button>
            </div>
          )}

          {!isPatient && organ && (
            <button
              onClick={() => setShowReport(true)}
              className="text-xs px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium shadow-sm"
            >
              ▤ Report
            </button>
          )}

          {!isPatient && (
            <button
              onClick={() => setShowLanding(true)}
              className="text-xs px-3 py-1.5 rounded-md border border-blue-200 text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-colors hidden md:block"
            >
              Why OncoViz?
            </button>
          )}

          <div className="flex items-center gap-2 pl-1 border-l border-blue-100 ml-1">
            <span className="text-xs text-slate-500 font-medium hidden md:block">
              {isPatient ? `♡ ${user.name}` : `✚ ${user.name || user.email}`}
            </span>
            <button
              onClick={() => { localStorage.removeItem('oncoviz_user'); setUser(null) }}
              className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Notes drawer */}
      {showNotes && (
        <div className="px-5 py-3 border-b border-blue-200 bg-white flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Clinical Notes</span>
            {caseId && <span className="text-xs text-slate-400 font-mono">· {caseId}</span>}
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add clinical observations, treatment plan notes, consultation findings..."
            rows={3}
            className="w-full bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {!isPatient && <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />}

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
                  <div className="flex gap-6 justify-center text-4xl mb-6 opacity-20 font-light tracking-widest text-blue-400">
                    <span>Ω</span><span>Ψ</span><span>♡</span><span>✚</span><span>⊕</span>
                  </div>
                  <p className="text-slate-400 text-xl font-light mb-2">Select an organ to begin</p>
                  <p className="text-slate-300 text-sm">
                    {Object.keys(ORGANS).length} anatomical structures · spin · zoom · click to stage
                  </p>
                </div>
              </div>
            )}

            {/* Controls hint */}
            {organ && highlights.length === 0 && (
              <div className="absolute bottom-3 right-3 text-xs text-slate-400 space-y-0.5 pointer-events-none text-right">
                <div>⊙ Drag to rotate</div>
                <div>⊞ Scroll to zoom</div>
                <div>◎ Click voxel to mark</div>
              </div>
            )}

            {/* Marked sites overlay */}
            {highlights.length > 0 && organ && (
              <div className="absolute top-3 left-3 bg-white/90 border border-blue-200 rounded-lg px-3 py-2 text-xs pointer-events-none shadow-sm">
                <div className="text-blue-600 font-semibold mb-1">{highlights.length} tumor site{highlights.length !== 1 ? 's' : ''} marked</div>
                <div className="text-slate-500">Stage {['I','II','III','IV'][stage-1]} — {organ.label}</div>
                {survival && <div className="text-slate-400 mt-0.5">5-yr survival: <span className="text-slate-600 font-medium">{survival}</span></div>}
              </div>
            )}
          </div>

          {/* Stage bar */}
          {!isPatient && (
            <div className="px-5 py-3 border-t border-blue-200 bg-white flex-shrink-0 shadow-sm">
              <StageSelector stage={stage} onStageChange={handleStageChange} organ={organ} clinical={clinical} />
            </div>
          )}
        </div>

        <InfoPanel organKey={selectedOrgan} stage={stage} patientDefault={isPatient} highlights={highlights} onPresent={setSlideShow} />
      </div>
    </div>
  )
}
