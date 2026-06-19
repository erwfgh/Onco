import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
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

// Distance thresholds for auto-dissect
const AUTO_CLIP_START = 18  // camera distance at which clipping begins
const AUTO_CLIP_FULL  = 8   // camera distance at which clip is deepest

function voxelHash(x, y, z) {
  const h = Math.sin(x * 13.7 + y * 47.3 + z * 89.1) * 43758.5453
  return h - Math.floor(h)
}

function applyColors(mesh, positions, dummy, baseColors, highlightedSet, purple, count) {
  if (!mesh) return
  if (!mesh.instanceColor) {
    mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3)
  }
  for (let i = 0; i < positions.length; i++) {
    dummy.position.copy(positions[i])
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
    mesh.setColorAt(i, highlightedSet.has(i) ? purple : baseColors[i])
  }
  mesh.instanceMatrix.needsUpdate = true
  mesh.instanceColor.needsUpdate = true
}

export default function OrganModel({ voxels, baseColor, zones, stage, highlights, onVoxelClick, crossSection }) {
  const meshRef = useRef()
  const colorsApplied = useRef(false)
  const count = voxels.length
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Dynamic clip plane that tracks camera direction for auto-zoom reveal
  const autoCamPlane = useMemo(() => new THREE.Plane(), [])
  // Manual cross-section plane (fixed Z-axis cut)
  const manualPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0), [])

  const prevClipState = useRef(null) // track last applied state to avoid redundant needsUpdate

  const positions = useMemo(
    () => voxels.map(v => new THREE.Vector3(v.x, v.y, v.z)),
    [voxels]
  )

  const base = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const purple = PURPLE[stage]

  const zoneColors = useMemo(() => {
    if (!zones) return null
    const map = {}
    for (const [k, hex] of Object.entries(zones)) map[k] = new THREE.Color(hex)
    return map
  }, [zones])

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    roughness: 0.55,
    metalness: 0.08,
  }), [])

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

  useEffect(() => {
    colorsApplied.current = false
  }, [positions, baseColors, highlightedSet, purple])

  useFrame(({ camera }) => {
    // Apply instance colors on first frame after change
    if (!colorsApplied.current && meshRef.current) {
      applyColors(meshRef.current, positions, dummy, baseColors, highlightedSet, purple, count)
      colorsApplied.current = true
    }

    if (!meshRef.current) return

    // Determine clip state
    let clipState, planes, side

    if (crossSection) {
      // Manual dissect: fixed front-facing slice
      clipState = 'manual'
      planes = [manualPlane]
      side = THREE.DoubleSide
    } else {
      const dist = camera.position.length()

      if (dist < AUTO_CLIP_START) {
        // Auto zoom-in reveal: clip plane faces the camera
        clipState = 'auto:' + dist.toFixed(1)

        // Normal = direction from organ toward camera (clips the camera-side half)
        const camDir = camera.position.clone().normalize()

        // As camera gets closer, push the plane further into the organ
        const t = Math.max(0, Math.min(1, (AUTO_CLIP_START - dist) / (AUTO_CLIP_START - AUTO_CLIP_FULL)))
        const depth = -t * 4.0  // max 4 units deep into organ center

        autoCamPlane.set(camDir, depth)
        planes = [autoCamPlane]
        side = THREE.DoubleSide
      } else {
        clipState = 'none'
        planes = []
        side = THREE.FrontSide
      }
    }

    // Only update material when state actually changes
    if (prevClipState.current !== clipState) {
      prevClipState.current = clipState
      material.clippingPlanes = planes
      material.side = side
      material.clipShadows = true
      material.needsUpdate = true
    } else if (clipState.startsWith('auto:')) {
      // Update plane every frame (camera moves), but don't flag needsUpdate
      // unless side changed (already set above)
      material.clippingPlanes = planes
    }
  })

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
