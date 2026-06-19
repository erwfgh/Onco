import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei'
import * as THREE from 'three'
import OrganModel from './OrganModel'

// Smoothly moves the camera to inside/outside position
function CameraRig({ insideMode, controlsRef }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())

  useFrame(() => {
    if (insideMode) {
      // Lerp camera to organ center (inside), freeze target at same spot
      camera.position.lerp({ x: 0, y: 0, z: 0.5 }, 0.08)
      if (controlsRef.current) {
        controlsRef.current.target.lerp({ x: 0, y: 0, z: 0 }, 0.08)
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

export default function OrganViewer({ organ, stage, highlights, onVoxelClick, crossSection, onCrossSection }) {
  const [insideMode, setInsideMode] = useState(false)
  const controlsRef = useRef()

  function handleInsideToggle() {
    const next = !insideMode
    setInsideMode(next)
    if (controlsRef.current) {
      controlsRef.current.minDistance = next ? 0 : 3
      controlsRef.current.maxDistance = next ? 1.5 : 120
      controlsRef.current.enablePan = !next
      controlsRef.current.update()
    }
  }

  if (!organ) return <div className="flex-1" />

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 36], fov: insideMode ? 90 : 60 }}
        shadows
        style={{ background: insideMode ? '#0d0d1a' : 'transparent' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => { gl.localClippingEnabled = true }}
      >
        {/* Outside lighting */}
        {!insideMode && (
          <>
            <ambientLight intensity={1.1} color="#e8f0ff" />
            <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
            <directionalLight position={[-12, 8, -8]} intensity={0.5} color="#c0d8ff" />
            <directionalLight position={[0, -10, 5]} intensity={0.3} color="#ffe8e0" />
          </>
        )}

        {/* Inside lighting — point light at organ center illuminates all interior faces */}
        {insideMode && (
          <>
            <ambientLight intensity={0.4} color="#ffe8e0" />
            <pointLight position={[0, 0, 0]} intensity={4.0} color="#fff5f0" distance={25} decay={1.2} />
            <pointLight position={[3, 3, 0]} intensity={2.0} color="#ffd0d0" distance={15} decay={1.5} />
            <pointLight position={[-3, -3, 0]} intensity={2.0} color="#d0e8ff" distance={15} decay={1.5} />
          </>
        )}

        <CameraRig insideMode={insideMode} controlsRef={controlsRef} />

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={highlights}
          onVoxelClick={onVoxelClick}
          crossSection={crossSection && !insideMode}
          insideMode={insideMode}
        />

        {!insideMode && (
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
          enablePan={!insideMode}
          enableZoom={!insideMode}
          enableRotate
          minDistance={insideMode ? 0 : 3}
          maxDistance={insideMode ? 1.5 : 120}
          makeDefault
          autoRotate={!insideMode && highlights.length === 0}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      {/* Overlay hint for inside mode */}
      {insideMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
          Drag to look around inside the organ
        </div>
      )}

      {/* Buttons */}
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
    </div>
  )
}
