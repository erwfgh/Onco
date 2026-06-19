import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei'
import * as THREE from 'three'
import OrganModel from './OrganModel'

// Smoothly moves camera to interior cross-section position
function CameraRig({ insideMode, exploreMode, controlsRef }) {
  const { camera } = useThree()

  useFrame(() => {
    if (exploreMode) return // first-person controls handle camera
    if (insideMode) {
      camera.position.lerp({ x: 20, y: 3, z: 4 }, 0.07)
      if (controlsRef.current) {
        controlsRef.current.target.lerp({ x: 0, y: 0, z: 0 }, 0.07)
        controlsRef.current.update()
      }
    } else {
      camera.position.lerp({ x: 0, y: 5, z: 36 }, 0.06)
      if (controlsRef.current) {
        controlsRef.current.target.lerp({ x: 0, y: 0, z: 0 }, 0.06)
        controlsRef.current.update()
      }
    }
  })
  return null
}

function FirstPersonController({ active, onExit }) {
  const { camera } = useThree()
  const keys = useRef({})

  useEffect(() => {
    if (!active) return
    // Position camera inside organ when entering explore mode
    camera.position.set(0, 0, 3)
    camera.rotation.set(0, 0, 0)

    const onKeyDown = (e) => {
      keys.current[e.key] = true
      if (e.key === 'Escape') onExit?.()
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
    const speed = 0.08
    const turnSpeed = 0.02
    const k = keys.current

    if (k['ArrowLeft']) camera.rotation.y += turnSpeed
    if (k['ArrowRight']) camera.rotation.y -= turnSpeed

    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)

    if (k['ArrowUp'] || k['w'] || k['W']) camera.position.addScaledVector(dir, speed)
    if (k['ArrowDown'] || k['s'] || k['S']) camera.position.addScaledVector(dir, -speed)
    if (k[' ']) camera.position.y += speed
    if (k['Shift']) camera.position.y -= speed
  })

  return null
}

export default function OrganViewer({ organ, stage, highlights, onVoxelClick, crossSection, onCrossSection }) {
  const [insideMode, setInsideMode] = useState(false)
  const [exploreMode, setExploreMode] = useState(false)
  const controlsRef = useRef()

  function handleInsideToggle() {
    const next = !insideMode
    setInsideMode(next)
    onCrossSection(() => next)
    if (controlsRef.current) {
      controlsRef.current.minDistance = next ? 3 : 3
      controlsRef.current.maxDistance = next ? 22 : 120
      controlsRef.current.enablePan = true
      controlsRef.current.update()
    }
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
        camera={{ position: [0, 5, 36], fov: 55 }}
        shadows
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={exploreMode ? 2.5 : insideMode ? 1.8 : 1.1} color="#ffe8f0" />
        <directionalLight position={[15, 25, 10]} intensity={exploreMode ? 0.5 : insideMode ? 0.8 : 1.6} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
        <directionalLight position={[-12, 8, -8]} intensity={0.6} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={insideMode ? 1.2 : 0.3} color="#ffe0d0" />
        {insideMode && !exploreMode && (
          <>
            <pointLight position={[6, 0, 0]} intensity={4.0} color="#fff5f0" distance={35} decay={0.9} />
            <pointLight position={[4, 10, 2]} intensity={2.5} color="#ffd0c0" distance={25} decay={1.1} />
            <pointLight position={[4, -10, 2]} intensity={2.5} color="#ffc8b0" distance={25} decay={1.1} />
            <pointLight position={[4, 0, 8]} intensity={2.0} color="#ffe8e0" distance={22} decay={1.2} />
            <pointLight position={[4, 0, -8]} intensity={2.0} color="#ffe8e0" distance={22} decay={1.2} />
          </>
        )}
        {exploreMode && (
          <>
            <pointLight position={[0, 0, 0]} intensity={3.0} color="#ffffff" distance={30} decay={0.8} />
            <pointLight position={[0, 5, 0]} intensity={2.0} color="#ffe8e0" distance={25} decay={1.0} />
            <pointLight position={[0, -5, 0]} intensity={2.0} color="#ffe0d0" distance={25} decay={1.0} />
          </>
        )}

        <CameraRig insideMode={insideMode} exploreMode={exploreMode} controlsRef={controlsRef} />
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
              cellColor="#c8d8f0"
              sectionSize={10}
              sectionThickness={0.5}
              sectionColor="#a0b8e0"
              fadeDistance={80}
              position={[0, -14, 0]}
              infiniteGrid
            />
          </>
        )}

        <OrbitControls
          ref={controlsRef}
          enablePan={!exploreMode}
          enableZoom={!exploreMode}
          enableRotate={!exploreMode}
          minDistance={3}
          maxDistance={insideMode ? 22 : 120}
          makeDefault
          autoRotate={!insideMode && !exploreMode && highlights.length === 0}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      {/* Explore mode HUD */}
      {exploreMode && (
        <>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full pointer-events-none backdrop-blur-sm">
            ↑↓ Move &nbsp;·&nbsp; ←→ Turn &nbsp;·&nbsp; Space=Up &nbsp;·&nbsp; Shift=Down &nbsp;·&nbsp; ESC=Exit
          </div>
          <button
            onClick={handleExitExplore}
            className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md bg-violet-700 hover:bg-violet-600 text-white shadow-sm font-medium transition-all"
          >
            ← Exit Explore
          </button>
        </>
      )}

      {/* Inside mode label */}
      {insideMode && !exploreMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none backdrop-blur-sm">
          Interior cross-section — drag to orbit around the cut face
        </div>
      )}

      {/* Explore Interior button - top right when organ selected and not in explore mode */}
      {!exploreMode && (
        <div className="absolute top-3 right-3">
          <button
            onClick={handleEnterExplore}
            className="text-xs px-3 py-1.5 rounded-md shadow-sm font-medium transition-all bg-white/90 border border-violet-300 text-violet-700 hover:bg-violet-50"
          >
            🔬 Explore Interior
          </button>
        </div>
      )}

      {/* Buttons bottom left */}
      {!exploreMode && (
        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 items-start">
          <button
            onClick={handleInsideToggle}
            className={`text-xs px-3 py-1.5 rounded-md shadow-sm font-medium transition-all ${
              insideMode
                ? 'bg-blue-600 text-white border border-blue-500'
                : 'bg-white/90 border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {insideMode ? '← Exit Interior' : '⊙ Enter Interior'}
          </button>

          {!insideMode && (
            <button
              onClick={() => onCrossSection(prev => !prev)}
              className="text-xs px-3 py-1.5 rounded-md bg-white/90 border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
            >
              {crossSection ? '✕ Close Dissect' : '⊘ Dissect'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
