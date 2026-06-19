import { useState, useCallback } from 'react'
import OrganViewer from './OrganViewer'
import OrganSelector from './OrganSelector'
import ORGANS from '../data/organs'

export default function PatientOrganViewer() {
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [crossSection, setCrossSection] = useState(false)

  const handleOrganSelect = useCallback(key => {
    setSelectedOrgan(key)
    setCrossSection(false)
  }, [])

  const organ = selectedOrgan ? ORGANS[selectedOrgan] : null

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <OrganSelector selected={selectedOrgan} onSelect={handleOrganSelect} />
      <div className="flex-1 relative overflow-hidden">
        <OrganViewer
          organ={organ}
          stage={1}
          highlights={[]}
          onVoxelClick={() => {}}
          crossSection={crossSection}
          onCrossSection={setCrossSection}
        />
        {!organ && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="flex gap-4 justify-center text-5xl mb-6 opacity-15">🧠🫁❤️🦴🫘</div>
              <p className="text-slate-400 text-xl font-light mb-2">Select an organ to explore</p>
              <p className="text-slate-400 text-sm">
                {Object.keys(ORGANS).length} structures · spin · zoom · explore interior
              </p>
            </div>
          </div>
        )}
        {organ && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none backdrop-blur-sm">
            {organ.icon} {organ.label} — {organ.description}
          </div>
        )}
      </div>
    </div>
  )
}
