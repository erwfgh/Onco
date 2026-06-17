// Voxel generation helpers
function ellipsoid(cx, cy, cz, rx, ry, rz) {
  const v = []
  for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++)
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++)
        if (((x-cx)/rx)**2 + ((y-cy)/ry)**2 + ((z-cz)/rz)**2 <= 1)
          v.push({ x, y, z })
  return v
}

function sphere(cx, cy, cz, r) {
  return ellipsoid(cx, cy, cz, r, r, r)
}

function cylinder(cx, cz, y0, y1, r) {
  const v = []
  for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++)
    for (let y = y0; y <= y1; y++)
      for (let z = Math.floor(cz - r); z <= Math.ceil(cz + r); z++)
        if ((x-cx)**2 + (z-cz)**2 <= r*r)
          v.push({ x, y, z })
  return v
}

function tube(points, r) {
  const v = []
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay, az] = points[i]
    const [bx, by, bz] = points[i+1]
    const steps = Math.max(Math.abs(bx-ax), Math.abs(by-ay), Math.abs(bz-az)) * 2
    for (let t = 0; t <= steps; t++) {
      const f = t / steps
      const cx = ax + (bx-ax)*f
      const cy = ay + (by-ay)*f
      const cz = az + (bz-az)*f
      sphere(cx, cy, cz, r).forEach(p => v.push(p))
    }
  }
  return v
}

function unique(voxels) {
  const seen = new Set()
  return voxels.filter(({ x, y, z }) => {
    const k = `${x},${y},${z}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// ── Organ definitions ──────────────────────────────────────────────────────

const ORGANS = {
  lungs: {
    label: 'Lungs',
    icon: '🫁',
    color: '#f4a4b0',
    specialty: ['oncology'],
    voxels: unique([
      // right lobe
      ...ellipsoid(-3.5, 0, 0, 2.5, 5, 2),
      // right upper lobe protrusion
      ...ellipsoid(-3, 3.5, 0, 1.5, 2, 1.5),
      // left lobe (slightly smaller — cardiac notch)
      ...ellipsoid(3, 0, 0, 2, 5, 2),
      ...ellipsoid(3, 3.5, 0, 1.2, 2, 1.2),
    ]),
  },

  liver: {
    label: 'Liver',
    icon: '🫀',
    color: '#8B1a1a',
    specialty: ['oncology'],
    voxels: unique([
      ...ellipsoid(0, 0, 0, 5, 3, 3),
      ...ellipsoid(-1.5, 0.5, 0, 4, 2.5, 2.5),
      ...ellipsoid(2, -0.5, 0, 3, 2, 2),
    ]),
  },

  kidney: {
    label: 'Kidneys',
    icon: '🫘',
    color: '#c05a3a',
    specialty: ['oncology'],
    voxels: unique([
      // right kidney (bean: two overlapping ellipsoids, indent on medial side)
      ...ellipsoid(-5, 0, 0, 2, 3.5, 1.5),
      ...ellipsoid(-5, 0, 0, 1.5, 3, 1.2),
      // left kidney
      ...ellipsoid(5, 0, 0, 2, 3.5, 1.5),
      ...ellipsoid(5, 0, 0, 1.5, 3, 1.2),
    ]),
  },

  colon: {
    label: 'Colon',
    icon: '🌀',
    color: '#c8a06e',
    specialty: ['oncology'],
    voxels: unique(tube([
      [-4, -5, 0], [-4, 5, 0],  // ascending
      [-4, 5, 0],  [0, 6, 0],   // hepatic flexure
      [0, 6, 0],   [4, 5, 0],   // transverse
      [4, 5, 0],   [4, -4, 0],  // descending
      [4, -4, 0],  [2, -6, 0],  // sigmoid start
      [2, -6, 0],  [0, -7, 0],  // sigmoid mid
      [0, -7, 0],  [-1, -5, 0], // rectum
    ], 1.2)),
  },

  breast: {
    label: 'Breast',
    icon: '⭕',
    color: '#f5c2c7',
    specialty: ['oncology'],
    voxels: unique([
      // right breast
      ...ellipsoid(-4, 0, 0, 3, 3, 2),
      // left breast
      ...ellipsoid(4, 0, 0, 3, 3, 2),
    ]),
  },

  lymph: {
    label: 'Lymph Nodes',
    icon: '🔵',
    color: '#a0c4e8',
    specialty: ['hematology'],
    voxels: unique([
      // cervical chain
      ...sphere(0, 7, 0, 1.5),
      ...sphere(-1.5, 5.5, 0, 1),
      ...sphere(1.5, 5.5, 0, 1),
      // axillary
      ...sphere(-5, 3, 0, 1.5),
      ...sphere(5, 3, 0, 1.5),
      // mediastinal
      ...sphere(-1, 1, 0, 1.2),
      ...sphere(1, 1, 0, 1.2),
      ...sphere(0, -1, 0, 1.2),
      // inguinal
      ...sphere(-4, -5, 0, 1.5),
      ...sphere(4, -5, 0, 1.5),
    ]),
  },

  bonemarrow: {
    label: 'Bone Marrow',
    icon: '🦴',
    color: '#e8d5a0',
    specialty: ['hematology'],
    voxels: unique([
      // femur shaft cross-section (hollow bone)
      ...cylinder(0, 0, -8, 8, 2),
      // remove inner cavity — just show cortical shell by keeping outer ring
      // vertebral bodies
      ...ellipsoid(0, 0, 0, 2.5, 1, 2.5),
      ...ellipsoid(0, 3, 0, 2.5, 1, 2.5),
      ...ellipsoid(0, 6, 0, 2.5, 1, 2.5),
      ...ellipsoid(0, -3, 0, 2.5, 1, 2.5),
      ...ellipsoid(0, -6, 0, 2.5, 1, 2.5),
      // iliac crests
      ...ellipsoid(-4, -1, 0, 3, 1.5, 1.5),
      ...ellipsoid(4, -1, 0, 3, 1.5, 1.5),
    ]),
  },

  skin: {
    label: 'Skin',
    icon: '🔲',
    color: '#f5cba7',
    specialty: ['dermatology'],
    voxels: (() => {
      const v = []
      // flat sheet representing skin surface with a slight dome
      for (let x = -8; x <= 8; x++)
        for (let z = -8; z <= 8; z++) {
          const d = x*x + z*z
          if (d <= 64) {
            const y = Math.round(-d / 40)
            v.push({ x, y, z })
            v.push({ x, y: y + 1, z }) // 2 layers thick
          }
        }
      return v
    })(),
  },
}

export default ORGANS
