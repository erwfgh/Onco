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
// Normal dissect: cut front face off (Z-axis)
const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
// Interior view: lateral cut (X-axis) reveals airways/vessels running top-to-bottom
const CLIP_PLANE_INTERIOR = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1)

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

export default function OrganModel({ voxels, baseColor, zones, stage, highlights, onVoxelClick, crossSection, insideMode }) {
  const meshRef = useRef()
  const colorsApplied = useRef(false)
  const prevMode = useRef(null)
  const count = voxels.length
  const dummy = useMemo(() => new THREE.Object3D(), [])

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

      let brightness
      if (insideMode) {
        // Boost significantly — interior zone colors like vessels (#6b0000) are very dark
        // and need amplification to be vivid from inside
        brightness = (2.2 + depth * 0.4) * (1.1 + noise * 0.25)
      } else {
        brightness = (0.88 + depth * 0.18) * (0.92 + noise * 0.16)
      }

      const c = srcColor.clone().multiplyScalar(brightness)
      // Clamp to valid range
      c.r = Math.min(1, c.r)
      c.g = Math.min(1, c.g)
      c.b = Math.min(1, c.b)
      return c
    })
  }, [voxels, positions, base, zoneColors, insideMode])

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
  }, [positions, baseColors, highlightedSet, purple, insideMode])

  // Update material mode when insideMode or crossSection changes
  useEffect(() => {
    const modeKey = `${insideMode}:${crossSection}`
    if (prevMode.current === modeKey) return
    prevMode.current = modeKey

    if (insideMode) {
      // Lateral X-axis cut: reveals airways/vessels running top-to-bottom
      material.clippingPlanes = [CLIP_PLANE_INTERIOR]
      material.side = THREE.DoubleSide
      material.roughness = 0.30
      material.metalness = 0.12
      material.emissive = new THREE.Color('#180808')
      material.emissiveIntensity = 0.3
    } else if (crossSection) {
      material.clippingPlanes = [CLIP_PLANE]
      material.side = THREE.DoubleSide
      material.roughness = 0.55
      material.metalness = 0.08
      material.emissive = new THREE.Color('#000000')
      material.emissiveIntensity = 0
    } else {
      material.clippingPlanes = []
      material.side = THREE.FrontSide
      material.roughness = 0.55
      material.metalness = 0.08
      material.emissive = new THREE.Color('#000000')
      material.emissiveIntensity = 0
    }
    material.clipShadows = true
    material.needsUpdate = true
  }, [insideMode, crossSection, material])

  useFrame(() => {
    if (!colorsApplied.current && meshRef.current) {
      applyColors(meshRef.current, positions, dummy, baseColors, highlightedSet, purple, count)
      colorsApplied.current = true
    }
  })

  const pointerDownPos = useRef(null)

  const handlePointerDown = useCallback(e => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleClick = useCallback(e => {
    e.stopPropagation()
    if (!pointerDownPos.current) return
    const dx = e.clientX - pointerDownPos.current.x
    const dy = e.clientY - pointerDownPos.current.y
    // Ignore if pointer moved more than 4px — that was a drag, not a click
    if (dx * dx + dy * dy > 16) return
    if (e.instanceId != null) onVoxelClick(e.instanceId)
  }, [onVoxelClick])

  return (
    <instancedMesh
      ref={meshRef}
      args={[GEO, material, count]}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      castShadow
      receiveShadow
    />
  )
}
