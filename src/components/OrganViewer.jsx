import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei'
import * as THREE from 'three'
import OrganModel from './OrganModel'

function FirstPersonController({ active, onExit }) {
  const { camera } = useThree()
  const keys = useRef({})
  const initialized = useRef(false)

  useEffect(() => {
    if (!active) {
      initialized.current = false
      keys.current = {}
      return
    }
    // Start camera at center of organ looking forward
    camera.position.set(0, 0, 0)
    camera.rotation.set(0, Math.PI, 0) // look toward +z so interior is in front
    initialized.current = true

    const onKeyDown = (e) => {
      keys.current[e.key] = true
      if (e.key === 'Escape') onExit?.()
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))
        e.preventDefault()
    }
    const onKeyUp = (e) => { keys.current[e.key] = false }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [active, onExit, camera])

  useFrame(() => {
    if (!active) return
    const speed = 0.15
    const turnSpeed = 0.025
    const k = keys.current

    if (k['ArrowLeft']) camera.rotation.y += turnSpeed
    if (k['ArrowRight']) camera.rotation.y -= turnSpeed

    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)

    if (k['ArrowUp'])   camera.position.addScaledVector(dir, speed)
    if (k['ArrowDown']) camera.position.addScaledVector(dir, -speed)
    if (k[' '])         camera.position.y += speed
    if (k['Shift'])     camera.position.y -= speed
  })

  return null
}

export default function OrganViewer({ organ, stage, highlights, onVoxelClick, crossSection, onCrossSection }) {
  const [insideMode, setInsideMode] = useState(false)
  const [exploreMode, setExploreMode] = useState(false)
  const controlsRef = useRef()

  // Reset modes when organ changes
  useEffect(() => {
    setInsideMode(false)
    setExploreMode(false)
  }, [organ])

  function handleInsideToggle() {
    const next = !insideMode
    setInsideMode(next)
    onCrossSection(next)
  }

  function handleEnterExplore() {
    setExploreMode(true)
  }

  function handleExitExplore() {
    setExploreMode(false)
  }

  if (!organ) return <div className="flex-1" />

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 3, 28], fov: 50 }}
        shadows
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
          gl.setClearColor(0x000000, 0)
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={exploreMode ? 3.5 : 1.2} />
        <directionalLight position={[15, 25, 10]} intensity={exploreMode ? 1.0 : 1.6} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-12, 8, -8]} intensity={0.5} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={0.3} color="#ffe0d0" />

        {exploreMode && (
          <>
            <pointLight position={[0, 0, 0]}   intensity={4.0} color="#ffffff" distance={40} decay={0.5} />
            <pointLight position={[0, 8, 0]}   intensity={2.0} color="#ffe8e0" distance={30} decay={0.8} />
            <pointLight position={[0, -8, 0]}  intensity={2.0} color="#ffe0d0" distance={30} decay={0.8} />
            <pointLight position={[8, 0, 0]}   intensity={2.0} color="#ffffff" distance={30} decay={0.8} />
            <pointLight position={[-8, 0, 0]}  intensity={2.0} color="#ffffff" distance={30} decay={0.8} />
            <pointLight position={[0, 0, 8]}   intensity={2.0} color="#ffffff" distance={30} decay={0.8} />
            <pointLight position={[0, 0, -8]}  intensity={2.0} color="#ffffff" distance={30} decay={0.8} />
          </>
        )}

        {insideMode && !exploreMode && (
          <>
            <pointLight position={[10, 0, 0]} intensity={5.0} color="#fff5f0" distance={40} decay={0.7} />
            <pointLight position={[5, 8, 0]}  intensity={3.0} color="#ffd0c0" distance={30} decay={0.9} />
            <pointLight position={[5,-8, 0]}  intensity={3.0} color="#ffc8b0" distance={30} decay={0.9} />
          </>
        )}

        <FirstPersonController active={exploreMode} onExit={handleExitExplore} />

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={highlights}
          onVoxelClick={onVoxelClick}
          crossSection={insideMode || crossSection}
          insideMode={insideMode}
          exploreMode={exploreMode}
          interior={organ.interior}
        />

        {!insideMode && !exploreMode && (
          <>
            <ContactShadows position={[0, -14, 0]} opacity={0.25} scale={50} blur={2.5} far={22} color="#3060a0" />
            <Grid
              args={[100, 100]}
              cellSize={2}
              cellThickness={0.2}
              cellColor="#1a3050"
              sectionSize={10}
              sectionThickness={0.5}
              sectionColor="#1e3a5f"
              fadeDistance={80}
              position={[0, -14, 0]}
              infiniteGrid
            />
          </>
        )}

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom={!exploreMode}
          enableRotate={!exploreMode}
          minDistance={3}
          maxDistance={insideMode ? 22 : 120}
          makeDefault
          autoRotate={false}
        />
      </Canvas>

      {/* Explore mode HUD */}
      {exploreMode && (
        <>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full pointer-events-none backdrop-blur-sm">
            ↑ Forward &nbsp;·&nbsp; ↓ Back &nbsp;·&nbsp; ← → Turn &nbsp;·&nbsp; Space=Up &nbsp;·&nbsp; Shift=Down &nbsp;·&nbsp; ESC=Exit
          </div>
          <button
            onClick={handleExitExplore}
            className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md bg-violet-700 hover:bg-violet-600 text-white shadow font-medium transition-all"
          >
            ← Exit Explore
          </button>
        </>
      )}

      {/* Interior cross-section label */}
      {insideMode && !exploreMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none backdrop-blur-sm">
          Interior view — drag to orbit
        </div>
      )}

      {/* Top-right buttons when not in explore mode */}
      {!exploreMode && (
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <button
            onClick={handleEnterExplore}
            className="text-xs px-3 py-1.5 rounded-md shadow font-semibold transition-all bg-violet-600 hover:bg-violet-500 text-white border border-violet-400/40"
          >
            🔬 Explore Interior
          </button>
          <button
            onClick={handleInsideToggle}
            className={`text-xs px-3 py-1.5 rounded-md shadow font-medium transition-all ${
              insideMode
                ? 'bg-blue-600 text-white border border-blue-400'
                : 'bg-white/90 border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {insideMode ? '← Exit Cross-section' : '⊙ Cross-section'}
          </button>
        </div>
      )}

      {/* Controls hint */}
      {!exploreMode && !insideMode && highlights.length === 0 && (
        <div className="absolute bottom-16 right-3 text-xs text-slate-600 space-y-0.5 pointer-events-none text-right">
          <div>🖱️ Drag to rotate</div>
          <div>⚙️ Scroll to zoom</div>
          <div>👆 Click voxel to mark</div>
        </div>
      )}
    </div>
  )
}
