import { useRef, useMemo, useEffect, useCallback } from 'react'
import * as THREE from 'three'

const VOXEL_SIZE = 1.0

const STAGE_RADIUS = { 1: 0.4, 2: 2.0, 3: 3.8, 4: 6.0 }
const STAGE_SCATTER = { 1: 0, 2: 0, 3: 0.04, 4: 0.18 }

const PURPLE = {
  1: new THREE.Color('#c084fc'),
  2: new THREE.Color('#a855f7'),
  3: new THREE.Color('#7c3aed'),
  4: new THREE.Color('#4c1d95'),
}

const GEO = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE)

// Per-voxel brightness noise so each cube has a slightly different shade
function voxelHash(x, y, z) {
  const h = Math.sin(x * 13.7 + y * 47.3 + z * 89.1) * 43758.5453
  return h - Math.floor(h)
}

export default function OrganModel({ voxels, baseColor, zones, stage, highlights, onVoxelClick }) {
  const meshRef = useRef()
  const count = voxels.length

  const positions = useMemo(
    () => voxels.map(v => new THREE.Vector3(v.x, v.y, v.z)),
    [voxels]
  )

  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const purple = PURPLE[stage]
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Pre-parse zone colors into THREE.Color objects
  const zoneColors = useMemo(() => {
    if (!zones) return null
    const map = {}
    for (const [k, hex] of Object.entries(zones)) map[k] = new THREE.Color(hex)
    return map
  }, [zones])

  // Create material explicitly — vertexColors MUST be true for setColorAt to show
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    roughness: 0.65,
    metalness: 0.06,
  }), [])

  const highlightedSet = useMemo(() => {
    const radius = STAGE_RADIUS[stage]
    const scatterChance = STAGE_SCATTER[stage]
    const set = new Set()

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

  // Bake per-voxel base color with depth + noise variation.
  // Uses zone color if voxel has a zone tag, otherwise falls back to baseColor.
  const baseColors = useMemo(() => {
    let minY = Infinity, maxY = -Infinity
    positions.forEach(p => {
      if (p.y < minY) minY = p.y
      if (p.y > maxY) maxY = p.y
    })
    const yRange = maxY - minY || 1

    return voxels.map((voxel, i) => {
      const pos = positions[i]
      const depth = (pos.y - minY) / yRange
      const noise = voxelHash(pos.x, pos.y, pos.z)

      const srcColor = (zoneColors && voxel.zone && zoneColors[voxel.zone])
        ? zoneColors[voxel.zone]
        : base

      const brightness = (0.82 + depth * 0.22) * (0.90 + noise * 0.20)
      return srcColor.clone().multiplyScalar(brightness)
    })
  }, [voxels, positions, base, zoneColors])

  // Set matrices + colors together (fixes the black-on-first-render bug)
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    positions.forEach((pos, i) => {
      dummy.position.copy(pos)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, baseColors[i])
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [positions, dummy, baseColors])

  // Update colors on highlight/stage change
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    positions.forEach((_, i) => {
      mesh.setColorAt(i, highlightedSet.has(i) ? purple : baseColors[i])
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [highlightedSet, baseColors, purple, positions])

  const handleClick = useCallback(e => {
    e.stopPropagation()
    if (e.instanceId != null) onVoxelClick(e.instanceId)
  }, [onVoxelClick])

  return (
    <instancedMesh
      ref={meshRef}
      args={[GEO, material, count]}
      onClick={handleClick}
      castShadow
      receiveShadow
    />
  )
}
