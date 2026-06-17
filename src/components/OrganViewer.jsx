import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import OrganModel from './OrganModel'

export default function OrganViewer({ organ, stage, highlights, onVoxelClick }) {
  if (!organ) return (
    <div className="flex-1 flex items-center justify-center text-slate-500 text-lg">
      Select an organ to begin
    </div>
  )

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 45 }}
      shadows
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, -5, -10]} intensity={0.3} />

      <OrganModel
        voxels={organ.voxels}
        baseColor={organ.color}
        stage={stage}
        highlights={highlights}
        onVoxelClick={onVoxelClick}
      />

      <Grid
        args={[60, 60]}
        cellSize={2}
        cellThickness={0.3}
        cellColor="#1e3a5f"
        sectionSize={10}
        sectionThickness={0.6}
        sectionColor="#1e3a5f"
        fadeDistance={60}
        position={[0, -10, 0]}
        infiniteGrid
      />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={80}
        makeDefault
      />
    </Canvas>
  )
}
