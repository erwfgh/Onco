// ─── Primitive generators ─────────────────────────────────────────────────

function ellipsoid(cx, cy, cz, rx, ry, rz, zone) {
  const v = []
  for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++)
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++)
        if (((x-cx)/rx)**2 + ((y-cy)/ry)**2 + ((z-cz)/rz)**2 <= 1)
          v.push(zone ? { x, y, z, zone } : { x, y, z })
  return v
}

function sphere(cx, cy, cz, r, zone) {
  return ellipsoid(cx, cy, cz, r, r, r, zone)
}

function cylinder(cx, cz, y0, y1, r, zone) {
  const v = []
  for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++)
    for (let y = y0; y <= y1; y++)
      for (let z = Math.floor(cz - r); z <= Math.ceil(cz + r); z++)
        if ((x-cx)**2 + (z-cz)**2 <= r*r)
          v.push(zone ? { x, y, z, zone } : { x, y, z })
  return v
}

function hollowCylinder(cx, cz, y0, y1, rOuter, rInner, zone) {
  const v = []
  for (let x = Math.floor(cx - rOuter); x <= Math.ceil(cx + rOuter); x++)
    for (let y = y0; y <= y1; y++)
      for (let z = Math.floor(cz - rOuter); z <= Math.ceil(cz + rOuter); z++) {
        const d2 = (x-cx)**2 + (z-cz)**2
        if (d2 <= rOuter*rOuter && d2 >= rInner*rInner)
          v.push(zone ? { x, y, z, zone } : { x, y, z })
      }
  return v
}

function tube(points, r, zone) {
  const v = []
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay, az] = points[i]
    const [bx, by, bz] = points[i+1]
    const steps = Math.ceil(Math.max(Math.abs(bx-ax), Math.abs(by-ay), Math.abs(bz-az)) * 3)
    for (let t = 0; t <= steps; t++) {
      const f = t / steps
      sphere(ax + (bx-ax)*f, ay + (by-ay)*f, az + (bz-az)*f, r, zone).forEach(p => v.push(p))
    }
  }
  return v
}

// Ellipsoid with sinusoidal surface noise — creates organic bumpy/folded appearance
function noisyEllipsoid(cx, cy, cz, rx, ry, rz, amp, freq, zone) {
  const v = []
  const pad = Math.ceil(amp) + 1
  for (let x = Math.floor(cx - rx - pad); x <= Math.ceil(cx + rx + pad); x++)
    for (let y = Math.floor(cy - ry - pad); y <= Math.ceil(cy + ry + pad); y++)
      for (let z = Math.floor(cz - rz - pad); z <= Math.ceil(cz + rz + pad); z++) {
        const noise = amp * Math.sin(x * freq) * Math.cos(y * freq * 1.3) * Math.sin(z * freq * 0.9)
        if (((x-cx)/rx)**2 + ((y-cy)/ry)**2 + ((z-cz)/rz)**2 <= (1 + noise) ** 2)
          v.push(zone ? { x, y, z, zone } : { x, y, z })
      }
  return v
}

// Cerebral gyri — tighter multi-frequency folds to simulate cortical folding
function gyralEllipsoid(cx, cy, cz, rx, ry, rz, zone) {
  const v = []
  const pad = 2
  for (let x = Math.floor(cx - rx - pad); x <= Math.ceil(cx + rx + pad); x++)
    for (let y = Math.floor(cy - ry - pad); y <= Math.ceil(cy + ry + pad); y++)
      for (let z = Math.floor(cz - rz - pad); z <= Math.ceil(cz + rz + pad); z++) {
        const fold =
          0.10 * Math.sin(x * 0.9 + z * 0.4) * Math.cos(y * 1.1) +
          0.06 * Math.sin(x * 1.8 - y * 0.6) * Math.cos(z * 1.0) +
          0.04 * Math.cos(x * 0.5 + y * 1.4 - z * 0.8)
        if (((x-cx)/rx)**2 + ((y-cy)/ry)**2 + ((z-cz)/rz)**2 <= (1 + fold) ** 2)
          v.push(zone ? { x, y, z, zone } : { x, y, z })
      }
  return v
}

