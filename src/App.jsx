import { useState, useCallback } from 'react'
import { UserButton, useUser, SignIn } from '@clerk/clerk-react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import Paywall from './components/Paywall'
import AiAssistant from './components/AiAssistant'
import PatientChat from './components/PatientChat'
import PatientOrganViewer from './components/PatientOrganViewer'
import ORGANS from './data/organs'

function Landing({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#060d1a] px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
        </h1>
        <p className="text-slate-400 text-sm">3D Tumor Staging & Oncology Assistant</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => onSelect('doctor')}
          className="flex-1 flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-[#0a1525] border border-violet-500/30 hover:border-violet-400/60 hover:bg-violet-900/20 transition-all group"
        >
          <span className="text-4xl">🔬</span>
          <div className="text-center">
            <div className="text-white font-semibold text-lg group-hover:text-violet-300 transition-colors">I'm a Doctor</div>
            <div className="text-slate-500 text-xs mt-1">3D organ staging · AI clinical assistant · subscription required</div>
          </div>
        </button>

        <button
          onClick={() => onSelect('patient')}
          className="flex-1 flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-[#0a1525] border border-teal-500/30 hover:border-teal-400/60 hover:bg-teal-900/20 transition-all group"
        >
          <span className="text-4xl">🩺</span>
          <div className="text-center">
            <div className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors">I'm a Patient</div>
            <div className="text-slate-500 text-xs mt-1">Ask about cancer, treatments & what to expect · free</div>
          </div>
        </button>
      </div>
    </div>
  )
}

function DoctorApp() {
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [stage, setStage] = useState(1)
  const [highlights, setHighlights] = useState([])
  const [crossSection, setCrossSection] = useState(false)

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

  return (
    <Paywall>
      <div className="flex flex-col h-full bg-[#060d1a] text-white select-none">
        <header className="flex items-center justify-between px-5 py-2.5 border-b border-slate-700/60 bg-[#0a1525]/90 backdrop-blur-sm flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-black tracking-tight">
                <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">3D Voxel Tumor Staging</p>
            </div>
            <div className="h-8 w-px bg-slate-700/60" />
            <div className="text-xs text-slate-400">For oncologists · hematologists · dermatologists</div>
          </div>

          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            {organ && (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/60 border border-slate-700/60 text-sm">
                  <span>{organ.icon}</span>
                  <span className="font-medium text-slate-200">{organ.label}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 text-xs">{organ.system}</span>
                </div>
                <div className="text-xs text-slate-500 max-w-xs truncate hidden lg:block">
                  {organ.description}
                </div>
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
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="flex-1 relative">
              <OrganViewer
                organ={organ}
                stage={stage}
                highlights={highlights}
                onVoxelClick={handleVoxelClick}
                crossSection={crossSection}
                onCrossSection={setCrossSection}
              />
              {!organ && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="flex gap-4 justify-center text-5xl mb-6 opacity-15">🧠🫁❤️🦴🫘</div>
                    <p className="text-slate-400 text-xl font-light mb-2">Select an organ to begin</p>
                    <p className="text-slate-600 text-sm">
                      {Object.keys(ORGANS).length} anatomical structures · spin · zoom · click to stage
                    </p>
                  </div>
                </div>
              )}
              {organ && highlights.length === 0 && (
                <div className="absolute bottom-3 right-3 text-xs text-slate-700 space-y-0.5 pointer-events-none text-right">
                  <div>🖱️ Drag to rotate</div>
                  <div>⚙️ Scroll to zoom</div>
                  <div>👆 Click voxel to mark</div>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-slate-700/60 bg-[#0a1525]/80 backdrop-blur-sm flex-shrink-0">
              <StageSelector stage={stage} onStageChange={handleStageChange} />
            </div>
          </div>
        </div>
      </div>
      <AiAssistant organ={selectedOrgan} organLabel={organ?.label} stage={stage} highlights={highlights} />
    </Paywall>
  )
}

function PatientApp({ onExit }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const [tab, setTab] = useState('ai')

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-[#060d1a]">
        <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#060d1a] px-4">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🩺</div>
          <h1 className="text-2xl font-black tracking-tight mb-2">
            <span className="text-white">ONCO</span><span className="text-teal-400">VIZ</span>
            <span className="text-slate-400 font-normal text-lg ml-2">for Patients</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xs">
            Sign in with Google to chat with our oncology AI — free, no subscription needed.
          </p>
        </div>
        <SignIn routing="hash" />
        <button
          onClick={onExit}
          className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#060d1a] text-white">
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-slate-700/60 bg-[#0a1525]/90 backdrop-blur-sm flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-black tracking-tight">
              <span className="text-white">ONCO</span><span className="text-teal-400">VIZ</span>
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">Patient Portal</p>
          </div>
          <div className="h-8 w-px bg-slate-700/60" />
          <div className="flex gap-1">
            <button
              onClick={() => setTab('ai')}
              className={`text-sm px-4 py-1.5 rounded-md font-medium transition-all ${tab === 'ai' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}
            >
              🩺 Ask AI
            </button>
            <button
              onClick={() => setTab('organs')}
              className={`text-sm px-4 py-1.5 rounded-md font-medium transition-all ${tab === 'organs' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}
            >
              🫀 3D Organs
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:block">
            {user?.firstName || user?.primaryEmailAddress?.emailAddress}
          </span>
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={onExit}
            className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors"
          >
            ← Home
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {tab === 'ai'     && <PatientChat embedded />}
        {tab === 'organs' && <PatientOrganViewer />}
      </div>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState(null)

  if (!role) return <Landing onSelect={setRole} />
  if (role === 'patient') return <PatientApp onExit={() => setRole(null)} />
  return <DoctorApp />
}
