// ─── Primitive generators ─────────────────────────────────────────────────

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

function hollowCylinder(cx, cz, y0, y1, rOuter, rInner) {
  const v = []
  for (let x = Math.floor(cx - rOuter); x <= Math.ceil(cx + rOuter); x++)
    for (let y = y0; y <= y1; y++)
      for (let z = Math.floor(cz - rOuter); z <= Math.ceil(cz + rOuter); z++) {
        const d2 = (x-cx)**2 + (z-cz)**2
        if (d2 <= rOuter*rOuter && d2 >= rInner*rInner)
          v.push({ x, y, z })
      }
  return v
}

function tube(points, r) {
  const v = []
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay, az] = points[i]
    const [bx, by, bz] = points[i+1]
    const steps = Math.ceil(Math.max(Math.abs(bx-ax), Math.abs(by-ay), Math.abs(bz-az)) * 3)
    for (let t = 0; t <= steps; t++) {
      const f = t / steps
      sphere(ax + (bx-ax)*f, ay + (by-ay)*f, az + (bz-az)*f, r).forEach(p => v.push(p))
    }
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

// ─── Organ definitions ────────────────────────────────────────────────────

const ORGANS = {

  // ══ THORACIC ════════════════════════════════════════════════════════════

  lungs: {
    label: 'Lungs',
    system: 'Thoracic',
    icon: '🫁',
    color: '#f4a4b0',
    description: 'Non-small cell & small cell lung carcinoma',
    voxels: unique([
      // right lung — 3 lobes
      ...ellipsoid(-3.5, -1, 0, 2.5, 5.5, 2.2),
      ...ellipsoid(-3.2, 4, 0.3, 1.8, 2, 1.6),
      // left lung — 2 lobes (cardiac notch)
      ...ellipsoid(3.2, -1, 0, 2.1, 5.5, 2.0),
      ...ellipsoid(3, 4, 0.3, 1.4, 2, 1.4),
      // bronchi stubs
      ...cylinder(0, 0, -1, 2, 0.6),
      ...tube([[0,2,0],[-2,1,0]], 0.5),
      ...tube([[0,2,0],[2,1,0]], 0.5),
    ]),
    interior: [
      { color: '#c0392b', voxels: unique(cylinder(0, 0, -2, 8, 0.7)) },       // trachea
      { color: '#e74c3c', voxels: unique([                                      // main bronchi
        ...tube([[0,6,0],[-2,4,0],[-3.5,2,0]], 0.5),
        ...tube([[0,6,0],[2,4,0],[3.2,2,0]], 0.5),
      ])},
      { color: '#e74c3c', voxels: unique([                                      // lobar bronchi
        ...tube([[-3.5,2,0],[-3.5,0,0],[-3.5,-2,0]], 0.35),
        ...tube([[-3.5,2,0],[-2.5,3,0.5]], 0.3),
        ...tube([[3.2,2,0],[3.2,0,0],[3.2,-2,0]], 0.35),
        ...tube([[3.2,2,0],[2.5,3,0.5]], 0.3),
      ])},
      { color: '#2980b9', voxels: unique([                                      // pulmonary veins (blue)
        ...tube([[-3,1,0.5],[-1,3,0.5],[0,4,0]], 0.4),
        ...tube([[3,1,0.5],[1,3,0.5],[0,4,0]], 0.4),
      ])},
      { color: '#fadbd8', voxels: unique([                                      // alveolar tissue
        ...sphere(-3.5, -1, 0, 1.8), ...sphere(-3.5, 2, 0, 1.5),
        ...sphere(3.2, -1, 0, 1.5), ...sphere(3, 3, 0, 1.2),
      ])},
    ],
  },

  heart: {
    label: 'Heart',
    system: 'Thoracic',
    icon: '❤️',
    color: '#cc2233',
    description: 'Cardiac tumors & pericardial mesothelioma',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3.5, 4, 3),
      ...ellipsoid(-1, 2.5, 0, 2, 2, 2),   // left atrium
      ...ellipsoid(1.5, 2.5, 0, 1.8, 1.8, 1.8), // right atrium
      // aorta stub
      ...cylinder(-1, 0, 4, 7, 1),
      // pulmonary artery
      ...cylinder(1.5, 0, 3, 5, 0.8),
    ]),
    interior: [
      { color: '#7b241c', voxels: unique(ellipsoid(-1.2, -1, 0, 1.6, 2.2, 1.3)) },  // left ventricle
      { color: '#a93226', voxels: unique(ellipsoid(1.2, -0.5, 0, 1.3, 1.8, 1.1)) }, // right ventricle
      { color: '#922b21', voxels: unique(ellipsoid(-1, 2, 0, 1.3, 1, 1)) },          // left atrium
      { color: '#b03a2e', voxels: unique(ellipsoid(1.2, 2, 0, 1.1, 1, 1)) },         // right atrium
      { color: '#641e16', voxels: unique(ellipsoid(0, 0, 0, 0.35, 2.8, 1.3)) },      // interventricular septum
      { color: '#f0e0d0', voxels: unique([                                             // valves (fibrous)
        ...ellipsoid(-1, 0.5, 0, 0.9, 0.25, 0.9),
        ...ellipsoid(1, 0.5, 0, 0.9, 0.25, 0.9),
      ])},
    ],
  },

  esophagus: {
    label: 'Esophagus',
    system: 'Thoracic',
    icon: '🔗',
    color: '#d4947a',
    description: 'Adenocarcinoma & squamous cell carcinoma',
    voxels: unique(tube([
      [0, 10, 0], [0, 8, 0], [0, 5, 0],
      [-0.5, 2, 0], [-0.5, -1, 0],
      [-0.5, -4, 0], [-0.5, -7, 0],
    ], 1.2)),
    interior: [
      { color: '#c0392b', voxels: unique(tube([[0,10,0],[0,5,0],[-0.5,-7,0]], 0.5)) }, // mucosa lumen
      { color: '#e8a090', voxels: unique(tube([[0,10,0],[0,5,0],[-0.5,-7,0]], 0.8)) }, // submucosa
    ],
  },

  thymus: {
    label: 'Thymus',
    system: 'Thoracic',
    icon: '🫐',
    color: '#c8b0d8',
    description: 'Thymoma & thymic carcinoma',
    voxels: unique([
      ...ellipsoid(-1.2, 0, 0, 1.5, 2.5, 1),
      ...ellipsoid(1.2, 0, 0, 1.5, 2.5, 1),
    ]),
    interior: [
      { color: '#d4b8e0', voxels: unique([...ellipsoid(-1.2,0,0,1,1.8,0.7), ...ellipsoid(1.2,0,0,1,1.8,0.7)]) }, // cortex
      { color: '#f5eef8', voxels: unique([...ellipsoid(-1.2,0,0,0.5,1.2,0.4), ...ellipsoid(1.2,0,0,0.5,1.2,0.4)]) }, // medulla (Hassall's corpuscles)
    ],
  },

  // ══ ABDOMINAL ═══════════════════════════════════════════════════════════

  liver: {
    label: 'Liver',
    system: 'Abdominal',
    icon: '🟤',
    color: '#8B2500',
    description: 'Hepatocellular carcinoma & cholangiocarcinoma',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 6, 3.5, 3.5),
      ...ellipsoid(-2, 0.5, 0, 5, 3, 3),
      ...ellipsoid(2.5, -0.5, 0, 3.5, 2.5, 2.5),
      ...ellipsoid(-4, -1, 0, 2, 1.5, 2),
    ]),
    interior: [
      { color: '#7b241c', voxels: unique([...ellipsoid(2,0,0,3.5,2.8,2.8), ...ellipsoid(-3,0,0,2.2,2.2,2.2)]) }, // parenchyma
      { color: '#6c3483', voxels: unique(tube([[0,-1,0],[0,1,0],[1,2,0],[2,1,0]], 0.6)) },  // portal vein
      { color: '#1a5276', voxels: unique([...tube([[0,1,0],[0,3,0]], 0.4), ...tube([[1,1,0],[1,3,0]], 0.4)]) }, // hepatic veins
      { color: '#d4ac0d', voxels: unique(tube([[0,0,0],[1,1,0],[2,0,0]], 0.3)) },           // bile ducts
      { color: '#1e8449', voxels: unique(sphere(3,-1,0.5,0.7)) },                           // gallbladder fossa
    ],
  },

  gallbladder: {
    label: 'Gallbladder',
    system: 'Abdominal',
    icon: '🫒',
    color: '#6b8e3a',
    description: 'Gallbladder carcinoma & biliary tract cancer',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 1.2, 2.5, 1.2),
      ...cylinder(0, 0, 2, 3, 0.6),
    ]),
    interior: [
      { color: '#f9e79f', voxels: unique(ellipsoid(0,0,0,0.7,2,0.7)) },   // bile (yellow)
      { color: '#1e8449', voxels: unique(ellipsoid(0,0,0,1,2.2,1)) },      // mucosa (green)
    ],
  },

  pancreas: {
    label: 'Pancreas',
    system: 'Abdominal',
    icon: '🌿',
    color: '#e8c87a',
    description: 'Pancreatic ductal adenocarcinoma (PDAC)',
    voxels: unique([
      ...ellipsoid(-3, 0, 0, 2, 2, 1.5),
      ...ellipsoid(0, 0.5, 0, 2, 1.5, 1.2),
      ...ellipsoid(3.5, 1, 0, 2, 1.2, 1),
    ]),
    interior: [
      { color: '#f9e79f', voxels: unique(tube([[-3,0,0],[0,0.5,0],[3.5,1,0]], 0.35)) },   // main duct
      { color: '#f0b27a', voxels: unique([...ellipsoid(-3,0,0,1.5,1.5,1), ...ellipsoid(0,0.5,0,1.5,1,0.8)]) }, // acinar cells
      { color: '#a9cce3', voxels: unique([...sphere(-2,0,0,0.4), ...sphere(0,0.5,0,0.4), ...sphere(2.5,1,0,0.4)]) }, // islets of Langerhans
    ],
  },

  stomach: {
    label: 'Stomach',
    system: 'Abdominal',
    icon: '🫃',
    color: '#d4b483',
    description: 'Gastric adenocarcinoma & GIST',
    voxels: unique([
      ...ellipsoid(1, 0, 0, 3.5, 3, 2.5),
      ...ellipsoid(-1, 1, 0, 2, 2.5, 2),
      ...cylinder(3.5, 0, -1, 1, 0.8),
      ...cylinder(-2, 0, 2, 4, 0.8),
    ]),
    interior: [
      { color: '#f1948a', voxels: unique([...ellipsoid(1,0,0,2.8,2.3,1.8), ...ellipsoid(-1,1,0,1.3,1.8,1.3)]) }, // mucosa
      { color: '#e74c3c', voxels: unique([                                                                          // rugae folds
        ...ellipsoid(0,0,0,0.3,2,0.3), ...ellipsoid(1,0,0,0.3,2,0.3), ...ellipsoid(-1,0,0,0.3,1.5,0.3),
      ])},
      { color: '#c0392b', voxels: unique(cylinder(3.5,0,-1,1,0.5)) }, // pyloric sphincter
    ],
  },

  smallintestine: {
    label: 'Small Intestine',
    system: 'Abdominal',
    icon: '〰️',
    color: '#f0c060',
    description: 'Carcinoid tumors & small bowel adenocarcinoma',
    voxels: unique(tube([
      [3,-1,0],[2,1,0],[0,2,0],[-2,1,0],[-3,-1,0],
      [-2,-3,0],[0,-4,0],[2,-3,0],[3,-1,1],
      [2,1,1],[0,2,1],[-2,1,1],[-3,-1,1],
      [-2,-3,1],[0,-4,1],[2,-3,1],[3,-1,2],
      [2,1,2],[0,2,2],[-2,1,2],
    ], 0.9)),
    interior: [
      { color: '#f5cba7', voxels: unique(tube([[3,-1,0],[0,2,0],[-3,-1,0],[0,-4,0],[3,-1,1],[0,2,1],[-3,-1,1],[0,-4,1],[0,2,2]], 0.4)) }, // lumen
      { color: '#e8a87a', voxels: unique([...sphere(0,0,0,0.6), ...sphere(2,1,0,0.6), ...sphere(-2,1,0,0.6), ...sphere(0,-3,0,0.6)]) },  // villi
    ],
  },

  colon: {
    label: 'Colon',
    system: 'Abdominal',
    icon: '🌀',
    color: '#c8a06e',
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
    interior: [
      { color: '#d5a07a', voxels: unique(tube([[-5,-5,0],[-5,5,0],[0,7,0],[5,6,0],[5,-4,0],[3,-6,0],[0,-7,0],[0,-8,0]], 0.6)) }, // mucosa
      { color: '#f0d0b0', voxels: unique(tube([[-5,-5,0],[-5,5,0],[0,7,0],[5,6,0],[5,-4,0],[0,-8,0]], 0.3)) }, // lumen
    ],
  },

  spleen: {
    label: 'Spleen',
    system: 'Abdominal',
    icon: '🟣',
    color: '#9b4f7a',
    description: 'Splenic lymphoma & metastases',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3, 2.5, 2),
      ...ellipsoid(0.5, 0, 0.5, 2.5, 2, 1.5),
    ]),
    interior: [
      { color: '#7d3c98', voxels: unique(ellipsoid(0,0,0,2.2,1.8,1.4)) },   // red pulp
      { color: '#c39bd3', voxels: unique([...sphere(-1,0,0,0.6), ...sphere(1,0,0,0.6), ...sphere(0,1,0,0.5)]) }, // white pulp nodules
      { color: '#1a5276', voxels: unique(tube([[0,0,0],[0,2,0]], 0.4)) },     // splenic vein
    ],
  },

  // ══ UROLOGICAL ══════════════════════════════════════════════════════════

  kidney: {
    label: 'Kidneys',
    system: 'Urological',
    icon: '🫘',
    color: '#c05a3a',
    description: 'Renal cell carcinoma (clear cell, papillary)',
    voxels: unique([
      ...ellipsoid(-5.5, 0, 0, 2, 3.8, 1.8),
      ...ellipsoid(-5.5, 0, 0, 1.4, 3.2, 1.3),
      ...sphere(-4.5, 0, 0, 0.8),
      ...ellipsoid(5.5, 0, 0, 2, 3.8, 1.8),
      ...ellipsoid(5.5, 0, 0, 1.4, 3.2, 1.3),
      ...sphere(4.5, 0, 0, 0.8),
    ]),
    interior: [
      { color: '#c0392b', voxels: unique([...ellipsoid(-5.5,0,0,1.6,3.2,1.4), ...ellipsoid(5.5,0,0,1.6,3.2,1.4)]) }, // cortex
      { color: '#922b21', voxels: unique([                                                                              // medulla pyramids
        ...ellipsoid(-5.5,1.5,0,0.8,1,0.8), ...ellipsoid(-5.5,-1.5,0,0.8,1,0.8),
        ...ellipsoid(5.5,1.5,0,0.8,1,0.8),  ...ellipsoid(5.5,-1.5,0,0.8,1,0.8),
      ])},
      { color: '#f9e79f', voxels: unique([...sphere(-4.8,0,0,0.7), ...sphere(4.8,0,0,0.7)]) },  // renal pelvis
      { color: '#fdebd0', voxels: unique([                                                         // minor calyces
        ...sphere(-4.5,1,0,0.4), ...sphere(-4.5,-1,0,0.4), ...sphere(-4.5,0,0.8,0.4),
        ...sphere(4.5,1,0,0.4),  ...sphere(4.5,-1,0,0.4),  ...sphere(4.5,0,0.8,0.4),
      ])},
    ],
  },

  bladder: {
    label: 'Bladder',
    system: 'Urological',
    icon: '💧',
    color: '#7ab8d8',
    description: 'Urothelial (transitional cell) carcinoma',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3.5, 3, 3),
      ...cylinder(0, 0, -3.5, -2, 0.8),
    ]),
    interior: [
      { color: '#aed6f1', voxels: unique(ellipsoid(0,0,0,2.8,2.3,2.3)) },  // urine (pale blue)
      { color: '#7fb3d3', voxels: unique(ellipsoid(0,0,0,3.2,2.7,2.7)) },  // detrusor muscle
      { color: '#5dade2', voxels: unique(ellipsoid(0,-1,0,0.8,0.5,0.8)) }, // trigone
    ],
  },

  prostate: {
    label: 'Prostate',
    system: 'Urological',
    icon: '⚙️',
    color: '#e8a857',
    description: 'Prostate adenocarcinoma (Gleason scoring)',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 2.8, 2.2, 2.5),
      ...ellipsoid(-2, 1.5, 0, 1.5, 1, 1),
      ...ellipsoid(2, 1.5, 0, 1.5, 1, 1),
    ]),
    interior: [
      { color: '#f5cba7', voxels: unique(ellipsoid(0,0,0,1.5,1.5,1.5)) },   // peripheral zone
      { color: '#f0b27a', voxels: unique(ellipsoid(0,0.5,0,0.8,0.8,0.8)) }, // central zone
      { color: '#d4e6f1', voxels: unique(cylinder(0,0,-2.5,2.5,0.35)) },    // urethra
    ],
  },

  testes: {
    label: 'Testes',
    system: 'Urological',
    icon: '⚪',
    color: '#f0e0c0',
    description: 'Testicular germ cell tumors (seminoma, NSGCT)',
    voxels: unique([
      ...ellipsoid(-2.5, 0, 0, 1.8, 2.2, 1.8),
      ...ellipsoid(2.5, 0, 0, 1.8, 2.2, 1.8),
      ...sphere(-3, 2, 0, 0.8),
      ...sphere(3, 2, 0, 0.8),
    ]),
    interior: [
      { color: '#fdfefe', voxels: unique([...ellipsoid(-2.5,0,0,1.3,1.7,1.3), ...ellipsoid(2.5,0,0,1.3,1.7,1.3)]) }, // seminiferous tubules
      { color: '#f9e79f', voxels: unique([...sphere(-2.5,0,0,0.5), ...sphere(2.5,0,0,0.5)]) },                        // Leydig cells (interstitial)
    ],
  },

  // ══ GYNECOLOGICAL ═══════════════════════════════════════════════════════

  ovaries: {
    label: 'Ovaries',
    system: 'Gynecological',
    icon: '🔮',
    color: '#d4a0c8',
    description: 'Epithelial ovarian carcinoma (high-grade serous)',
    voxels: unique([
      ...ellipsoid(-3.5, 0, 0, 2, 2.5, 1.8),
      ...ellipsoid(3.5, 0, 0, 2, 2.5, 1.8),
      // fallopian tubes
      ...tube([[-3.5,2,0],[-1.5,3,0],[0,3,0]], 0.5),
      ...tube([[3.5,2,0],[1.5,3,0],[0,3,0]], 0.5),
    ]),
  
    interior: [
      // ovarian stroma (pale pink)
      { color: '#e8b4c8', voxels: unique([...ellipsoid(-3.5,0,0,1.8,2.2,1.5), ...ellipsoid(3.5,0,0,1.8,2.2,1.5)]) },
      // primary follicles (small, multiple)
      { color: '#f9e4f0', voxels: unique([
        ...sphere(-4,1,0,0.5), ...sphere(-3,1.5,0.3,0.4), ...sphere(-4.5,-0.5,0.3,0.4),
        ...sphere(4,1,0,0.5), ...sphere(3,1.5,0.3,0.4), ...sphere(4.5,-0.5,0.3,0.4),
      ])},
      // graafian follicle / corpus luteum (yellow)
      { color: '#f1c40f', voxels: unique([...sphere(-2.8,0.8,0.5,0.7), ...sphere(2.8,0.8,0.5,0.7)]) },
      // hilum / medulla (darker pink-red)
      { color: '#c0607a', voxels: unique([...sphere(-3.5,0,0,0.7), ...sphere(3.5,0,0,0.7)]) },
      // fallopian tube lumen (teal mucosal folds)
      { color: '#7ecec4', voxels: unique([...tube([[-3.5,2,0],[-1.5,3,0],[0,3,0]], 0.25)]) },
    ],
},

  uterus: {
    label: 'Uterus',
    system: 'Gynecological',
    icon: '🫀',
    color: '#e87a9a',
    description: 'Endometrial carcinoma & uterine sarcoma',
    voxels: unique([
      // corpus
      ...ellipsoid(0, 1, 0, 3, 4, 2.5),
      // cervix
      ...cylinder(0, 0, -3, -1, 1.5),
      // fundus dome
      ...ellipsoid(0, 4, 0, 2.5, 1.5, 2),
    ]),
  
    interior: [
      // myometrium — thick smooth muscle (deep red)
      { color: '#922b21', voxels: unique(subtract(ellipsoid(0,1,0,2.8,3.8,2.3), ellipsoid(0,1,0,1.8,3.0,1.5))) },
      // endometrium lining (bright pink)
      { color: '#f06090', voxels: unique(subtract(ellipsoid(0,1,0,1.8,3.0,1.5), ellipsoid(0,1,0,1.0,2.2,0.8))) },
      // endometrial cavity (pale straw)
      { color: '#fde8d8', voxels: unique(ellipsoid(0,1,0,1.0,2.2,0.8)) },
      // fundal region (darker muscle cap)
      { color: '#7b1a12', voxels: unique(ellipsoid(0,4,0,2.2,1.2,1.8)) },
      // cervical canal (whitish mucus)
      { color: '#f5f0e8', voxels: unique(cylinder(0,0,-3,-0.5,0.6)) },
    ],
},

  cervix: {
    label: 'Cervix',
    system: 'Gynecological',
    icon: '🔴',
    color: '#cc4466',
    description: 'Cervical squamous cell carcinoma & adenocarcinoma',
    voxels: unique([
      ...cylinder(0, 0, -2, 1, 1.8),
      ...ellipsoid(0, -2, 0, 1.8, 1, 1.5),
      // ectocervix
      ...ellipsoid(0, 1, 0, 2, 0.8, 1.8),
    ]),
  
    interior: [
      // ectocervix (pink stratified squamous epithelium)
      { color: '#f08090', voxels: unique(ellipsoid(0,1,0,1.7,0.7,1.6)) },
      // transformation zone (squamocolumnar junction — slightly raised, pale)
      { color: '#f5d0c0', voxels: unique(ellipsoid(0,0.5,0,1.2,0.4,1.2)) },
      // endocervical mucosa (columnar epithelium — pale blue-white)
      { color: '#d6eaf8', voxels: unique(subtract(cylinder(0,0,-2,2,1.4), cylinder(0,0,-2,2,0.8))) },
      // endocervical canal lumen (straw/mucus)
      { color: '#fef9e7', voxels: unique(cylinder(0,0,-2,2,0.8)) },
      // cervical stroma (fibrous, whitish)
      { color: '#e8e0d8', voxels: unique(ellipsoid(0,-2,0,1.5,0.8,1.3)) },
    ],
},

  // ══ HEAD & NECK ══════════════════════════════════════════════════════════

  brain: {
    label: 'Brain',
    system: 'Head & Neck',
    icon: '🧠',
    color: '#f0c0b0',
    description: 'Glioblastoma, meningioma, brain metastases',
    voxels: unique([
      // cerebrum
      ...ellipsoid(0, 0, 0, 6, 5, 6),
      // cerebral fissure — subtract midline
      ...subtract(
        ellipsoid(0, 0, 0, 0.8, 5, 6),
        [] // keep fissure visible by leaving a gap
      ),
      // cerebellum
      ...ellipsoid(0, -4, -3, 3.5, 2.5, 3),
      // brain stem
      ...cylinder(0, 0, -6, -4, 1.2),
    ]),
  
    interior: [
      { color: '#c39b8a', voxels: unique(subtract(ellipsoid(0,0,0,5.5,4.5,5.5), ellipsoid(0,0,0,4.5,3.5,4.5))) }, // gray matter cortex
      { color: '#f5f0e8', voxels: unique(ellipsoid(0,0,0,4.2,3.2,4.2)) },   // white matter
      { color: '#e8e4dc', voxels: unique(ellipsoid(0,0.5,0,2.8,0.5,1.8)) }, // corpus callosum
      { color: '#aed6f1', voxels: unique([                                    // lateral ventricles (CSF)
        ...ellipsoid(-2,1,0,1.4,0.8,0.8), ...ellipsoid(2,1,0,1.4,0.8,0.8),
      ])},
      { color: '#aed6f1', voxels: unique(ellipsoid(0,0,0,0.4,1.2,0.6)) },   // third ventricle
      { color: '#d4956a', voxels: unique(ellipsoid(0,0,0,1.2,0.8,1.2)) },   // thalamus (orange-tan)
      { color: '#d4b0a0', voxels: unique(ellipsoid(0,-4,-3,2.5,1.8,2.3)) }, // cerebellum interior
      { color: '#b8856a', voxels: unique(cylinder(0,0,-7,-3,0.9)) },         // brainstem
    ],
},

  thyroid: {
    label: 'Thyroid',
    system: 'Head & Neck',
    icon: '🦋',
    color: '#90c8a0',
    description: 'Papillary, follicular, medullary & anaplastic carcinoma',
    voxels: unique([
      ...ellipsoid(-2, 0, 0, 2, 2.5, 1.2),
      ...ellipsoid(2, 0, 0, 2, 2.5, 1.2),
      // isthmus
      ...cylinder(0, 0, -0.5, 0.5, 0.8),
    ]),
  
    interior: [
      // follicular stroma (pale pink connective tissue)
      { color: '#d5e8d4', voxels: unique([...ellipsoid(-2,0,0,1.8,2.3,1.1), ...ellipsoid(2,0,0,1.8,2.3,1.1)]) },
      // thyroid follicles with colloid (golden-amber)
      { color: '#f0c060', voxels: unique([
        ...sphere(-1.5,0.8,0,0.55), ...sphere(-2.5,0.8,0,0.5), ...sphere(-2,0,0.3,0.45), ...sphere(-1.8,-0.8,0,0.5),
        ...sphere(1.5,0.8,0,0.55), ...sphere(2.5,0.8,0,0.5), ...sphere(2,0,0.3,0.45), ...sphere(1.8,-0.8,0,0.5),
      ])},
      // follicular epithelium (darker green rim)
      { color: '#7dbe8a', voxels: unique([
        ...sphere(-1.5,0.8,0,0.35), ...sphere(-2.5,0.8,0,0.3), ...sphere(-2,0,0.3,0.25),
        ...sphere(1.5,0.8,0,0.35), ...sphere(2.5,0.8,0,0.3), ...sphere(2,0,0.3,0.25),
      ])},
      // isthmus connection (pink)
      { color: '#c8e0b0', voxels: unique(cylinder(0,0,-0.5,0.5,0.6)) },
      // blood vessels (red streaks)
      { color: '#c0392b', voxels: unique([...tube([[-3,0,0],[-1,0,0],[0,0,0]], 0.2), ...tube([[3,0,0],[1,0,0],[0,0,0]], 0.2)]) },
    ],
},

  larynx: {
    label: 'Larynx',
    system: 'Head & Neck',
    icon: '🎙️',
    color: '#c8d8a0',
    description: 'Laryngeal squamous cell carcinoma',
    voxels: unique([
      ...hollowCylinder(0, 0, -1, 4, 2.5, 1.5),
      // epiglottis
      ...ellipsoid(0, 4.5, -0.5, 1.5, 1, 0.5),
      // vocal cords
      ...ellipsoid(0, 1, 0, 2, 0.4, 1.4),
    ]),
  
    interior: [
      // thyroid cartilage inner surface (yellow cartilage)
      { color: '#e8d870', voxels: unique(subtract(hollowCylinder(0,0,-1,4,2.4,1.4), hollowCylinder(0,0,-1,4,2.0,1.3))) },
      // mucosal lining (pink)
      { color: '#e88080', voxels: unique(subtract(hollowCylinder(0,0,-1,4,2.0,1.3), hollowCylinder(0,0,-1,4,1.5,1.0))) },
      // airway lumen (pale blue air)
      { color: '#b3d9f5', voxels: unique(hollowCylinder(0,0,-1,4,1.5,1.0)) },
      // vocal cords (white, at mid-larynx)
      { color: '#f5f5f5', voxels: unique(ellipsoid(0,1,0,1.8,0.25,0.5)) },
      // epiglottis (pale cartilage)
      { color: '#f0e090', voxels: unique(ellipsoid(0,4.5,-0.5,1.2,0.8,0.35)) },
      // arytenoid cartilages (yellow knobs)
      { color: '#ddd060', voxels: unique([...sphere(-0.8,1.5,0,0.4), ...sphere(0.8,1.5,0,0.4)]) },
    ],
},

  oralCavity: {
    label: 'Oral Cavity',
    system: 'Head & Neck',
    icon: '👄',
    color: '#f08080',
    description: 'Oral squamous cell carcinoma (tongue, floor, buccal)',
    voxels: unique([
      // tongue
      ...ellipsoid(0, -1, 0, 3, 2, 2),
      // floor of mouth
      ...ellipsoid(0, -3, 0, 3.5, 1, 2),
      // palate
      ...ellipsoid(0, 1, 0, 3.5, 0.8, 2.5),
      // cheeks
      ...ellipsoid(-3.5, 0, 0, 0.8, 2, 2),
      ...ellipsoid(3.5, 0, 0, 0.8, 2, 2),
    ]),
  
    interior: [
      // tongue musculature (dark red striated muscle)
      { color: '#c0392b', voxels: unique(ellipsoid(0,-1,0,2.7,1.8,1.8)) },
      // tongue dorsal mucosa (pink epithelium)
      { color: '#f08090', voxels: unique(subtract(ellipsoid(0,-0.5,0,2.7,1.8,1.8), ellipsoid(0,-0.8,0,2.3,1.5,1.5))) },
      // hard palate (whitish bone)
      { color: '#f0ece4', voxels: unique(ellipsoid(0,1,0,3.2,0.6,2.2)) },
      // soft palate / uvula (pink)
      { color: '#e87890', voxels: unique([...ellipsoid(0,0.5,0,1.5,0.5,1.5), ...sphere(0,-0.5,0,0.5)]) },
      // tonsillar pillars (lymphoid, deep pink-red)
      { color: '#a93250', voxels: unique([...ellipsoid(-3,0,0,0.6,1.8,1.8), ...ellipsoid(3,0,0,0.6,1.8,1.8)]) },
      // floor of mouth submucosa (pale pink)
      { color: '#f5d0d0', voxels: unique(ellipsoid(0,-3,0,3,0.7,1.8)) },
      // salivary ducts (pale white streaks)
      { color: '#f5f5f0', voxels: unique([...tube([[0,-2,1],[0,-1,0],[0,0,-0.5]], 0.2)]) },
    ],
},

  salivaryGland: {
    label: 'Salivary Glands',
    system: 'Head & Neck',
    icon: '💦',
    color: '#a8d4e8',
    description: 'Mucoepidermoid carcinoma & adenoid cystic carcinoma',
    voxels: unique([
      // parotid (largest)
      ...ellipsoid(-4, 2, 2, 2.5, 3, 2),
      ...ellipsoid(4, 2, 2, 2.5, 3, 2),
      // submandibular
      ...ellipsoid(-3, -1, 0, 1.5, 1.5, 1.2),
      ...ellipsoid(3, -1, 0, 1.5, 1.5, 1.2),
      // sublingual
      ...ellipsoid(-1.5, -2, 0, 1, 1, 0.8),
      ...ellipsoid(1.5, -2, 0, 1, 1, 0.8),
    ]),
  
    interior: [
      // parotid acini (serous, pale tan)
      { color: '#f5deb3', voxels: unique([...ellipsoid(-4,2,2,2.2,2.7,1.8), ...ellipsoid(4,2,2,2.2,2.7,1.8)]) },
      // parotid ductal network (white streaks)
      { color: '#f0f0e8', voxels: unique([
        ...tube([[-4,2,2],[-2,0,1],[-1,0,0]], 0.25), ...tube([[4,2,2],[2,0,1],[1,0,0]], 0.25),
      ])},
      // submandibular acini (mixed mucous, pale blue-grey)
      { color: '#d0e8f0', voxels: unique([...ellipsoid(-3,-1,0,1.3,1.3,1), ...ellipsoid(3,-1,0,1.3,1.3,1)]) },
      // sublingual acini (mucous, pale)
      { color: '#c8e0ea', voxels: unique([...sphere(-1.5,-2,0,0.75), ...sphere(1.5,-2,0,0.75)]) },
      // blood vessels in parotid (red)
      { color: '#d44040', voxels: unique([...sphere(-4.5,2.5,2.5,0.35), ...sphere(3.5,2.5,2.5,0.35)]) },
      // facial nerve branches (yellow)
      { color: '#f5c518', voxels: unique([...tube([[-5,2,2],[-4,3,2.5],[-3,4,2.5]], 0.15), ...tube([[5,2,2],[4,3,2.5],[3,4,2.5]], 0.15)]) },
    ],
},

  nasopharynx: {
    label: 'Nasopharynx',
    system: 'Head & Neck',
    icon: '👃',
    color: '#f0b0a0',
    description: 'Nasopharyngeal carcinoma (EBV-associated)',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3, 2, 3),
      // nasal cavity
      ...ellipsoid(0, 2, 0, 2.5, 1.5, 2),
      // turbinates
      ...ellipsoid(-1, 2, 0.5, 0.8, 1.2, 0.5),
      ...ellipsoid(1, 2, 0.5, 0.8, 1.2, 0.5),
    ]),
  
    interior: [
      // posterior nasopharynx wall mucosa (pink)
      { color: '#f08878', voxels: unique(subtract(ellipsoid(0,0,0,2.8,1.8,2.8), ellipsoid(0,0,0,2.0,1.2,2.0))) },
      // lymphoid tissue / adenoids (purple-red Waldeyer's ring)
      { color: '#9b5080', voxels: unique([...ellipsoid(0,1.5,-1,2,0.8,1.5), ...ellipsoid(-1.5,0.5,-1,0.7,0.8,0.8), ...ellipsoid(1.5,0.5,-1,0.7,0.8,0.8)]) },
      // airway lumen (blue-grey air space)
      { color: '#b3d9f5', voxels: unique(ellipsoid(0,0,0,1.5,1.0,1.5)) },
      // nasal turbinates (scroll-like, pink)
      { color: '#e07070', voxels: unique([...ellipsoid(-1,2,0.5,0.7,1.0,0.4), ...ellipsoid(1,2,0.5,0.7,1.0,0.4)]) },
      // Eustachian tube openings (pale oval patches)
      { color: '#f0e0d0', voxels: unique([...ellipsoid(-2.5,0,0,0.4,0.6,0.5), ...ellipsoid(2.5,0,0,0.4,0.6,0.5)]) },
    ],
},

  // ══ BREAST ══════════════════════════════════════════════════════════════

  breast: {
    label: 'Breast',
    system: 'Breast',
    icon: '⭕',
    color: '#f5c2c7',
    description: 'Invasive ductal & lobular carcinoma, HER2+, TNBC',
    voxels: unique([
      // right breast parenchyma
      ...ellipsoid(-5, 0, 2, 3.5, 3.5, 3),
      // ductal system right
      ...tube([[-5,0,2],[-5,0,-1],[-4,0,-2]], 0.6),
      // left breast
      ...ellipsoid(5, 0, 2, 3.5, 3.5, 3),
      ...tube([[5,0,2],[5,0,-1],[4,0,-2]], 0.6),
      // nipple area
      ...sphere(-5, 0, 4.8, 0.8),
      ...sphere(5, 0, 4.8, 0.8),
    ]),
  
    interior: [
      // fatty stroma / Cooper's ligament background (pale yellow)
      { color: '#f9f0d8', voxels: unique([...ellipsoid(-5,0,2,3.2,3.2,2.7), ...ellipsoid(5,0,2,3.2,3.2,2.7)]) },
      // lobular units (small pale pink clusters = TDLU)
      { color: '#f5c0c8', voxels: unique([
        ...sphere(-5.5,1,2,0.7), ...sphere(-4.5,1,1.5,0.6), ...sphere(-5,-1,2,0.6), ...sphere(-5.5,0,0.5,0.6),
        ...sphere(5.5,1,2,0.7), ...sphere(4.5,1,1.5,0.6), ...sphere(5,-1,2,0.6), ...sphere(5.5,0,0.5,0.6),
      ])},
      // lactiferous ducts (white branching tubes)
      { color: '#f5f0e8', voxels: unique([
        ...tube([[-5.5,1,2],[-5,0,1],[-5,0,-1]], 0.3), ...tube([[-4.5,1,1.5],[-5,0,1]], 0.25),
        ...tube([[5.5,1,2],[5,0,1],[5,0,-1]], 0.3), ...tube([[4.5,1,1.5],[5,0,1]], 0.25),
      ])},
      // nipple areolar complex (darker pink)
      { color: '#d4708a', voxels: unique([...sphere(-5,0,4.8,0.6), ...sphere(5,0,4.8,0.6)]) },
      // blood vessels (red)
      { color: '#c0392b', voxels: unique([...tube([[-7,0,2],[-5,0,2],[-3,0,2]], 0.2), ...tube([[7,0,2],[5,0,2],[3,0,2]], 0.2)]) },
    ],
},

  // ══ HEMATOLOGICAL ═══════════════════════════════════════════════════════

  bonemarrow: {
    label: 'Bone Marrow',
    system: 'Hematological',
    icon: '🦴',
    color: '#e8d5a0',
    description: 'AML, ALL, MDS, multiple myeloma',
    voxels: unique([
      // vertebral column
      ...ellipsoid(0, 7, 0, 2.8, 1.2, 2.8),
      ...ellipsoid(0, 4, 0, 2.8, 1.2, 2.8),
      ...ellipsoid(0, 1, 0, 2.8, 1.2, 2.8),
      ...ellipsoid(0, -2, 0, 2.8, 1.2, 2.8),
      ...ellipsoid(0, -5, 0, 2.8, 1.2, 2.8),
      // pedicles connecting
      ...cylinder(0, 0, 5.5, 7.5, 0.7),
      ...cylinder(0, 0, 2.5, 4.5, 0.7),
      ...cylinder(0, 0, -0.5, 2.5, 0.7),
      ...cylinder(0, 0, -3.5, -0.5, 0.7),
      // iliac crests (high marrow content)
      ...ellipsoid(-5, -1, 0, 3.5, 2, 2),
      ...ellipsoid(5, -1, 0, 3.5, 2, 2),
      // sternum
      ...ellipsoid(0, 3, 3.5, 0.8, 5, 0.5),
      // femoral heads
      ...sphere(-4, -7, 0, 2),
      ...sphere(4, -7, 0, 2),
    ]),
  
    interior: [
      // cortical bone of vertebrae (white)
      { color: '#f5f0e8', voxels: unique([
        ...subtract(ellipsoid(0,7,0,2.8,1.2,2.8), ellipsoid(0,7,0,2.0,0.8,2.0)),
        ...subtract(ellipsoid(0,4,0,2.8,1.2,2.8), ellipsoid(0,4,0,2.0,0.8,2.0)),
        ...subtract(ellipsoid(0,1,0,2.8,1.2,2.8), ellipsoid(0,1,0,2.0,0.8,2.0)),
        ...subtract(ellipsoid(0,-2,0,2.8,1.2,2.8), ellipsoid(0,-2,0,2.0,0.8,2.0)),
        ...subtract(ellipsoid(0,-5,0,2.8,1.2,2.8), ellipsoid(0,-5,0,2.0,0.8,2.0)),
      ])},
      // red marrow in vertebral bodies (deep red)
      { color: '#b03030', voxels: unique([
        ...ellipsoid(0,7,0,2.0,0.8,2.0), ...ellipsoid(0,4,0,2.0,0.8,2.0),
        ...ellipsoid(0,1,0,2.0,0.8,2.0), ...ellipsoid(0,-2,0,2.0,0.8,2.0), ...ellipsoid(0,-5,0,2.0,0.8,2.0),
      ])},
      // red marrow in iliac crests (active hematopoiesis)
      { color: '#cc3030', voxels: unique([...ellipsoid(-5,-1,0,3.2,1.7,1.7), ...ellipsoid(5,-1,0,3.2,1.7,1.7)]) },
      // yellow marrow in femoral shafts (fatty, yellow)
      { color: '#f5c040', voxels: unique([...ellipsoid(-4,-7,0,1.5,1.5,1.5), ...ellipsoid(4,-7,0,1.5,1.5,1.5)]) },
      // sinusoids / vasculature (dark red)
      { color: '#8b0000', voxels: unique([...tube([[0,-1,0],[0,3,0],[0,7,0]], 0.4)]) },
      // sternum marrow (red)
      { color: '#c02828', voxels: unique(ellipsoid(0,3,3.5,0.5,4.5,0.3)) },
    ],
},

  lymphNodes: {
    label: 'Lymph Nodes',
    system: 'Hematological',
    icon: '🔵',
    color: '#a0c4e8',
    description: 'Hodgkin & Non-Hodgkin lymphoma, nodal metastases',
    voxels: unique([
      // cervical chain bilateral
      ...sphere(0, 8, 0, 1.5),
      ...sphere(-2, 7, 0, 1.2),
      ...sphere(2, 7, 0, 1.2),
      ...sphere(-2.5, 5.5, 0, 1),
      ...sphere(2.5, 5.5, 0, 1),
      // supraclavicular
      ...sphere(-4, 4, 0, 1.2),
      ...sphere(4, 4, 0, 1.2),
      // axillary bilateral
      ...sphere(-6, 2, 0, 1.5),
      ...sphere(-5.5, 0, 0, 1.2),
      ...sphere(6, 2, 0, 1.5),
      ...sphere(5.5, 0, 0, 1.2),
      // mediastinal
      ...sphere(-1.5, 1, 0, 1.2),
      ...sphere(1.5, 1, 0, 1.2),
      ...sphere(0, -0.5, 0, 1.2),
      ...sphere(0, -2, 0, 1),
      // para-aortic
      ...sphere(-1, -4, 0, 1.2),
      ...sphere(1, -4, 0, 1.2),
      // inguinal bilateral
      ...sphere(-5, -6, 0, 1.5),
      ...sphere(-4, -7.5, 0, 1.2),
      ...sphere(5, -6, 0, 1.5),
      ...sphere(4, -7.5, 0, 1.2),
    ]),
  
    interior: [
      // cortical mantle (peripheral B-cell zone, pale tan-pink)
      { color: '#d4b8c8', voxels: unique([
        ...subtract(sphere(0,8,0,1.4), sphere(0,8,0,0.9)),
        ...subtract(sphere(-2,7,0,1.1), sphere(-2,7,0,0.7)),
        ...subtract(sphere(2,7,0,1.1), sphere(2,7,0,0.7)),
      ])},
      // germinal centers (pale blue-white reactive follicles)
      { color: '#d6eaf8', voxels: unique([
        ...sphere(0,8,0,0.55), ...sphere(-2,7,0,0.42), ...sphere(2,7,0,0.42),
        ...sphere(-5.5,0,0,0.5), ...sphere(5.5,0,0,0.5),
        ...sphere(-1.5,1,0,0.4), ...sphere(1.5,1,0,0.4),
      ])},
      // paracortex (T-cell zone, pink)
      { color: '#e88898', voxels: unique([
        ...sphere(-2.5,5.5,0,0.7), ...sphere(2.5,5.5,0,0.7),
        ...sphere(-6,2,0,0.8), ...sphere(6,2,0,0.8),
        ...sphere(-1,-4,0,0.7), ...sphere(1,-4,0,0.7),
      ])},
      // medullary cords / sinuses (dark purple-red)
      { color: '#8e44ad', voxels: unique([
        ...sphere(0,-0.5,0,0.7), ...sphere(0,-2,0,0.7),
        ...sphere(-4,-7.5,0,0.7), ...sphere(4,-7.5,0,0.7),
      ])},
      // capsule (thin, light grey)
      { color: '#c8c0b8', voxels: unique([
        ...subtract(sphere(-4,4,0,1.1), sphere(-4,4,0,0.85)), ...subtract(sphere(4,4,0,1.1), sphere(4,4,0,0.85)),
        ...subtract(sphere(-5,-6,0,1.4), sphere(-5,-6,0,1.1)), ...subtract(sphere(5,-6,0,1.4), sphere(5,-6,0,1.1)),
      ])},
    ],
},

  // ══ ENDOCRINE ═══════════════════════════════════════════════════════════

  adrenal: {
    label: 'Adrenal Glands',
    system: 'Endocrine',
    icon: '🫐',
    color: '#f0d080',
    description: 'Adrenocortical carcinoma & pheochromocytoma',
    voxels: unique([
      // right (triangular)
      ...ellipsoid(-5, 3, 0, 1.8, 1.2, 1),
      ...ellipsoid(-5.5, 4, 0, 1, 0.8, 0.8),
      // left (crescentic)
      ...ellipsoid(5, 3, 0, 1.5, 1.5, 1),
      ...ellipsoid(5.5, 2, 0, 1, 1, 0.8),
    ]),
  
    interior: [
      // adrenal cortex — zona glomerulosa (outer, pale yellow)
      { color: '#f9e79f', voxels: unique([
        ...subtract(ellipsoid(-5,3,0,1.7,1.1,0.9), ellipsoid(-5,3,0,1.2,0.8,0.6)),
        ...subtract(ellipsoid(5,3,0,1.4,1.4,0.9), ellipsoid(5,3,0,1.0,1.0,0.6)),
      ])},
      // zona fasciculata (middle cortex — golden yellow, lipid-rich)
      { color: '#f0c040', voxels: unique([
        ...subtract(ellipsoid(-5,3,0,1.2,0.8,0.6), ellipsoid(-5,3,0,0.7,0.5,0.4)),
        ...subtract(ellipsoid(5,3,0,1.0,1.0,0.6), ellipsoid(5,3,0,0.6,0.6,0.4)),
      ])},
      // zona reticularis (inner cortex — darker orange-red)
      { color: '#e08030', voxels: unique([...ellipsoid(-5,3,0,0.7,0.5,0.4), ...ellipsoid(5,3,0,0.6,0.6,0.4)]) },
      // adrenal medulla (deep brown-red catecholamine cells)
      { color: '#7b3a2a', voxels: unique([...sphere(-5,3,0,0.3), ...sphere(5,3,0,0.3)]) },
      // accessory lobes (pale cortex)
      { color: '#f5e88a', voxels: unique([...ellipsoid(-5.5,4,0,0.8,0.6,0.6), ...ellipsoid(5.5,2,0,0.8,0.8,0.6)]) },
    ],
},

  // ══ DERMATOLOGICAL ══════════════════════════════════════════════════════

  skin: {
    label: 'Skin',
    system: 'Dermatological',
    icon: '🔲',
    color: '#f5cba7',
    description: 'Melanoma, basal cell & squamous cell carcinoma',
    voxels: (() => {
      const v = []
      for (let x = -9; x <= 9; x++)
        for (let z = -9; z <= 9; z++) {
          const d = x*x + z*z
          if (d <= 81) {
            const y = Math.round(-d / 50)
            // epidermis layer
            v.push({ x, y: y+1, z })
            // dermis layer
            v.push({ x, y, z })
          }
        }
      return unique(v)
    })(),
  
    interior: [
      // hypodermis / subcutaneous fat (yellow, deepest)
      { color: '#f5d060', voxels: unique((() => {
        const v = []
        for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) {
          if (x*x+z*z <= 64) { const y = Math.round(-x*x/50-z*z/50); v.push({x,y:y-1,z}) }
        }
        return v
      })())},
      // dermis (collagen-rich, pale pink-beige)
      { color: '#f0d0b0', voxels: unique((() => {
        const v = []
        for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) {
          if (x*x+z*z <= 64) { const y = Math.round(-x*x/50-z*z/50); v.push({x,y,z}) }
        }
        return v
      })())},
      // epidermis (outermost thin layer, slightly darker tan)
      { color: '#d4a878', voxels: unique((() => {
        const v = []
        for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) {
          if (x*x+z*z <= 64) { const y = Math.round(-x*x/50-z*z/50); v.push({x,y:y+1,z}) }
        }
        return v
      })())},
      // hair follicles (small dark brown dots)
      { color: '#6b3a2a', voxels: unique([
        ...sphere(-3,0,-3,0.3), ...sphere(0,0,-3,0.3), ...sphere(3,0,-3,0.3),
        ...sphere(-4,0,0,0.3), ...sphere(0,0,0,0.3), ...sphere(4,0,0,0.3),
        ...sphere(-2,0,3,0.3), ...sphere(2,0,3,0.3),
      ])},
      // blood vessels in dermis (red capillary loops)
      { color: '#c03030', voxels: unique([
        ...tube([[-5,0,-5],[-2,0,-2],[0,0,0]], 0.18), ...tube([[5,0,5],[2,0,2],[0,0,0]], 0.18),
      ])},
      // eccrine sweat glands (pale blue-grey coiled)
      { color: '#a8d0e8', voxels: unique([...sphere(-5,0,2,0.35), ...sphere(5,0,-2,0.35), ...sphere(0,0,5,0.35)]) },
    ],
},

  // ══ MUSCULOSKELETAL ══════════════════════════════════════════════════════

  bone: {
    label: 'Bone',
    system: 'Musculoskeletal',
    icon: '💀',
    color: '#f0f0e0',
    description: 'Osteosarcoma, chondrosarcoma & Ewing sarcoma',
    voxels: unique([
      // femur
      ...hollowCylinder(0, 0, -8, 8, 2.2, 1.2),
      // femoral head
      ...sphere(0, 8.5, 0, 2.5),
      // epiphysis bottom
      ...ellipsoid(0, -8, 0, 2.5, 1.5, 2.5),
      // medullary canal (marrow space)
      ...cylinder(0, 0, -6, 6, 1),
    ]),
  
    interior: [
      // periosteum (thin outer fibrous layer, white)
      { color: '#fffbf0', voxels: unique([
        ...subtract(hollowCylinder(0,0,-8,8,2.3,1.8), hollowCylinder(0,0,-8,8,2.1,1.9)),
        ...subtract(sphere(0,8.5,0,2.5), sphere(0,8.5,0,2.2)),
      ])},
      // cortical bone (dense, ivory-white)
      { color: '#f5f0e0', voxels: unique([...hollowCylinder(0,0,-8,8,2.1,1.3)]) },
      // endosteum + inner spongy trabeculae (slightly yellow)
      { color: '#f0e8c0', voxels: unique([...hollowCylinder(0,0,-8,8,1.3,1.0)]) },
      // medullary canal — yellow fatty marrow (bright yellow)
      { color: '#f0c840', voxels: unique(cylinder(0,0,-6,6,0.9)) },
      // red marrow at epiphyses (active hematopoiesis, deep red)
      { color: '#c02828', voxels: unique([...ellipsoid(0,8.5,0,1.8,1.8,1.8), ...ellipsoid(0,-8,0,2.0,1.2,2.0)]) },
      // cancellous trabecular bone at epiphyses (pale tan)
      { color: '#e8d8a0', voxels: unique([
        ...subtract(sphere(0,8.5,0,2.2), ellipsoid(0,8.5,0,1.8,1.8,1.8)),
        ...subtract(ellipsoid(0,-8,0,2.5,1.5,2.5), ellipsoid(0,-8,0,2.0,1.2,2.0)),
      ])},
    ],
},

  softTissue: {
    label: 'Soft Tissue',
    system: 'Musculoskeletal',
    icon: '💪',
    color: '#e89080',
    description: 'Sarcomas: liposarcoma, leiomyosarcoma, GIST',
    voxels: unique([
      // thigh muscle mass
      ...ellipsoid(0, 0, 0, 4, 6, 4),
      // fascial planes (subtract to show layers)
      ...ellipsoid(-2, 0, 0, 3.5, 5.5, 3.5),
      ...ellipsoid(2, 0, 0, 3.5, 5.5, 3.5),
    ]),
  
    interior: [
      // epimysium / outer fascia (pale grey-white)
      { color: '#e8e0d8', voxels: unique(subtract(ellipsoid(0,0,0,4,6,4), ellipsoid(0,0,0,3.6,5.6,3.6))) },
      // perimysium (connective tissue between bundles, light pink)
      { color: '#e8c0b0', voxels: unique([
        ...subtract(ellipsoid(-1.5,0,0,1.5,5.2,1.5), ellipsoid(-1.5,0,0,1.1,4.8,1.1)),
        ...subtract(ellipsoid(1.5,0,0,1.5,5.2,1.5), ellipsoid(1.5,0,0,1.1,4.8,1.1)),
        ...subtract(ellipsoid(0,0,-1.5,1.5,5.2,1.5), ellipsoid(0,0,-1.5,1.1,4.8,1.1)),
        ...subtract(ellipsoid(0,0,1.5,1.5,5.2,1.5), ellipsoid(0,0,1.5,1.1,4.8,1.1)),
      ])},
      // muscle fiber bundles (red striated muscle)
      { color: '#c0392b', voxels: unique([
        ...ellipsoid(-1.5,0,0,1.0,4.8,1.0), ...ellipsoid(1.5,0,0,1.0,4.8,1.0),
        ...ellipsoid(0,0,-1.5,1.0,4.8,1.0), ...ellipsoid(0,0,1.5,1.0,4.8,1.0),
      ])},
      // adipose tissue (intramuscular fat, yellow)
      { color: '#f5d060', voxels: unique([...sphere(-2.5,2,0,0.4), ...sphere(2.5,-2,0,0.4), ...sphere(0,3,2,0.4), ...sphere(0,-3,-2,0.4)]) },
      // neurovascular bundle (yellow nerve + red artery)
      { color: '#f0c000', voxels: unique(tube([[0,-5,0],[0,0,0],[0,5,0]], 0.25)) },
      { color: '#d04040', voxels: unique(tube([[-0.5,-5,0],[-0.5,0,0],[-0.5,5,0]], 0.2)) },
    ],
},
}

export default ORGANS
