import { useState, useCallback } from 'react'
import { UserButton, useUser, SignIn } from '@clerk/clerk-react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import Paywall from './components/Paywall'
import InfoPanel from './components/InfoPanel'
import PatientChat from './components/PatientChat'
import PatientOrganViewer from './components/PatientOrganViewer'
import ORGANS from './data/organs'

function Landing({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="mb-10 text-center">
        <div className="text-5xl mb-4">🔬</div>
        <h1 className="text-4xl font-black tracking-tight mb-2">
          <span className="text-slate-800">ONCO</span><span className="text-blue-600">VIZ</span>
        </h1>
        <p className="text-slate-500 text-sm">3D Tumor Staging & Oncology Assistant</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => onSelect('doctor')}
          className="flex-1 flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all group shadow-sm"
        >
          <span className="text-4xl">🔬</span>
          <div className="text-center">
            <div className="text-slate-800 font-semibold text-lg group-hover:text-blue-600 transition-colors">I'm a Doctor</div>
            <div className="text-slate-400 text-xs mt-1">3D organ staging · AI clinical assistant · subscription required</div>
          </div>
        </button>

        <button
          onClick={() => onSelect('patient')}
          className="flex-1 flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-white border border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all group shadow-sm"
        >
          <span className="text-4xl">🩺</span>
          <div className="text-center">
            <div className="text-slate-800 font-semibold text-lg group-hover:text-teal-600 transition-colors">I'm a Patient</div>
            <div className="text-slate-400 text-xs mt-1">Ask about cancer, treatments & what to expect · free</div>
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
      <div className="flex flex-col h-full bg-white text-slate-800 select-none">
        <header className="flex items-center justify-between px-5 py-2.5 border-b border-blue-100 bg-white flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-black tracking-tight">
                <span className="text-slate-800">ONCO</span><span className="text-blue-600">VIZ</span>
              </h1>
              <p className="text-xs text-slate-400 -mt-0.5">3D Voxel Tumor Staging</p>
            </div>
            <div className="h-8 w-px bg-blue-100" />
            <div className="text-xs text-slate-400">For oncologists · hematologists · dermatologists</div>
          </div>

          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            {organ && (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-sm">
                  <span>{organ.icon}</span>
                  <span className="font-medium text-slate-700">{organ.label}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400 text-xs">{organ.system}</span>
                </div>
                <div className="text-xs text-slate-400 max-w-xs truncate hidden lg:block">
                  {organ.description}
                </div>
              </>
            )}
            {highlights.length > 0 && (
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
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden bg-blue-50/40">
          <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="flex-1 relative bg-gradient-to-b from-blue-50/60 to-white">
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
                    <div className="flex gap-4 justify-center text-5xl mb-6 opacity-20">🧠🫁❤️🦴🫘</div>
                    <p className="text-slate-400 text-xl font-light mb-2">Select an organ to begin</p>
                    <p className="text-slate-300 text-sm">
                      {Object.keys(ORGANS).length} anatomical structures · spin · zoom · click to stage
                    </p>
                  </div>
                </div>
              )}
              {organ && highlights.length === 0 && (
                <div className="absolute bottom-3 right-3 text-xs text-slate-400 space-y-0.5 pointer-events-none text-right">
                  <div>🖱️ Drag to rotate</div>
                  <div>⚙️ Scroll to zoom</div>
                  <div>👆 Click voxel to mark</div>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-blue-100 bg-white flex-shrink-0">
              <StageSelector stage={stage} onStageChange={handleStageChange} />
            </div>
          </div>
          <InfoPanel organKey={selectedOrgan} stage={stage} />
        </div>
      </div>
    </Paywall>
  )
}

function PatientApp({ onExit }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const [tab, setTab] = useState('ai')

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-blue-50 px-4">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🩺</div>
          <h1 className="text-2xl font-black tracking-tight mb-2">
            <span className="text-slate-800">ONCO</span><span className="text-teal-500">VIZ</span>
            <span className="text-slate-400 font-normal text-lg ml-2">for Patients</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-xs">
            Sign in with Google to chat with our oncology AI — free, no subscription needed.
          </p>
        </div>
        <SignIn routing="hash" />
        <button
          onClick={onExit}
          className="mt-6 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white text-slate-800">
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-blue-100 bg-white flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-black tracking-tight">
              <span className="text-slate-800">ONCO</span><span className="text-teal-500">VIZ</span>
            </h1>
            <p className="text-xs text-slate-400 -mt-0.5">Patient Portal</p>
          </div>
          <div className="h-8 w-px bg-blue-100" />
          <div className="flex gap-1">
            <button
              onClick={() => setTab('ai')}
              className={`text-sm px-4 py-1.5 rounded-md font-medium transition-all ${tab === 'ai' ? 'bg-teal-500 text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-blue-50'}`}
            >
              🩺 Ask AI
            </button>
            <button
              onClick={() => setTab('organs')}
              className={`text-sm px-4 py-1.5 rounded-md font-medium transition-all ${tab === 'organs' ? 'bg-teal-500 text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-blue-50'}`}
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
            className="text-xs px-3 py-1.5 rounded-md bg-white hover:bg-blue-50 text-slate-600 border border-blue-200 transition-colors"
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
