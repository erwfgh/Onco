import { useRef, useMemo, useEffect, useCallback } from 'react'
import * as THREE from 'three'

const VOXEL_SIZE = 0.88

const STAGE_RADIUS = { 1: 0, 2: 1.5, 3: 2.8, 4: 4.5 }
const STAGE_SCATTER_CHANCE = { 1: 0, 2: 0, 3: 0, 4: 0.12 }

const PURPLE = {
  1: new THREE.Color('#a855f7'),
  2: new THREE.Color('#9333ea'),
  3: new THREE.Color('#7c3aed'),
  4: new THREE.Color('#6d28d9'),
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

  // Scatter map is seeded once per (highlights + stage) combo so it's stable
  const highlightedSet = useMemo(() => {
    const radius = STAGE_RADIUS[stage]
    const scatterChance = STAGE_SCATTER_CHANCE[stage]
    const set = new Set()

    // Use a seeded-like approach: pre-pick scatter indices
    const scatterIndices = new Set()
    if (scatterChance > 0) {
      for (let i = 0; i < positions.length; i++) {
        // deterministic-ish: hash based on position
        const { x, y, z } = positions[i]
        const hash = (Math.sin(x * 127.1 + y * 311.7 + z * 74.3) * 43758.5453) % 1
        if (Math.abs(hash) < scatterChance) scatterIndices.add(i)
      }
    }

    for (const hi of highlights) {
      const origin = positions[hi]
      if (!origin) continue
      positions.forEach((pos, i) => {
        if (origin.distanceTo(pos) <= radius + 0.5) set.add(i)
      })
      set.add(hi)
    }

    if (highlights.length > 0) {
      scatterIndices.forEach(i => set.add(i))
    }

    return set
  }, [highlights, positions, stage])

  // Set matrices once when voxels change
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

  // Update colors when highlights/stage/organ change
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
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  )
}
