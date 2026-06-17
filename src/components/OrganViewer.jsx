import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei'
import OrganModel from './OrganModel'

export default function OrganViewer({ organ, stage, highlights, onVoxelClick }) {
  if (!organ) return <div className="flex-1" />

  return (
    <Canvas
      camera={{ position: [0, 5, 28], fov: 45 }}
      shadows
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 25, 10]} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-10, 5, -10]} intensity={0.4} color="#8080ff" />
      <pointLight position={[0, -10, 0]} intensity={0.3} color="#ff8060" />

      <OrganModel
        voxels={organ.voxels}
        baseColor={organ.color}
        stage={stage}
        highlights={highlights}
        onVoxelClick={onVoxelClick}
      />

      <ContactShadows position={[0, -12, 0]} opacity={0.4} scale={40} blur={2} far={20} />

      <Grid
        args={[80, 80]}
        cellSize={2}
        cellThickness={0.2}
        cellColor="#1a3050"
        sectionSize={10}
        sectionThickness={0.5}
        sectionColor="#1e3a5f"
        fadeDistance={70}
        position={[0, -12, 0]}
        infiniteGrid
      />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={100}
        makeDefault
        autoRotate={highlights.length === 0}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}
