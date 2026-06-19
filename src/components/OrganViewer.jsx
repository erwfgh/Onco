import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei'
import OrganModel from './OrganModel'

export default function OrganViewer({ organ, stage, highlights, onVoxelClick }) {
  const controlsRef = useRef()
  const [dissect, setDissect] = useState(false)

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
        <ambientLight intensity={dissect ? 2.0 : 1.1} color="#ffe8f0" />
        <directionalLight position={[15, 25, 10]} intensity={dissect ? 0.8 : 1.6} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
        <directionalLight position={[-12, 8, -8]} intensity={0.6} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={dissect ? 1.5 : 0.3} color="#ffe0d0" />
        {dissect && (
          <>
            <pointLight position={[6, 0, 0]}   intensity={5.0} color="#fff5f0" distance={35} decay={0.8} />
            <pointLight position={[4, 10, 2]}  intensity={3.0} color="#ffd0c0" distance={25} decay={1.0} />
            <pointLight position={[4, -10, 2]} intensity={3.0} color="#ffc8b0" distance={25} decay={1.0} />
            <pointLight position={[4, 0, 8]}   intensity={2.5} color="#ffe8e0" distance={22} decay={1.0} />
            <pointLight position={[4, 0, -8]}  intensity={2.5} color="#ffe8e0" distance={22} decay={1.0} />
          </>
        )}

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={highlights}
          onVoxelClick={onVoxelClick}
          crossSection={dissect}
          insideMode={dissect}
          interior={organ.interior}
        />

        {!dissect && (
          <>
            <ContactShadows position={[0, -14, 0]} opacity={0.25} scale={50} blur={2.5} far={22} color="#3060a0" />
            <Grid
              args={[100, 100]}
              cellSize={2} cellThickness={0.2} cellColor="#c8d8f0"
              sectionSize={10} sectionThickness={0.5} sectionColor="#a0b8e0"
              fadeDistance={80} position={[0, -14, 0]} infiniteGrid
            />
          </>
        )}

        <OrbitControls
          ref={controlsRef}
          enablePan enableZoom enableRotate
          minDistance={3}
          maxDistance={120}
          makeDefault
          autoRotate={!dissect && highlights.length === 0}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      {dissect && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none backdrop-blur-sm">
          Interior view — drag to orbit
        </div>
      )}

      <div className="absolute bottom-3 left-3">
        <button
          onClick={() => setDissect(d => !d)}
          className={`text-xs px-3 py-1.5 rounded-md shadow-sm font-medium transition-all ${
            dissect
              ? 'bg-blue-600 text-white border border-blue-500'
              : 'bg-white/90 border border-blue-200 text-blue-700 hover:bg-blue-50'
          }`}
        >
          {dissect ? '✕ Close Interior' : '⊙ See Inside'}
        </button>
      </div>
    </div>
  )
}
