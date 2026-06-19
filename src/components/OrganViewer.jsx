import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei'
import OrganModel from './OrganModel'

export default function OrganViewer({ organ, stage, highlights, onVoxelClick }) {
  const controlsRef = useRef()

  if (!organ) return <div className="flex-1" />

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 36], fov: 55 }}
        shadows
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
      >
        <ambientLight intensity={1.1} color="#ffe8f0" />
        <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
        <directionalLight position={[-12, 8, -8]} intensity={0.6} color="#c0d8ff" />
        <directionalLight position={[0, -10, 5]} intensity={0.3} color="#ffe0d0" />

        <OrganModel
          voxels={organ.voxels}
          baseColor={organ.color}
          zones={organ.zones}
          stage={stage}
          highlights={highlights}
          onVoxelClick={onVoxelClick}
          crossSection={false}
          insideMode={false}
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
          ref={controlsRef}
          enablePan
          enableZoom
          enableRotate
          minDistance={3}
          maxDistance={120}
          makeDefault
          autoRotate={highlights.length === 0}
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  )
}
