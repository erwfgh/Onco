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
    zones: { parenchyma: '#e87a7a', lobe: '#d46060', bronchi: '#c04848', vessel: '#8b1a1a' },
    description: 'Non-small cell & small cell lung carcinoma',
    voxels: unique([
      // ── Right lung ──────────────────────────────────────────────────────
      // Right lower lobe — large inferior mass
      ...tag(noisyEllipsoid(-4.5, -2.5, 0, 4.0, 7.0, 3.5, 0.18, 0.8), 'parenchyma'),
      // Right upper lobe
      ...tag(noisyEllipsoid(-4.0, 5.5, 0.5, 3.2, 3.2, 2.8, 0.15, 0.9), 'lobe'),
      // Right middle lobe (wedge-shaped, anterior)
      ...tag(ellipsoid(-4.8, 1.5, 1.5, 2.6, 2.0, 2.2), 'lobe'),
      // Right apex dome
      ...tag(ellipsoid(-4.0, 8.5, 0, 2.0, 1.8, 2.0), 'parenchyma'),
      // Right base (diaphragmatic surface)
      ...tag(ellipsoid(-4.5, -8.5, 0, 3.0, 1.5, 2.8), 'lobe'),
      // Right lateral bulge
      ...tag(ellipsoid(-7.5, 0, 0, 1.5, 4.0, 2.5), 'parenchyma'),

      // ── Left lung ───────────────────────────────────────────────────────
      // Left lower lobe
      ...tag(noisyEllipsoid(4.0, -2.5, 0, 3.5, 7.0, 3.2, 0.18, 0.8), 'parenchyma'),
      // Left upper lobe (with cardiac notch)
      ...tag(noisyEllipsoid(3.8, 5.0, 0.5, 2.8, 3.2, 2.5, 0.15, 0.9), 'lobe'),
      // Lingula (tongue-like projection of left upper lobe)
      ...tag(ellipsoid(3.5, 1.0, 1.2, 2.0, 2.5, 1.8), 'lobe'),
      // Left apex
      ...tag(ellipsoid(3.8, 8.5, 0, 1.8, 1.8, 1.8), 'parenchyma'),
      // Left base
      ...tag(ellipsoid(4.0, -8.5, 0, 2.6, 1.5, 2.5), 'lobe'),
      // Left lateral
      ...tag(ellipsoid(7.0, 0, 0, 1.3, 4.0, 2.2), 'parenchyma'),

      // ── Bronchial tree ──────────────────────────────────────────────────
      // Trachea carina
      ...tag(cylinder(0, 0, -1, 3, 0.9), 'bronchi'),
      // Main bronchi stem
      ...tag(tube([[0,3,0],[-3.5,2.0,0]], 0.7), 'bronchi'),
      ...tag(tube([[0,3,0],[3.5,2.0,0]], 0.7), 'bronchi'),
      // Right lobar bronchi
      ...tag(tube([[-3.5,2.0,0],[-4.5,4.5,0],[-4.0,7.0,0]], 0.5), 'bronchi'),
      ...tag(tube([[-3.5,2.0,0],[-4.5,1.5,0.8],[-4.8,0.5,1.2]], 0.45), 'bronchi'),
      ...tag(tube([[-3.5,2.0,0],[-4.5,-1.0,0],[-4.5,-4.0,0]], 0.5), 'bronchi'),
      // Left lobar bronchi
      ...tag(tube([[3.5,2.0,0],[4.0,4.5,0],[3.8,7.0,0]], 0.5), 'bronchi'),
      ...tag(tube([[3.5,2.0,0],[3.8,0.5,0.8],[3.5,-2.0,0]], 0.45), 'bronchi'),
      ...tag(tube([[3.5,2.0,0],[4.0,-1.5,0],[4.0,-4.5,0]], 0.5), 'bronchi'),
      // Segmental bronchi right upper
      ...tag(tube([[-4.0,7.0,0],[-5.5,6.5,1.0],[-6.0,5.5,1.5]], 0.35), 'bronchi'),
      ...tag(tube([[-4.0,7.0,0],[-4.0,8.0,-0.5],[-3.5,8.5,-1.0]], 0.3), 'bronchi'),
      // Segmental bronchi left upper
      ...tag(tube([[3.8,7.0,0],[5.0,6.5,1.0],[5.5,5.5,1.5]], 0.35), 'bronchi'),
      ...tag(tube([[3.8,7.0,0],[3.5,8.0,-0.5],[3.0,8.5,-1.0]], 0.3), 'bronchi'),
      // Subsegmental branching right lower
      ...tag(tube([[-4.5,-4.0,0],[-5.5,-5.5,0.8],[-5.0,-7.0,0.5]], 0.3), 'bronchi'),
      ...tag(tube([[-4.5,-4.0,0],[-3.5,-6.0,-0.8],[-4.0,-7.5,-0.5]], 0.3), 'bronchi'),
      // Subsegmental branching left lower
      ...tag(tube([[4.0,-4.5,0],[5.0,-5.5,0.8],[4.5,-7.0,0.5]], 0.3), 'bronchi'),
      ...tag(tube([[4.0,-4.5,0],[3.0,-6.0,-0.8],[3.5,-7.5,-0.5]], 0.3), 'bronchi'),

      // ── Pulmonary vasculature ────────────────────────────────────────────
      // Right pulmonary hilum
      ...tag(sphere(-3.0, 1.0, 0.5, 1.3), 'vessel'),
      ...tag(sphere(-3.5, -0.5, 0.5, 1.0), 'vessel'),
      // Left pulmonary hilum
      ...tag(sphere(3.0, 1.0, 0.5, 1.3), 'vessel'),
      ...tag(sphere(3.5, -0.5, 0.5, 1.0), 'vessel'),
      // Pulmonary artery branches right
      ...tag(tube([[-3.0,1.0,0.5],[-5.0,3.0,0.5],[-5.5,5.5,0.5]], 0.5), 'vessel'),
      ...tag(tube([[-3.0,1.0,0.5],[-4.5,-2.0,0.3],[-4.5,-5.5,0.3]], 0.45), 'vessel'),
      // Pulmonary artery branches left
      ...tag(tube([[3.0,1.0,0.5],[4.8,3.0,0.5],[5.0,5.5,0.5]], 0.5), 'vessel'),
      ...tag(tube([[3.0,1.0,0.5],[4.0,-2.0,0.3],[4.0,-5.5,0.3]], 0.45), 'vessel'),
      // Pulmonary veins draining to hilum
      ...tag(tube([[-5.5,4.0,-1.0],[-4.0,2.0,-0.5],[-3.0,1.5,-0.5]], 0.4), 'vessel'),
      ...tag(tube([[-5.0,-3.5,-0.8],[-4.0,-1.5,-0.5],[-3.0,0.5,-0.5]], 0.4), 'vessel'),
      ...tag(tube([[5.0,4.0,-1.0],[4.0,2.0,-0.5],[3.0,1.5,-0.5]], 0.4), 'vessel'),
      ...tag(tube([[4.5,-3.5,-0.8],[3.8,-1.5,-0.5],[3.0,0.5,-0.5]], 0.4), 'vessel'),
    ]),
  },

  heart: {
    label: 'Heart',
    system: 'Thoracic',
    icon: '♡',
    color: '#9e1818',
    zones: { myocardium: '#9e1818', atrium: '#b82828', vessel: '#6a0808', valve: '#cc4040' },
    description: 'Cardiac tumors & pericardial mesothelioma',
    voxels: unique([
      // ── Ventricles ───────────────────────────────────────────────────────
      // Left ventricle — thick-walled, conical, forms cardiac apex
      ...tag(ellipsoid(-1.5, -1.5, 0, 3.8, 5.2, 3.5), 'myocardium'),
      // Left ventricular apex extension
      ...tag(ellipsoid(-1.8, -5.5, 0, 2.0, 1.5, 2.0), 'myocardium'),
      // Right ventricle — thinner wall, crescent shape wrapping LV
      ...tag(ellipsoid(2.2, -0.5, 0.5, 3.0, 4.0, 2.8), 'myocardium'),
      // Right ventricular outflow tract (RVOT)
      ...tag(ellipsoid(2.0, 2.5, 0, 1.5, 2.2, 1.5), 'myocardium'),
      // Interventricular septum
      ...tag(ellipsoid(0.2, -0.5, 0, 0.8, 4.5, 2.8), 'myocardium'),
      // Papillary muscles LV (posterior and anterior)
      ...tag(cylinder(-2.0, -0.8, -5.5, -2.0, 0.6), 'myocardium'),
      ...tag(cylinder(-0.5, 0.8, -5.5, -2.0, 0.6), 'myocardium'),

      // ── Atria ────────────────────────────────────────────────────────────
      // Left atrium — posterior, receives pulmonary veins
      ...tag(ellipsoid(-1.5, 4.0, -0.5, 3.0, 2.5, 2.8), 'atrium'),
      // Left atrial appendage
      ...tag(noisyEllipsoid(-4.0, 4.5, 0.5, 1.5, 1.5, 1.2, 0.15, 1.0), 'atrium'),
      // Right atrium — right side, receives venae cavae
      ...tag(ellipsoid(2.5, 3.5, 0, 2.5, 2.5, 2.2), 'atrium'),
      // Right atrial appendage
      ...tag(noisyEllipsoid(4.5, 4.0, 0.5, 1.3, 1.5, 1.0, 0.15, 1.0), 'atrium'),
      // Interatrial septum / fossa ovalis
      ...tag(ellipsoid(0.5, 3.8, 0, 0.6, 2.0, 2.0), 'atrium'),

      // ── Great vessels ────────────────────────────────────────────────────
      // Ascending aorta
      ...tag(cylinder(-1.2, 0, 5, 10, 1.4), 'vessel'),
      // Aortic arch — sweeping left then down
      ...tag(tube([[-1.2,10,0],[0,11.5,0],[1.5,11.0,0],[2.5,9.5,0],[2.5,7.5,0]], 1.1), 'vessel'),
      // Descending thoracic aorta stub
      ...tag(cylinder(2.5, 0, 5, 7.5, 1.0), 'vessel'),
      // Brachiocephalic trunk
      ...tag(tube([[-0.5,11.0,0],[-1.5,12.5,0]], 0.7), 'vessel'),
      // Left common carotid
      ...tag(tube([[0.5,11.2,0],[0.8,13.0,0]], 0.6), 'vessel'),
      // Left subclavian
      ...tag(tube([[1.5,11.0,0],[3.0,12.0,0]], 0.6), 'vessel'),
      // Pulmonary trunk
      ...tag(cylinder(1.8, 0, 4.5, 7.5, 1.1), 'vessel'),
      // Right pulmonary artery
      ...tag(tube([[1.8,7.5,0],[-1.0,7.5,0],[-3.0,6.5,0]], 0.8), 'vessel'),
      // Left pulmonary artery
      ...tag(tube([[1.8,7.5,0],[3.5,7.5,0],[5.0,6.5,0]], 0.8), 'vessel'),
      // Superior vena cava
      ...tag(cylinder(3.2, 0, 4, 9, 0.9), 'vessel'),
      // Inferior vena cava
      ...tag(cylinder(2.5, 0, -3, 1, 0.9), 'vessel'),
      // Pulmonary veins (4 entering left atrium)
      ...tag(tube([[-4.5,4.0,-1.0],[-2.5,4.0,-1.0]], 0.6), 'vessel'),
      ...tag(tube([[-4.5,3.0,-1.0],[-2.5,3.5,-1.0]], 0.5), 'vessel'),
      ...tag(tube([[4.5,4.0,-1.0],[2.5,4.0,-1.0]], 0.6), 'vessel'),
      ...tag(tube([[4.5,3.0,-1.0],[2.5,3.5,-1.0]], 0.5), 'vessel'),

      // ── Coronary arteries ────────────────────────────────────────────────
      // Left anterior descending (LAD) — runs in anterior interventricular groove
      ...tag(tube([[-0.5,4.5,3.5],[0,2.0,3.5],[0.5,-1.0,3.2],[0,-3.5,2.5],[0,-5.0,1.5]], 0.4), 'valve'),
      // Left circumflex (LCx) — posterior left
      ...tag(tube([[-0.5,4.5,3.5],[-2.5,3.5,3.0],[-4.0,2.0,2.0],[-3.5,0.0,1.5]], 0.35), 'valve'),
      // Right coronary artery (RCA) — right atrioventricular groove
      ...tag(tube([[1.5,4.0,3.0],[3.0,3.0,2.5],[3.5,1.0,2.0],[3.0,-1.0,1.5],[2.0,-3.0,1.0]], 0.35), 'valve'),
      // Diagonal branches LAD
      ...tag(tube([[0,1.0,3.5],[-2.0,0.5,2.5],[-3.0,-0.5,1.5]], 0.28), 'valve'),
      // Marginal branches RCA
      ...tag(tube([[3.5,0.5,2.0],[4.0,-1.5,1.0],[3.5,-3.0,0.5]], 0.28), 'valve'),
      // Posterior descending artery
      ...tag(tube([[2.0,-3.0,1.0],[1.0,-4.5,-1.0],[0,-5.5,-1.5]], 0.3), 'valve'),
    ]),
  },

  esophagus: {
    label: 'Esophagus',
    system: 'Thoracic',
    icon: '⌇',
    color: '#c06858',
    description: 'Adenocarcinoma & squamous cell carcinoma',
    voxels: unique(tube([
      [0, 10, 0], [0, 8, 0], [0, 5, 0],
      [-0.5, 2, 0], [-0.5, -1, 0],
      [-0.5, -4, 0], [-0.5, -7, 0],
    ], 1.2)),
  },

  thymus: {
    label: 'Thymus',
    system: 'Thoracic',
    icon: '✦',
    color: '#c8a8a0',
    description: 'Thymoma & thymic carcinoma',
    voxels: unique([
      ...ellipsoid(-1.2, 0, 0, 1.5, 2.5, 1),
      ...ellipsoid(1.2, 0, 0, 1.5, 2.5, 1),
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
      // ── Right lobe — dominant mass ──────────────────────────────────────
      ...tag(noisyEllipsoid(1.5, 0, 0, 8.0, 5.0, 5.0, 0.14, 0.7), 'parenchyma'),
      // Right lobe inferior extension
      ...tag(ellipsoid(2.0, -4.0, 0, 5.5, 2.0, 3.5), 'parenchyma'),
      // Right lobe posterior dome
      ...tag(ellipsoid(3.5, 2.5, -1.5, 4.0, 2.5, 3.0), 'parenchyma'),
      // Right subphrenic dome (superior convexity)
      ...tag(ellipsoid(2.0, 4.0, 0, 5.0, 2.0, 4.0), 'parenchyma'),

      // ── Left lobe — wedge-shaped ─────────────────────────────────────────
      ...tag(noisyEllipsoid(-4.5, 1.0, 0.5, 4.5, 3.5, 3.5, 0.12, 0.7), 'leftLobe'),
      // Left lobe lateral extension
      ...tag(ellipsoid(-7.5, 0.5, 0.5, 2.0, 2.5, 2.0), 'leftLobe'),
      // Left lobe inferior tip
      ...tag(ellipsoid(-6.0, -2.5, 0.5, 2.0, 1.5, 1.5), 'leftLobe'),

      // ── Caudate lobe (segment I) — posterior between IVC and portal ─────
      ...tag(ellipsoid(0.5, 2.0, -3.0, 2.0, 2.0, 1.5), 'leftLobe'),
      // Caudate process
      ...tag(ellipsoid(2.5, 1.0, -3.0, 1.2, 1.2, 1.0), 'leftLobe'),

      // ── Portal vein system ──────────────────────────────────────────────
      // Main portal vein entering hilum
      ...tag(tube([[0,-2.0,0],[0,-0.5,0],[1.5,1.0,0]], 0.9), 'vessel'),
      // Right portal branch
      ...tag(tube([[1.5,1.0,0],[3.5,1.5,0],[6.0,1.0,0]], 0.7), 'vessel'),
      // Left portal branch
      ...tag(tube([[1.5,1.0,0],[-0.5,1.5,0],[-3.5,1.5,0],[-6.0,1.0,0]], 0.7), 'vessel'),
      // Right anterior sectoral
      ...tag(tube([[4.0,1.2,0],[4.0,3.5,0],[3.5,5.0,0]], 0.5), 'vessel'),
      // Right posterior sectoral
      ...tag(tube([[5.0,1.0,0],[5.5,-1.0,-1.0],[5.0,-3.0,-1.0]], 0.5), 'vessel'),

      // ── Hepatic veins draining to IVC ──────────────────────────────────
      // Right hepatic vein
      ...tag(tube([[6.0,3.0,0],[4.5,4.0,0],[2.0,5.0,0],[0,5.0,0]], 0.6), 'vessel'),
      // Middle hepatic vein
      ...tag(tube([[0.5,3.5,0],[0,4.5,0],[0,5.0,0]], 0.55), 'vessel'),
      // Left hepatic vein
      ...tag(tube([[-4.5,3.0,0],[-2.5,4.0,0],[0,5.0,0]], 0.55), 'vessel'),
      // IVC groove (right posterior)
      ...tag(cylinder(0.5, -2.5, 3.0, 6.0, 0.8), 'vessel'),

      // ── Gallbladder fossa ───────────────────────────────────────────────
      ...tag(ellipsoid(4.0, -2.5, 1.5, 1.2, 2.5, 1.0), 'bile'),
      // Hepatic duct confluence
      ...tag(sphere(1.0, -1.5, 0.5, 0.9), 'bile'),
      ...tag(tube([[1.0,-1.5,0.5],[0,-3.0,0.5]], 0.5), 'bile'),
    ]),
  },

  gallbladder: {
    label: 'Gallbladder',
    system: 'Abdominal',
    icon: '◉',
    color: '#4a7820',
    zones: { wall: '#4a7820', bile: '#2a5a10', duct: '#3a6818' },
    description: 'Gallbladder carcinoma & biliary tract cancer',
    voxels: unique([
      ...tag(ellipsoid(0, 0, 0, 1.2, 2.8, 1.2), 'wall'),
      ...tag(ellipsoid(0, 0, 0, 0.7, 2.3, 0.7), 'bile'),
      ...tag(cylinder(0, 0, 2.8, 4.5, 0.55), 'duct'),
    ]),
  },

  pancreas: {
    label: 'Pancreas',
    system: 'Abdominal',
    icon: '∿',
    color: '#e0b870',
    zones: { head: '#e0b870', body: '#d4aa60', tail: '#c89850', duct: '#b88040' },
    description: 'Pancreatic ductal adenocarcinoma (PDAC)',
    voxels: unique([
      // Head (wraps around duodenum)
      ...tag(noisyEllipsoid(-3, 0, 0, 2.2, 2.2, 1.6, 0.12, 0.9), 'head'),
      // Uncinate process
      ...tag(ellipsoid(-3.5, -1.5, 0, 1.4, 1.2, 1), 'head'),
      // Body
      ...tag(noisyEllipsoid(0, 0.5, 0, 2.2, 1.6, 1.3, 0.10, 0.9), 'body'),
      // Tail (narrows)
      ...tag(noisyEllipsoid(3.5, 1, 0, 2.0, 1.3, 1.0, 0.10, 0.9), 'tail'),
      // Main pancreatic duct
      ...tag(tube([[-3.5,0,0],[-1,0.3,0],[0,0.5,0],[2,0.8,0],[4,1,0]], 0.4), 'duct'),
    ]),
  },

  stomach: {
    label: 'Stomach',
    system: 'Abdominal',
    icon: '∪',
    color: '#c89060',
    zones: { fundus: '#c89060', body: '#b87850', pylorus: '#a86840', mucosa: '#d4a878' },
    description: 'Gastric adenocarcinoma & GIST',
    voxels: unique([
      // Fundus
      ...tag(noisyEllipsoid(-1.5, 2, 0, 2.5, 2.5, 2.2, 0.12, 0.8), 'fundus'),
      // Body
      ...tag(noisyEllipsoid(0.5, 0, 0, 3.2, 2.8, 2.4, 0.10, 0.8), 'body'),
      // Antrum/pylorus
      ...tag(ellipsoid(3.5, -1.5, 0, 2.0, 1.8, 1.6), 'pylorus'),
      // Pyloric sphincter
      ...tag(cylinder(5, 0, -2, 0, 0.9), 'pylorus'),
      // Cardia inlet
      ...tag(cylinder(-3, 0, 1, 4, 0.9), 'mucosa'),
      // Rugae (mucosal folds) hint
      ...tag(tube([[-2,-1,0],[0,-1.5,0],[2,-1,0],[4,-0.5,0]], 0.45), 'mucosa'),
    ]),
  },

  smallintestine: {
    label: 'Small Intestine',
    system: 'Abdominal',
    icon: '≋',
    color: '#d4a878',
    description: 'Carcinoid tumors & small bowel adenocarcinoma',
    voxels: unique(tube([
      [3,-1,0],[2,1,0],[0,2,0],[-2,1,0],[-3,-1,0],
      [-2,-3,0],[0,-4,0],[2,-3,0],[3,-1,1],
      [2,1,1],[0,2,1],[-2,1,1],[-3,-1,1],
      [-2,-3,1],[0,-4,1],[2,-3,1],[3,-1,2],
      [2,1,2],[0,2,2],[-2,1,2],
    ], 0.9)),
  },

  colon: {
    label: 'Colon',
    system: 'Abdominal',
    icon: '⊏',
    color: '#a87040',
    description: 'Colorectal adenocarcinoma',
    voxels: unique(tube([
      [-5,-5,0],[-5,5,0],
      [-5,6,0],[0,7,0],
      [0,7,0],[5,6,0],
      [5,6,0],[5,-4,0],
      [5,-4,0],[3,-6,0],
      [3,-6,0],[0,-7,0],
      [0,-7,0],[-1,-5,0],
      [-1,-5,0],[0,-8,0],
    ], 1.4)),
  },

  spleen: {
    label: 'Spleen',
    system: 'Abdominal',
    icon: '◑',
    color: '#7a2858',
    zones: { capsule: '#7a2858', pulp: '#5a1838', hilum: '#4a1028' },
    description: 'Splenic lymphoma & metastases',
    voxels: unique([
      ...tag(noisyEllipsoid(0, 0, 0, 3.2, 2.7, 2.2, 0.13, 0.8), 'capsule'),
      ...tag(ellipsoid(0, 0, 0, 2.5, 2.0, 1.6), 'pulp'),
      // Hilum vessels
      ...tag(sphere(0.8, 0, 0.5, 0.9), 'hilum'),
    ]),
  },

  // ══ UROLOGICAL ══════════════════════════════════════════════════════════

  kidney: {
    label: 'Kidneys',
    system: 'Urological',
    icon: '⊕',
    color: '#aa3818',
    zones: { cortex: '#aa3818', medulla: '#7a2010', pelvis: '#e8c870', ureter: '#c09040' },
    description: 'Renal cell carcinoma (clear cell, papillary)',
    voxels: unique([
      // ── Right kidney ─────────────────────────────────────────────────────
      // Cortex — bean-shaped outer shell
      ...tag(ellipsoid(-6.5, 0, 0, 2.8, 5.5, 2.5), 'cortex'),
      // Cortex polar caps
      ...tag(ellipsoid(-6.5, 5.0, 0, 2.0, 1.5, 2.0), 'cortex'),
      ...tag(ellipsoid(-6.5, -5.0, 0, 2.0, 1.5, 2.0), 'cortex'),
      // Medulla — 8-12 pyramids pointing inward
      ...tag(ellipsoid(-6.5, 0, 0, 1.8, 4.5, 1.8), 'medulla'),
      // Medullary pyramid hints (conical projections toward pelvis)
      ...tag(ellipsoid(-6.0, 2.5, 0, 1.0, 1.5, 1.0), 'medulla'),
      ...tag(ellipsoid(-6.0, -2.5, 0, 1.0, 1.5, 1.0), 'medulla'),
      ...tag(ellipsoid(-6.0, 0.5, 1.2, 0.8, 1.2, 0.8), 'medulla'),
      ...tag(ellipsoid(-6.0, 0.5, -1.2, 0.8, 1.2, 0.8), 'medulla'),
      // Renal sinus / pelvis — hilum indentation (medial)
      ...tag(sphere(-4.8, 0.5, 0, 1.3), 'pelvis'),
      // Minor calyces
      ...tag(sphere(-5.5, 2.8, 0, 0.7), 'pelvis'),
      ...tag(sphere(-5.5, -2.8, 0, 0.7), 'pelvis'),
      ...tag(sphere(-5.3, 0.5, 1.5, 0.6), 'pelvis'),
      ...tag(sphere(-5.3, 0.5, -1.5, 0.6), 'pelvis'),
      // Major calyx necks
      ...tag(tube([[-5.5,2.8,0],[-4.8,1.5,0],[-4.8,0.5,0]], 0.4), 'pelvis'),
      ...tag(tube([[-5.5,-2.8,0],[-4.8,-1.5,0],[-4.8,0.5,0]], 0.4), 'pelvis'),
      // Ureter right
      ...tag(tube([[-4.8,0.5,0],[-5.0,-2.0,0],[-5.0,-5.5,0],[-4.5,-8.5,0]], 0.5), 'ureter'),

      // ── Left kidney ──────────────────────────────────────────────────────
      ...tag(ellipsoid(6.5, 0, 0, 2.8, 5.5, 2.5), 'cortex'),
      ...tag(ellipsoid(6.5, 5.0, 0, 2.0, 1.5, 2.0), 'cortex'),
      ...tag(ellipsoid(6.5, -5.0, 0, 2.0, 1.5, 2.0), 'cortex'),
      ...tag(ellipsoid(6.5, 0, 0, 1.8, 4.5, 1.8), 'medulla'),
      ...tag(ellipsoid(6.0, 2.5, 0, 1.0, 1.5, 1.0), 'medulla'),
      ...tag(ellipsoid(6.0, -2.5, 0, 1.0, 1.5, 1.0), 'medulla'),
      ...tag(ellipsoid(6.0, 0.5, 1.2, 0.8, 1.2, 0.8), 'medulla'),
      ...tag(ellipsoid(6.0, 0.5, -1.2, 0.8, 1.2, 0.8), 'medulla'),
      ...tag(sphere(4.8, 0.5, 0, 1.3), 'pelvis'),
      ...tag(sphere(5.5, 2.8, 0, 0.7), 'pelvis'),
      ...tag(sphere(5.5, -2.8, 0, 0.7), 'pelvis'),
      ...tag(sphere(5.3, 0.5, 1.5, 0.6), 'pelvis'),
      ...tag(sphere(5.3, 0.5, -1.5, 0.6), 'pelvis'),
      ...tag(tube([[5.5,2.8,0],[4.8,1.5,0],[4.8,0.5,0]], 0.4), 'pelvis'),
      ...tag(tube([[5.5,-2.8,0],[4.8,-1.5,0],[4.8,0.5,0]], 0.4), 'pelvis'),
      ...tag(tube([[4.8,0.5,0],[5.0,-2.0,0],[5.0,-5.5,0],[4.5,-8.5,0]], 0.5), 'ureter'),

      // ── Adrenal caps ─────────────────────────────────────────────────────
      ...tag(ellipsoid(-6.5, 5.8, 0, 1.5, 1.0, 1.0), 'cortex'),
      ...tag(ellipsoid(6.5, 5.8, 0, 1.5, 1.0, 1.0), 'cortex'),
    ]),
  },

  bladder: {
    label: 'Bladder',
    system: 'Urological',
    icon: '▽',
    color: '#c8b840',
    zones: { wall: '#c8b840', mucosa: '#d4cc60', neck: '#a89030' },
    description: 'Urothelial (transitional cell) carcinoma',
    voxels: unique([
      // Outer wall
      ...tag(ellipsoid(0, 0, 0, 3.6, 3.2, 3.2), 'wall'),
      // Mucosal surface (inner)
      ...tag(ellipsoid(0, 0, 0, 2.8, 2.5, 2.5), 'mucosa'),
      // Bladder neck / trigone
      ...tag(cylinder(0, 0, -3.5, -2, 1.0), 'neck'),
      // Ureteric orifices
      ...tag(sphere(-1.5, -2, 0.5, 0.5), 'neck'),
      ...tag(sphere(1.5, -2, 0.5, 0.5), 'neck'),
    ]),
  },

  prostate: {
    label: 'Prostate',
    system: 'Urological',
    icon: '⊓',
    color: '#c08038',
    zones: { peripheral: '#c08038', central: '#a86828', transition: '#d49848', vesicle: '#e0a848' },
    description: 'Prostate adenocarcinoma (Gleason scoring)',
    voxels: unique([
      // Peripheral zone (posterior, most cancers arise here)
      ...tag(ellipsoid(0, -0.5, 0, 2.9, 2.3, 2.6), 'peripheral'),
      // Central zone (surrounds ejaculatory ducts)
      ...tag(ellipsoid(0, 0.5, 0, 1.8, 1.5, 1.6), 'central'),
      // Transition zone (surrounds urethra)
      ...tag(ellipsoid(0, 0, 0, 1.0, 2.0, 1.0), 'transition'),
      // Seminal vesicles
      ...tag(noisyEllipsoid(-2, 2.2, 0, 1.6, 1.1, 1.0, 0.12, 1.0), 'vesicle'),
      ...tag(noisyEllipsoid(2, 2.2, 0, 1.6, 1.1, 1.0, 0.12, 1.0), 'vesicle'),
    ]),
  },

  testes: {
    label: 'Testes',
    system: 'Urological',
    icon: '◎',
    color: '#e0c898',
    zones: { parenchyma: '#e0c898', epididymis: '#c0a870', cord: '#d4b880' },
    description: 'Testicular germ cell tumors (seminoma, NSGCT)',
    voxels: unique([
      // Testes
      ...tag(ellipsoid(-2.5, 0, 0, 1.9, 2.3, 1.9), 'parenchyma'),
      ...tag(ellipsoid(2.5, 0, 0, 1.9, 2.3, 1.9), 'parenchyma'),
      // Epididymis (coiled structure along posterior border)
      ...tag(noisyEllipsoid(-3.2, 2.2, 0, 0.9, 1.5, 0.7, 0.2, 1.4), 'epididymis'),
      ...tag(noisyEllipsoid(3.2, 2.2, 0, 0.9, 1.5, 0.7, 0.2, 1.4), 'epididymis'),
      // Spermatic cord
      ...tag(tube([[-2.5,3,0],[-2,5,0]], 0.5), 'cord'),
      ...tag(tube([[2.5,3,0],[2,5,0]], 0.5), 'cord'),
    ]),
  },

  // ══ GYNECOLOGICAL ═══════════════════════════════════════════════════════

  ovaries: {
    label: 'Ovaries',
    system: 'Gynecological',
    icon: '◌',
    color: '#cc88a8',
    zones: { cortex: '#cc88a8', follicle: '#e8a8c0', tube: '#b87898' },
    description: 'Epithelial ovarian carcinoma (high-grade serous)',
    voxels: unique([
      // Ovaries with surface follicle bumps
      ...tag(noisyEllipsoid(-3.5, 0, 0, 2.1, 2.6, 1.9, 0.18, 1.1), 'cortex'),
      ...tag(noisyEllipsoid(3.5, 0, 0, 2.1, 2.6, 1.9, 0.18, 1.1), 'cortex'),
      // Corpus luteum hints
      ...tag(sphere(-4.2, 1, 0.5, 0.7), 'follicle'),
      ...tag(sphere(4.2, 1, 0.5, 0.7), 'follicle'),
      // Fallopian tubes with fimbriae
      ...tag(tube([[-3.5,2,0],[-1.8,3.2,0],[0,3.2,0]], 0.5), 'tube'),
      ...tag(tube([[3.5,2,0],[1.8,3.2,0],[0,3.2,0]], 0.5), 'tube'),
      // Fimbriae
      ...tag(noisyEllipsoid(-3.8, 2.5, 0, 0.9, 0.8, 0.8, 0.3, 1.5), 'follicle'),
      ...tag(noisyEllipsoid(3.8, 2.5, 0, 0.9, 0.8, 0.8, 0.3, 1.5), 'follicle'),
    ]),
  },

  uterus: {
    label: 'Uterus',
    system: 'Gynecological',
    icon: '∩',
    color: '#c05068',
    zones: { myometrium: '#c05068', endometrium: '#e07888', cervix: '#a03858' },
    description: 'Endometrial carcinoma & uterine sarcoma',
    voxels: unique([
      // Corpus (body)
      ...tag(ellipsoid(0, 1, 0, 3.1, 4.2, 2.6), 'myometrium'),
      // Endometrial cavity
      ...tag(ellipsoid(0, 1, 0, 2.0, 3.2, 1.6), 'endometrium'),
      // Fundus dome
      ...tag(noisyEllipsoid(0, 4.2, 0, 2.6, 1.6, 2.1, 0.10, 0.9), 'myometrium'),
      // Cervix
      ...tag(cylinder(0, 0, -3.2, -1, 1.6), 'cervix'),
      // Cornual regions (tubes attachment)
      ...tag(sphere(-2.5, 3.5, 0, 1.0), 'myometrium'),
      ...tag(sphere(2.5, 3.5, 0, 1.0), 'myometrium'),
    ]),
  },

  cervix: {
    label: 'Cervix',
    system: 'Gynecological',
    icon: '⌣',
    color: '#a83050',
    description: 'Cervical squamous cell carcinoma & adenocarcinoma',
    voxels: unique([
      ...cylinder(0, 0, -2, 1, 1.8),
      ...ellipsoid(0, -2, 0, 1.8, 1.0, 1.5),
      ...ellipsoid(0, 1, 0, 2.0, 0.8, 1.8),
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
      fissure: '#b89080',
    },
    description: 'Glioblastoma, meningioma, brain metastases',
    voxels: unique([
      // ── Cerebral hemispheres ─────────────────────────────────────────────
      // Right hemisphere — gyral cortex (folded outer surface)
      ...tag(gyralEllipsoid(3.0, 1.0, 0, 5.0, 7.0, 9.0), 'cortex'),
      // Left hemisphere
      ...tag(gyralEllipsoid(-3.0, 1.0, 0, 5.0, 7.0, 9.0), 'cortex'),
      // Right frontal lobe bulge
      ...tag(noisyEllipsoid(2.5, 5.5, 3.5, 3.5, 3.5, 4.0, 0.08, 0.9), 'cortex'),
      // Left frontal lobe bulge
      ...tag(noisyEllipsoid(-2.5, 5.5, 3.5, 3.5, 3.5, 4.0, 0.08, 0.9), 'cortex'),
      // Right temporal lobe (lateral projection)
      ...tag(noisyEllipsoid(5.5, -1.0, -1.5, 2.5, 3.5, 3.0, 0.08, 1.0), 'cortex'),
      // Left temporal lobe
      ...tag(noisyEllipsoid(-5.5, -1.0, -1.5, 2.5, 3.5, 3.0, 0.08, 1.0), 'cortex'),
      // Right occipital pole
      ...tag(ellipsoid(2.0, -5.0, -2.0, 3.0, 2.5, 3.5), 'cortex'),
      // Left occipital pole
      ...tag(ellipsoid(-2.0, -5.0, -2.0, 3.0, 2.5, 3.5), 'cortex'),
      // Right parietal crown
      ...tag(ellipsoid(3.0, 3.5, -3.5, 3.0, 3.0, 3.5), 'cortex'),
      // Left parietal crown
      ...tag(ellipsoid(-3.0, 3.5, -3.5, 3.0, 3.0, 3.5), 'cortex'),

      // ── White matter cores ───────────────────────────────────────────────
      ...tag(ellipsoid(3.0, 1.0, 0, 3.5, 5.5, 6.5), 'whitematter'),
      ...tag(ellipsoid(-3.0, 1.0, 0, 3.5, 5.5, 6.5), 'whitematter'),
      // Corpus callosum (thick commissure bridging hemispheres)
      ...tag(ellipsoid(0, 2.0, 0, 1.2, 2.0, 6.0), 'whitematter'),
      // Anterior commissure
      ...tag(ellipsoid(0, 0, 2.5, 0.8, 0.8, 2.0), 'whitematter'),
      // Internal capsule right
      ...tag(ellipsoid(2.0, 0, 0, 1.0, 3.5, 1.0), 'whitematter'),
      // Internal capsule left
      ...tag(ellipsoid(-2.0, 0, 0, 1.0, 3.5, 1.0), 'whitematter'),

      // ── Deep grey structures ─────────────────────────────────────────────
      // Thalami (paired)
      ...tag(ellipsoid(1.5, 0.5, -0.5, 1.5, 2.0, 2.0), 'brainstem'),
      ...tag(ellipsoid(-1.5, 0.5, -0.5, 1.5, 2.0, 2.0), 'brainstem'),
      // Basal ganglia right (caudate + putamen)
      ...tag(ellipsoid(2.5, 1.0, 1.5, 1.2, 2.5, 1.5), 'whitematter'),
      // Basal ganglia left
      ...tag(ellipsoid(-2.5, 1.0, 1.5, 1.2, 2.5, 1.5), 'whitematter'),

      // ── Cerebellum — posterior, with foliae texture ──────────────────────
      ...tag(noisyEllipsoid(0, -6.5, -5.0, 5.5, 4.0, 5.0, 0.22, 1.2), 'cerebellum'),
      // Cerebellar hemispheres (left and right)
      ...tag(noisyEllipsoid(3.5, -6.5, -4.5, 3.0, 3.0, 3.5, 0.18, 1.3), 'cerebellum'),
      ...tag(noisyEllipsoid(-3.5, -6.5, -4.5, 3.0, 3.0, 3.5, 0.18, 1.3), 'cerebellum'),
      // Cerebellar vermis (midline)
      ...tag(ellipsoid(0, -6.0, -4.5, 1.5, 3.5, 3.0), 'cerebellum'),
      // Cerebellar tonsils (inferior poles)
      ...tag(ellipsoid(-1.5, -8.5, -5.0, 1.0, 1.5, 1.0), 'cerebellum'),
      ...tag(ellipsoid(1.5, -8.5, -5.0, 1.0, 1.5, 1.0), 'cerebellum'),
      // Flocculus (lateral)
      ...tag(sphere(-4.5, -7.0, -4.5, 1.0), 'cerebellum'),
      ...tag(sphere(4.5, -7.0, -4.5, 1.0), 'cerebellum'),

      // ── Brainstem ────────────────────────────────────────────────────────
      // Midbrain (mesencephalon)
      ...tag(ellipsoid(0, -3.5, -6.5, 2.0, 2.5, 2.0), 'brainstem'),
      // Pons
      ...tag(ellipsoid(0, -5.5, -7.5, 2.5, 2.0, 2.5), 'brainstem'),
      // Medulla oblongata
      ...tag(cylinder(0, 0, -10.5, -8.5, 1.8), 'brainstem'),
      // Cerebral peduncles
      ...tag(tube([[1.5,-2.5,-6.5],[1.5,-3.5,-7.5]], 0.9), 'brainstem'),
      ...tag(tube([[-1.5,-2.5,-6.5],[-1.5,-3.5,-7.5]], 0.9), 'brainstem'),
      // Superior cerebellar peduncles
      ...tag(tube([[1.5,-4.5,-7.0],[2.5,-6.0,-6.0]], 0.7), 'brainstem'),
      ...tag(tube([[-1.5,-4.5,-7.0],[-2.5,-6.0,-6.0]], 0.7), 'brainstem'),

      // ── Interhemispheric fissure ─────────────────────────────────────────
      ...tag(ellipsoid(0, 1.0, 0, 0.8, 6.0, 8.5), 'fissure'),
      // Sylvian fissure (right)
      ...tag(ellipsoid(5.0, 0, -0.5, 0.6, 3.0, 2.5), 'fissure'),
      // Sylvian fissure (left)
      ...tag(ellipsoid(-5.0, 0, -0.5, 0.6, 3.0, 2.5), 'fissure'),
    ]),
  },

  thyroid: {
    label: 'Thyroid',
    system: 'Head & Neck',
    icon: '∞',
    color: '#b83838',
    zones: { lobe: '#b83838', isthmus: '#943030', vessel: '#781818' },
    description: 'Papillary, follicular, medullary & anaplastic carcinoma',
    voxels: unique([
      // Left lobe
      ...tag(noisyEllipsoid(-2.2, 0, 0, 2.1, 2.7, 1.3, 0.10, 0.9), 'lobe'),
      // Right lobe
      ...tag(noisyEllipsoid(2.2, 0, 0, 2.1, 2.7, 1.3, 0.10, 0.9), 'lobe'),
      // Isthmus
      ...tag(ellipsoid(0, -0.5, 0, 1.5, 0.8, 1.0), 'isthmus'),
      // Pyramidal lobe (present in ~50%)
      ...tag(tube([[0,0.5,0],[0,2,0],[0,3,0]], 0.5), 'isthmus'),
      // Follicular texture hint
      ...tag(sphere(-2.5, 0.5, 0.5, 0.6), 'vessel'),
      ...tag(sphere(2.5, 0.5, 0.5, 0.6), 'vessel'),
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
      ...ellipsoid(0, 4.5, -0.5, 1.5, 1.0, 0.5),
      ...ellipsoid(0, 1, 0, 2, 0.4, 1.4),
    ]),
  },

  oralCavity: {
    label: 'Oral Cavity',
    system: 'Head & Neck',
    icon: '⌢',
    color: '#cc4040',
    description: 'Oral squamous cell carcinoma (tongue, floor, buccal)',
    voxels: unique([
      ...ellipsoid(0, -1, 0, 3, 2, 2),
      ...ellipsoid(0, -3, 0, 3.5, 1, 2),
      ...ellipsoid(0, 1, 0, 3.5, 0.8, 2.5),
      ...ellipsoid(-3.5, 0, 0, 0.8, 2, 2),
      ...ellipsoid(3.5, 0, 0, 0.8, 2, 2),
    ]),
  },

  salivaryGland: {
    label: 'Salivary Glands',
    system: 'Head & Neck',
    icon: '◐',
    color: '#7898b8',
    description: 'Mucoepidermoid carcinoma & adenoid cystic carcinoma',
    voxels: unique([
      ...ellipsoid(-4, 2, 2, 2.5, 3, 2),
      ...ellipsoid(4, 2, 2, 2.5, 3, 2),
      ...ellipsoid(-3, -1, 0, 1.5, 1.5, 1.2),
      ...ellipsoid(3, -1, 0, 1.5, 1.5, 1.2),
      ...ellipsoid(-1.5, -2, 0, 1, 1, 0.8),
      ...ellipsoid(1.5, -2, 0, 1, 1, 0.8),
    ]),
  },

  nasopharynx: {
    label: 'Nasopharynx',
    system: 'Head & Neck',
    icon: '⌐',
    color: '#d09080',
    description: 'Nasopharyngeal carcinoma (EBV-associated)',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3, 2, 3),
      ...ellipsoid(0, 2, 0, 2.5, 1.5, 2),
      ...ellipsoid(-1, 2, 0.5, 0.8, 1.2, 0.5),
      ...ellipsoid(1, 2, 0.5, 0.8, 1.2, 0.5),
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
      ...tag(noisyEllipsoid(-5, 0, 2, 3.6, 3.6, 3.1, 0.12, 0.7), 'parenchyma'),
      // Left breast
      ...tag(noisyEllipsoid(5, 0, 2, 3.6, 3.6, 3.1, 0.12, 0.7), 'parenchyma'),
      // Ductal system right (15–20 lobes)
      ...tag(tube([[-5,0,2],[-5,1,-1],[-4.5,0.5,-2],[-3.8,0,-2.5]], 0.55), 'duct'),
      ...tag(tube([[-5,0,2],[-5.5,0.5,-1],[-5,0,-2]], 0.45), 'duct'),
      ...tag(tube([[-5,0,2],[-4.5,-0.5,-1.5]], 0.45), 'duct'),
      // Ductal system left
      ...tag(tube([[5,0,2],[5,1,-1],[4.5,0.5,-2],[3.8,0,-2.5]], 0.55), 'duct'),
      ...tag(tube([[5,0,2],[5.5,0.5,-1],[5,0,-2]], 0.45), 'duct'),
      // Nipple-areola
      ...tag(sphere(-5, 0, 5.0, 1.0), 'nipple'),
      ...tag(sphere(5, 0, 5.0, 1.0), 'nipple'),
      // Subcutaneous fat layer
      ...tag(ellipsoid(-5, 0, 0.5, 4.2, 4.0, 3.5), 'fat'),
      ...tag(ellipsoid(5, 0, 0.5, 4.2, 4.0, 3.5), 'fat'),
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
      // Vertebral marrow (inner cancellous with red marrow)
      ...tag(ellipsoid(0, 9, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 6, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 3, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, 0, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      ...tag(ellipsoid(0, -3, 0, 2.2, 1.0, 2.2), 'redmarrow'),
      // Vertebral spinous processes (posterior)
      ...tag(sphere(0, 9, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 6, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 3, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, 0, -3.5, 0.8), 'bone'),
      ...tag(sphere(0, -3, -3.5, 0.8), 'bone'),
      // Vertebral transverse processes (bilateral)
      ...tag(sphere(-3.8, 9, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 9, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 6, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 6, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 3, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 3, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, 0, 0, 0.7), 'bone'),  ...tag(sphere(3.8, 0, 0, 0.7), 'bone'),
      ...tag(sphere(-3.8, -3, 0, 0.7), 'bone'), ...tag(sphere(3.8, -3, 0, 0.7), 'bone'),
      // Intervertebral disc spaces
      ...tag(cylinder(0, 0, 7.5, 8.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, 4.5, 5.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, 1.5, 2.5, 2.8), 'trabecular'),
      ...tag(cylinder(0, 0, -1.5, -0.5, 2.8), 'trabecular'),

      // ── Sacrum ───────────────────────────────────────────────────────────
      ...tag(ellipsoid(0, -6.5, 0, 3.8, 2.5, 2.5), 'bone'),
      ...tag(ellipsoid(0, -6.5, 0, 2.5, 1.8, 1.8), 'redmarrow'),
      // Sacral foramina (bilateral)
      ...tag(sphere(-2.5, -6.0, 0, 0.5), 'trabecular'), ...tag(sphere(2.5, -6.0, 0, 0.5), 'trabecular'),
      ...tag(sphere(-2.5, -7.0, 0, 0.5), 'trabecular'), ...tag(sphere(2.5, -7.0, 0, 0.5), 'trabecular'),

      // ── Iliac crests (high marrow content) ──────────────────────────────
      ...tag(noisyEllipsoid(-6.5, -1.5, 0, 4.5, 3.0, 2.5, 0.12, 0.7), 'bone'),
      ...tag(noisyEllipsoid(6.5, -1.5, 0, 4.5, 3.0, 2.5, 0.12, 0.7), 'bone'),
      ...tag(ellipsoid(-6.5, -1.5, 0, 3.2, 2.0, 1.8), 'redmarrow'),
      ...tag(ellipsoid(6.5, -1.5, 0, 3.2, 2.0, 1.8), 'redmarrow'),
      // Acetabulum (hip socket)
      ...tag(sphere(-5.5, -5.5, 1.5, 1.5), 'bone'),
      ...tag(sphere(5.5, -5.5, 1.5, 1.5), 'bone'),
      // Pubic rami
      ...tag(tube([[-5.0,-6.5,2.0],[-2.5,-7.5,2.5],[0,-8.0,2.5]], 0.9), 'bone'),
      ...tag(tube([[5.0,-6.5,2.0],[2.5,-7.5,2.5],[0,-8.0,2.5]], 0.9), 'bone'),
      ...tag(tube([[-5.0,-6.5,2.0],[-2.5,-7.5,2.5],[0,-8.0,2.5]], 0.5), 'redmarrow'),
      ...tag(tube([[5.0,-6.5,2.0],[2.5,-7.5,2.5],[0,-8.0,2.5]], 0.5), 'redmarrow'),

      // ── Sternum ──────────────────────────────────────────────────────────
      ...tag(ellipsoid(0, 4.5, 5.0, 1.0, 6.0, 0.7), 'bone'),
      ...tag(ellipsoid(0, 4.5, 5.0, 0.5, 5.2, 0.4), 'redmarrow'),
      // Manubrium
      ...tag(ellipsoid(0, 9.5, 5.0, 1.5, 1.5, 0.8), 'bone'),
      // Xiphoid process
      ...tag(sphere(0, -1.5, 5.0, 0.7), 'bone'),

      // ── Ribs (bilateral, 6 pairs visible) ───────────────────────────────
      ...tag(tube([[-1,9,4.8],[-3,8,3.5],[-5,7,1.5],[-6.5,5,0],[-6.5,3,0],[-5,2,1.5],[-3,2,3.5],[-1,3.5,4.8]], 0.7), 'bone'),
      ...tag(tube([[1,9,4.8],[3,8,3.5],[5,7,1.5],[6.5,5,0],[6.5,3,0],[5,2,1.5],[3,2,3.5],[1,3.5,4.8]], 0.7), 'bone'),
      ...tag(tube([[-1,7,4.8],[-3,6,3.5],[-6,5,1.0],[-7.5,3,0],[-7.5,1,0],[-6,0,1.0],[-3,0,3.5],[-1,1,4.8]], 0.65), 'bone'),
      ...tag(tube([[1,7,4.8],[3,6,3.5],[6,5,1.0],[7.5,3,0],[7.5,1,0],[6,0,1.0],[3,0,3.5],[1,1,4.8]], 0.65), 'bone'),
      ...tag(tube([[-1,5,4.8],[-3,4,3.5],[-6.5,3,0.5],[-8,1,0],[-8,-1,0],[-6.5,-2,0.5],[-3,-2,3.5],[-1,-1,4.8]], 0.6), 'bone'),
      ...tag(tube([[1,5,4.8],[3,4,3.5],[6.5,3,0.5],[8,1,0],[8,-1,0],[6.5,-2,0.5],[3,-2,3.5],[1,-1,4.8]], 0.6), 'bone'),
      // Rib marrow
      ...tag(tube([[-1,9,4.8],[-6.5,5,0],[-6.5,3,0],[-1,3.5,4.8]], 0.35), 'redmarrow'),
      ...tag(tube([[1,9,4.8],[6.5,5,0],[6.5,3,0],[1,3.5,4.8]], 0.35), 'redmarrow'),

      // ── Femoral heads ────────────────────────────────────────────────────
      ...tag(sphere(-5.5, -9.0, 0, 2.8), 'bone'),
      ...tag(sphere(5.5, -9.0, 0, 2.8), 'bone'),
      ...tag(sphere(-5.5, -9.0, 0, 1.8), 'femoral'),
      ...tag(sphere(5.5, -9.0, 0, 1.8), 'femoral'),
      // Femoral necks
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
      // Cervical chain
      ...tag(sphere(0, 8, 0, 1.5), 'cortex'),
      ...tag(sphere(-2, 7, 0, 1.2), 'cortex'),
      ...tag(sphere(2, 7, 0, 1.2), 'cortex'),
      ...tag(sphere(-2.5, 5.5, 0, 1.0), 'cortex'),
      ...tag(sphere(2.5, 5.5, 0, 1.0), 'cortex'),
      // Supraclavicular
      ...tag(sphere(-4, 4, 0, 1.2), 'cortex'),
      ...tag(sphere(4, 4, 0, 1.2), 'cortex'),
      // Axillary
      ...tag(sphere(-6, 2, 0, 1.5), 'cortex'),
      ...tag(sphere(-5.5, 0, 0, 1.2), 'cortex'),
      ...tag(sphere(6, 2, 0, 1.5), 'cortex'),
      ...tag(sphere(5.5, 0, 0, 1.2), 'cortex'),
      // Mediastinal
      ...tag(sphere(-1.5, 1, 0, 1.2), 'medulla'),
      ...tag(sphere(1.5, 1, 0, 1.2), 'medulla'),
      ...tag(sphere(0, -0.5, 0, 1.2), 'medulla'),
      ...tag(sphere(0, -2, 0, 1.0), 'medulla'),
      // Para-aortic
      ...tag(sphere(-1, -4, 0, 1.2), 'medulla'),
      ...tag(sphere(1, -4, 0, 1.2), 'medulla'),
      // Inguinal
      ...tag(sphere(-5, -6, 0, 1.5), 'cortex'),
      ...tag(sphere(-4, -7.5, 0, 1.2), 'cortex'),
      ...tag(sphere(5, -6, 0, 1.5), 'cortex'),
      ...tag(sphere(4, -7.5, 0, 1.2), 'cortex'),
      // Inner medullary sinuses
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
      // Right (pyramidal/triangular)
      ...tag(ellipsoid(-5, 3.5, 0, 1.9, 1.3, 1.1), 'cortex'),
      ...tag(ellipsoid(-5.5, 4.3, 0, 1.1, 0.9, 0.9), 'cortex'),
      ...tag(sphere(-5, 3.5, 0, 0.8), 'medulla'),
      // Left (crescentic)
      ...tag(ellipsoid(5, 3.5, 0, 1.6, 1.6, 1.1), 'cortex'),
      ...tag(ellipsoid(5.5, 2.2, 0, 1.1, 1.1, 0.9), 'cortex'),
      ...tag(sphere(5, 3.5, 0, 0.8), 'medulla'),
      // Central veins
      ...tag(tube([[-5,3.5,0],[-4.5,2,0]], 0.35), 'vessel'),
      ...tag(tube([[5,3.5,0],[4.5,2,0]], 0.35), 'vessel'),
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
            // Hypodermis (deepest)
            v.push({ x, y: y-1, z, zone: 'hypodermis' })
            // Dermis
            v.push({ x, y, z, zone: 'dermis' })
            // Epidermis (surface)
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
      // ── Diaphysis (shaft) — cortical tube ─────────────────────────────
      ...tag(hollowCylinder(0, 0, -10, 10, 3.0, 1.8), 'cortical'),
      // Periosteum (outer fibrous membrane — thin outer ring)
      ...tag(hollowCylinder(0, 0, -10, 10, 3.3, 2.9), 'periosteum'),
      // Medullary canal (yellow marrow space)
      ...tag(cylinder(0, 0, -8.5, 8.5, 1.7), 'marrow'),
      // Red marrow patches near metaphyses
      ...tag(cylinder(0, 0, 5.5, 8.5, 1.5), 'marrow'),
      ...tag(cylinder(0, 0, -8.5, -5.5, 1.5), 'marrow'),

      // ── Proximal epiphysis ────────────────────────────────────────────
      // Cancellous spongy bone
      ...tag(ellipsoid(0, 12.0, 0, 3.2, 2.5, 3.2), 'cancellous'),
      // Articular cartilage cap dome
      ...tag(ellipsoid(0, 13.5, 0, 3.0, 1.0, 3.0), 'periosteum'),
      // Growth plate scar (epiphyseal line)
      ...tag(cylinder(0, 0, 10, 10, 2.8), 'cancellous'),

      // ── Distal epiphysis ──────────────────────────────────────────────
      ...tag(ellipsoid(0, -11.5, 0, 3.2, 2.0, 3.2), 'cancellous'),
      // Distal condyles (medial and lateral)
      ...tag(ellipsoid(-1.5, -12.5, 0, 1.5, 1.5, 2.0), 'cancellous'),
      ...tag(ellipsoid(1.5, -12.5, 0, 1.5, 1.5, 2.0), 'cancellous'),
      // Distal articular surface
      ...tag(ellipsoid(0, -13.5, 0, 3.0, 0.8, 2.5), 'periosteum'),
      // Distal growth plate scar
      ...tag(cylinder(0, 0, -10, -10, 2.8), 'cancellous'),

      // ── Metaphyseal flares (cortical thickening) ──────────────────────
      ...tag(hollowCylinder(0, 0, 8.5, 11.5, 3.2, 0.1), 'cortical'),
      ...tag(hollowCylinder(0, 0, -11.5, -8.5, 3.2, 0.1), 'cortical'),

      // ── Nutrient foramen & vessel canal ───────────────────────────────
      ...tag(tube([[3.2,1.5,0],[2.5,0,0],[1.7,-1.5,0]], 0.4), 'marrow'),

      // ── Cancellous trabecular network (cross-struts in metaphysis) ────
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
      // Muscle bulk
      ...tag(noisyEllipsoid(0, 0, 0, 4.1, 6.2, 4.1, 0.12, 0.6), 'muscle'),
      // Fascial compartments
      ...tag(ellipsoid(-1.5, 0, 0, 3.2, 5.5, 3.2), 'fascia'),
      ...tag(ellipsoid(1.5, 0, 0, 3.2, 5.5, 3.2), 'fascia'),
      // Intermuscular fat septa
      ...tag(ellipsoid(0, 0, 0, 0.6, 5.5, 0.6), 'fat'),
      ...tag(ellipsoid(0, 0, 0, 0.6, 5.5, 0.6).map(v => ({...v, x: v.x + 1.5})), 'fat'),
    ]),
  },
}

export default ORGANS
