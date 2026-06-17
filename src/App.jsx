import { useState, useCallback } from 'react'
import OrganViewer from './components/OrganViewer'
import OrganSelector from './components/OrganSelector'
import StageSelector from './components/StageSelector'
import ORGANS from './data/organs'

export default function App() {
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [stage, setStage] = useState(1)
  const [highlights, setHighlights] = useState([])

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
    <div className="flex flex-col h-full bg-[#0a1020] text-white">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-700 bg-slate-900/70 backdrop-blur flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Onco<span className="text-violet-400">Viz</span>
          </h1>
          <p className="text-xs text-slate-400">3D Tumor Staging Visualizer</p>
        </div>

        <div className="flex items-center gap-4">
          {organ && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span>{organ.icon}</span>
              <span className="font-medium">{organ.label}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{highlights.length} site{highlights.length !== 1 ? 's' : ''} marked</span>
            </div>
          )}

          {highlights.length > 0 && (
            <button
              onClick={() => setHighlights([])}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors border border-slate-600"
            >
              Reset Highlights
            </button>
          )}
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />

        {/* Canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <OrganViewer
              organ={organ}
              stage={stage}
              highlights={highlights}
              onVoxelClick={handleVoxelClick}
            />
            {!organ && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-6xl mb-4 opacity-20">🫁</div>
                <p className="text-slate-500 text-lg">Select an organ from the left panel</p>
                <p className="text-slate-600 text-sm mt-1">Then pick a stage and tap voxels to mark tumor sites</p>
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div className="px-6 py-4 border-t border-slate-700 bg-slate-900/60 flex-shrink-0">
            <StageSelector stage={stage} onStageChange={handleStageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
