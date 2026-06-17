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
      ...ellipsoid(-4, -1, 0, 2, 1.5, 2),  // left lobe tail
    ]),
  },

  gallbladder: {
    label: 'Gallbladder',
    system: 'Abdominal',
    icon: '🫒',
    color: '#6b8e3a',
    description: 'Gallbladder carcinoma & biliary tract cancer',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 1.2, 2.5, 1.2),
      ...cylinder(0, 0, 2, 3, 0.6),   // cystic duct
    ]),
  },

  pancreas: {
    label: 'Pancreas',
    system: 'Abdominal',
    icon: '🌿',
    color: '#e8c87a',
    description: 'Pancreatic ductal adenocarcinoma (PDAC)',
    voxels: unique([
      // head
      ...ellipsoid(-3, 0, 0, 2, 2, 1.5),
      // body
      ...ellipsoid(0, 0.5, 0, 2, 1.5, 1.2),
      // tail
      ...ellipsoid(3.5, 1, 0, 2, 1.2, 1),
    ]),
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
      // pylorus
      ...cylinder(3.5, 0, -1, 1, 0.8),
      // cardia
      ...cylinder(-2, 0, 2, 4, 0.8),
    ]),
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
  },

  colon: {
    label: 'Colon',
    system: 'Abdominal',
    icon: '🌀',
    color: '#c8a06e',
    description: 'Colorectal adenocarcinoma',
    voxels: unique(tube([
      [-5,-5,0],[-5,5,0],  // ascending
      [-5,6,0],[0,7,0],     // hepatic flexure
      [0,7,0],[5,6,0],      // transverse
      [5,6,0],[5,-4,0],     // descending
      [5,-4,0],[3,-6,0],    // sigmoid
      [3,-6,0],[0,-7,0],
      [0,-7,0],[-1,-5,0],   // rectum
      [-1,-5,0],[0,-8,0],
    ], 1.4)),
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
  },

  // ══ UROLOGICAL ══════════════════════════════════════════════════════════

  kidney: {
    label: 'Kidneys',
    system: 'Urological',
    icon: '🫘',
    color: '#c05a3a',
    description: 'Renal cell carcinoma (clear cell, papillary)',
    voxels: unique([
      // right kidney
      ...ellipsoid(-5.5, 0, 0, 2, 3.8, 1.8),
      ...ellipsoid(-5.5, 0, 0, 1.4, 3.2, 1.3),
      // renal pelvis right
      ...sphere(-4.5, 0, 0, 0.8),
      // left kidney
      ...ellipsoid(5.5, 0, 0, 2, 3.8, 1.8),
      ...ellipsoid(5.5, 0, 0, 1.4, 3.2, 1.3),
      // renal pelvis left
      ...sphere(4.5, 0, 0, 0.8),
    ]),
  },

  bladder: {
    label: 'Bladder',
    system: 'Urological',
    icon: '💧',
    color: '#7ab8d8',
    description: 'Urothelial (transitional cell) carcinoma',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 3.5, 3, 3),
      // trigone & neck
      ...cylinder(0, 0, -3.5, -2, 0.8),
    ]),
  },

  prostate: {
    label: 'Prostate',
    system: 'Urological',
    icon: '⚙️',
    color: '#e8a857',
    description: 'Prostate adenocarcinoma (Gleason scoring)',
    voxels: unique([
      ...ellipsoid(0, 0, 0, 2.8, 2.2, 2.5),
      // seminal vesicles
      ...ellipsoid(-2, 1.5, 0, 1.5, 1, 1),
      ...ellipsoid(2, 1.5, 0, 1.5, 1, 1),
    ]),
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
      // epididymis
      ...sphere(-3, 2, 0, 0.8),
      ...sphere(3, 2, 0, 0.8),
    ]),
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
  },
}

export default ORGANS
