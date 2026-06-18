import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, ContactShadows } from '@react-three/drei'
import OrganModel from './OrganModel'

export default function OrganViewer({ organ, stage, highlights, onVoxelClick, crossSection, onCrossSection }) {
  if (!organ) return <div className="flex-1" />

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 36], fov: 42 }}
        shadows
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => { gl.localClippingEnabled = true }}
      >
        <ambientLight intensity={1.1} color="#e8f0ff" />
        <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
        <directionalLight position={[-12, 8, -8]} intensity={0.5} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={0.3} color="#ffe8e0" />

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={highlights}
          onVoxelClick={onVoxelClick}
          crossSection={crossSection}
        />

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

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={120}
          makeDefault
          autoRotate={highlights.length === 0}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      {organ && (
        <button
          onClick={() => onCrossSection(prev => !prev)}
          className="absolute bottom-3 left-3 text-xs px-3 py-1.5 rounded-md bg-white/90 border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
        >
          {crossSection ? '⊙ Close' : '⊘ Dissect'}
        </button>
      )}
    </div>
  )
}
