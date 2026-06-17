import { useRef, useMemo, useEffect, useCallback } from 'react'
import * as THREE from 'three'

const VOXEL_SIZE = 0.86

const STAGE_RADIUS = { 1: 0.4, 2: 2.0, 3: 3.8, 4: 6.0 }
const STAGE_SCATTER = { 1: 0, 2: 0, 3: 0.04, 4: 0.18 }

const PURPLE = {
  1: new THREE.Color('#c084fc'),
  2: new THREE.Color('#a855f7'),
  3: new THREE.Color('#7c3aed'),
  4: new THREE.Color('#4c1d95'),
}

const GEO = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE)
const MAT = new THREE.MeshStandardMaterial()

export default function OrganModel({ voxels, baseColor, stage, highlights, onVoxelClick }) {
  const meshRef = useRef()
  const count = voxels.length

  const positions = useMemo(
    () => voxels.map(v => new THREE.Vector3(v.x, v.y, v.z)),
    [voxels]
  )

  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const purple = PURPLE[stage]
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const highlightedSet = useMemo(() => {
    const radius = STAGE_RADIUS[stage]
    const scatterChance = STAGE_SCATTER[stage]
    const set = new Set()

    // Deterministic scatter (seeded by position hash)
    const scatterSet = new Set()
    if (scatterChance > 0) {
      for (let i = 0; i < positions.length; i++) {
        const { x, y, z } = positions[i]
        const h = Math.abs((Math.sin(x * 127.1 + y * 311.7 + z * 74.3) * 43758.5453) % 1)
        if (h < scatterChance) scatterSet.add(i)
      }
    }

    for (const hi of highlights) {
      const origin = positions[hi]
      if (!origin) continue
      positions.forEach((pos, i) => {
        if (origin.distanceTo(pos) <= radius) set.add(i)
      })
      set.add(hi)
    }

    if (highlights.length > 0) scatterSet.forEach(i => set.add(i))
    return set
  }, [highlights, positions, stage])

  // Set matrices once per organ
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    positions.forEach((pos, i) => {
      dummy.position.copy(pos)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [positions, dummy])

  // Update colors on highlight/stage change
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    positions.forEach((_, i) => {
      mesh.setColorAt(i, highlightedSet.has(i) ? purple : base)
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [highlightedSet, base, purple, positions])

  const handleClick = useCallback(e => {
    e.stopPropagation()
    if (e.instanceId != null) onVoxelClick(e.instanceId)
  }, [onVoxelClick])

  return (
    <instancedMesh
      ref={meshRef}
      args={[GEO, MAT, count]}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial vertexColors roughness={0.6} metalness={0.1} />
    </instancedMesh>
  )
}