function subtract(base, cut) {
  const cutSet = new Set(cut.map(({x,y,z}) => `${x},${y},${z}`))
  return base.filter(({x,y,z}) => !cutSet.has(`${x},${y},${z}`))
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

function tag(voxels, zone) {
  return voxels.map(({ x, y, z }) => ({ x, y, z, zone }))
}

// ─── Organ definitions ────────────────────────────────────────────────────

const ORGANS = {

  // ══ THORACIC ════════════════════════════════════════════════════════════

  lungs: {
    label: 'Lungs',
    system: 'Thoracic',
    icon: 'Ψ',
    color: '#e87a7a',
    zones: { parenchyma: '#e87a7a', lobe: '#d46060', bronchi: '#8b1a1a', vessel: '#6b0000' },
    description: 'Non-small cell & small cell lung carcinoma',
    voxels: unique([
      // ── Right lung — massive, bumpy, organic ─────────────────────────────
      ...tag(noisyEllipsoid(-4.5, 0, 0, 5.0, 9.0, 4.5, 0.30, 0.70), 'parenchyma'),
      ...tag(noisyEllipsoid(-4.8, 1.0, 0.5, 4.2, 8.0, 4.0, 0.25, 0.90), 'parenchyma'),
      ...tag(noisyEllipsoid(-4.2, -1.0, -0.5, 4.0, 7.5, 3.8, 0.28, 1.10), 'parenchyma'),
      // Right upper lobe
      ...tag(noisyEllipsoid(-4.0, 6.5, 0.5, 3.5, 3.5, 3.0, 0.22, 0.85), 'lobe'),
      ...tag(noisyEllipsoid(-3.8, 7.5, 0.8, 2.8, 2.5, 2.5, 0.20, 1.00), 'lobe'),
      // Right middle lobe
      ...tag(noisyEllipsoid(-4.8, 2.0, 1.8, 3.0, 2.5, 2.5, 0.18, 0.95), 'lobe'),
      ...tag(ellipsoid(-5.0, 1.5, 2.0, 2.5, 2.0, 2.2), 'lobe'),
      // Right lower lobe
      ...tag(noisyEllipsoid(-4.5, -4.0, -0.5, 4.5, 5.0, 4.0, 0.28, 0.75), 'parenchyma'),
      ...tag(noisyEllipsoid(-4.8, -5.0, 0, 3.8, 4.0, 3.5, 0.25, 0.85), 'parenchyma'),
      // Right apex
      ...tag(ellipsoid(-4.0, 9.5, 0, 2.5, 2.0, 2.2), 'parenchyma'),
      ...tag(noisyEllipsoid(-3.8, 10.0, 0.3, 2.0, 1.8, 1.8, 0.15, 1.0), 'lobe'),
      // Right base diaphragmatic
      ...tag(noisyEllipsoid(-4.5, -9.0, 0, 3.5, 1.8, 3.2, 0.20, 0.80), 'lobe'),
      // Right lateral bulge
      ...tag(noisyEllipsoid(-8.0, 0.5, 0, 2.0, 5.0, 2.8, 0.22, 0.90), 'parenchyma'),
      ...tag(ellipsoid(-8.5, 2.0, 0.5, 1.5, 3.5, 2.0), 'parenchyma'),
      // Right mediastinal surface
      ...tag(ellipsoid(-3.0, 0.5, -1.5, 2.5, 7.0, 2.0), 'parenchyma'),
      // Right costal surface bumps
      ...tag(noisyEllipsoid(-6.5, 3.0, 1.0, 2.0, 4.0, 2.5, 0.30, 1.20), 'parenchyma'),
      ...tag(noisyEllipsoid(-7.0, -2.0, 0.5, 1.8, 3.5, 2.2, 0.28, 1.15), 'parenchyma'),

      // ── Left lung — slightly smaller (cardiac notch) ─────────────────────
      ...tag(noisyEllipsoid(4.0, 0, 0, 4.5, 9.0, 4.2, 0.30, 0.70), 'parenchyma'),
      ...tag(noisyEllipsoid(4.2, 1.0, 0.5, 3.8, 8.0, 3.8, 0.25, 0.90), 'parenchyma'),
      ...tag(noisyEllipsoid(3.8, -1.0, -0.5, 3.6, 7.5, 3.5, 0.28, 1.10), 'parenchyma'),
      // Left upper lobe
      ...tag(noisyEllipsoid(3.8, 6.0, 0.5, 3.2, 3.5, 2.8, 0.22, 0.85), 'lobe'),
      ...tag(noisyEllipsoid(3.6, 7.5, 0.8, 2.5, 2.5, 2.3, 0.20, 1.00), 'lobe'),
      // Lingula
      ...tag(noisyEllipsoid(3.5, 1.5, 1.5, 2.5, 3.0, 2.0, 0.18, 0.95), 'lobe'),
      ...tag(ellipsoid(3.2, 0.5, 2.0, 2.0, 2.5, 1.8), 'lobe'),
      // Left lower lobe
      ...tag(noisyEllipsoid(4.2, -4.0, -0.5, 4.0, 5.0, 3.8, 0.28, 0.75), 'parenchyma'),
      ...tag(noisyEllipsoid(4.5, -5.0, 0, 3.5, 4.0, 3.2, 0.25, 0.85), 'parenchyma'),
      // Left apex
      ...tag(ellipsoid(3.8, 9.5, 0, 2.2, 2.0, 2.0), 'parenchyma'),
      ...tag(noisyEllipsoid(3.6, 10.0, 0.3, 1.8, 1.8, 1.6, 0.15, 1.0), 'lobe'),
      // Left base
      ...tag(noisyEllipsoid(4.2, -9.0, 0, 3.2, 1.8, 3.0, 0.20, 0.80), 'lobe'),
      // Left lateral
      ...tag(noisyEllipsoid(7.5, 0.5, 0, 1.8, 5.0, 2.5, 0.22, 0.90), 'parenchyma'),
      ...tag(ellipsoid(7.8, 2.0, 0.5, 1.3, 3.5, 1.8), 'parenchyma'),
      // Left mediastinal (cardiac notch — concave medial)
      ...tag(ellipsoid(2.8, 0, -1.5, 2.2, 6.0, 1.8), 'parenchyma'),
      // Left costal bumps
      ...tag(noisyEllipsoid(6.0, 3.0, 1.0, 1.8, 4.0, 2.3, 0.30, 1.20), 'parenchyma'),
      ...tag(noisyEllipsoid(6.5, -2.0, 0.5, 1.6, 3.5, 2.0, 0.28, 1.15), 'parenchyma'),

      // ── Bronchial tree — 4-level deep ────────────────────────────────────
      // Trachea & carina
      ...tag(cylinder(0, 0, 3, 12, 1.0), 'bronchi'),
      // Main bronchi
      ...tag(tube([[0,3,0],[-4.0,2.0,0]], 0.8), 'bronchi'),
      ...tag(tube([[0,3,0],[4.0,2.0,0]], 0.8), 'bronchi'),
      // Right lobar bronchi — upper, middle, lower
      ...tag(tube([[-4.0,2.0,0],[-4.5,5.5,0.3],[-4.2,8.5,0.5]], 0.55), 'bronchi'),
      ...tag(tube([[-4.0,2.0,0],[-5.0,2.0,1.5],[-5.2,1.0,2.0]], 0.50), 'bronchi'),
      ...tag(tube([[-4.0,2.0,0],[-4.5,-1.5,0],[-4.8,-5.5,0]], 0.55), 'bronchi'),
      // Left lobar bronchi — upper, lower
      ...tag(tube([[4.0,2.0,0],[4.2,5.5,0.3],[3.8,8.5,0.5]], 0.55), 'bronchi'),
      ...tag(tube([[4.0,2.0,0],[3.8,-1.5,0],[4.0,-5.5,0]], 0.55), 'bronchi'),
      // Right segmental — upper lobe (3 segments)
      ...tag(tube([[-4.2,8.5,0.5],[-5.5,8.0,1.5],[-6.5,7.0,2.0]], 0.38), 'bronchi'),
      ...tag(tube([[-4.2,8.5,0.5],[-3.5,9.5,0.2],[-2.8,10.0,-0.5]], 0.35), 'bronchi'),
      ...tag(tube([[-4.2,8.5,0.5],[-4.5,8.0,-1.0],[-4.0,7.5,-2.0]], 0.33), 'bronchi'),
      // Right segmental — middle lobe (2 segments)
      ...tag(tube([[-5.2,1.0,2.0],[-6.5,0.5,2.5],[-7.5,-0.5,2.0]], 0.35), 'bronchi'),
      ...tag(tube([[-5.2,1.0,2.0],[-5.0,2.5,2.5],[-4.5,3.5,2.0]], 0.33), 'bronchi'),
      // Right segmental — lower lobe (5 segments)
      ...tag(tube([[-4.8,-5.5,0],[-6.0,-6.5,0.8],[-6.5,-8.0,0.5]], 0.38), 'bronchi'),
      ...tag(tube([[-4.8,-5.5,0],[-4.0,-7.0,-0.5],[-3.5,-8.5,-0.8]], 0.35), 'bronchi'),
      ...tag(tube([[-4.8,-5.5,0],[-5.0,-6.0,-1.5],[-4.5,-7.5,-2.0]], 0.33), 'bronchi'),
      ...tag(tube([[-4.8,-5.5,0],[-3.5,-6.5,1.0],[-3.0,-8.0,1.5]], 0.32), 'bronchi'),
      ...tag(tube([[-4.8,-5.5,0],[-5.5,-5.0,1.5],[-6.0,-6.5,2.0]], 0.32), 'bronchi'),
      // Left segmental — upper lobe (4 segments incl lingula)
      ...tag(tube([[3.8,8.5,0.5],[5.0,8.0,1.5],[6.0,7.0,2.0]], 0.38), 'bronchi'),
      ...tag(tube([[3.8,8.5,0.5],[3.2,9.5,0.2],[2.5,10.0,-0.5]], 0.35), 'bronchi'),
      ...tag(tube([[4.0,2.0,0],[3.5,0.5,1.8],[3.0,-1.0,2.5]], 0.38), 'bronchi'),
      ...tag(tube([[3.0,-1.0,2.5],[2.5,-2.5,2.0],[2.0,-3.5,1.5]], 0.33), 'bronchi'),
      // Left segmental — lower lobe (4 segments)
      ...tag(tube([[4.0,-5.5,0],[5.5,-6.5,0.8],[6.0,-8.0,0.5]], 0.38), 'bronchi'),
      ...tag(tube([[4.0,-5.5,0],[3.5,-7.0,-0.5],[3.0,-8.5,-0.8]], 0.35), 'bronchi'),
      ...tag(tube([[4.0,-5.5,0],[3.8,-6.0,-1.5],[3.5,-7.5,-2.0]], 0.33), 'bronchi'),
      ...tag(tube([[4.0,-5.5,0],[4.5,-6.5,1.0],[4.0,-8.0,1.5]], 0.32), 'bronchi'),
      // Subsegmental branches right upper
      ...tag(tube([[-5.5,8.0,1.5],[-7.0,7.5,2.5],[-7.5,6.5,3.0]], 0.28), 'bronchi'),
      ...tag(tube([[-5.5,8.0,1.5],[-6.0,9.0,1.0],[-6.0,9.5,0]], 0.25), 'bronchi'),
      // Subsegmental branches right lower
      ...tag(tube([[-6.5,-8.0,0.5],[-7.5,-8.5,1.0],[-8.0,-9.0,0.5]], 0.25), 'bronchi'),
      ...tag(tube([[-6.5,-8.0,0.5],[-6.5,-9.0,-0.5],[-6.0,-9.5,-1.0]], 0.24), 'bronchi'),
      // Subsegmental left
      ...tag(tube([[5.5,-6.5,0.8],[7.0,-7.5,1.0],[7.5,-8.5,0.5]], 0.25), 'bronchi'),

      // ── Pulmonary vasculature — deep branching ────────────────────────────
      // Main pulmonary arteries from hilum
      ...tag(sphere(-3.5, 1.5, 0.8, 1.5), 'vessel'),
      ...tag(sphere(3.5, 1.5, 0.8, 1.5), 'vessel'),
      // Right pulmonary artery tree
      ...tag(tube([[-3.5,1.5,0.8],[-5.5,4.0,0.5],[-6.0,7.0,0.5]], 0.55), 'vessel'),
      ...tag(tube([[-3.5,1.5,0.8],[-4.5,-2.5,0.3],[-5.0,-6.5,0.3]], 0.52), 'vessel'),
      ...tag(tube([[-5.5,4.0,0.5],[-7.0,5.5,1.0],[-7.5,7.0,0.8]], 0.42), 'vessel'),
      ...tag(tube([[-6.0,7.0,0.5],[-7.0,8.0,1.0],[-7.5,8.5,1.5]], 0.38), 'vessel'),
      ...tag(tube([[-5.0,-6.5,0.3],[-6.5,-7.5,0.8],[-7.0,-8.5,0.5]], 0.40), 'vessel'),
      ...tag(tube([[-5.0,-6.5,0.3],[-4.0,-8.0,-0.5],[-3.5,-9.0,-1.0]], 0.38), 'vessel'),
      // Right interlobar vessels
      ...tag(tube([[-3.5,1.5,0.8],[-5.5,1.5,2.0],[-7.0,0.5,2.5]], 0.45), 'vessel'),
      // Left pulmonary artery tree
      ...tag(tube([[3.5,1.5,0.8],[5.0,4.0,0.5],[5.5,7.0,0.5]], 0.55), 'vessel'),
      ...tag(tube([[3.5,1.5,0.8],[4.2,-2.5,0.3],[4.5,-6.5,0.3]], 0.52), 'vessel'),
      ...tag(tube([[5.0,4.0,0.5],[6.5,5.5,1.0],[7.0,7.0,0.8]], 0.42), 'vessel'),
      ...tag(tube([[5.5,7.0,0.5],[6.5,8.0,1.0],[7.0,8.5,1.5]], 0.38), 'vessel'),
      ...tag(tube([[4.5,-6.5,0.3],[5.5,-7.5,0.8],[6.0,-8.5,0.5]], 0.40), 'vessel'),
      ...tag(tube([[4.5,-6.5,0.3],[3.5,-8.0,-0.5],[3.0,-9.0,-1.0]], 0.38), 'vessel'),
      // Pulmonary veins
      ...tag(tube([[-7.0,5.5,1.0],[-5.5,3.5,-0.8],[-3.5,2.0,-1.0]], 0.45), 'vessel'),
      ...tag(tube([[-7.5,7.0,0.8],[-6.0,5.0,-0.5],[-3.8,2.5,-1.2]], 0.42), 'vessel'),
      ...tag(tube([[-7.0,-7.5,0.8],[-5.0,-4.5,-0.5],[-3.5,0.5,-1.0]], 0.45), 'vessel'),
      ...tag(tube([[-6.5,-8.5,0.5],[-5.0,-5.5,-1.0],[-3.5,-0.5,-1.2]], 0.40), 'vessel'),
      ...tag(tube([[6.5,5.5,1.0],[5.0,3.5,-0.8],[3.5,2.0,-1.0]], 0.45), 'vessel'),
      ...tag(tube([[7.0,7.0,0.8],[5.5,5.0,-0.5],[3.8,2.5,-1.2]], 0.42), 'vessel'),
      ...tag(tube([[6.0,-7.5,0.8],[4.5,-4.5,-0.5],[3.5,0.5,-1.0]], 0.45), 'vessel'),
      ...tag(tube([[5.5,-8.5,0.5],[4.5,-5.5,-1.0],[3.5,-0.5,-1.2]], 0.40), 'vessel'),
      // Deep parenchymal vessels
      ...tag(tube([[-6.0,7.0,0.5],[-6.5,6.0,-0.8],[-6.0,4.5,-1.5]], 0.32), 'vessel'),
      ...tag(tube([[-5.0,-6.5,0.3],[-6.0,-7.0,-1.0],[-5.5,-8.0,-1.5]], 0.30), 'vessel'),
      ...tag(tube([[5.5,7.0,0.5],[6.0,6.0,-0.8],[5.5,4.5,-1.5]], 0.32), 'vessel'),
      ...tag(tube([[4.5,-6.5,0.3],[5.5,-7.0,-1.0],[5.0,-8.0,-1.5]], 0.30), 'vessel'),
    ]),
    interior: [
      // Trachea — bright white airway tube, clearly visible
      { color: '#ffffff', voxels: unique(cylinder(0, 0, 3, 12, 1.2)) },
      // Main bronchi — white branching from trachea
      { color: '#f0f8ff', voxels: unique([
        ...tube([[0,3,0],[-4.0,2.0,0]], 1.0),
        ...tube([[0,3,0],[4.0,2.0,0]], 1.0),
      ]) },
      // Right lobar bronchi — light blue-white
      { color: '#ddf0ff', voxels: unique([
        ...tube([[-4.0,2.0,0],[-4.5,5.5,0.3],[-4.2,8.5,0.5]], 0.8),
        ...tube([[-4.0,2.0,0],[-5.0,2.0,1.5],[-5.2,1.0,2.0]], 0.7),
        ...tube([[-4.0,2.0,0],[-4.5,-1.5,0],[-4.8,-5.5,0]], 0.8),
      ]) },
      // Left lobar bronchi — light blue-white
      { color: '#ddf0ff', voxels: unique([
        ...tube([[4.0,2.0,0],[4.2,5.5,0.3],[3.8,8.5,0.5]], 0.8),
        ...tube([[4.0,2.0,0],[3.8,-1.5,0],[4.0,-5.5,0]], 0.8),
      ]) },
      // Segmental bronchi right — smaller branches
      { color: '#c8e8ff', voxels: unique([
        ...tube([[-4.2,8.5,0.5],[-5.5,8.0,1.5],[-7.0,7.0,2.0]], 0.55),
        ...tube([[-4.2,8.5,0.5],[-3.5,9.5,0.2],[-2.8,10.0,-0.5]], 0.50),
        ...tube([[-4.8,-5.5,0],[-6.0,-6.5,0.8],[-7.0,-8.0,0.5]], 0.55),
        ...tube([[-4.8,-5.5,0],[-4.0,-7.0,-0.5],[-3.5,-8.5,-0.8]], 0.50),
      ]) },
      // Segmental bronchi left
      { color: '#c8e8ff', voxels: unique([
        ...tube([[3.8,8.5,0.5],[5.0,8.0,1.5],[6.0,7.0,2.0]], 0.55),
        ...tube([[3.8,8.5,0.5],[3.2,9.5,0.2],[2.5,10.0,-0.5]], 0.50),
        ...tube([[4.0,-5.5,0],[5.5,-6.5,0.8],[6.0,-8.0,0.5]], 0.55),
        ...tube([[4.0,-5.5,0],[3.5,-7.0,-0.5],[3.0,-8.5,-0.8]], 0.50),
      ]) },
      // Pulmonary arteries — vivid blue
      { color: '#5588ff', voxels: unique([
        ...sphere(-3.5, 1.5, 0.8, 1.4),
        ...tube([[-3.5,1.5,0.8],[-5.5,4.0,0.5],[-6.5,7.0,0.5]], 0.7),
        ...tube([[-3.5,1.5,0.8],[-4.5,-2.5,0.3],[-5.5,-6.5,0.3]], 0.65),
        ...sphere(3.5, 1.5, 0.8, 1.4),
        ...tube([[3.5,1.5,0.8],[5.0,4.0,0.5],[6.0,7.0,0.5]], 0.7),
        ...tube([[3.5,1.5,0.8],[4.2,-2.5,0.3],[4.8,-6.5,0.3]], 0.65),
      ]) },
      // Pulmonary veins — warm red
      { color: '#ff5555', voxels: unique([
        ...tube([[-7.5,7.0,0.8],[-5.5,3.5,-0.8],[-3.5,2.0,-1.0]], 0.6),
        ...tube([[-7.0,-7.5,0.8],[-5.0,-4.5,-0.5],[-3.5,0.5,-1.0]], 0.6),
        ...tube([[7.0,7.0,0.8],[5.5,3.5,-0.8],[3.5,2.0,-1.0]], 0.6),
        ...tube([[6.0,-7.5,0.8],[4.5,-4.5,-0.5],[3.5,0.5,-1.0]], 0.6),
      ]) },
    ],
  },

  heart: {
    label: 'Heart',
    system: 'Thoracic',
    icon: '♡',
    color: '#9e1818',
    zones: { myocardium: '#9e1818', atrium: '#b82828', vessel: '#5a0808', valve: '#cc4040' },
    description: 'Cardiac tumors & pericardial mesothelioma',
    voxels: unique([
      // ── Left ventricle — thick walled conical ────────────────────────────
      ...tag(noisyEllipsoid(-1.5, -1.5, 0, 4.2, 5.8, 3.8, 0.08, 0.9), 'myocardium'),
      ...tag(noisyEllipsoid(-1.8, -2.0, 0.3, 3.8, 5.2, 3.5, 0.07, 1.0), 'myocardium'),
      ...tag(ellipsoid(-1.5, -5.8, 0, 2.2, 1.8, 2.2), 'myocardium'),
      ...tag(ellipsoid(-1.8, -6.5, 0, 1.5, 1.2, 1.5), 'myocardium'),
      // LV apex
      ...tag(ellipsoid(-2.0, -7.2, 0, 1.0, 0.8, 1.0), 'myocardium'),
      // LV lateral wall
      ...tag(ellipsoid(-4.5, -1.5, 0, 1.5, 4.5, 2.5), 'myocardium'),
      // LV posterior wall
      ...tag(ellipsoid(-1.5, -1.5, -2.5, 3.5, 5.0, 1.5), 'myocardium'),
      // LV anterior wall
      ...tag(ellipsoid(-1.0, -1.0, 3.5, 3.5, 5.0, 1.2), 'myocardium'),
      // Papillary muscles LV
      ...tag(cylinder(-2.5, -1.0, -6.5, -2.5, 0.7), 'myocardium'),
      ...tag(cylinder(-0.8, 0.8, -6.5, -2.5, 0.7), 'myocardium'),
      ...tag(cylinder(-3.0, -2.0, -6.5, -2.5, 0.6), 'myocardium'),

      // ── Right ventricle — crescent wrapping LV ───────────────────────────
      ...tag(noisyEllipsoid(2.5, -0.5, 0.8, 3.2, 4.5, 3.0, 0.08, 0.9), 'myocardium'),
      ...tag(ellipsoid(2.0, -0.5, 1.5, 2.8, 4.0, 2.5), 'myocardium'),
      // RVOT (right ventricular outflow tract)
      ...tag(ellipsoid(2.2, 3.0, 0.5, 1.8, 2.5, 1.8), 'myocardium'),
      ...tag(cylinder(2.2, 0.5, 3.5, 6.5, 1.3), 'myocardium'),
      // RV anterior wall
      ...tag(ellipsoid(3.0, 0.0, 3.2, 2.5, 4.0, 1.2), 'myocardium'),
      // Interventricular septum — thick muscular
      ...tag(ellipsoid(0.2, -1.0, 0, 1.0, 5.5, 3.0), 'myocardium'),
      ...tag(ellipsoid(0.0, -3.0, 0, 0.8, 3.0, 2.5), 'myocardium'),
      // Moderator band (RV)
      ...tag(tube([[2.5,-3.0,1.5],[1.0,-3.5,2.5]], 0.4), 'myocardium'),
      // Trabeculae carneae RV
      ...tag(tube([[2.0,-2.0,2.0],[3.0,-3.5,2.5],[2.5,-5.0,2.0]], 0.35), 'myocardium'),
      ...tag(tube([[2.5,-1.5,2.5],[1.5,-3.0,3.0],[2.0,-4.5,2.8]], 0.30), 'myocardium'),

      // ── Left atrium — posterior, receives pulmonary veins ────────────────
      ...tag(ellipsoid(-1.5, 4.5, -0.5, 3.2, 2.8, 3.0), 'atrium'),
      ...tag(noisyEllipsoid(-1.5, 4.5, -1.0, 2.8, 2.5, 2.5, 0.10, 1.0), 'atrium'),
      // LA appendage (LAA) — trabeculated
      ...tag(noisyEllipsoid(-4.5, 5.0, 0.8, 1.8, 1.8, 1.5, 0.20, 1.2), 'atrium'),
      ...tag(tube([[-3.5,5.0,0.5],[-5.5,5.5,1.2],[-6.5,5.0,1.0]], 0.6), 'atrium'),
      // Pulmonary vein orifices into LA
      ...tag(sphere(-4.5,4.5,-2.0,0.8), 'atrium'),
      ...tag(sphere(-4.5,3.2,-2.0,0.8), 'atrium'),
      ...tag(sphere(1.5,4.5,-2.0,0.8), 'atrium'),
      ...tag(sphere(1.5,3.2,-2.0,0.8), 'atrium'),

      // ── Right atrium ─────────────────────────────────────────────────────
      ...tag(ellipsoid(3.0, 4.0, 0.2, 2.8, 2.8, 2.5), 'atrium'),
      ...tag(noisyEllipsoid(3.0, 4.0, 0.5, 2.5, 2.5, 2.2, 0.10, 1.0), 'atrium'),
      // RA appendage — crista terminalis
      ...tag(noisyEllipsoid(5.0, 4.5, 0.8, 1.5, 1.8, 1.2, 0.20, 1.2), 'atrium'),
      ...tag(tube([[4.0,4.5,0.5],[6.0,5.0,1.0],[7.0,4.5,0.8]], 0.55), 'atrium'),
      // Interatrial septum / fossa ovalis
      ...tag(ellipsoid(0.5, 4.2, 0, 0.7, 2.2, 2.2), 'atrium'),
      ...tag(sphere(0.5, 4.0, 0, 1.0), 'atrium'),

      // ── Great vessels ─────────────────────────────────────────────────────
      // Ascending aorta — wide
      ...tag(cylinder(-1.2, 0, 5.5, 11.5, 1.6), 'vessel'),
      ...tag(noisyEllipsoid(-1.2, 11.0, 0, 1.8, 1.5, 1.8, 0.08, 0.8), 'vessel'),
      // Aortic arch
      ...tag(tube([[-1.2,11.5,0],[0,13.0,0],[2.0,12.5,0],[3.5,11.0,0],[4.0,9.0,0],[3.8,7.0,0]], 1.3), 'vessel'),
      // Descending aorta
      ...tag(cylinder(3.8, 0, 5.5, 7.0, 1.1), 'vessel'),
      // Brachiocephalic trunk + branches
      ...tag(tube([[-0.5,12.5,0],[-1.5,14.5,0]], 0.8), 'vessel'),
      ...tag(tube([[-1.5,14.5,0],[-2.5,15.5,1.5]], 0.6), 'vessel'),
      ...tag(tube([[-1.5,14.5,0],[-1.0,15.5,-1.5]], 0.6), 'vessel'),
      // Left common carotid
      ...tag(tube([[0.8,12.8,0],[1.2,15.0,0]], 0.7), 'vessel'),
      // Left subclavian
      ...tag(tube([[2.0,12.2,0],[4.0,13.5,0],[6.0,13.0,0]], 0.7), 'vessel'),
      // Pulmonary trunk — wide
      ...tag(cylinder(2.0, 0, 5.0, 8.5, 1.3), 'vessel'),
      ...tag(noisyEllipsoid(2.0, 8.5, 0, 1.5, 1.2, 1.5, 0.08, 0.8), 'vessel'),
      // Right pulmonary artery
      ...tag(tube([[2.0,8.5,0],[-0.5,8.5,0],[-2.5,7.5,0],[-4.5,6.5,0]], 0.9), 'vessel'),
      // Left pulmonary artery
      ...tag(tube([[2.0,8.5,0],[4.5,8.5,0],[6.5,7.5,0]], 0.9), 'vessel'),
      // Superior vena cava
      ...tag(cylinder(3.8, 0, 5.0, 10.5, 1.0), 'vessel'),
      // Inferior vena cava
      ...tag(cylinder(2.8, 0, -4.0, 1.0, 1.0), 'vessel'),
      // Pulmonary veins (4) entering LA
      ...tag(tube([[-5.5,4.5,-2.5],[-3.5,4.5,-2.0],[-1.5,4.5,-1.5]], 0.7), 'vessel'),
      ...tag(tube([[-5.5,3.0,-2.5],[-3.5,3.2,-2.0],[-1.5,3.5,-1.5]], 0.65), 'vessel'),
      ...tag(tube([[5.5,4.5,-2.5],[4.0,4.5,-2.0],[2.5,4.5,-1.5]], 0.7), 'vessel'),
      ...tag(tube([[5.5,3.0,-2.5],[4.0,3.2,-2.0],[2.5,3.5,-1.5]], 0.65), 'vessel'),

      // ── Coronary arteries — detailed ──────────────────────────────────────
      // Left main coronary
      ...tag(tube([[-0.5,5.0,3.8],[-1.5,4.5,4.2]], 0.55), 'valve'),
      // LAD — full course to apex
      ...tag(tube([[-1.5,4.5,4.2],[0,2.5,4.0],[0.5,-0.5,3.5],[0.5,-3.0,2.8],[0.0,-5.5,2.0],[0.0,-7.0,1.0]], 0.48), 'valve'),
      // LAD diagonal 1
      ...tag(tube([[0,2.5,4.0],[-1.5,1.5,3.2],[-3.0,0.5,2.5],[-4.0,-0.5,1.8]], 0.35), 'valve'),
      // LAD diagonal 2
      ...tag(tube([[0.5,-0.5,3.5],[-1.0,-1.5,2.8],[-2.5,-2.5,2.0]], 0.32), 'valve'),
      // LAD septal perforators
      ...tag(tube([[0.5,-0.5,3.5],[0.5,-1.0,2.0],[0.5,-1.5,1.0]], 0.28), 'valve'),
      ...tag(tube([[0.5,-3.0,2.8],[0.5,-3.5,1.5],[0.5,-4.0,0.5]], 0.26), 'valve'),
      // Left circumflex (LCx) — around posterior left
      ...tag(tube([[-1.5,4.5,4.2],[-3.0,4.0,3.5],[-4.5,3.0,2.8],[-5.0,1.5,2.0],[-4.5,0.0,1.5],[-4.0,-1.5,1.0]], 0.42), 'valve'),
      // LCx obtuse marginals
      ...tag(tube([[-4.5,3.0,2.8],[-5.5,2.0,2.0],[-6.0,0.5,1.5],[-5.5,-1.0,1.0]], 0.32), 'valve'),
      ...tag(tube([[-5.0,1.5,2.0],[-5.8,0.5,1.2],[-5.5,-1.5,0.8]], 0.28), 'valve'),
      // Posterior left ventricular branch (LCx)
      ...tag(tube([[-4.0,-1.5,1.0],[-3.0,-3.5,-0.5],[-2.0,-5.5,-1.0]], 0.30), 'valve'),
      // Right coronary artery (RCA) — full course
      ...tag(tube([[1.5,5.0,3.5],[2.8,4.0,3.2],[3.8,3.0,2.8],[4.2,1.5,2.2],[4.0,0.0,1.8],[3.5,-1.5,1.5],[2.8,-3.0,1.2],[2.0,-5.0,0.8]], 0.45), 'valve'),
      // RCA acute marginals
      ...tag(tube([[4.2,1.5,2.2],[5.0,0.5,1.5],[5.2,-1.0,1.0],[4.5,-2.5,0.5]], 0.33), 'valve'),
      ...tag(tube([[3.5,-1.5,1.5],[4.5,-2.5,0.8],[4.5,-4.0,0.5]], 0.30), 'valve'),
      // Posterior descending artery (PDA from RCA)
      ...tag(tube([[2.0,-5.0,0.8],[1.0,-6.5,-1.0],[0.0,-7.5,-1.5],[-1.0,-7.0,-1.5]], 0.35), 'valve'),
      // Posterior lateral branches
      ...tag(tube([[2.0,-5.0,0.8],[0.5,-5.5,0.0],[-1.0,-5.5,-0.5]], 0.28), 'valve'),
      // Conus branch (RCA)
      ...tag(tube([[2.8,4.0,3.2],[2.0,5.0,3.8],[1.5,6.5,3.5]], 0.30), 'valve'),
      // SA node artery
      ...tag(tube([[2.8,4.0,3.2],[3.5,5.5,2.0],[3.0,6.5,1.0]], 0.25), 'valve'),

      // ── Valves — annular structures ───────────────────────────────────────
      // Aortic valve annulus
      ...tag(hollowCylinder(-1.2, 0, 5.0, 5.5, 1.8, 1.2), 'valve'),
      // Mitral valve annulus
      ...tag(hollowCylinder(-1.5, 0, 3.8, 4.2, 2.5, 1.8), 'valve'),
      // Pulmonic valve annulus
      ...tag(hollowCylinder(2.0, 0, 4.8, 5.2, 1.5, 1.0), 'valve'),
      // Tricuspid valve annulus
      ...tag(hollowCylinder(2.5, 0, 1.5, 2.0, 2.2, 1.5), 'valve'),

      // ── Pericardium — outer thin layer ────────────────────────────────────
      ...tag(noisyEllipsoid(0, 0, 0, 6.5, 8.5, 6.0, 0.05, 0.6), 'vessel'),
    ]),
    interior: [
      // Left ventricular cavity — dark red chamber
      { color: '#8b0000', voxels: unique(ellipsoid(-1.5, -2.0, 0, 2.5, 4.5, 2.0)) },
      // Right ventricular cavity — slightly lighter red
      { color: '#a01010', voxels: unique(ellipsoid(2.5, -0.5, 0.8, 1.8, 3.2, 1.8)) },
      // Left atrium — pink-red
      { color: '#b83040', voxels: unique(ellipsoid(-1.5, 4.5, -0.5, 2.2, 1.8, 2.0)) },
      // Right atrium — pink-red
      { color: '#b83040', voxels: unique(ellipsoid(3.0, 4.0, 0.2, 1.8, 1.8, 1.5)) },
      // Coronary arteries — bright yellow-orange
      { color: '#e8a020', voxels: unique([
        ...tube([[-0.5,5.0,3.8],[0.5,-0.5,3.5],[0.0,-5.5,2.0],[0.0,-7.0,1.0]], 0.35),
        ...tube([[1.5,5.0,3.5],[4.2,1.5,2.2],[2.0,-5.0,0.8]], 0.32),
      ]) },
    ],
  },

  // ══ THORACIC CONTINUED ══════════════════════════════════════════════════

  esophagus: {
    label: 'Esophagus',
    system: 'Thoracic',
    icon: '⌇',
    color: '#c06858',
    zones: { wall: '#c06858', mucosa: '#e08878', vessel: '#884848' },
    description: 'Adenocarcinoma & squamous cell carcinoma',
    voxels: unique([
      // Outer muscular wall
      ...tag(tube([[0,11,0],[0,8,0],[0,5,0],[-0.5,2,0],[-0.5,-1,0],[-0.5,-4,0],[-0.5,-7,0],[-0.5,-10,0]], 1.5), 'wall'),
      // Mucosal lining
      ...tag(tube([[0,11,0],[0,8,0],[0,5,0],[-0.5,2,0],[-0.5,-1,0],[-0.5,-4,0],[-0.5,-7,0],[-0.5,-10,0]], 0.9), 'mucosa'),
      // Cervical esophagus — slightly wider
      ...tag(noisyEllipsoid(0, 10.5, 0, 1.8, 2.0, 1.5, 0.10, 0.9), 'wall'),
      // GEJ (gastroesophageal junction)
      ...tag(noisyEllipsoid(-0.5, -10, 0, 2.0, 1.5, 1.8, 0.12, 0.8), 'wall'),
      // Phrenic ampulla
      ...tag(ellipsoid(-0.5, -9, 0, 1.8, 1.2, 1.5), 'wall'),
      // Submucosal plexus hints
      ...tag(tube([[0,8,0.5],[0,5,0.5],[-0.5,2,0.5],[-0.5,-1,0.5],[-0.5,-4,0.5]], 0.35), 'vessel'),
      ...tag(tube([[0,8,-0.5],[0,5,-0.5],[-0.5,2,-0.5],[-0.5,-1,-0.5],[-0.5,-4,-0.5]], 0.35), 'vessel'),
    ]),
  },

  thymus: {
    label: 'Thymus',
    system: 'Thoracic',
    icon: '✦',
    color: '#c8a8a0',
    zones: { cortex: '#c8a8a0', medulla: '#d4b8b0', lobule: '#b89890', vessel: '#906878' },
    description: 'Thymoma & thymic carcinoma',
    voxels: unique([
      // Right lobe — lobulated
      ...tag(noisyEllipsoid(-1.5, 0.5, 0, 2.0, 3.2, 1.5, 0.15, 0.9), 'cortex'),
      ...tag(noisyEllipsoid(-1.8, 1.5, 0.3, 1.6, 2.5, 1.2, 0.12, 1.0), 'cortex'),
      // Left lobe
      ...tag(noisyEllipsoid(1.5, 0.5, 0, 2.0, 3.2, 1.5, 0.15, 0.9), 'cortex'),
      ...tag(noisyEllipsoid(1.8, 1.5, 0.3, 1.6, 2.5, 1.2, 0.12, 1.0), 'cortex'),
      // Medullary cores
      ...tag(ellipsoid(-1.5, 0.5, 0, 1.2, 2.2, 0.9), 'medulla'),
      ...tag(ellipsoid(1.5, 0.5, 0, 1.2, 2.2, 0.9), 'medulla'),
      // Interlobular septa
      ...tag(tube([[-1.5,2.5,0],[-1.5,0.5,0],[-1.5,-1.5,0]], 0.3), 'lobule'),
      ...tag(tube([[1.5,2.5,0],[1.5,0.5,0],[1.5,-1.5,0]], 0.3), 'lobule'),
      // Thymic veins
      ...tag(tube([[-1.5,0,0],[0,-0.5,0],[1.5,0,0]], 0.4), 'vessel'),
      // Superior poles
      ...tag(ellipsoid(-1.0, 3.5, 0, 0.8, 1.2, 0.6), 'cortex'),
      ...tag(ellipsoid(1.0, 3.5, 0, 0.8, 1.2, 0.6), 'cortex'),
    ]),
  },

  // ══ ABDOMINAL ═══════════════════════════════════════════════════════════

  liver: {
    label: 'Liver',
    system: 'Abdominal',
    icon: '◈',
    color: '#7a2200',
    zones: { parenchyma: '#7a2200', leftLobe: '#6a1a00', vessel: '#4a1000', bile: '#5a7800' },
    description: 'Hepatocellular carcinoma & cholangiocarcinoma',
    voxels: unique([
      // ── Right lobe — massive dominant mass ───────────────────────────────
      ...tag(noisyEllipsoid(2.0, 0, 0, 9.0, 5.5, 5.5, 0.14, 0.65), 'parenchyma'),
      ...tag(noisyEllipsoid(2.5, 0.5, 0.5, 8.5, 5.0, 5.0, 0.12, 0.75), 'parenchyma'),
      ...tag(noisyEllipsoid(1.5, -0.5, -0.5, 8.0, 5.2, 5.2, 0.13, 0.85), 'parenchyma'),
      // Right lobe inferior extension
      ...tag(noisyEllipsoid(3.0, -4.5, 0, 6.0, 2.5, 4.0, 0.10, 0.70), 'parenchyma'),
      // Right lobe posterior dome (subphrenic)
      ...tag(ellipsoid(4.5, 3.0, -2.0, 4.5, 3.0, 3.5), 'parenchyma'),
      // Right lobe superior convexity
      ...tag(noisyEllipsoid(2.5, 4.5, 0, 5.5, 2.5, 4.5, 0.11, 0.70), 'parenchyma'),
      // Right lobe lateral bulge
      ...tag(noisyEllipsoid(8.0, 0.5, 0, 2.5, 4.0, 3.5, 0.15, 0.80), 'parenchyma'),
      // Segments VI and VII (posterior right)
      ...tag(noisyEllipsoid(6.5, -2.0, -2.0, 3.5, 3.5, 3.0, 0.12, 0.75), 'parenchyma'),
      // Segment V (anterior inferior right)
      ...tag(ellipsoid(4.0, -3.0, 2.0, 3.0, 2.5, 2.5), 'parenchyma'),
      // Segment VIII (anterior superior right)
      ...tag(ellipsoid(4.0, 3.0, 2.0, 3.0, 2.5, 2.5), 'parenchyma'),

      // ── Left lobe — wedge-shaped ─────────────────────────────────────────
      ...tag(noisyEllipsoid(-5.0, 1.0, 0.5, 4.8, 4.0, 3.8, 0.12, 0.70), 'leftLobe'),
      ...tag(noisyEllipsoid(-4.5, 0.5, 0.8, 4.5, 3.5, 3.5, 0.11, 0.80), 'leftLobe'),
      // Left lobe lateral extension
      ...tag(noisyEllipsoid(-8.0, 0.5, 0.5, 2.2, 3.0, 2.5, 0.13, 0.85), 'leftLobe'),
      // Left lobe inferior tip
      ...tag(ellipsoid(-7.0, -2.5, 0.5, 2.5, 2.0, 2.0), 'leftLobe'),
      // Segment II (superior left)
      ...tag(ellipsoid(-5.5, 2.5, 0, 2.5, 2.5, 2.0), 'leftLobe'),
      // Segment III (inferior left)
      ...tag(ellipsoid(-5.5, -1.5, 0.5, 2.5, 2.5, 2.0), 'leftLobe'),
      // Segment IV (quadrate lobe)
      ...tag(ellipsoid(-1.5, -1.0, 1.5, 2.5, 2.5, 2.5), 'leftLobe'),

      // ── Caudate lobe (segment I) ─────────────────────────────────────────
      ...tag(ellipsoid(0.5, 2.5, -3.5, 2.2, 2.5, 1.8), 'leftLobe'),
      ...tag(ellipsoid(2.5, 1.5, -3.5, 1.5, 1.5, 1.2), 'leftLobe'),

      // ── Portal vein system — 3 levels ────────────────────────────────────
      ...tag(tube([[0,-3.0,0],[0,-1.5,0],[1.5,0.5,0]], 1.1), 'vessel'),
      ...tag(tube([[1.5,0.5,0],[4.0,1.0,0],[7.0,0.5,0]], 0.85), 'vessel'),
      ...tag(tube([[1.5,0.5,0],[-1.0,1.0,0],[-4.0,1.5,0],[-7.0,1.0,0]], 0.80), 'vessel'),
      ...tag(tube([[4.0,1.0,0],[4.5,3.5,1.0],[4.0,5.5,1.5]], 0.6), 'vessel'),
      ...tag(tube([[5.5,0.8,0],[6.5,-1.5,-1.5],[6.0,-4.0,-2.0]], 0.6), 'vessel'),
      ...tag(tube([[-4.0,1.5,0],[-5.0,3.0,0],[-6.0,2.5,0]], 0.55), 'vessel'),
      ...tag(tube([[-1.0,1.0,0],[-1.5,3.0,1.0],[-1.0,4.5,1.5]], 0.50), 'vessel'),
      ...tag(tube([[4.5,3.5,1.0],[6.0,4.5,1.5],[7.5,3.5,1.5]], 0.40), 'vessel'),
      ...tag(tube([[4.5,3.5,1.0],[4.0,5.5,2.0],[3.5,7.0,2.0]], 0.38), 'vessel'),
      ...tag(tube([[6.5,-1.5,-1.5],[7.5,-2.0,-1.0],[8.5,-1.5,-0.5]], 0.38), 'vessel'),
      ...tag(tube([[6.5,-1.5,-1.5],[6.5,-3.5,-2.5],[6.0,-5.5,-2.5]], 0.36), 'vessel'),
      ...tag(tube([[-5.0,3.0,0],[-6.5,3.5,0.5],[-8.0,2.5,0.5]], 0.38), 'vessel'),
      ...tag(tube([[-5.0,3.0,0],[-5.5,4.5,0],[-5.0,5.5,0]], 0.35), 'vessel'),

      // ── Hepatic veins draining to IVC ────────────────────────────────────
      ...tag(tube([[7.5,2.5,0.5],[5.5,4.0,0.5],[3.0,5.5,0],[0.5,6.0,0]], 0.75), 'vessel'),
      ...tag(tube([[1.5,3.5,1.0],[1.0,5.0,0.5],[0.5,6.0,0]], 0.65), 'vessel'),
      ...tag(tube([[-5.5,3.5,0.5],[-3.0,4.5,0.5],[0.5,6.0,0]], 0.65), 'vessel'),
      ...tag(cylinder(0.5, -3.0, 3.5, 7.0, 0.9), 'vessel'),
      ...tag(tube([[0.5,6.0,0],[0.5,7.5,0]], 1.1), 'vessel'),
      ...tag(tube([[7.5,2.5,0.5],[8.0,0.5,0],[8.5,-1.5,-0.5]], 0.50), 'vessel'),
      ...tag(tube([[5.5,4.0,0.5],[6.5,5.0,0],[7.0,5.5,-0.5]], 0.45), 'vessel'),
      ...tag(tube([[-5.5,3.5,0.5],[-7.0,4.0,0],[-8.5,3.5,-0.5]], 0.45), 'vessel'),
      ...tag(tube([[-5.5,3.5,0.5],[-6.0,5.0,0],[-6.5,5.5,0]], 0.42), 'vessel'),

      // ── Bile duct system ──────────────────────────────────────────────────
      ...tag(ellipsoid(5.0, -3.0, 2.5, 1.5, 3.0, 1.2), 'bile'),
      ...tag(tube([[5.0,-1.5,2.2],[3.0,-1.5,1.5],[1.5,-2.0,0.8]], 0.45), 'bile'),
      ...tag(tube([[4.5,1.0,0.5],[2.5,0,0.5],[1.5,-1.5,0.5]], 0.45), 'bile'),
      ...tag(tube([[-4.0,1.5,0.5],[-2.0,0.5,0.5],[1.5,-1.5,0.5]], 0.45), 'bile'),
      ...tag(tube([[1.5,-1.5,0.5],[1.0,-3.0,0.5]], 0.50), 'bile'),
      ...tag(tube([[1.0,-3.0,0.5],[0.5,-5.5,0.5],[0,-7.0,0.5]], 0.48), 'bile'),
      ...tag(tube([[4.5,3.5,1.0],[4.0,2.5,0.8],[4.5,1.0,0.5]], 0.30), 'bile'),
      ...tag(tube([[6.0,4.5,1.5],[5.5,3.0,1.0],[4.5,1.0,0.5]], 0.28), 'bile'),
      ...tag(tube([[-5.5,3.5,0.5],[-4.0,2.0,0.5],[-4.0,1.5,0.5]], 0.30), 'bile'),
    ]),
  },

  gallbladder: {
    label: 'Gallbladder',
    system: 'Abdominal',
    icon: '◉',
    color: '#4a7820',
    zones: { wall: '#4a7820', bile: '#2a5a10', duct: '#3a6818', mucosa: '#6a9838' },
    description: 'Gallbladder carcinoma & biliary tract cancer',
    voxels: unique([
      ...tag(noisyEllipsoid(0, 0, 0, 1.5, 3.2, 1.5, 0.12, 0.8), 'wall'),
      ...tag(ellipsoid(0, 0, 0, 1.3, 3.0, 1.3), 'wall'),
      ...tag(sphere(0, -3.0, 0, 1.2), 'wall'),
      ...tag(noisyEllipsoid(0, 2.5, 0.3, 1.2, 1.2, 1.0, 0.15, 1.0), 'wall'),
      ...tag(ellipsoid(0, 0, 0, 0.9, 2.6, 0.9), 'bile'),
      ...tag(sphere(0, -2.8, 0, 0.7), 'bile'),
      ...tag(tube([[0,-2.5,0],[0,-1.0,0],[0,1.5,0],[0,2.5,0]], 0.4), 'mucosa'),
      ...tag(tube([[0.5,-2.0,0.3],[0.5,0,0.3],[0.5,2.0,0.3]], 0.35), 'mucosa'),
      ...tag(tube([[-0.5,-2.0,-0.3],[-0.5,0,-0.3],[-0.5,2.0,-0.3]], 0.35), 'mucosa'),
      ...tag(cylinder(0, 0, 3.5, 5.5, 0.65), 'duct'),
      ...tag(noisyEllipsoid(0, 4.2, 0, 0.7, 1.0, 0.7, 0.20, 1.5), 'duct'),
    ]),
  },

  pancreas: {
    label: 'Pancreas',
    system: 'Abdominal',
    icon: '∿',
    color: '#e0b870',
    zones: { head: '#e0b870', body: '#d4aa60', tail: '#c89850', duct: '#b88040', vessel: '#cc4444' },
    description: 'Pancreatic ductal adenocarcinoma (PDAC)',
    voxels: unique([
      // ── Head ─────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-3.5, 0, 0, 2.8, 2.8, 2.2, 0.15, 0.85), 'head'),
      ...tag(noisyEllipsoid(-3.2, 0.5, 0.3, 2.5, 2.5, 2.0, 0.12, 1.00), 'head'),
      ...tag(ellipsoid(-3.5, -0.5, 0, 2.5, 2.5, 2.0), 'head'),
      // Uncinate process
      ...tag(noisyEllipsoid(-4.0, -2.0, 0, 2.0, 1.8, 1.5, 0.12, 0.90), 'head'),
      ...tag(ellipsoid(-4.5, -2.8, 0.3, 1.5, 1.5, 1.2), 'head'),
      ...tag(noisyEllipsoid(-2.2, 0, 1.0, 1.2, 2.5, 0.8, 0.10, 1.0), 'head'),

      // ── Body ─────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0.5, 1.0, 0, 2.5, 1.8, 1.6, 0.13, 0.85), 'body'),
      ...tag(noisyEllipsoid(0.5, 0.8, 0.2, 2.2, 1.6, 1.4, 0.11, 1.0), 'body'),
      ...tag(ellipsoid(0.5, 1.8, 0, 2.0, 1.2, 1.2), 'body'),

      // ── Tail ─────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(4.5, 1.5, 0, 2.5, 1.6, 1.3, 0.13, 0.85), 'tail'),
      ...tag(noisyEllipsoid(5.5, 1.8, 0.2, 1.8, 1.3, 1.0, 0.15, 1.0), 'tail'),
      ...tag(ellipsoid(6.5, 2.0, 0, 1.2, 1.0, 0.8), 'tail'),
      ...tag(noisyEllipsoid(7.5, 2.2, 0, 1.0, 0.8, 0.7, 0.18, 1.2), 'tail'),

      // ── Ductal system ─────────────────────────────────────────────────────
      ...tag(tube([[-4.5,0,0],[-3.0,0.2,0],[-1.5,0.5,0],[0,0.8,0],[1.5,1.0,0],[3.0,1.2,0],[4.5,1.3,0],[6.0,1.5,0],[7.0,1.8,0]], 0.45), 'duct'),
      ...tag(tube([[-3.5,0,0],[-3.0,1.5,0],[-2.5,2.5,0],[-2.0,3.0,0]], 0.35), 'duct'),
      ...tag(tube([[0,0.8,0],[0.5,2.5,0],[0.5,3.5,0]], 0.30), 'duct'),
      ...tag(tube([[0,0.8,0],[0.2,-0.5,0],[0,-1.5,0]], 0.28), 'duct'),
      ...tag(tube([[-3.0,0.2,0],[-3.0,1.5,0.5],[-3.0,2.5,0.8]], 0.25), 'duct'),
      ...tag(tube([[3.0,1.2,0],[3.5,2.5,0],[4.0,3.0,0]], 0.25), 'duct'),

      // ── Vascular supply ───────────────────────────────────────────────────
      ...tag(tube([[-2.5,3.0,1.5],[-3.0,1.0,1.5],[-3.5,-1.5,1.5],[-3.5,-3.5,1.5]], 0.38), 'vessel'),
      ...tag(tube([[-3.5,-3.5,1.5],[-3.0,-4.5,1.0],[-2.0,-5.0,0.5]], 0.33), 'vessel'),
      ...tag(tube([[-3.5,2.5,0],[-1.5,2.5,0],[0.5,2.5,0],[2.5,2.5,0],[4.5,2.5,0],[6.5,2.5,0]], 0.40), 'vessel'),
      ...tag(tube([[-1.5,2.5,0],[-1.5,1.5,0],[-1.5,0.5,0]], 0.28), 'vessel'),
      ...tag(tube([[2.5,2.5,0],[2.5,1.5,0],[2.5,0.5,0]], 0.28), 'vessel'),
      ...tag(tube([[4.5,2.5,0],[4.5,1.5,0],[4.5,0.8,0]], 0.26), 'vessel'),
    ]),
  },

  stomach: {
    label: 'Stomach',
    system: 'Abdominal',
    icon: '∪',
    color: '#c89060',
    zones: { fundus: '#c89060', body: '#b87850', pylorus: '#a86840', mucosa: '#d4a878', vessel: '#884428' },
    description: 'Gastric adenocarcinoma & GIST',
    voxels: unique([
      // ── Fundus ────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-2.0, 3.5, 0, 3.2, 3.0, 2.8, 0.15, 0.80), 'fundus'),
      ...tag(noisyEllipsoid(-2.2, 4.0, 0.5, 2.8, 2.5, 2.5, 0.13, 0.95), 'fundus'),
      ...tag(ellipsoid(-1.5, 5.5, 0, 2.0, 1.8, 1.8), 'fundus'),

      // ── Body ─────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(1.0, 0.5, 0, 3.8, 3.5, 3.0, 0.13, 0.80), 'body'),
      ...tag(noisyEllipsoid(0.8, 0, 0.3, 3.5, 3.2, 2.8, 0.11, 0.90), 'body'),
      ...tag(noisyEllipsoid(0, -2.5, 0, 3.5, 2.0, 2.8, 0.15, 0.85), 'body'),
      ...tag(ellipsoid(-0.5, -3.5, 0, 2.8, 1.5, 2.2), 'body'),
      ...tag(ellipsoid(0, 2.5, -1.0, 2.5, 2.0, 1.5), 'fundus'),
      ...tag(ellipsoid(0.5, 0, -2.0, 3.5, 3.5, 1.5), 'body'),
      ...tag(ellipsoid(0.5, 0.5, 2.5, 3.5, 3.5, 1.2), 'body'),

      // ── Antrum & pylorus ──────────────────────────────────────────────────
      ...tag(noisyEllipsoid(4.5, -1.5, 0, 2.5, 2.2, 2.0, 0.12, 0.85), 'pylorus'),
      ...tag(ellipsoid(5.5, -2.0, 0, 2.0, 1.8, 1.6), 'pylorus'),
      ...tag(cylinder(7.5, 0, -2.2, -0.5, 1.1), 'pylorus'),
      ...tag(hollowCylinder(7.5, 0, -0.5, 0, 1.8, 1.0), 'pylorus'),

      // ── Cardia inlet ──────────────────────────────────────────────────────
      ...tag(cylinder(-3.5, 0, 3, 5.5, 1.1), 'mucosa'),
      ...tag(noisyEllipsoid(-3.5, 4.5, 0, 1.5, 1.5, 1.3, 0.12, 1.0), 'mucosa'),

      // ── Rugae (mucosal folds) ─────────────────────────────────────────────
      ...tag(tube([[-2.5,3.0,0.8],[0,1.0,0.8],[2.5,-0.5,0.8],[5.0,-1.5,0.8]], 0.5), 'mucosa'),
      ...tag(tube([[-2.5,3.0,-0.8],[0,1.0,-0.8],[2.5,-0.5,-0.8],[5.0,-1.5,-0.8]], 0.5), 'mucosa'),
      ...tag(tube([[-2.0,2.5,0],[0,0.5,0],[2.5,-1.0,0],[5.0,-2.0,0]], 0.45), 'mucosa'),
      ...tag(tube([[-2.5,3.0,1.5],[0,1.0,1.5],[2.5,-0.5,1.5]], 0.45), 'mucosa'),
      ...tag(tube([[-2.5,3.0,-1.5],[0,1.0,-1.5],[2.5,-0.5,-1.5]], 0.45), 'mucosa'),
      ...tag(tube([[-3.5,3.5,1.0],[-2.0,4.5,0],[-0.5,4.8,-1.0],[-1.5,3.5,-1.5],[-3.0,2.8,-0.8],[-3.8,2.5,0.5]], 0.40), 'mucosa'),

      // ── Gastric vasculature ───────────────────────────────────────────────
      ...tag(tube([[-3.5,5.0,0],[-2.5,3.5,0],[-1.0,2.0,0],[0.5,0.5,0],[2.0,-1.0,0],[4.0,-2.0,0]], 0.40), 'vessel'),
      ...tag(tube([[6.0,-2.0,0],[4.0,-3.5,0],[2.0,-4.5,0],[0,-4.5,0],[-2.0,-3.5,0]], 0.38), 'vessel'),
      ...tag(tube([[-4.5,4.0,0],[-3.0,4.5,0],[-1.5,5.0,0]], 0.32), 'vessel'),
      ...tag(tube([[-4.5,3.5,0.5],[-3.0,4.0,0.5],[-1.5,4.5,0.5]], 0.30), 'vessel'),
    ]),
  },

  smallintestine: {
    label: 'Small Intestine',
    system: 'Abdominal',
    icon: '≋',
    color: '#d4a878',
    zones: { jejunum: '#d4a878', ileum: '#c89860', mucosa: '#e4b890', vessel: '#884428' },
    description: 'Carcinoid tumors & small bowel adenocarcinoma',
    voxels: unique([
      ...tag(tube([[3,-2,0],[2,0,0],[0,1.5,0],[-2,1,0],[-3,-1,0],[-2,-3,0],[0,-4,0],[2,-3,0],[3,-1,1],[2,1,1],[0,2,1],[-2,1,1],[-3,-1,1],[-2,-3,1],[0,-4,1],[2,-3,1]], 1.0), 'jejunum'),
      ...tag(tube([[3,-2,0],[2,0,0],[0,1.5,0],[-2,1,0],[-3,-1,0],[-2,-3,0],[0,-4,0],[2,-3,0]], 0.6), 'mucosa'),
      ...tag(tube([[3,-1,2],[2,1,2],[0,2,2],[-2,1,2],[-3,-1,2],[-2,-3,2],[0,-4,2],[2,-3,2],[3,-1,3],[2,1,3],[0,2,3],[-2,1,3],[-3,-1,3],[-2,-3,3],[0,-4,3],[2,-3,3]], 0.90), 'ileum'),
      ...tag(tube([[3,-1,2],[2,1,2],[0,2,2],[-2,1,2],[-3,-1,2],[-2,-3,2],[0,-4,2],[2,-3,2]], 0.55), 'mucosa'),
      ...tag(noisyEllipsoid(3.5,-3.5,3, 1.8,2.0,1.5, 0.12,0.9), 'ileum'),
      ...tag(tube([[0,-1,1.5],[0,0,0.5],[0,1,-0.5]], 0.55), 'vessel'),
      ...tag(tube([[0,-1,1.5],[1.5,-2,1.5],[2.5,-3.5,1.5]], 0.40), 'vessel'),
      ...tag(tube([[0,-1,1.5],[-1.5,-2,1.5],[-2.5,-3.5,1.5]], 0.40), 'vessel'),
      ...tag(tube([[0,-1,1.5],[0.8,0.5,1.5],[1.5,1.5,1.5]], 0.38), 'vessel'),
      ...tag(tube([[0,-1,1.5],[-0.8,0.5,1.5],[-1.5,1.5,1.5]], 0.38), 'vessel'),
    ]),
  },

  colon: {
    label: 'Colon',
    system: 'Abdominal',
    icon: '⊏',
    color: '#a87040',
    zones: { wall: '#a87040', mucosa: '#c89060', haustra: '#907030', vessel: '#884428' },
    description: 'Colorectal adenocarcinoma',
    voxels: unique([
      // ── Cecum ────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-5.5, -6.0, 0, 2.5, 2.5, 2.0, 0.15, 0.80), 'wall'),
      ...tag(tube([[-5.5,-8.0,0],[-5.0,-10.0,0.5],[-4.5,-11.5,1.0]], 0.5), 'mucosa'),
      // ── Ascending colon ───────────────────────────────────────────────────
      ...tag(tube([[-5.5,-5.0,0],[-5.5,-2.0,0],[-5.5,1.0,0],[-5.5,4.0,0],[-5.5,6.0,0]], 2.0), 'wall'),
      ...tag(sphere(-7.0,-3.5,0, 1.5), 'haustra'),
      ...tag(sphere(-7.0,-0.5,0, 1.5), 'haustra'),
      ...tag(sphere(-7.0,2.5,0, 1.5), 'haustra'),
      ...tag(sphere(-7.0,5.0,0, 1.4), 'haustra'),
      ...tag(sphere(-3.5,-3.5,0, 1.3), 'haustra'),
      ...tag(sphere(-3.5,-0.5,0, 1.3), 'haustra'),
      ...tag(sphere(-3.5,2.5,0, 1.3), 'haustra'),
      // ── Hepatic flexure ───────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-3.5, 6.5, 0, 2.8, 2.5, 2.2, 0.15, 0.80), 'wall'),
      ...tag(tube([[-5.5,6.0,0],[-4.0,7.5,0],[-2.0,7.5,0],[0,7.0,0]], 1.9), 'wall'),
      // ── Transverse colon ──────────────────────────────────────────────────
      ...tag(tube([[0,7.0,0],[2.0,7.5,0],[4.0,7.5,0],[5.5,6.5,0]], 2.0), 'wall'),
      ...tag(sphere(-1.5,8.5,0, 1.5), 'haustra'),
      ...tag(sphere(1.0,8.8,0, 1.5), 'haustra'),
      ...tag(sphere(3.5,8.5,0, 1.5), 'haustra'),
      ...tag(sphere(-1.5,5.5,0, 1.2), 'haustra'),
      ...tag(sphere(1.0,5.2,0, 1.2), 'haustra'),
      ...tag(sphere(3.5,5.5,0, 1.2), 'haustra'),
      ...tag(tube([[-5.5,6.0,0.8],[0,7.0,0.8],[5.5,6.5,0.8]], 0.5), 'mucosa'),
      // ── Splenic flexure ───────────────────────────────────────────────────
      ...tag(noisyEllipsoid(4.0, 6.8, 0, 2.8, 2.5, 2.2, 0.15, 0.80), 'wall'),
      // ── Descending colon ──────────────────────────────────────────────────
      ...tag(tube([[5.5,6.0,0],[5.5,3.0,0],[5.5,0,0],[5.5,-3.0,0],[5.5,-5.5,0]], 1.9), 'wall'),
      ...tag(sphere(7.0,4.5,0, 1.4), 'haustra'),
      ...tag(sphere(7.0,1.5,0, 1.4), 'haustra'),
      ...tag(sphere(7.0,-1.5,0, 1.4), 'haustra'),
      ...tag(sphere(7.0,-4.0,0, 1.3), 'haustra'),
      // ── Sigmoid colon ─────────────────────────────────────────────────────
      ...tag(tube([[5.5,-5.5,0],[4.0,-7.0,0],[2.0,-8.0,0],[0,-8.0,0],[-1.5,-7.5,0],[-2.0,-6.0,0],[-1.0,-5.0,0],[0,-4.5,0]], 1.8), 'wall'),
      ...tag(sphere(3.5,-8.8,0, 1.3), 'haustra'),
      ...tag(sphere(0.5,-9.0,0, 1.3), 'haustra'),
      ...tag(sphere(-2.5,-7.0,0, 1.2), 'haustra'),
      // ── Rectum ────────────────────────────────────────────────────────────
      ...tag(tube([[0,-4.5,0],[0,-3.5,-1.0],[0,-2.0,-2.5],[0,0,-3.5]], 2.0), 'wall'),
      ...tag(ellipsoid(0,-1.0,-3.5, 2.2,2.0,1.5), 'wall'),
      // Mucosal lining
      ...tag(tube([[-5.5,-5.0,0],[-5.5,6.0,0]], 1.2), 'mucosa'),
      ...tag(tube([[5.5,6.0,0],[5.5,-5.5,0]], 1.2), 'mucosa'),
      ...tag(tube([[-5.5,6.0,0],[0,7.0,0],[5.5,6.5,0]], 1.2), 'mucosa'),
      // Taenia coli
      ...tag(tube([[-5.5,-5.0,1.5],[-5.5,6.0,1.5]], 0.4), 'mucosa'),
      ...tag(tube([[-5.5,-5.0,-1.5],[-5.5,6.0,-1.5]], 0.4), 'mucosa'),
      // Mesenteric vessels
      ...tag(tube([[0,0,0],[0,2.5,0],[0,5.0,0],[0,7.0,0]], 0.50), 'vessel'),
      ...tag(tube([[0,0,0],[-2.5,-2.0,0],[-5.0,-4.0,0]], 0.45), 'vessel'),
      ...tag(tube([[0,0,0],[2.5,-2.0,0],[5.0,-4.0,0]], 0.45), 'vessel'),
    ]),
    interior: [
      // Intestinal lumen — pale tan/cream
      { color: '#f0e0b8', voxels: unique([
        ...tube([[-5.5,-5.0,0],[-5.5,6.0,0]], 1.0),
        ...tube([[-5.5,6.0,0],[0,7.0,0],[5.5,6.5,0]], 1.0),
        ...tube([[5.5,6.0,0],[5.5,-5.5,0]], 1.0),
        ...tube([[5.5,-5.5,0],[0,-8.0,0],[-2.0,-6.0,0],[0,-4.5,0]], 1.0),
        ...tube([[0,-4.5,0],[0,0,-3.5]], 1.2),
      ]) },
      // Mucosal folds — slightly darker tan
      { color: '#d4b880', voxels: unique([
        ...tube([[-5.5,-5.0,0],[-5.5,6.0,0]], 0.5),
        ...tube([[5.5,6.0,0],[5.5,-5.5,0]], 0.5),
      ]) },
    ],
  },

  spleen: {
    label: 'Spleen',
    system: 'Abdominal',
    icon: '◑',
    color: '#7a2858',
    zones: { capsule: '#7a2858', redPulp: '#5a1838', whitePulp: '#8a3868', hilum: '#4a1028', trabecula: '#6a2048' },
    description: 'Splenic lymphoma & metastases',
    voxels: unique([
      ...tag(noisyEllipsoid(0, 0, 0, 3.8, 3.2, 2.8, 0.18, 0.80), 'capsule'),
      ...tag(noisyEllipsoid(0.3, 0.2, 0, 3.5, 3.0, 2.6, 0.16, 0.95), 'capsule'),
      ...tag(noisyEllipsoid(-0.3, -0.2, 0.2, 3.3, 2.8, 2.5, 0.14, 1.10), 'capsule'),
      ...tag(ellipsoid(0, 1.5, -0.5, 3.0, 2.0, 2.5), 'capsule'),
      ...tag(noisyEllipsoid(-1.5, 0.5, 1.0, 2.5, 2.5, 1.8, 0.15, 0.90), 'capsule'),
      ...tag(ellipsoid(0.5, -1.5, -1.0, 2.8, 2.2, 2.0), 'capsule'),
      ...tag(noisyEllipsoid(0, 2.8, 0, 2.0, 1.2, 1.8, 0.15, 0.85), 'capsule'),
      ...tag(noisyEllipsoid(0, -2.8, 0, 1.8, 1.2, 1.6, 0.15, 0.85), 'capsule'),
      ...tag(ellipsoid(0, 0, 0, 2.8, 2.2, 2.0), 'redPulp'),
      ...tag(noisyEllipsoid(0, 0, 0, 2.5, 2.0, 1.8, 0.10, 1.0), 'redPulp'),
      ...tag(sphere(-1.0, 0.8, 0.5, 0.7), 'whitePulp'),
      ...tag(sphere(0.5, 0.5, -0.5, 0.7), 'whitePulp'),
      ...tag(sphere(1.0, -0.5, 0.8, 0.65), 'whitePulp'),
      ...tag(sphere(-0.5, -1.0, -0.5, 0.65), 'whitePulp'),
      ...tag(sphere(0.5, 1.2, 1.0, 0.60), 'whitePulp'),
      ...tag(sphere(-1.2, 0, -0.8, 0.60), 'whitePulp'),
      ...tag(sphere(0, -0.5, 1.2, 0.58), 'whitePulp'),
      ...tag(sphere(1.2, 0.8, -0.5, 0.58), 'whitePulp'),
      ...tag(tube([[0,2.5,0],[0,0,0],[0,-2.5,0]], 0.4), 'trabecula'),
      ...tag(tube([[-2.5,0,0],[0,0,0],[2.5,0,0]], 0.4), 'trabecula'),
      ...tag(tube([[0,0,-2.0],[0,0,0],[0,0,2.0]], 0.4), 'trabecula'),
      ...tag(tube([[-1.5,1.5,0],[0,0,0],[1.5,-1.5,0]], 0.35), 'trabecula'),
      ...tag(tube([[-1.5,-1.5,0],[0,0,0],[1.5,1.5,0]], 0.35), 'trabecula'),
      ...tag(tube([[0,1.5,1.5],[0,0,0],[0,-1.5,-1.5]], 0.32), 'trabecula'),
      ...tag(sphere(1.2, 0, 0.8, 1.1), 'hilum'),
      ...tag(sphere(1.5, -0.5, 0.5, 0.9), 'hilum'),
      ...tag(tube([[1.2,0,0.8],[2.0,0.5,0.5],[3.0,0,0.5],[3.5,-0.5,0]], 0.5), 'hilum'),
      ...tag(tube([[3.0,0,0.5],[3.5,1.0,0.5],[4.0,1.5,0]], 0.42), 'hilum'),
      ...tag(tube([[1.5,-0.5,0.5],[2.5,-0.8,0],[3.5,-1.0,0],[4.5,-1.0,0]], 0.55), 'hilum'),
      ...tag(tube([[1.2,0,0.8],[0.5,1.0,0.5],[-0.5,1.5,0.2]], 0.35), 'hilum'),
      ...tag(tube([[1.2,0,0.8],[0.5,-1.0,0.5],[-0.5,-1.5,0.2]], 0.35), 'hilum'),
      ...tag(tube([[1.2,0,0.8],[0,0.5,1.0],[-1.0,0,1.5]], 0.32), 'hilum'),
    ]),
  },

  kidney: {
    label: 'Kidneys',
    system: 'Urological',
    icon: '⊕',
    color: '#aa3818',
    zones: { cortex: '#aa3818', medulla: '#7a2010', pelvis: '#e8c870', ureter: '#c09040', vessel: '#cc2020' },
    description: 'Renal cell carcinoma (clear cell, papillary)',
    voxels: unique([
      // ── Right kidney ─────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-6.5, 0, 0, 3.2, 6.0, 3.0, 0.15, 0.80), 'cortex'),
      ...tag(noisyEllipsoid(-6.3, 0.3, 0, 3.0, 5.8, 2.8, 0.13, 0.95), 'cortex'),
      ...tag(noisyEllipsoid(-6.5, 5.5, 0, 2.5, 2.0, 2.5, 0.15, 0.90), 'cortex'),
      ...tag(noisyEllipsoid(-6.5, -5.5, 0, 2.5, 2.0, 2.5, 0.15, 0.90), 'cortex'),
      // Renal columns (cortex dipping between pyramids)
      ...tag(ellipsoid(-6.2, 3.0, 0, 1.0, 1.2, 1.0), 'cortex'),
      ...tag(ellipsoid(-6.2, -3.0, 0, 1.0, 1.2, 1.0), 'cortex'),
      ...tag(ellipsoid(-6.5, 1.5, 1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(-6.5, -1.5, 1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(-6.5, 1.5, -1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(-6.5, -1.5, -1.2, 0.8, 1.0, 0.8), 'cortex'),
      // Medullary pyramids (10 per kidney)
      ...tag(ellipsoid(-6.0, 4.0, 0, 1.0, 1.8, 1.0), 'medulla'),
      ...tag(ellipsoid(-6.0, 2.2, 1.0, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(-6.0, 2.2, -1.0, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(-6.0, 0.3, 1.5, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(-6.0, 0.3, -1.5, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(-6.0, -1.5, 1.2, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(-6.0, -1.5, -1.2, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(-6.0, -3.2, 0.8, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(-6.0, -3.2, -0.8, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(-6.0, -4.5, 0, 1.0, 1.8, 1.0), 'medulla'),
      // Renal sinus / pelvis
      ...tag(ellipsoid(-4.8, 0.5, 0, 1.8, 3.0, 1.5), 'pelvis'),
      ...tag(noisyEllipsoid(-4.5, 0.5, 0, 1.5, 2.8, 1.3, 0.10, 1.0), 'pelvis'),
      // Major calyces
      ...tag(sphere(-5.5, 3.5, 0, 1.0), 'pelvis'),
      ...tag(sphere(-5.5, 0.5, 0, 0.9), 'pelvis'),
      ...tag(sphere(-5.5, -3.5, 0, 1.0), 'pelvis'),
      // Minor calyces
      ...tag(sphere(-6.2, 4.2, 0.8, 0.65), 'pelvis'),
      ...tag(sphere(-6.2, 4.2, -0.8, 0.65), 'pelvis'),
      ...tag(sphere(-6.2, 3.0, 0, 0.65), 'pelvis'),
      ...tag(sphere(-6.2, 0.5, 1.2, 0.60), 'pelvis'),
      ...tag(sphere(-6.2, 0.5, -1.2, 0.60), 'pelvis'),
      ...tag(sphere(-6.2, -2.8, 0.8, 0.65), 'pelvis'),
      ...tag(sphere(-6.2, -2.8, -0.8, 0.65), 'pelvis'),
      ...tag(sphere(-6.2, -4.5, 0, 0.65), 'pelvis'),
      // Infundibula
      ...tag(tube([[-6.2,4.2,0],[-5.5,3.5,0],[-4.8,1.5,0]], 0.42), 'pelvis'),
      ...tag(tube([[-6.2,0.5,0],[-5.5,0.5,0],[-4.8,0.5,0]], 0.42), 'pelvis'),
      ...tag(tube([[-6.2,-4.2,0],[-5.5,-3.5,0],[-4.8,-1.5,0]], 0.42), 'pelvis'),
      // Ureter right
      ...tag(tube([[-4.8,0.5,0],[-5.0,-2.5,0],[-5.0,-6.0,0],[-4.5,-9.5,0]], 0.55), 'ureter'),
      // Renal artery + vein
      ...tag(tube([[-4.0,0.5,0],[-4.8,0.5,0]], 0.65), 'vessel'),
      ...tag(tube([[-4.0,-0.2,0],[-4.8,-0.2,0]], 0.70), 'vessel'),
      // Interlobar arteries
      ...tag(tube([[-4.8,0.5,0],[-5.5,2.5,0.5],[-6.0,4.0,0.5]], 0.38), 'vessel'),
      ...tag(tube([[-4.8,0.5,0],[-5.5,-1.5,0.5],[-6.0,-3.5,0.5]], 0.38), 'vessel'),
      ...tag(tube([[-4.8,0.5,0],[-5.5,0.5,1.5],[-6.0,0.5,2.5]], 0.35), 'vessel'),
      ...tag(tube([[-4.8,0.5,0],[-5.5,0.5,-1.5],[-6.0,0.5,-2.5]], 0.35), 'vessel'),
      // Arcuate arteries
      ...tag(tube([[-5.5,4.0,0.5],[-5.8,3.5,1.2],[-6.0,2.5,1.5]], 0.28), 'vessel'),
      ...tag(tube([[-5.5,4.0,0.5],[-5.8,4.5,1.0],[-6.0,5.0,0.8]], 0.28), 'vessel'),
      ...tag(tube([[-5.5,-3.5,0.5],[-5.8,-4.0,1.2],[-6.0,-4.5,1.5]], 0.28), 'vessel'),
      // Adrenal cap right
      ...tag(noisyEllipsoid(-6.5, 6.5, 0, 1.8, 1.2, 1.2, 0.12, 0.9), 'cortex'),
      ...tag(sphere(-6.5, 6.5, 0, 0.7), 'medulla'),

      // ── Left kidney (slightly higher) ────────────────────────────────────
      ...tag(noisyEllipsoid(6.5, 0.5, 0, 3.2, 6.0, 3.0, 0.15, 0.80), 'cortex'),
      ...tag(noisyEllipsoid(6.3, 0.8, 0, 3.0, 5.8, 2.8, 0.13, 0.95), 'cortex'),
      ...tag(noisyEllipsoid(6.5, 6.0, 0, 2.5, 2.0, 2.5, 0.15, 0.90), 'cortex'),
      ...tag(noisyEllipsoid(6.5, -5.0, 0, 2.5, 2.0, 2.5, 0.15, 0.90), 'cortex'),
      ...tag(ellipsoid(6.2, 3.5, 0, 1.0, 1.2, 1.0), 'cortex'),
      ...tag(ellipsoid(6.2, -2.5, 0, 1.0, 1.2, 1.0), 'cortex'),
      ...tag(ellipsoid(6.5, 2.0, 1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(6.5, -1.0, 1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(6.5, 2.0, -1.2, 0.8, 1.0, 0.8), 'cortex'),
      ...tag(ellipsoid(6.5, -1.0, -1.2, 0.8, 1.0, 0.8), 'cortex'),
      // Left medullary pyramids
      ...tag(ellipsoid(6.0, 4.5, 0, 1.0, 1.8, 1.0), 'medulla'),
      ...tag(ellipsoid(6.0, 2.7, 1.0, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(6.0, 2.7, -1.0, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(6.0, 0.8, 1.5, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(6.0, 0.8, -1.5, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(6.0, -1.0, 1.2, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(6.0, -1.0, -1.2, 0.8, 1.5, 0.8), 'medulla'),
      ...tag(ellipsoid(6.0, -2.7, 0.8, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(6.0, -2.7, -0.8, 0.9, 1.6, 0.9), 'medulla'),
      ...tag(ellipsoid(6.0, -4.0, 0, 1.0, 1.8, 1.0), 'medulla'),
      // Left renal pelvis & calyces
      ...tag(ellipsoid(4.8, 1.0, 0, 1.8, 3.0, 1.5), 'pelvis'),
      ...tag(sphere(5.5, 4.0, 0, 1.0), 'pelvis'),
      ...tag(sphere(5.5, 1.0, 0, 0.9), 'pelvis'),
      ...tag(sphere(5.5, -3.0, 0, 1.0), 'pelvis'),
      ...tag(sphere(6.2, 4.7, 0.8, 0.65), 'pelvis'),
      ...tag(sphere(6.2, 4.7, -0.8, 0.65), 'pelvis'),
      ...tag(sphere(6.2, 3.5, 0, 0.65), 'pelvis'),
      ...tag(sphere(6.2, 1.0, 1.2, 0.60), 'pelvis'),
      ...tag(sphere(6.2, 1.0, -1.2, 0.60), 'pelvis'),
      ...tag(sphere(6.2, -2.3, 0.8, 0.65), 'pelvis'),
      ...tag(sphere(6.2, -2.3, -0.8, 0.65), 'pelvis'),
      ...tag(sphere(6.2, -4.0, 0, 0.65), 'pelvis'),
      ...tag(tube([[6.2,4.7,0],[5.5,4.0,0],[4.8,2.0,0]], 0.42), 'pelvis'),
      ...tag(tube([[6.2,1.0,0],[5.5,1.0,0],[4.8,1.0,0]], 0.42), 'pelvis'),
      ...tag(tube([[6.2,-3.7,0],[5.5,-3.0,0],[4.8,-1.0,0]], 0.42), 'pelvis'),
      ...tag(tube([[4.8,1.0,0],[5.0,-2.0,0],[5.0,-6.0,0],[4.5,-9.5,0]], 0.55), 'ureter'),
      // Left renal vessels
      ...tag(tube([[4.0,1.0,0],[4.8,1.0,0]], 0.65), 'vessel'),
      ...tag(tube([[4.0,0.3,0],[4.8,0.3,0]], 0.70), 'vessel'),
      ...tag(tube([[4.8,1.0,0],[5.5,3.0,0.5],[6.0,4.5,0.5]], 0.38), 'vessel'),
      ...tag(tube([[4.8,1.0,0],[5.5,-1.0,0.5],[6.0,-3.0,0.5]], 0.38), 'vessel'),
      ...tag(tube([[4.8,1.0,0],[5.5,1.0,1.5],[6.0,1.0,2.5]], 0.35), 'vessel'),
      ...tag(tube([[4.8,1.0,0],[5.5,1.0,-1.5],[6.0,1.0,-2.5]], 0.35), 'vessel'),
      ...tag(tube([[5.5,4.5,0.5],[5.8,4.0,1.2],[6.0,3.0,1.5]], 0.28), 'vessel'),
      ...tag(tube([[5.5,-3.0,0.5],[5.8,-3.5,1.2],[6.0,-4.0,1.5]], 0.28), 'vessel'),
      // Left adrenal cap
      ...tag(noisyEllipsoid(6.5, 7.0, 0, 1.8, 1.2, 1.2, 0.12, 0.9), 'cortex'),
      ...tag(sphere(6.5, 7.0, 0, 0.7), 'medulla'),
    ]),
    interior: [
      // Renal sinus / collecting system — bright golden-yellow
      { color: '#f0c840', voxels: unique([
        ...ellipsoid(-4.8, 0.5, 0, 1.5, 2.5, 1.2),
        ...sphere(-5.5, 3.5, 0, 0.8), ...sphere(-5.5, -3.5, 0, 0.8),
        ...ellipsoid(4.8, 1.0, 0, 1.5, 2.5, 1.2),
        ...sphere(5.5, 4.0, 0, 0.8), ...sphere(5.5, -3.0, 0, 0.8),
      ]) },
      // Medullary pyramids — dark maroon
      { color: '#6a1808', voxels: unique([
        ...ellipsoid(-6.0, 4.0, 0, 0.8, 1.5, 0.8),
        ...ellipsoid(-6.0, 0.3, 1.2, 0.7, 1.2, 0.7),
        ...ellipsoid(-6.0, -4.5, 0, 0.8, 1.5, 0.8),
        ...ellipsoid(6.0, 4.5, 0, 0.8, 1.5, 0.8),
        ...ellipsoid(6.0, 0.8, 1.2, 0.7, 1.2, 0.7),
        ...ellipsoid(6.0, -4.0, 0, 0.8, 1.5, 0.8),
      ]) },
      // Ureters — orange
      { color: '#e07818', voxels: unique([
        ...tube([[-4.8,0.5,0],[-5.0,-6.0,0],[-4.5,-9.5,0]], 0.42),
        ...tube([[4.8,1.0,0],[5.0,-6.0,0],[4.5,-9.5,0]], 0.42),
      ]) },
    ],
  },

  // ══ UROLOGICAL CONTINUED ════════════════════════════════════════════════

  bladder: {
    label: 'Bladder',
    system: 'Urological',
    icon: '▽',
    color: '#c8b840',
    zones: { detrusor: '#c8b840', mucosa: '#d4cc60', trigone: '#a89030', neck: '#908020' },
    description: 'Urothelial (transitional cell) carcinoma',
    voxels: unique([
      // Detrusor outer muscle layer
      ...tag(noisyEllipsoid(0, 0, 0, 4.2, 3.8, 3.8, 0.10, 0.70), 'detrusor'),
      ...tag(noisyEllipsoid(0, 0.2, 0, 4.0, 3.6, 3.6, 0.09, 0.85), 'detrusor'),
      // Dome (superior)
      ...tag(noisyEllipsoid(0, 3.5, 0, 3.2, 1.5, 3.0, 0.12, 0.80), 'detrusor'),
      // Posterior wall
      ...tag(ellipsoid(0, 0, -2.5, 3.8, 3.5, 1.5), 'detrusor'),
      // Mucosal lining (inner urothelium)
      ...tag(ellipsoid(0, 0, 0, 3.2, 2.8, 2.8), 'mucosa'),
      ...tag(noisyEllipsoid(0, 0, 0, 2.8, 2.5, 2.5, 0.08, 0.9), 'mucosa'),
      // Trigone (smooth triangular region at base)
      ...tag(ellipsoid(0, -2.5, 0, 2.0, 1.2, 1.8), 'trigone'),
      ...tag(tube([[-1.5,-2.0,0],[0,-3.0,0],[1.5,-2.0,0]], 0.5), 'trigone'),
      // Ureteric orifices (bilateral)
      ...tag(sphere(-1.8, -1.8, 0.5, 0.55), 'trigone'),
      ...tag(sphere(1.8, -1.8, 0.5, 0.55), 'trigone'),
      // Intramural ureters
      ...tag(tube([[-1.8,-1.8,0.5],[-2.5,-1.0,1.0],[-3.0,0,1.5]], 0.38), 'trigone'),
      ...tag(tube([[1.8,-1.8,0.5],[2.5,-1.0,1.0],[3.0,0,1.5]], 0.38), 'trigone'),
      // Bladder neck / internal urethral orifice
      ...tag(cylinder(0, 0, -4.0, -2.5, 1.2), 'neck'),
      ...tag(hollowCylinder(0, 0, -4.0, -3.2, 1.8, 1.0), 'neck'),
      // Urethra stub
      ...tag(cylinder(0, 0, -5.0, -4.0, 0.7), 'neck'),
    ]),
  },

  prostate: {
    label: 'Prostate',
    system: 'Urological',
    icon: '⊓',
    color: '#c08038',
    zones: { peripheral: '#c08038', central: '#a86828', transition: '#d49848', vesicle: '#e0a848', neurovascular: '#884400' },
    description: 'Prostate adenocarcinoma (Gleason scoring)',
    voxels: unique([
      // ── Peripheral zone — posterior, largest, most cancer ─────────────────
      ...tag(noisyEllipsoid(0, -0.5, 0, 3.2, 2.8, 3.0, 0.12, 0.80), 'peripheral'),
      ...tag(noisyEllipsoid(0, -0.3, 0.2, 3.0, 2.5, 2.8, 0.10, 0.95), 'peripheral'),
      // Posterior aspect
      ...tag(ellipsoid(0, -0.5, -2.0, 2.8, 2.5, 1.5), 'peripheral'),
      // Lateral wings
      ...tag(noisyEllipsoid(-2.0, -0.5, 0, 1.8, 2.2, 1.8, 0.12, 0.90), 'peripheral'),
      ...tag(noisyEllipsoid(2.0, -0.5, 0, 1.8, 2.2, 1.8, 0.12, 0.90), 'peripheral'),

      // ── Central zone — surrounds ejaculatory ducts ────────────────────────
      ...tag(ellipsoid(0, 0.8, -0.5, 2.0, 1.8, 1.8), 'central'),
      ...tag(noisyEllipsoid(0, 0.8, -0.5, 1.8, 1.6, 1.6, 0.09, 0.90), 'central'),
      // Ejaculatory ducts
      ...tag(tube([[-0.8,2.5,-0.5],[-0.5,0.5,0],[0,-1.0,0.5]], 0.35), 'central'),
      ...tag(tube([[0.8,2.5,-0.5],[0.5,0.5,0],[0,-1.0,0.5]], 0.35), 'central'),

      // ── Transition zone — surrounds urethra (BPH prone) ───────────────────
      ...tag(ellipsoid(0, 0, 0.5, 1.2, 2.2, 1.2), 'transition'),
      ...tag(noisyEllipsoid(-0.5, 0.2, 0.5, 1.0, 2.0, 1.0, 0.10, 1.0), 'transition'),
      ...tag(noisyEllipsoid(0.5, 0.2, 0.5, 1.0, 2.0, 1.0, 0.10, 1.0), 'transition'),
      // Prostatic urethra
      ...tag(cylinder(0, 0, -3.5, 3.0, 0.5), 'transition'),

      // ── Seminal vesicles (bilateral) ──────────────────────────────────────
      ...tag(noisyEllipsoid(-2.5, 2.8, -0.5, 2.0, 1.5, 1.2, 0.18, 1.0), 'vesicle'),
      ...tag(noisyEllipsoid(-3.0, 3.5, -0.3, 1.5, 1.2, 1.0, 0.20, 1.2), 'vesicle'),
      ...tag(tube([[-2.5,2.0,-0.5],[-2.5,0.5,0]], 0.5), 'vesicle'),
      ...tag(noisyEllipsoid(2.5, 2.8, -0.5, 2.0, 1.5, 1.2, 0.18, 1.0), 'vesicle'),
      ...tag(noisyEllipsoid(3.0, 3.5, -0.3, 1.5, 1.2, 1.0, 0.20, 1.2), 'vesicle'),
      ...tag(tube([[2.5,2.0,-0.5],[2.5,0.5,0]], 0.5), 'vesicle'),

      // ── Neurovascular bundles (posterolateral) ─────────────────────────────
      ...tag(tube([[-3.0,1.5,-1.5],[-3.0,-0.5,-1.5],[-3.0,-2.5,-1.0]], 0.4), 'neurovascular'),
      ...tag(tube([[3.0,1.5,-1.5],[3.0,-0.5,-1.5],[3.0,-2.5,-1.0]], 0.4), 'neurovascular'),

      // ── Apex ──────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0, -2.8, 0.5, 2.0, 1.0, 1.8, 0.12, 0.90), 'peripheral'),
      // Base
      ...tag(noisyEllipsoid(0, 2.5, -0.5, 2.5, 1.2, 2.2, 0.10, 0.85), 'central'),
    ]),
  },

  testes: {
    label: 'Testes',
    system: 'Urological',
    icon: '◎',
    color: '#e0c898',
    zones: { parenchyma: '#e0c898', epididymis: '#c0a870', cord: '#d4b880', tunica: '#f0d8a8' },
    description: 'Testicular germ cell tumors (seminoma, NSGCT)',
    voxels: unique([
      // Right testis — oval
      ...tag(noisyEllipsoid(-2.8, 0, 0, 2.2, 2.8, 2.2, 0.10, 0.85), 'parenchyma'),
      ...tag(ellipsoid(-2.8, 0, 0, 1.8, 2.5, 1.8), 'parenchyma'),
      // Right tunica albuginea (outer fibrous capsule)
      ...tag(noisyEllipsoid(-2.8, 0, 0, 2.4, 3.0, 2.4, 0.07, 0.80), 'tunica'),
      // Rete testis (mediastinum)
      ...tag(ellipsoid(-1.8, 0, 0, 0.5, 1.5, 0.5), 'epididymis'),
      // Right epididymis
      ...tag(noisyEllipsoid(-3.8, 2.5, 0, 1.1, 1.8, 0.9, 0.25, 1.4), 'epididymis'),
      ...tag(tube([[-2.5,3.0,0],[-3.5,2.5,0],[-4.0,1.0,0],[-3.5,-1.0,0],[-2.8,-2.0,0]], 0.4), 'epididymis'),

      // Left testis
      ...tag(noisyEllipsoid(2.8, 0, 0, 2.2, 2.8, 2.2, 0.10, 0.85), 'parenchyma'),
      ...tag(ellipsoid(2.8, 0, 0, 1.8, 2.5, 1.8), 'parenchyma'),
      ...tag(noisyEllipsoid(2.8, 0, 0, 2.4, 3.0, 2.4, 0.07, 0.80), 'tunica'),
      ...tag(ellipsoid(1.8, 0, 0, 0.5, 1.5, 0.5), 'epididymis'),
      ...tag(noisyEllipsoid(3.8, 2.5, 0, 1.1, 1.8, 0.9, 0.25, 1.4), 'epididymis'),
      ...tag(tube([[2.5,3.0,0],[3.5,2.5,0],[4.0,1.0,0],[3.5,-1.0,0],[2.8,-2.0,0]], 0.4), 'epididymis'),

      // Spermatic cords (bilateral)
      ...tag(tube([[-2.8,3.5,0],[-2.5,5.5,0],[-2.0,7.5,0]], 0.6), 'cord'),
      ...tag(tube([[2.8,3.5,0],[2.5,5.5,0],[2.0,7.5,0]], 0.6), 'cord'),
      // Vessels within cords (pampiniform plexus)
      ...tag(tube([[-2.8,3.5,0.3],[-2.5,5.5,0.3],[-2.0,7.5,0.3]], 0.32), 'cord'),
      ...tag(tube([[2.8,3.5,0.3],[2.5,5.5,0.3],[2.0,7.5,0.3]], 0.32), 'cord'),
    ]),
  },

  // ══ GYNECOLOGICAL ═══════════════════════════════════════════════════════

  ovaries: {
    label: 'Ovaries',
    system: 'Gynecological',
    icon: '◌',
    color: '#cc88a8',
    zones: { cortex: '#cc88a8', follicle: '#e8a8c0', tube: '#b87898', corpus: '#d498b8' },
    description: 'Epithelial ovarian carcinoma (high-grade serous)',
    voxels: unique([
      // Right ovary — lumpy follicular surface
      ...tag(noisyEllipsoid(-3.8, 0, 0, 2.5, 3.0, 2.2, 0.22, 1.1), 'cortex'),
      ...tag(noisyEllipsoid(-3.6, 0.2, 0, 2.2, 2.8, 2.0, 0.20, 1.3), 'cortex'),
      // Follicles on surface (Graafian)
      ...tag(sphere(-4.8, 1.5, 0.5, 0.80), 'follicle'),
      ...tag(sphere(-5.0, -0.5, 0.8, 0.72), 'follicle'),
      ...tag(sphere(-3.5, 2.0, -0.8, 0.65), 'follicle'),
      ...tag(sphere(-2.8, -1.5, 0.5, 0.60), 'follicle'),
      ...tag(sphere(-4.5, 0.5, -1.2, 0.58), 'follicle'),
      // Corpus luteum
      ...tag(sphere(-3.0, 1.0, 0.8, 0.85), 'corpus'),

      // Left ovary
      ...tag(noisyEllipsoid(3.8, 0, 0, 2.5, 3.0, 2.2, 0.22, 1.1), 'cortex'),
      ...tag(noisyEllipsoid(3.6, 0.2, 0, 2.2, 2.8, 2.0, 0.20, 1.3), 'cortex'),
      ...tag(sphere(4.8, 1.5, 0.5, 0.80), 'follicle'),
      ...tag(sphere(5.0, -0.5, 0.8, 0.72), 'follicle'),
      ...tag(sphere(3.5, 2.0, -0.8, 0.65), 'follicle'),
      ...tag(sphere(2.8, -1.5, 0.5, 0.60), 'follicle'),
      ...tag(sphere(4.5, 0.5, -1.2, 0.58), 'follicle'),
      ...tag(sphere(3.0, 1.0, 0.8, 0.85), 'corpus'),

      // Fallopian tubes — right (with ampulla and fimbriae)
      ...tag(tube([[-3.8,2.5,0],[-2.5,3.5,0],[-1.0,3.8,0],[0,3.8,0]], 0.55), 'tube'),
      ...tag(tube([[-3.8,2.5,0],[-4.5,3.5,0.5],[-5.0,4.0,0.8]], 0.50), 'tube'),
      // Fimbriae right
      ...tag(noisyEllipsoid(-5.2, 4.2, 1.0, 1.1, 1.0, 1.0, 0.35, 1.6), 'follicle'),
      ...tag(tube([[-5.0,4.0,0.8],[-5.8,4.5,0.5],[-6.2,4.5,0]], 0.38), 'follicle'),
      ...tag(tube([[-5.0,4.0,0.8],[-5.5,5.0,1.0],[-5.8,5.5,1.2]], 0.35), 'follicle'),

      // Fallopian tubes — left
      ...tag(tube([[3.8,2.5,0],[2.5,3.5,0],[1.0,3.8,0],[0,3.8,0]], 0.55), 'tube'),
      ...tag(tube([[3.8,2.5,0],[4.5,3.5,0.5],[5.0,4.0,0.8]], 0.50), 'tube'),
      // Fimbriae left
      ...tag(noisyEllipsoid(5.2, 4.2, 1.0, 1.1, 1.0, 1.0, 0.35, 1.6), 'follicle'),
      ...tag(tube([[5.0,4.0,0.8],[5.8,4.5,0.5],[6.2,4.5,0]], 0.38), 'follicle'),
      ...tag(tube([[5.0,4.0,0.8],[5.5,5.0,1.0],[5.8,5.5,1.2]], 0.35), 'follicle'),

      // Ovarian vessels
      ...tag(tube([[-3.8,0,0],[-3.8,2.0,0],[-3.8,3.5,0]], 0.40), 'corpus'),
      ...tag(tube([[3.8,0,0],[3.8,2.0,0],[3.8,3.5,0]], 0.40), 'corpus'),
    ]),
  },

  uterus: {
    label: 'Uterus',
    system: 'Gynecological',
    icon: '∩',
    color: '#c05068',
    zones: { myometrium: '#c05068', endometrium: '#e07888', cervix: '#a03858', junctional: '#b04068' },
    description: 'Endometrial carcinoma & uterine sarcoma',
    voxels: unique([
      // ── Corpus (body) ─────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0, 1.5, 0, 3.5, 4.8, 3.0, 0.10, 0.80), 'myometrium'),
      ...tag(noisyEllipsoid(0, 1.2, 0.2, 3.2, 4.5, 2.8, 0.09, 0.95), 'myometrium'),
      // Posterior wall (thicker)
      ...tag(ellipsoid(0, 1.5, -2.0, 3.0, 4.5, 1.5), 'myometrium'),
      // Anterior wall
      ...tag(ellipsoid(0, 1.5, 2.0, 3.0, 4.5, 1.2), 'myometrium'),
      // Lateral walls
      ...tag(ellipsoid(-2.5, 1.5, 0, 1.5, 4.0, 2.5), 'myometrium'),
      ...tag(ellipsoid(2.5, 1.5, 0, 1.5, 4.0, 2.5), 'myometrium'),

      // ── Endometrial cavity ────────────────────────────────────────────────
      ...tag(ellipsoid(0, 1.5, 0, 2.0, 3.5, 1.8), 'endometrium'),
      ...tag(noisyEllipsoid(0, 1.5, 0, 1.8, 3.2, 1.5, 0.08, 0.9), 'endometrium'),
      // Junctional zone (inner myometrium)
      ...tag(ellipsoid(0, 1.5, 0, 2.5, 4.0, 2.2), 'junctional'),

      // ── Fundus dome ───────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0, 5.0, 0, 3.0, 2.0, 2.5, 0.12, 0.85), 'myometrium'),
      ...tag(ellipsoid(0, 5.5, 0, 2.5, 1.5, 2.0), 'myometrium'),

      // ── Cornual regions (tube attachment) ────────────────────────────────
      ...tag(noisyEllipsoid(-3.0, 4.5, 0, 1.5, 1.5, 1.2, 0.15, 1.0), 'myometrium'),
      ...tag(noisyEllipsoid(3.0, 4.5, 0, 1.5, 1.5, 1.2, 0.15, 1.0), 'myometrium'),
      // Interstitial tube portions
      ...tag(tube([[-3.0,4.5,0],[-4.5,4.5,0],[-5.5,4.0,0]], 0.45), 'junctional'),
      ...tag(tube([[3.0,4.5,0],[4.5,4.5,0],[5.5,4.0,0]], 0.45), 'junctional'),

      // ── Cervix ────────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0, -2.8, 0, 2.2, 2.0, 2.0, 0.10, 0.85), 'cervix'),
      ...tag(cylinder(0, 0, -4.5, -1.5, 1.8), 'cervix'),
      // Ectocervix
      ...tag(ellipsoid(0, -4.5, 0, 2.0, 1.0, 1.8), 'cervix'),
      // Cervical canal
      ...tag(cylinder(0, 0, -4.5, 0, 0.7), 'endometrium'),
      // Cervical os
      ...tag(sphere(0, -4.5, 0, 0.8), 'cervix'),

      // ── Uterine vasculature ───────────────────────────────────────────────
      ...tag(tube([[-3.5,1.5,0],[-3.0,3.0,0],[-3.0,5.0,0]], 0.45), 'junctional'),
      ...tag(tube([[3.5,1.5,0],[3.0,3.0,0],[3.0,5.0,0]], 0.45), 'junctional'),
      ...tag(tube([[-3.5,1.5,0],[-3.0,0,0],[-3.0,-2.0,0]], 0.42), 'junctional'),
      ...tag(tube([[3.5,1.5,0],[3.0,0,0],[3.0,-2.0,0]], 0.42), 'junctional'),
    ]),
  },

  cervix: {
    label: 'Cervix',
    system: 'Gynecological',
    icon: '⌣',
    color: '#a83050',
    description: 'Cervical squamous cell carcinoma & adenocarcinoma',
    voxels: unique([
      ...noisyEllipsoid(0, 0, 0, 2.2, 1.5, 2.0, 0.10, 0.85),
      ...cylinder(0, 0, -2.5, 2.5, 1.8),
      ...ellipsoid(0, -2.5, 0, 2.0, 1.2, 1.8),
      ...ellipsoid(0, 2.5, 0, 2.2, 1.0, 2.0),
    ]),
  },

  // ══ HEAD & NECK ══════════════════════════════════════════════════════════

  brain: {
    label: 'Brain',
    system: 'Head & Neck',
    icon: 'Ω',
    color: '#d4a090',
    zones: {
      cortex: '#d4a090',
      whitematter: '#f0e0d4',
      cerebellum: '#b88878',
      brainstem: '#906858',
      fissure: '#a07060',
    },
    description: 'Glioblastoma, meningioma, brain metastases',
    voxels: unique([
      // ── Right hemisphere — massive gyral cortex ───────────────────────────
      ...tag(gyralEllipsoid(3.5, 1.0, 0, 6.0, 8.0, 10.0), 'cortex'),
      ...tag(noisyEllipsoid(3.5, 1.0, 0, 5.5, 7.5, 9.5, 0.10, 0.80), 'cortex'),
      // Right frontal lobe
      ...tag(noisyEllipsoid(3.0, 6.0, 4.0, 4.0, 4.0, 5.0, 0.10, 0.90), 'cortex'),
      ...tag(noisyEllipsoid(2.8, 7.0, 3.5, 3.5, 3.5, 4.5, 0.09, 1.00), 'cortex'),
      // Right temporal lobe
      ...tag(noisyEllipsoid(6.5, -1.0, -2.0, 3.0, 4.5, 3.5, 0.10, 1.00), 'cortex'),
      ...tag(noisyEllipsoid(7.0, -2.0, -1.5, 2.5, 4.0, 3.0, 0.09, 1.10), 'cortex'),
      // Right occipital
      ...tag(ellipsoid(2.5, -5.5, -2.5, 3.5, 3.0, 4.0), 'cortex'),
      ...tag(noisyEllipsoid(2.2, -6.0, -2.0, 3.0, 2.5, 3.5, 0.09, 0.90), 'cortex'),
      // Right parietal
      ...tag(ellipsoid(4.0, 4.0, -4.0, 3.5, 3.5, 4.0), 'cortex'),
      ...tag(noisyEllipsoid(3.8, 3.5, -4.5, 3.2, 3.2, 3.8, 0.09, 0.95), 'cortex'),
      // Right insula (deep to Sylvian)
      ...tag(ellipsoid(6.0, 1.0, 0.5, 2.0, 3.0, 2.0), 'cortex'),

      // ── Left hemisphere ───────────────────────────────────────────────────
      ...tag(gyralEllipsoid(-3.5, 1.0, 0, 6.0, 8.0, 10.0), 'cortex'),
      ...tag(noisyEllipsoid(-3.5, 1.0, 0, 5.5, 7.5, 9.5, 0.10, 0.80), 'cortex'),
      ...tag(noisyEllipsoid(-3.0, 6.0, 4.0, 4.0, 4.0, 5.0, 0.10, 0.90), 'cortex'),
      ...tag(noisyEllipsoid(-2.8, 7.0, 3.5, 3.5, 3.5, 4.5, 0.09, 1.00), 'cortex'),
      ...tag(noisyEllipsoid(-6.5, -1.0, -2.0, 3.0, 4.5, 3.5, 0.10, 1.00), 'cortex'),
      ...tag(noisyEllipsoid(-7.0, -2.0, -1.5, 2.5, 4.0, 3.0, 0.09, 1.10), 'cortex'),
      ...tag(ellipsoid(-2.5, -5.5, -2.5, 3.5, 3.0, 4.0), 'cortex'),
      ...tag(noisyEllipsoid(-2.2, -6.0, -2.0, 3.0, 2.5, 3.5, 0.09, 0.90), 'cortex'),
      ...tag(ellipsoid(-4.0, 4.0, -4.0, 3.5, 3.5, 4.0), 'cortex'),
      ...tag(noisyEllipsoid(-3.8, 3.5, -4.5, 3.2, 3.2, 3.8, 0.09, 0.95), 'cortex'),
      ...tag(ellipsoid(-6.0, 1.0, 0.5, 2.0, 3.0, 2.0), 'cortex'),

      // ── White matter cores ────────────────────────────────────────────────
      ...tag(ellipsoid(3.5, 1.0, 0, 4.5, 6.5, 8.0), 'whitematter'),
      ...tag(ellipsoid(-3.5, 1.0, 0, 4.5, 6.5, 8.0), 'whitematter'),
      // Corpus callosum
      ...tag(ellipsoid(0, 2.5, 0, 1.5, 2.5, 7.5), 'whitematter'),
      ...tag(tube([[0,2.5,-6.5],[0,3.5,-4.0],[0,4.0,0],[0,3.5,4.0],[0,2.5,6.5]], 1.3), 'whitematter'),
      // Anterior commissure
      ...tag(ellipsoid(0, 0, 3.5, 1.0, 1.0, 2.5), 'whitematter'),
      // Internal capsule (bilateral)
      ...tag(ellipsoid(2.5, 0, 0, 1.2, 4.5, 1.2), 'whitematter'),
      ...tag(ellipsoid(-2.5, 0, 0, 1.2, 4.5, 1.2), 'whitematter'),
      // Corona radiata
      ...tag(ellipsoid(3.0, 2.0, 0, 2.5, 4.0, 3.5), 'whitematter'),
      ...tag(ellipsoid(-3.0, 2.0, 0, 2.5, 4.0, 3.5), 'whitematter'),

      // ── Deep grey nuclei ─────────────────────────────────────────────────
      // Thalami (paired)
      ...tag(ellipsoid(1.8, 0.5, -0.5, 1.8, 2.5, 2.5), 'brainstem'),
      ...tag(ellipsoid(-1.8, 0.5, -0.5, 1.8, 2.5, 2.5), 'brainstem'),
      // Caudate nucleus right
      ...tag(ellipsoid(3.0, 1.5, 2.0, 1.2, 3.0, 1.5), 'whitematter'),
      ...tag(tube([[3.0,3.5,2.0],[2.5,2.5,2.5],[2.0,0.5,2.5],[2.5,-1.5,2.0]], 0.7), 'whitematter'),
      // Caudate nucleus left
      ...tag(ellipsoid(-3.0, 1.5, 2.0, 1.2, 3.0, 1.5), 'whitematter'),
      ...tag(tube([[-3.0,3.5,2.0],[-2.5,2.5,2.5],[-2.0,0.5,2.5],[-2.5,-1.5,2.0]], 0.7), 'whitematter'),
      // Putamen right
      ...tag(ellipsoid(3.5, 0.5, 1.0, 1.0, 2.5, 1.0), 'brainstem'),
      ...tag(ellipsoid(-3.5, 0.5, 1.0, 1.0, 2.5, 1.0), 'brainstem'),
      // Globus pallidus
      ...tag(ellipsoid(2.8, 0, 0.8, 0.7, 1.8, 0.7), 'brainstem'),
      ...tag(ellipsoid(-2.8, 0, 0.8, 0.7, 1.8, 0.7), 'brainstem'),
      // Hypothalamus
      ...tag(ellipsoid(0, -1.5, 0, 1.5, 1.0, 1.5), 'brainstem'),
      // Hippocampus right
      ...tag(noisyEllipsoid(4.5, -2.0, -2.5, 1.0, 3.0, 1.0, 0.15, 1.2), 'brainstem'),
      // Hippocampus left
      ...tag(noisyEllipsoid(-4.5, -2.0, -2.5, 1.0, 3.0, 1.0, 0.15, 1.2), 'brainstem'),
      // Amygdala
      ...tag(sphere(4.5, -2.0, -1.0, 1.0), 'brainstem'),
      ...tag(sphere(-4.5, -2.0, -1.0, 1.0), 'brainstem'),

      // ── Cerebellum — posterior, foliae texture ────────────────────────────
      ...tag(noisyEllipsoid(0, -7.0, -5.5, 6.0, 4.5, 5.5, 0.25, 1.25), 'cerebellum'),
      ...tag(noisyEllipsoid(4.0, -7.0, -5.0, 3.5, 3.5, 4.0, 0.22, 1.35), 'cerebellum'),
      ...tag(noisyEllipsoid(-4.0, -7.0, -5.0, 3.5, 3.5, 4.0, 0.22, 1.35), 'cerebellum'),
      // Cerebellar vermis
      ...tag(noisyEllipsoid(0, -6.5, -5.0, 2.0, 4.0, 3.5, 0.18, 1.20), 'cerebellum'),
      // Tonsils (inferior)
      ...tag(noisyEllipsoid(-1.8, -9.0, -5.5, 1.2, 1.8, 1.2, 0.15, 1.1), 'cerebellum'),
      ...tag(noisyEllipsoid(1.8, -9.0, -5.5, 1.2, 1.8, 1.2, 0.15, 1.1), 'cerebellum'),
      // Flocculus
      ...tag(sphere(-5.5, -7.5, -5.0, 1.2), 'cerebellum'),
      ...tag(sphere(5.5, -7.5, -5.0, 1.2), 'cerebellum'),
      // Deep cerebellar nuclei
      ...tag(sphere(-2.5, -7.0, -5.0, 0.7), 'brainstem'),
      ...tag(sphere(2.5, -7.0, -5.0, 0.7), 'brainstem'),

      // ── Brainstem ─────────────────────────────────────────────────────────
      // Midbrain
      ...tag(noisyEllipsoid(0, -4.0, -7.0, 2.5, 3.0, 2.5, 0.08, 0.8), 'brainstem'),
      // Cerebral aqueduct region
      ...tag(ellipsoid(0, -4.5, -6.5, 1.5, 2.0, 1.5), 'brainstem'),
      // Pons
      ...tag(noisyEllipsoid(0, -6.0, -8.0, 3.0, 2.5, 3.0, 0.08, 0.8), 'brainstem'),
      // Pontine bulge
      ...tag(ellipsoid(0, -6.0, -7.0, 2.8, 2.0, 2.5), 'brainstem'),
      // Medulla oblongata
      ...tag(noisyEllipsoid(0, -7.5, -9.5, 2.0, 2.5, 2.0, 0.08, 0.8), 'brainstem'),
      ...tag(cylinder(0, 0, -12.0, -10.5, 1.8), 'brainstem'),
      // Cerebral peduncles
      ...tag(tube([[1.8,-3.0,-7.0],[2.0,-4.5,-8.0],[1.5,-6.0,-8.5]], 1.0), 'brainstem'),
      ...tag(tube([[-1.8,-3.0,-7.0],[-2.0,-4.5,-8.0],[-1.5,-6.0,-8.5]], 1.0), 'brainstem'),
      // Superior cerebellar peduncles
      ...tag(tube([[2.0,-5.5,-8.0],[3.0,-7.0,-7.0]], 0.8), 'brainstem'),
      ...tag(tube([[-2.0,-5.5,-8.0],[-3.0,-7.0,-7.0]], 0.8), 'brainstem'),
      // Middle cerebellar peduncles
      ...tag(tube([[3.0,-6.0,-8.0],[5.0,-7.0,-6.5]], 0.9), 'brainstem'),
      ...tag(tube([[-3.0,-6.0,-8.0],[-5.0,-7.0,-6.5]], 0.9), 'brainstem'),

      // ── Fissures ─────────────────────────────────────────────────────────
      // Interhemispheric fissure
      ...tag(ellipsoid(0, 1.0, 0, 1.0, 7.5, 9.5), 'fissure'),
      // Sylvian fissure right
      ...tag(ellipsoid(6.5, 0.5, -0.5, 0.8, 3.5, 3.0), 'fissure'),
      // Sylvian fissure left
      ...tag(ellipsoid(-6.5, 0.5, -0.5, 0.8, 3.5, 3.0), 'fissure'),
      // Central sulcus right
      ...tag(ellipsoid(5.0, 3.0, 0, 0.6, 3.5, 2.0), 'fissure'),
      // Central sulcus left
      ...tag(ellipsoid(-5.0, 3.0, 0, 0.6, 3.5, 2.0), 'fissure'),
    ]),
    interior: [
      // Lateral ventricles — cerebrospinal fluid (blue-grey)
      { color: '#b0c8e8', voxels: unique([
        ...ellipsoid(2.5, 1.0, 0, 1.5, 4.5, 2.5),
        ...ellipsoid(-2.5, 1.0, 0, 1.5, 4.5, 2.5),
      ]) },
      // Third ventricle
      { color: '#b0c8e8', voxels: unique(ellipsoid(0, 0, -0.5, 0.6, 2.0, 1.0)) },
      // Fourth ventricle
      { color: '#a8c0e0', voxels: unique(ellipsoid(0, -6.0, -7.5, 1.2, 1.5, 1.2)) },
      // Deep white matter (bright)
      { color: '#f8f0e8', voxels: unique([
        ...ellipsoid(3.5, 1.0, 0, 3.5, 5.5, 6.5),
        ...ellipsoid(-3.5, 1.0, 0, 3.5, 5.5, 6.5),
      ]) },
      // Thalami — grey nuclei
      { color: '#a08878', voxels: unique([
        ...ellipsoid(1.8, 0.5, -0.5, 1.5, 2.0, 2.0),
        ...ellipsoid(-1.8, 0.5, -0.5, 1.5, 2.0, 2.0),
      ]) },
    ],
  },

  thyroid: {
    label: 'Thyroid',
    system: 'Head & Neck',
    icon: '∞',
    color: '#b83838',
    zones: { lobe: '#b83838', isthmus: '#943030', vessel: '#781818', follicle: '#cc5050' },
    description: 'Papillary, follicular, medullary & anaplastic carcinoma',
    voxels: unique([
      // ── Right lobe — bumpy follicular ─────────────────────────────────────
      ...tag(noisyEllipsoid(-2.5, 0, 0, 2.5, 3.2, 1.6, 0.15, 0.85), 'lobe'),
      ...tag(noisyEllipsoid(-2.8, 0.3, 0.2, 2.2, 3.0, 1.4, 0.13, 1.00), 'lobe'),
      // Right upper pole
      ...tag(noisyEllipsoid(-2.2, 3.0, 0, 1.5, 1.5, 1.0, 0.14, 0.95), 'lobe'),
      // Right lower pole
      ...tag(noisyEllipsoid(-2.5, -3.0, 0, 1.8, 1.5, 1.2, 0.14, 0.95), 'lobe'),
      // Right posterior protrusion
      ...tag(ellipsoid(-3.0, 0, -0.8, 2.0, 2.5, 1.0), 'lobe'),

      // ── Left lobe ─────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(2.5, 0, 0, 2.5, 3.2, 1.6, 0.15, 0.85), 'lobe'),
      ...tag(noisyEllipsoid(2.8, 0.3, 0.2, 2.2, 3.0, 1.4, 0.13, 1.00), 'lobe'),
      ...tag(noisyEllipsoid(2.2, 3.0, 0, 1.5, 1.5, 1.0, 0.14, 0.95), 'lobe'),
      ...tag(noisyEllipsoid(2.5, -3.0, 0, 1.8, 1.5, 1.2, 0.14, 0.95), 'lobe'),
      ...tag(ellipsoid(3.0, 0, -0.8, 2.0, 2.5, 1.0), 'lobe'),

      // ── Isthmus ───────────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(0, -0.5, 0, 2.0, 1.0, 1.2, 0.12, 0.85), 'isthmus'),
      ...tag(ellipsoid(0, -0.5, 0, 1.8, 0.8, 1.0), 'isthmus'),

      // ── Pyramidal lobe ────────────────────────────────────────────────────
      ...tag(tube([[0,0.5,0],[0,2.0,0],[0,3.5,0],[0,5.0,0]], 0.6), 'isthmus'),
      ...tag(noisyEllipsoid(0, 4.5, 0, 0.8, 1.5, 0.7, 0.15, 1.1), 'isthmus'),

      // ── Follicular nodule texture ─────────────────────────────────────────
      ...tag(sphere(-3.0, 0.5, 0.5, 0.65), 'follicle'),
      ...tag(sphere(-2.0, 1.5, 0.5, 0.60), 'follicle'),
      ...tag(sphere(-3.0, -1.0, 0.5, 0.60), 'follicle'),
      ...tag(sphere(-1.5, -1.5, 0.3, 0.55), 'follicle'),
      ...tag(sphere(3.0, 0.5, 0.5, 0.65), 'follicle'),
      ...tag(sphere(2.0, 1.5, 0.5, 0.60), 'follicle'),
      ...tag(sphere(3.0, -1.0, 0.5, 0.60), 'follicle'),
      ...tag(sphere(1.5, -1.5, 0.3, 0.55), 'follicle'),

      // ── Thyroid vessels ───────────────────────────────────────────────────
      // Superior thyroid arteries
      ...tag(tube([[-2.2,4.5,0],[-2.5,3.0,0],[-2.5,1.5,0]], 0.40), 'vessel'),
      ...tag(tube([[2.2,4.5,0],[2.5,3.0,0],[2.5,1.5,0]], 0.40), 'vessel'),
      // Inferior thyroid arteries
      ...tag(tube([[-5.0,1.0,0],[-4.0,0,0],[-2.5,-1.5,0]], 0.38), 'vessel'),
      ...tag(tube([[5.0,1.0,0],[4.0,0,0],[2.5,-1.5,0]], 0.38), 'vessel'),
      // Thyroid veins
      ...tag(tube([[-2.5,3.0,0.5],[-2.5,1.0,0.5],[-2.5,-1.5,0.5]], 0.38), 'vessel'),
      ...tag(tube([[2.5,3.0,0.5],[2.5,1.0,0.5],[2.5,-1.5,0.5]], 0.38), 'vessel'),

      // ── Parathyroid glands (tiny, posterior) ──────────────────────────────
      ...tag(sphere(-3.5, 2.0, -0.8, 0.45), 'follicle'),
      ...tag(sphere(-3.5, -2.0, -0.8, 0.45), 'follicle'),
      ...tag(sphere(3.5, 2.0, -0.8, 0.45), 'follicle'),
      ...tag(sphere(3.5, -2.0, -0.8, 0.45), 'follicle'),
    ]),
  },

  larynx: {
    label: 'Larynx',
    system: 'Head & Neck',
    icon: '≡',
    color: '#a8b868',
    description: 'Laryngeal squamous cell carcinoma',
    voxels: unique([
      ...hollowCylinder(0, 0, -1, 4, 2.5, 1.5),
      ...noisyEllipsoid(0, 4.5, -0.5, 2.0, 1.2, 1.0, 0.10, 0.85),
      ...ellipsoid(0, 1, 0, 2.2, 0.5, 1.6),
      ...ellipsoid(0, 3, 0, 2.5, 0.4, 1.8),
      ...tube([[0,-1.5,0],[0,0,0],[0,1.5,0],[0,4,0]], 0.6),
    ]),
  },

  oralCavity: {
    label: 'Oral Cavity',
    system: 'Head & Neck',
    icon: '⌢',
    color: '#cc4040',
    description: 'Oral squamous cell carcinoma (tongue, floor, buccal)',
    voxels: unique([
      ...ellipsoid(0, -1, 0, 3.2, 2.2, 2.2),
      ...noisyEllipsoid(0, -0.5, 0, 3.0, 2.0, 2.0, 0.10, 0.85),
      ...ellipsoid(0, -3, 0, 3.8, 1.2, 2.2),
      ...ellipsoid(0, 1, 0, 3.8, 1.0, 2.8),
      ...ellipsoid(-3.8, 0, 0, 0.9, 2.2, 2.2),
      ...ellipsoid(3.8, 0, 0, 0.9, 2.2, 2.2),
    ]),
  },

  salivaryGland: {
    label: 'Salivary Glands',
    system: 'Head & Neck',
    icon: '◐',
    color: '#7898b8',
    description: 'Mucoepidermoid carcinoma & adenoid cystic carcinoma',
    voxels: unique([
      ...noisyEllipsoid(-4.5, 2, 2, 2.8, 3.2, 2.2, 0.12, 0.80),
      ...noisyEllipsoid(4.5, 2, 2, 2.8, 3.2, 2.2, 0.12, 0.80),
      ...noisyEllipsoid(-3.2, -1, 0, 1.8, 1.8, 1.4, 0.10, 0.90),
      ...noisyEllipsoid(3.2, -1, 0, 1.8, 1.8, 1.4, 0.10, 0.90),
      ...ellipsoid(-1.8, -2, 0, 1.2, 1.2, 1.0),
      ...ellipsoid(1.8, -2, 0, 1.2, 1.2, 1.0),
    ]),
  },

  nasopharynx: {
    label: 'Nasopharynx',
    system: 'Head & Neck',
    icon: '⌐',
    color: '#d09080',
    description: 'Nasopharyngeal carcinoma (EBV-associated)',
    voxels: unique([
      ...noisyEllipsoid(0, 0, 0, 3.2, 2.2, 3.2, 0.10, 0.80),
      ...ellipsoid(0, 2, 0, 2.8, 1.8, 2.2),
      ...ellipsoid(-1.2, 2.2, 0.5, 1.0, 1.5, 0.7),
      ...ellipsoid(1.2, 2.2, 0.5, 1.0, 1.5, 0.7),
      ...ellipsoid(0, -1, 0, 3.2, 1.2, 2.8),
    ]),
  },

  // ══ BREAST ══════════════════════════════════════════════════════════════

  breast: {
    label: 'Breast',
    system: 'Breast',
    icon: '⌒',
    color: '#f0a0b0',
    zones: { parenchyma: '#f0a0b0', duct: '#d07888', nipple: '#e88898', fat: '#f8c8a0' },
    description: 'Invasive ductal & lobular carcinoma, HER2+, TNBC',
    voxels: unique([
      // Right breast parenchyma
      ...tag(noisyEllipsoid(-5.5, 0, 2.5, 4.0, 4.0, 3.5, 0.15, 0.70), 'parenchyma'),
      ...tag(noisyEllipsoid(-5.2, 0.3, 2.8, 3.8, 3.8, 3.2, 0.13, 0.85), 'parenchyma'),
      // Subcutaneous fat layer right
      ...tag(noisyEllipsoid(-5.5, 0, 1.0, 4.5, 4.5, 4.0, 0.10, 0.65), 'fat'),
      // Cooper ligaments right (structural septa)
      ...tag(tube([[-5.5,0,5.0],[-5.5,0,2.5],[-5.5,0,0]], 0.3), 'parenchyma'),
      ...tag(tube([[-5.5,2.0,5.0],[-5.5,2.0,2.5],[-5.5,2.0,0]], 0.3), 'parenchyma'),
      ...tag(tube([[-5.5,-2.0,5.0],[-5.5,-2.0,2.5],[-5.5,-2.0,0]], 0.3), 'parenchyma'),
      // Ductal system right (15-20 lobes converging at nipple)
      ...tag(tube([[-5.5,0,5.5],[-5.5,0.5,3.5],[-5.5,0.8,1.5],[-4.5,0.5,-1.5]], 0.58), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-6.0,0.5,3.5],[-6.0,0.5,1.5],[-5.5,0,0]], 0.50), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-5.0,-0.5,3.5],[-5.0,-0.8,1.5]], 0.48), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-5.5,1.5,3.0],[-5.0,2.0,1.0]], 0.45), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-5.5,-1.5,3.0],[-5.0,-2.0,1.0]], 0.45), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-4.5,0,3.0],[-3.5,0,1.5]], 0.42), 'duct'),
      ...tag(tube([[-5.5,0,5.5],[-6.5,0.8,3.0],[-7.0,0.5,1.0]], 0.42), 'duct'),
      // Secondary duct branches right
      ...tag(tube([[-4.5,0.5,-1.5],[-5.5,0,-1.5],[-6.5,0.5,-1.0]], 0.35), 'duct'),
      ...tag(tube([[-4.5,0.5,-1.5],[-4.0,2.0,-1.0],[-3.5,2.5,-0.5]], 0.33), 'duct'),
      // Right nipple-areola
      ...tag(sphere(-5.5, 0, 6.5, 1.2), 'nipple'),
      ...tag(noisyEllipsoid(-5.5, 0, 6.8, 1.0, 1.0, 0.8, 0.15, 1.2), 'nipple'),

      // Left breast parenchyma
      ...tag(noisyEllipsoid(5.5, 0, 2.5, 4.0, 4.0, 3.5, 0.15, 0.70), 'parenchyma'),
      ...tag(noisyEllipsoid(5.2, 0.3, 2.8, 3.8, 3.8, 3.2, 0.13, 0.85), 'parenchyma'),
      ...tag(noisyEllipsoid(5.5, 0, 1.0, 4.5, 4.5, 4.0, 0.10, 0.65), 'fat'),
      // Cooper ligaments left
      ...tag(tube([[5.5,0,5.0],[5.5,0,2.5],[5.5,0,0]], 0.3), 'parenchyma'),
      ...tag(tube([[5.5,2.0,5.0],[5.5,2.0,2.5],[5.5,2.0,0]], 0.3), 'parenchyma'),
      ...tag(tube([[5.5,-2.0,5.0],[5.5,-2.0,2.5],[5.5,-2.0,0]], 0.3), 'parenchyma'),
      // Ductal system left
      ...tag(tube([[5.5,0,5.5],[5.5,0.5,3.5],[5.5,0.8,1.5],[4.5,0.5,-1.5]], 0.58), 'duct'),
      ...tag(tube([[5.5,0,5.5],[6.0,0.5,3.5],[6.0,0.5,1.5],[5.5,0,0]], 0.50), 'duct'),
      ...tag(tube([[5.5,0,5.5],[5.0,-0.5,3.5],[5.0,-0.8,1.5]], 0.48), 'duct'),
      ...tag(tube([[5.5,0,5.5],[5.5,1.5,3.0],[5.0,2.0,1.0]], 0.45), 'duct'),
      ...tag(tube([[5.5,0,5.5],[5.5,-1.5,3.0],[5.0,-2.0,1.0]], 0.45), 'duct'),
      ...tag(tube([[5.5,0,5.5],[4.5,0,3.0],[3.5,0,1.5]], 0.42), 'duct'),
      ...tag(tube([[5.5,0,5.5],[6.5,0.8,3.0],[7.0,0.5,1.0]], 0.42), 'duct'),
      ...tag(tube([[4.5,0.5,-1.5],[5.5,0,-1.5],[6.5,0.5,-1.0]], 0.35), 'duct'),
      ...tag(tube([[4.5,0.5,-1.5],[4.0,2.0,-1.0],[3.5,2.5,-0.5]], 0.33), 'duct'),
      // Left nipple-areola
      ...tag(sphere(5.5, 0, 6.5, 1.2), 'nipple'),
      ...tag(noisyEllipsoid(5.5, 0, 6.8, 1.0, 1.0, 0.8, 0.15, 1.2), 'nipple'),
    ]),
  },

  // ══ HEMATOLOGICAL ═══════════════════════════════════════════════════════

  bonemarrow: {
    label: 'Bone Marrow',
    system: 'Hematological',
    icon: '❖',
    color: '#c01010',
    zones: { redmarrow: '#c01010', bone: '#e8e0c8', trabecular: '#d4cca8', femoral: '#cc1818' },
    description: 'AML, ALL, MDS, multiple myeloma',
    voxels: unique([
      // ── Lumbar vertebrae (L1–L5) ─────────────────────────────────────────
      ...tag(ellipsoid(0, 9, 0, 3.5, 1.5, 3.5), 'bone'),
      ...tag(ellipsoid(0, 6, 0, 3.5, 1.5, 3.5), 'bone'),
      ...tag(ellipsoid(0, 3, 0, 3.5, 1.5, 3.5), 'bone'),
      ...tag(ellipsoid(0, 0, 0, 3.5, 1.5, 3.5), 'bone'),
      ...tag(ellipsoid(0, -3, 0, 3.5, 1.5, 3.5), 'bone'),
      ...tag(ellipsoid(0, 9, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 6, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 3, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 0, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, -3, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(sphere(0, 9, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 6, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 3, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 0, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, -3, -3.5, 0.8), 'bone'),
      ...tag(sphere(-3.8, 9, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 9, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 6, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 6, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 3, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 3, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 0, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 0, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, -3, 0, 0.7), 'bone'), ...tag(sphere(3.8, -3, 0, 0.7), 'bone'),
      ...tag(cylinder(0, 0, 7.5, 8.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, 4.5, 5.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, 1.5, 2.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, -1.5, -0.5, 2.8), 'trabecular'),
      // ── Sacrum ───────────────────────────────────────────────────────────
      ...tag(ellipsoid(0, -6.5, 0, 3.8, 2.5, 2.5), 'bone'),
      ...tag(ellipsoid(0, -6.5, 0, 2.5, 1.8, 1.8), 'redmarrow'),
      ...tag(sphere(-2.5, -6.0, 0, 0.5), 'trabecular'), ...tag(sphere(2.5, -6.0, 0, 0.5), 'trabecular'),
      ...tag(sphere(-2.5, -7.0, 0, 0.5), 'trabecular'), ...tag(sphere(2.5, -7.0, 0, 0.5), 'trabecular'),
      // ── Iliac crests ─────────────────────────────────────────────────────
      ...tag(noisyEllipsoid(-6.5, -1.5, 0, 4.5, 3.0, 2.5, 0.12, 0.7), 'bone'),
      ...tag(noisyEllipsoid(6.5, -1.5, 0, 4.5, 3.0, 2.5, 0.12, 0.7), 'bone'),
      ...tag(ellipsoid(-6.5, -1.5, 0, 3.2, 2.0, 1.8), 'redmarrow'),
      ...tag(ellipsoid(6.5, -1.5, 0, 3.2, 2.0, 1.8), 'redmarrow'),
      ...tag(sphere(-5.5, -5.5, 1.5, 1.5), 'bone'),
      ...tag(sphere(5.5, -5.5, 1.5, 1.5), 'bone'),
      ...tag(tube([[-5.0,-6.5,2.0],[-2.5,-7.5,2.5],[0,-8.0,2.5]], 0.9), 'bone'),
      ...tag(tube([[5.0,-6.5,2.0],[2.5,-7.5,2.5],[0,-8.0,2.5]], 0.9), 'bone'),
      ...tag(tube([[-5.0,-6.5,2.0],[-2.5,-7.5,2.5],[0,-8.0,2.5]], 0.5), 'redmarrow'),
      ...tag(tube([[5.0,-6.5,2.0],[2.5,-7.5,2.5],[0,-8.0,2.5]], 0.5), 'redmarrow'),
      // ── Sternum ──────────────────────────────────────────────────────────
      ...tag(ellipsoid(0, 4.5, 5.0, 1.0, 6.0, 0.7), 'bone'),
      ...tag(ellipsoid(0, 4.5, 5.0, 0.5, 5.2, 0.4), 'redmarrow'),
      ...tag(ellipsoid(0, 9.5, 5.0, 1.5, 1.5, 0.8), 'bone'),
      ...tag(sphere(0, -1.5, 5.0, 0.7), 'bone'),
      // ── Ribs (bilateral, 6 pairs) ────────────────────────────────────────
      ...tag(tube([[-1,9,4.8],[-3,8,3.5],[-5,7,1.5],[-6.5,5,0],[-6.5,3,0],[-5,2,1.5],[-3,2,3.5],[-1,3.5,4.8]], 0.7), 'bone'),
      ...tag(tube([[1,9,4.8],[3,8,3.5],[5,7,1.5],[6.5,5,0],[6.5,3,0],[5,2,1.5],[3,2,3.5],[1,3.5,4.8]], 0.7), 'bone'),
      ...tag(tube([[-1,7,4.8],[-3,6,3.5],[-6,5,1.0],[-7.5,3,0],[-7.5,1,0],[-6,0,1.0],[-3,0,3.5],[-1,1,4.8]], 0.65), 'bone'),
      ...tag(tube([[1,7,4.8],[3,6,3.5],[6,5,1.0],[7.5,3,0],[7.5,1,0],[6,0,1.0],[3,0,3.5],[1,1,4.8]], 0.65), 'bone'),
      ...tag(tube([[-1,5,4.8],[-3,4,3.5],[-6.5,3,0.5],[-8,1,0],[-8,-1,0],[-6.5,-2,0.5],[-3,-2,3.5],[-1,-1,4.8]], 0.6), 'bone'),
      ...tag(tube([[1,5,4.8],[3,4,3.5],[6.5,3,0.5],[8,1,0],[8,-1,0],[6.5,-2,0.5],[3,-2,3.5],[1,-1,4.8]], 0.6), 'bone'),
      ...tag(tube([[-1,9,4.8],[-6.5,5,0],[-6.5,3,0],[-1,3.5,4.8]], 0.35), 'redmarrow'),
      ...tag(tube([[1,9,4.8],[6.5,5,0],[6.5,3,0],[1,3.5,4.8]], 0.35), 'redmarrow'),
      // ── Femoral heads ────────────────────────────────────────────────────
      ...tag(sphere(-5.5, -9.0, 0, 2.8), 'bone'),
      ...tag(sphere(5.5, -9.0, 0, 2.8), 'bone'),
      ...tag(sphere(-5.5, -9.0, 0, 1.8), 'femoral'),
      ...tag(sphere(5.5, -9.0, 0, 1.8), 'femoral'),
      ...tag(tube([[-5.5,-9.0,0],[-5.5,-11.0,0]], 1.2), 'bone'),
      ...tag(tube([[5.5,-9.0,0],[5.5,-11.0,0]], 1.2), 'bone'),
      ...tag(tube([[-5.5,-9.0,0],[-5.5,-11.0,0]], 0.7), 'femoral'),
      ...tag(tube([[5.5,-9.0,0],[5.5,-11.0,0]], 0.7), 'femoral'),
    ]),
  },

  lymphNodes: {
    label: 'Lymph Nodes',
    system: 'Hematological',
    icon: '⬡',
    color: '#b8a8a0',
    zones: { cortex: '#b8a8a0', medulla: '#987878', capsule: '#c8b8b0' },
    description: 'Hodgkin & Non-Hodgkin lymphoma, nodal metastases',
    voxels: unique([
      ...tag(sphere(0, 8, 0, 1.5), 'cortex'),
      ...tag(sphere(-2, 7, 0, 1.2), 'cortex'),
      ...tag(sphere(2, 7, 0, 1.2), 'cortex'),
      ...tag(sphere(-2.5, 5.5, 0, 1.0), 'cortex'),
      ...tag(sphere(2.5, 5.5, 0, 1.0), 'cortex'),
      ...tag(sphere(-4, 4, 0, 1.2), 'cortex'),
      ...tag(sphere(4, 4, 0, 1.2), 'cortex'),
      ...tag(sphere(-6, 2, 0, 1.5), 'cortex'),
      ...tag(sphere(-5.5, 0, 0, 1.2), 'cortex'),
      ...tag(sphere(6, 2, 0, 1.5), 'cortex'),
      ...tag(sphere(5.5, 0, 0, 1.2), 'cortex'),
      ...tag(sphere(-1.5, 1, 0, 1.2), 'medulla'),
      ...tag(sphere(1.5, 1, 0, 1.2), 'medulla'),
      ...tag(sphere(0, -0.5, 0, 1.2), 'medulla'),
      ...tag(sphere(0, -2, 0, 1.0), 'medulla'),
      ...tag(sphere(-1, -4, 0, 1.2), 'medulla'),
      ...tag(sphere(1, -4, 0, 1.2), 'medulla'),
      ...tag(sphere(-5, -6, 0, 1.5), 'cortex'),
      ...tag(sphere(-4, -7.5, 0, 1.2), 'cortex'),
      ...tag(sphere(5, -6, 0, 1.5), 'cortex'),
      ...tag(sphere(4, -7.5, 0, 1.2), 'cortex'),
      ...tag(sphere(0, 8, 0, 0.7), 'capsule'),
      ...tag(sphere(-6, 2, 0, 0.8), 'capsule'),
      ...tag(sphere(6, 2, 0, 0.8), 'capsule'),
    ]),
  },

  // ══ ENDOCRINE ═══════════════════════════════════════════════════════════

  adrenal: {
    label: 'Adrenal Glands',
    system: 'Endocrine',
    icon: '△',
    color: '#e0a020',
    zones: { cortex: '#e0a020', medulla: '#c06818', vessel: '#f0c040' },
    description: 'Adrenocortical carcinoma & pheochromocytoma',
    voxels: unique([
      ...tag(noisyEllipsoid(-5, 3.5, 0, 2.2, 1.6, 1.4, 0.12, 0.85), 'cortex'),
      ...tag(noisyEllipsoid(-5.5, 4.3, 0, 1.4, 1.1, 1.1, 0.12, 0.90), 'cortex'),
      ...tag(ellipsoid(-5.2, 3.2, 0, 1.8, 1.3, 1.2), 'cortex'),
      ...tag(sphere(-5, 3.5, 0, 1.0), 'medulla'),
      ...tag(noisyEllipsoid(5, 3.5, 0, 1.9, 1.9, 1.4, 0.12, 0.85), 'cortex'),
      ...tag(noisyEllipsoid(5.5, 2.2, 0, 1.4, 1.4, 1.1, 0.12, 0.90), 'cortex'),
      ...tag(ellipsoid(5.2, 3.2, 0, 1.6, 1.6, 1.2), 'cortex'),
      ...tag(sphere(5, 3.5, 0, 1.0), 'medulla'),
      ...tag(tube([[-5,3.5,0],[-4.5,2,0],[-4.0,0.5,0]], 0.38), 'vessel'),
      ...tag(tube([[5,3.5,0],[4.5,2,0],[4.0,0.5,0]], 0.38), 'vessel'),
    ]),
  },

  // ══ DERMATOLOGICAL ══════════════════════════════════════════════════════

  skin: {
    label: 'Skin',
    system: 'Dermatological',
    icon: '□',
    color: '#d49060',
    zones: { epidermis: '#d49060', dermis: '#b87040', hypodermis: '#c89878' },
    description: 'Melanoma, basal cell & squamous cell carcinoma',
    voxels: (() => {
      const v = []
      for (let x = -11; x <= 11; x++)
        for (let z = -11; z <= 11; z++) {
          const d = x*x + z*z
          if (d <= 121) {
            const y = Math.round(-d / 60)
            v.push({ x, y: y-1, z, zone: 'hypodermis' })
            v.push({ x, y, z, zone: 'dermis' })
            v.push({ x, y: y+1, z, zone: 'epidermis' })
          }
        }
      return unique(v)
    })(),
  },

  // ══ MUSCULOSKELETAL ══════════════════════════════════════════════════════

  bone: {
    label: 'Bone',
    system: 'Musculoskeletal',
    icon: '✚',
    color: '#ece8d0',
    zones: { cortical: '#ece8d0', cancellous: '#d4ccb0', marrow: '#c01010', periosteum: '#f0ece0' },
    description: 'Osteosarcoma, chondrosarcoma & Ewing sarcoma',
    voxels: unique([
      ...tag(hollowCylinder(0, 0, -10, 10, 3.0, 1.8), 'cortical'),
      ...tag(hollowCylinder(0, 0, -10, 10, 3.3, 2.9), 'periosteum'),
      ...tag(cylinder(0, 0, -8.5, 8.5, 1.7), 'marrow'),
      ...tag(cylinder(0, 0, 5.5, 8.5, 1.5), 'marrow'),
      ...tag(cylinder(0, 0, -8.5, -5.5, 1.5), 'marrow'),
      ...tag(ellipsoid(0, 12.0, 0, 3.2, 2.5, 3.2), 'cancellous'),
      ...tag(ellipsoid(0, 13.5, 0, 3.0, 1.0, 3.0), 'periosteum'),
      ...tag(cylinder(0, 0, 10, 10, 2.8), 'cancellous'),
      ...tag(ellipsoid(0, -11.5, 0, 3.2, 2.0, 3.2), 'cancellous'),
      ...tag(ellipsoid(-1.5, -12.5, 0, 1.5, 1.5, 2.0), 'cancellous'),
      ...tag(ellipsoid(1.5, -12.5, 0, 1.5, 1.5, 2.0), 'cancellous'),
      ...tag(ellipsoid(0, -13.5, 0, 3.0, 0.8, 2.5), 'periosteum'),
      ...tag(cylinder(0, 0, -10, -10, 2.8), 'cancellous'),
      ...tag(hollowCylinder(0, 0, 8.5, 11.5, 3.2, 0.1), 'cortical'),
      ...tag(hollowCylinder(0, 0, -11.5, -8.5, 3.2, 0.1), 'cortical'),
      ...tag(tube([[3.2,1.5,0],[2.5,0,0],[1.7,-1.5,0]], 0.4), 'marrow'),
      ...tag(ellipsoid(0, 9.5, 0, 2.5, 1.0, 2.5), 'cancellous'),
      ...tag(ellipsoid(0, -9.5, 0, 2.5, 1.0, 2.5), 'cancellous'),
      ...tag(ellipsoid(0, 10.5, 1.0, 1.5, 0.5, 1.5), 'cancellous'),
      ...tag(ellipsoid(0, -10.5, 1.0, 1.5, 0.5, 1.5), 'cancellous'),
    ]),
  },

  softTissue: {
    label: 'Soft Tissue',
    system: 'Musculoskeletal',
    icon: '◻',
    color: '#c06858',
    zones: { muscle: '#c06858', fascia: '#a84838', fat: '#e0b870' },
    description: 'Sarcomas: liposarcoma, leiomyosarcoma, GIST',
    voxels: unique([
      ...tag(noisyEllipsoid(0, 0, 0, 4.5, 6.8, 4.5, 0.14, 0.60), 'muscle'),
      ...tag(noisyEllipsoid(0, 0, 0, 4.2, 6.5, 4.2, 0.12, 0.75), 'muscle'),
      ...tag(ellipsoid(-1.8, 0, 0, 3.5, 6.0, 3.5), 'fascia'),
      ...tag(ellipsoid(1.8, 0, 0, 3.5, 6.0, 3.5), 'fascia'),
      ...tag(ellipsoid(0, 0, 0, 0.7, 6.0, 0.7), 'fat'),
      ...tag(ellipsoid(1.5, 0, 0, 0.6, 5.8, 0.6), 'fat'),
      ...tag(ellipsoid(-1.5, 0, 0, 0.6, 5.8, 0.6), 'fat'),
    ]),
  },
}

export default ORGANS
