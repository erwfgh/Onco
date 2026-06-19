import { useState, useCallback } from 'react'
import { UserButton } from '@clerk/clerk-react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import Paywall from './components/Paywall'
import AiAssistant from './components/AiAssistant'
import ORGANS from './data/organs'

export default function App() {
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

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-2.5 border-b border-slate-700/60 bg-[#0a1525]/90 backdrop-blur-sm flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-black tracking-tight">
              <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">3D Voxel Tumor Staging</p>
          </div>
          <div className="h-8 w-px bg-slate-700/60" />
          <div className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-400">For oncologists · hematologists · dermatologists</span>
          </div>
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
          </div>

          {/* Stage bar */}
          <div className="px-5 py-3 border-t border-slate-700/60 bg-[#0a1525]/80 backdrop-blur-sm flex-shrink-0">
            <StageSelector stage={stage} onStageChange={handleStageChange} />
          </div>
        </div>
      </div>
    </div>
    <AiAssistant organ={organ} stage={stage} highlights={highlights} />
    </Paywall>
  )
}
