export const SLIDE_DECKS = {
  'lungs-4': {
    title: 'Stage IV Lung Cancer & the Brain',
    slides: [
      {
        title: 'How Cancer Leaves the Lung',
        narrative: 'At Stage IV, lung cancer has found a way out of the lung entirely. Tumor cells break into the tiny pulmonary veins — the blood vessels that carry oxygen-rich blood from your lung back to your heart. Once inside these veins, cancer cells can ride the bloodstream anywhere in the body.',
        doctorTip: 'Pulmonary vein invasion is the critical step for hematogenous spread in NSCLC. Highlight the vascular anatomy on the 3D model.',
        diagram: 'lung-brain',
      },
      {
        title: 'The Journey: Lung → Heart → Brain',
        narrative: "Think of the bloodstream as a highway system. Cancer cells travel from the pulmonary veins into the left side of the heart, then get pumped out through the aorta — the body's main artery. From the aorta, blood flows directly to the brain via the carotid arteries. This is why lung cancer so commonly spreads to the brain.",
        doctorTip: '"Cannon-ball" metastases are large, round brain or lung deposits typical of hematogenous spread. The round shape reflects tumor emboli expanding in capillary beds.',
        diagram: 'lung-brain',
      },
      {
        title: 'What Are "Cannon-Ball" Metastases?',
        narrative: 'When doctors talk about "cannon-ball" metastases, they mean large, round tumor deposits that show up on scans looking like cannon balls. These form when cancer cells get stuck in the small blood vessels of the brain, then grow outward in all directions, forming a sphere. They are a hallmark of Stage IV lung cancer.',
        doctorTip: 'Multiple bilateral rounded pulmonary nodules or brain lesions of similar size suggest hematogenous seeding. SRS (stereotactic radiosurgery) can target up to 3–4 brain lesions.',
        diagram: null,
      },
      {
        title: 'Nerve Disruption: The Vagus & Phrenic',
        narrative: 'The lung is controlled by two major nerves: the vagus nerve (which also controls your voice box and heart rate) and the phrenic nerve (which controls the diaphragm — the muscle that makes you breathe). Stage IV lung cancer can compress or invade these nerves, causing hoarseness, a drooping eyelid (Horner syndrome), or difficulty breathing.',
        doctorTip: 'Left recurrent laryngeal nerve palsy (hoarseness) suggests aortopulmonary window node involvement. Phrenic nerve palsy causes hemidiaphragm elevation on CXR.',
        diagram: null,
      },
      {
        title: 'What This Means for Your Treatment',
        narrative: 'Even though the cancer has spread to the brain, there are effective treatments. Targeted therapies (for cancers with specific gene mutations like EGFR or ALK) can cross the blood-brain barrier. Immunotherapy can activate your own immune system to fight the cancer. Radiation can precisely target brain tumors. Your team will design a plan that addresses both the lung primary and the brain metastases.',
        doctorTip: 'For EGFR-mutant NSCLC with brain mets, osimertinib (3rd gen EGFR TKI) achieves >90% CNS response rate and is preferred over WBRT. Check for brain mets before starting systemic therapy.',
        diagram: null,
      },
    ],
  },

  'lungs-1': {
    title: 'Stage I Lung Cancer: Hidden Inside',
    slides: [
      {
        title: 'What Stage I Really Means',
        narrative: 'Stage I lung cancer sounds early — and it is, in terms of spread. The cancer is still inside the lung and has not reached lymph nodes or spread to other organs. But "early stage" does not mean "on the surface." The tumor is often deep inside the lung tissue, growing within or near the bronchial tubes that carry air.',
        doctorTip: 'Stage IA tumors (≤3 cm) have 5-year survival of ~80–85% with surgical resection. Stage IB (>3 cm, or visceral pleural invasion) drops to ~70%. Sublobar resection vs lobectomy debate ongoing for small peripheral lesions.',
        diagram: null,
      },
      {
        title: 'Inside the Bronchial Wall',
        narrative: "Imagine a garden hose — that is roughly what a bronchus (airway tube) looks like. The tumor often starts growing in the inner lining of this tube. At Stage I, it has grown through several layers of the bronchial wall but is still contained within the lung. The outer surface of the lung may look completely normal.",
        doctorTip: 'Endobronchial lesions visible on bronchoscopy are only a subset. Peripheral adenocarcinomas (the most common histology now) grow in the alveolar parenchyma and are invisible bronchoscopically.',
        diagram: null,
      },
      {
        title: 'Invisible Spread: Micro-Invasion',
        narrative: 'Here is something important to understand: even at Stage I, when we look at the tumor tissue under a microscope, we sometimes see tiny cancer cells that have started to creep into the lymph vessels and small blood vessels around the tumor. These are called micro-invasion or lymphovascular invasion (LVI). They are too small to show on any scan, but they matter.',
        doctorTip: 'LVI at Stage I is associated with higher recurrence risk and may influence adjuvant chemotherapy decisions. LCSG and LACE meta-analysis data supports adjuvant cisplatin-based chemo for Stage IB with high-risk features.',
        diagram: 'vessel-highway',
      },
      {
        title: 'The Power of Early Detection',
        narrative: 'This is why catching lung cancer at Stage I is so important. At this stage, surgery alone — removing the tumor and a margin of healthy lung — can cure the cancer in the majority of patients. The cancer has not yet found the lymphatic "highway" to spread. We are intercepting it before it learns to travel.',
        doctorTip: 'NLST and NELSON trials showed low-dose CT (LDCT) screening reduces lung cancer mortality by 20–24% in high-risk individuals. Discuss annual LDCT for eligible patients (age 50–80, 20+ pack-year history).',
        diagram: null,
      },
      {
        title: 'What Happens Next',
        narrative: 'For most Stage I lung cancers, the recommended treatment is surgery — either a lobectomy (removing a lobe of the lung) or a smaller segmentectomy. After surgery, your team will monitor you closely with regular CT scans. Some patients may receive additional chemotherapy if certain risk features are found in the removed tissue.',
        doctorTip: 'SBRT (stereotactic body radiotherapy) is an alternative for medically inoperable Stage I patients, achieving local control rates of 85–90% at 3 years. RTOG 0236 established modern SBRT protocols.',
        diagram: null,
      },
    ],
  },

  'lungs-2': {
    title: 'Stage II Lung Cancer: The Lymph Node Highway',
    slides: [
      {
        title: 'What Changed at Stage II',
        narrative: "At Stage II, the cancer has done something significant: it has reached the lymph nodes near the root of the lung. These are called hilar lymph nodes — 'hilar' means the doorway where blood vessels and airways enter and exit the lung. This is the first major step in the cancer's journey beyond the lung itself.",
        doctorTip: 'N1 disease (ipsilateral peribronchial or hilar nodes) defines Stage II. Distinguish from N2 (mediastinal nodes, Stage III). Accurate mediastinal staging (PET + EBUS-TBNA) is essential.',
        diagram: 'lymph-spread',
      },
      {
        title: 'The Lymphatic Highway System',
        narrative: "Your body has a second circulation system besides blood — the lymphatic system. It is like a network of rivers running alongside the blood vessels. Lymph nodes are like filters along this river. When cancer cells break off from the tumor, they can enter these lymph channels and travel to the nearest lymph nodes — in this case, the hilar nodes.",
        doctorTip: 'Lymphatic drainage from the lung follows predictable patterns by lobe: RUL drains to right paratracheal nodes (4R); LUL drains to AP window (5); lower lobes to subcarinal (7). Know the map for surgical planning.',
        diagram: 'lymph-spread',
      },
      {
        title: 'Bronchovascular Bundles: The Internal Framework',
        narrative: 'Inside each lung lobe, blood vessels and airways travel together in bundles — like cables in a cord. These are called bronchovascular bundles. They are surrounded by lymphatic channels. At Stage II, the cancer is using these bundles as tracks to spread from the tumor toward the lymph nodes. On X-ray view, you can see these pathways highlighted.',
        doctorTip: 'Peritumoral ground-glass opacity on HRCT can represent lepidic spread along alveolar walls or lymphangitic spread along bronchovascular bundles — important to distinguish histologically.',
        diagram: null,
      },
      {
        title: 'Why Lymph Nodes Matter So Much',
        narrative: 'Lymph nodes are not just filters — they are also alarm systems. When cancer reaches a lymph node, it means the cancer has found a way to travel. If the lymph node cannot stop it, the cancer may reach the next node, and the next, eventually reaching the bloodstream. This is why surgeons always examine and remove lymph nodes during lung cancer surgery.',
        doctorTip: 'Systematic mediastinal lymph node dissection (MLND) vs. sampling: ACOSOG Z0030 showed no OS difference, but MLND improves staging accuracy. N2 disease found intraoperatively (skip metastasis) upstages to IIIA.',
        diagram: null,
      },
      {
        title: 'Treatment at Stage II',
        narrative: 'Stage II lung cancer is still potentially curable. Surgery remains the cornerstone — removing the lobe of the lung and all the lymph nodes the cancer may have reached. After surgery, chemotherapy is recommended to kill any cancer cells that might have escaped. Some patients also receive immunotherapy. The goal is still cure.',
        doctorTip: 'ADAURA trial: adjuvant osimertinib for EGFR-mutant Stage IB–IIIA after resection showed dramatic DFS benefit. Atezolizumab adjuvant (IMpower010) also showed benefit for Stage II–IIIA with PD-L1 ≥1% after chemo.',
        diagram: null,
      },
    ],
  },

  'lungs-3': {
    title: 'Stage III Lung Cancer: Regional Invasion',
    slides: [
      {
        title: 'Crossing Into the Mediastinum',
        narrative: 'The mediastinum is the central compartment of the chest — the space between your two lungs that contains your heart, major blood vessels, esophagus, and trachea (windpipe). At Stage III, lung cancer has spread to lymph nodes in this central space, or has directly invaded nearby structures. This is a major boundary crossed.',
        doctorTip: 'Stage IIIA (resectable N2) vs IIIB (unresectable N2 or contralateral nodes N3) vs IIIC (N3 + T4) — the surgical vs non-surgical threshold is a major decision point. PACIFIC trial established concurrent chemoRT + durvalumab as standard for unresectable Stage III.',
        diagram: null,
      },
      {
        title: 'Vascular Invasion: When Cancer Touches the Major Vessels',
        narrative: 'Some Stage III tumors grow directly into major blood vessels — the pulmonary artery, superior vena cava (SVC), or even the aorta. Imagine the cancer pressing from outside these vessels, like squeezing a garden hose. This can block blood flow, cause swelling in the face and arms (SVC syndrome), and makes surgery more complex or impossible.',
        doctorTip: 'SVC syndrome (facial/arm edema, venous distension, headache) is an oncologic emergency. Urgency for tissue diagnosis and treatment initiation. SVC stenting can provide rapid symptom relief while systemic therapy begins.',
        diagram: 'vessel-highway',
      },
      {
        title: 'Pleural Effusion: Fluid Around the Lung',
        narrative: 'The lung sits inside a thin membrane called the pleura — like a plastic bag surrounding the lung. When cancer spreads to the lymphatics draining the lung, it can block lymphatic flow and cause fluid to build up in this space. This is called a pleural effusion. You might feel breathless, as if someone is sitting on your chest, because the lung cannot fully expand.',
        doctorTip: 'Malignant pleural effusion (MPE) upstages to M1a (Stage IV) if cytology-positive. Thoracentesis is both diagnostic and therapeutic. Tunneled pleural catheters (e.g., PleurX) allow outpatient drainage for recurrent MPE. Distinguish from para-malignant effusion (radiation, lymphatic obstruction).',
        diagram: null,
      },
      {
        title: 'Nerve Invasion at Stage III',
        narrative: 'At Stage III, cancer can invade the nerves that run through the mediastinum. The recurrent laryngeal nerve (which controls your voice box) runs around the aortic arch and is particularly vulnerable. Invasion causes hoarseness — a raspy or weak voice. The phrenic nerve controls the diaphragm; invasion can cause one side of the diaphragm to rise up, reducing breathing capacity.',
        doctorTip: 'New hoarseness in a smoker is a red flag — left vocal cord palsy from left RLN compression by subcarinal/AP window nodes or aortic arch tumor. Pancoast (superior sulcus) tumors invade the brachial plexus, causing Horner syndrome + arm pain (Pancoast-Tobias syndrome).',
        diagram: null,
      },
      {
        title: 'Treatment Approach: Combined Modality',
        narrative: 'Stage III lung cancer is treated with a combination of chemotherapy and radiation therapy given together (concurrent chemoradiation). This is a powerful combination — the chemotherapy makes the cancer cells more sensitive to radiation. After completing chemoradiation, a newer treatment called immunotherapy (durvalumab) is given for about a year to reduce the chance of the cancer returning.',
        doctorTip: 'PACIFIC regimen: concurrent platinum-based chemoRT then durvalumab 10 mg/kg Q2W for 12 months. 5-year OS ~42.9% vs 33.4% placebo (PACIFIC 5-yr update). PD-L1 testing should not gate durvalumab use in Stage III.',
        diagram: null,
      },
    ],
  },

  'colon-4': {
    title: 'Stage IV Colon Cancer: The Portal Vein Route',
    slides: [
      {
        title: "The Colon's Blood Drainage System",
        narrative: 'The colon has a unique feature: all of its blood drains into a special vein called the portal vein, which goes directly to the liver — not to the heart first. This is why colon cancer, when it spreads through the bloodstream, goes to the liver first. It is not random — it is anatomy.',
        doctorTip: 'The portal vein collects blood from the entire GI tract. This anatomic "first pass" through the liver explains why ~50% of Stage IV CRC patients have liver-only or liver-predominant metastases — and why liver resection is potentially curative.',
        diagram: 'colon-liver-lung',
      },
      {
        title: 'Step 1: Into the Mesenteric Veins',
        narrative: 'Cancer cells in the colon wall break through into the small veins that run alongside the colon. These veins — called mesenteric veins — collect blood from the colon and drain it upward. Think of them as small streams flowing into a larger river. The cancer cells ride these streams toward the liver.',
        doctorTip: 'Lymphovascular invasion (LVI) on pathology predicts higher risk of hematogenous spread. Venous invasion (VI) specifically predicts liver mets. Both are key pathological staging features that influence adjuvant chemotherapy decisions.',
        diagram: 'colon-liver-lung',
      },
      {
        title: 'Step 2: Liver Metastases',
        narrative: "The portal vein delivers cancer cells directly to the liver. The liver's job is to filter blood — and this means it catches the cancer cells. In the liver, these cells can grow into new tumors called metastases. The good news is that if these liver tumors can be surgically removed, some patients can be cured even at Stage IV.",
        doctorTip: 'Resectable liver-only mets: 5-year survival 25–40% after hepatectomy. FOLFOX/FOLFIRI ± bevacizumab/cetuximab used for conversion therapy. RAS/BRAF mutational status guides choice of biologic.',
        diagram: null,
      },
      {
        title: 'Step 3: From Liver to Lungs',
        narrative: 'Blood leaving the liver goes through the hepatic veins into the inferior vena cava (IVC), then to the right side of the heart, and then into the lungs. This means that after the liver, the lungs are the next most common site for colon cancer to spread. You can trace the cancer\'s journey: Colon then Portal Vein then Liver then Hepatic Veins then Heart then Lungs.',
        doctorTip: 'Lung-only mets (after liver mets or in isolation) can also be resected with curative intent. The "hepatic first" pattern then "pulmonary second" cascade is classic for right-sided colon cancer. Left-sided (sigmoid/rectum) can also spread via vertebral venous plexus directly to lung/bone.',
        diagram: 'colon-liver-lung',
      },
      {
        title: 'Step 4: Beyond the Lungs — Brain & Bone',
        narrative: 'From the lungs, cancer cells enter the systemic arterial circulation and can reach any organ. The brain is a common destination because of its rich blood supply. This is why doctors scan the brain and bones in Stage IV colon cancer patients. Each step further represents cancer that has traveled a longer journey through your body\'s internal highways.',
        doctorTip: 'Brain mets from CRC are less common (~3%) than from lung/breast cancer but carry poor prognosis (median OS ~5 months without treatment). BRAF V600E-mutant CRC has aggressive biology with higher rates of brain and peritoneal spread.',
        diagram: null,
      },
    ],
  },

  'liver-4': {
    title: 'Stage IV Liver Cancer: Venous Spread',
    slides: [
      {
        title: "The Liver's Unique Vascular Anatomy",
        narrative: "The liver has two blood supplies: the portal vein (bringing blood from the intestines) and the hepatic artery (bringing oxygen-rich blood from the heart). Blood leaves the liver through the hepatic veins into the inferior vena cava (IVC). Liver cancer uses all of these vessels as escape routes, making it particularly dangerous.",
        doctorTip: 'HCC characteristically invades portal venous branches early, creating tumor thrombus. PVTT (portal vein tumor thrombus) is found in 10–40% of HCC at diagnosis and dramatically worsens prognosis (median OS 2–4 months without treatment).',
        diagram: null,
      },
      {
        title: 'Portal Vein Invasion: The Internal Spread',
        narrative: 'The most characteristic feature of liver cancer is its tendency to invade the portal vein — the large vein running through the liver. Cancer cells grow directly into the portal vein, forming a tumor thrombus (tumor plug inside the vein). This is like a dam in a river: it blocks blood flow, causes increased pressure (portal hypertension), and seeds cancer cells throughout the liver.',
        doctorTip: 'On multiphasic CT/MRI: PVTT shows arterial enhancement (unlike bland thrombus). Distinguish tumor thrombus from bland thrombus — DWI on MRI and contrast enhancement are key. PVTT with main portal vein involvement precludes surgery in most cases.',
        diagram: 'vessel-highway',
      },
      {
        title: 'IVC Tumor Thrombus: Reaching the Heart',
        narrative: 'In advanced Stage IV liver cancer, the tumor can grow out of the hepatic veins and into the inferior vena cava (IVC) — the large vein carrying all blood from the lower body back to the heart. When the tumor reaches the IVC, it is one step from the heart and lungs. This is called IVC tumor thrombus and it is a sign of very advanced disease.',
        doctorTip: 'Hepatic vein involvement (Vv3) and IVC thrombus place HCC in BCLC-C (advanced) stage. Sorafenib and lenvatinib are the main systemic options; lenvatinib (REFLECT trial) showed non-inferiority with better ORR. Atezolizumab + bevacizumab (IMbrave150) now preferred first-line.',
        diagram: null,
      },
      {
        title: 'Lung Metastases from the Liver',
        narrative: 'Once the cancer reaches the hepatic veins and IVC, it flows to the right heart and then into the lungs. The lungs become the first site of blood-borne metastasis from liver cancer. Lung metastases typically appear as multiple small nodules scattered throughout both lungs. They may cause breathlessness or cough but often cause no symptoms initially.',
        doctorTip: 'Pulmonary mets from HCC: multiple bilateral nodules. If isolated and the liver primary is controlled, consider ablation or resection (selected cases). Monitor AFP — rising AFP with new lung nodules in cirrhotic patients is highly suggestive of HCC metastasis.',
        diagram: null,
      },
      {
        title: 'The Underlying Cirrhosis Problem',
        narrative: 'Almost all liver cancers develop in a liver that is already scarred (cirrhotic) from years of hepatitis B, hepatitis C, or alcohol-related liver disease. This means treatment must address two problems at once: the cancer AND the underlying damaged liver. This is why liver cancer treatment is so complex and individualized.',
        doctorTip: 'Child-Pugh score and ALBI grade are critical for treatment selection. Child-Pugh A: eligible for most therapies. B7: systemic therapy with close monitoring. B8-9 or C: systemic therapy rarely tolerated. Always balance tumor biology with hepatic reserve.',
        diagram: null,
      },
    ],
  },

  'kidney-3': {
    title: 'Stage III Kidney Cancer: Venous Thrombus',
    slides: [
      {
        title: 'What Makes Kidney Cancer Unique',
        narrative: 'Kidney cancer (renal cell carcinoma, or RCC) has an extraordinary behavior that distinguishes it from most other cancers: it loves to grow directly inside blood vessels. Instead of just invading tissue, the tumor extends into the renal vein — the blood vessel draining the kidney — and grows inside the vein like a worm in a tube.',
        doctorTip: 'Venous tumor thrombus is pathognomonic of RCC. Up to 10% of RCC cases have IVC involvement at presentation. Despite this, surgical resection with thrombectomy remains potentially curative. The extent of thrombus (Level I–IV by Neves classification) guides surgical approach.',
        diagram: null,
      },
      {
        title: "The Renal Vein: Cancer's First Highway",
        narrative: 'Each kidney drains its blood through the renal vein into the IVC (inferior vena cava). In Stage III kidney cancer, the tumor has grown into the renal vein. You can think of this as cancer "surfing" through the vein toward the heart. On imaging, it appears as a filling defect — a solid mass inside a vessel that should be filled only with blood.',
        doctorTip: 'On CT: renal vein thrombus shows arterial enhancement (confirming tumor vs bland thrombus). MRI with gadolinium is superior for defining cranial extent of IVC thrombus. Echocardiogram if thrombus approaches right atrium (Level IV).',
        diagram: 'vessel-highway',
      },
      {
        title: 'Growing Toward the IVC',
        narrative: 'From the renal vein, the tumor thrombus can extend into the inferior vena cava — the large vein running through the center of the body. Surgeons classify how far the thrombus has grown: Level I (just in the renal vein), Level II (below the liver), Level III (above the liver), Level IV (into the right atrium). The higher the level, the more complex the surgery required.',
        doctorTip: 'Level IV IVC thrombus may require cardiopulmonary bypass and cardiac surgery team involvement. Despite this complexity, aggressive surgical approach is recommended for M0 disease — 5-year survival after complete resection ~40–65% even with IVC thrombus.',
        diagram: null,
      },
      {
        title: 'Why Stage III is Still Potentially Curable',
        narrative: 'Despite what sounds like terrifying vascular invasion, Stage III kidney cancer has not yet spread to distant organs. The cancer is still in the venous system, which surgeons can access and remove. Surgery to remove both the kidney (radical nephrectomy) and the tumor thrombus from the vein (thrombectomy) offers a genuine chance of cure.',
        doctorTip: 'Adjuvant pembrolizumab (KEYNOTE-564) for clear cell RCC at intermediate-high, high risk, or M1 NED after nephrectomy showed significant DFS benefit. FDA-approved for high-risk features including venous thrombus. New standard adjuvant option.',
        diagram: null,
      },
      {
        title: 'The Risk of Pulmonary Embolism',
        narrative: 'One dangerous complication of venous tumor thrombus is that pieces of the tumor can break off and travel to the lungs — causing a tumor embolism. This is similar to a blood clot in the lung (pulmonary embolism) but with cancer cells instead of clot. This can cause sudden breathlessness and is a medical emergency. It also means the cancer may have already seeded the lungs.',
        doctorTip: 'Pre-operative anticoagulation for RCC with venous thrombus is controversial — thrombus is tumor, not clot, and anticoagulation does not shrink it. Focus on urgent surgical planning. If patient cannot proceed to surgery promptly, IVC filter placement proximal to thrombus may prevent catastrophic PE.',
        diagram: null,
      },
    ],
  },

  'brain-4': {
    title: 'Stage IV Brain Cancer: CSF Highways',
    slides: [
      {
        title: 'How Brain Cancer Spreads Differently',
        narrative: 'Primary brain cancer (glioblastoma and other high-grade gliomas) is unusual: it almost never spreads outside the brain. Instead, it spreads within the brain using its own internal pathways — the white matter tracts, tiny fluid-filled spaces around blood vessels, and the cerebrospinal fluid (CSF) that bathes the brain and spinal cord.',
        doctorTip: 'GBM (Grade 4 glioma) infiltrates along white matter tracts making "complete" surgical resection impossible. Corpus callosum involvement ("butterfly glioma") indicates bilateral spread. The cellular invasion extends well beyond the contrast-enhancing margin visible on MRI.',
        diagram: null,
      },
      {
        title: "The CSF: The Brain's Internal River",
        narrative: 'Your brain and spinal cord float in a special fluid called cerebrospinal fluid (CSF). This fluid is produced in chambers inside the brain (ventricles), flows around the outside of the brain, and then drains away. In advanced brain cancer, tumor cells can enter this fluid and travel anywhere in the brain or down to the spinal cord — a process called leptomeningeal spread or "drop metastases."',
        doctorTip: 'Leptomeningeal spread of primary brain tumors is most common with ependymoma, PNET, and medulloblastoma. In adults with GBM, leptomeningeal dissemination (~5–10%) portends very poor prognosis. Spinal MRI with gadolinium and CSF cytology are the diagnostic tools.',
        diagram: null,
      },
      {
        title: 'Virchow-Robin Spaces: Microscopic Highways',
        narrative: 'Around every blood vessel in the brain is a tiny fluid-filled tunnel called a Virchow-Robin space. These spaces normally allow immune cells to enter the brain. But tumor cells can hijack these tunnels to spread to distant parts of the brain while staying outside the main blood vessels. This microscopic spread is invisible on standard MRI scans.',
        doctorTip: "Perivascular (Virchow-Robin) space infiltration is the histologic basis of glioma's ability to spread far beyond the imaging-visible tumor margin. This is why even 'gross total resection' does not cure GBM — tumor cells are already centimeters away in the perivascular spaces.",
        diagram: null,
      },
      {
        title: 'Spinal Seeding: When Cancer Drips Down',
        narrative: 'When tumor cells enter the CSF, gravity and CSF flow carry them downward into the spinal canal. They can implant on the spinal cord or nerve roots, causing back pain, leg weakness, or loss of bladder/bowel control. This is called spinal seeding or "drop metastases" — the cancer drips down the spinal column like drops of paint down a wall.',
        doctorTip: 'Spinal seeding (leptomeningeal mets) in primary brain tumors: craniospinal irradiation (CSI) is the treatment — used in medulloblastoma, ependymoma, PNET. For GBM with spinal dissemination, CSI provides palliative benefit but is rarely curative. Intrathecal chemotherapy (methotrexate, cytarabine) is another option.',
        diagram: null,
      },
      {
        title: 'Treating the CSF Pathways',
        narrative: 'Treatment for leptomeningeal spread must cover the entire brain-spinal axis. Radiation therapy can be given to the whole brain and spine (craniospinal irradiation). Chemotherapy can be injected directly into the CSF through a special reservoir (Ommaya reservoir) placed under the scalp. Targeted therapies and immunotherapy are under active investigation for patients whose tumors have actionable mutations.',
        doctorTip: 'MGMT promoter methylation predicts response to temozolomide (TMZ). IDH1/2 mutation (lower-grade gliomas) predicts better prognosis and response to vorasidenib (INDIGO trial, FDA-approved 2023 for IDH-mutant Grade 2 glioma). TERT, EGFR amp, CDKN2A loss: GBM prognostic markers.',
        diagram: null,
      },
    ],
  },

  'breast-4': {
    title: 'Stage IV Breast Cancer: Bone & Brain',
    slides: [
      {
        title: 'How Breast Cancer Enters the Bloodstream',
        narrative: 'Breast cancer spreads to distant organs through the bloodstream — a process called hematogenous spread. Tumor cells invade the tiny capillaries surrounding the breast tumor, enter the blood, and travel to distant organs. The most common destinations are bones, lungs, liver, and brain. Different molecular subtypes of breast cancer prefer different organs.',
        doctorTip: 'The "seed and soil" hypothesis: tumor cells (seeds) prefer specific organs (soil) based on organ microenvironment. HER2+ and triple-negative BC have higher rates of brain mets (20–30%). Luminal A/B BC preferentially seeds bone. ER+ BC can present with bone-only mets decades after initial diagnosis.',
        diagram: null,
      },
      {
        title: 'Bone Metastases: When Cancer Enters the Marrow',
        narrative: "Bone is the most common site of breast cancer metastasis. Inside every bone is a space called the bone marrow — the factory where your blood cells are made. Breast cancer cells travel through the blood and lodge in the bone marrow, where they start to grow. As they grow, they can cause the bone to weaken, break more easily (pathologic fracture), or cause severe pain.",
        doctorTip: 'Osteolytic (lytic) mets predominate in breast cancer, though mixed and osteoblastic occur. Bisphosphonates (zoledronic acid) and denosumab (RANK-L inhibitor) reduce skeletal-related events (SREs). Monthly dosing, dental assessment before starting. Monitor for osteonecrosis of the jaw.',
        diagram: 'bone-marrow',
      },
      {
        title: 'Brain Metastases: The Blood-Brain Barrier Problem',
        narrative: 'The brain is protected by a barrier called the blood-brain barrier — a tight seal between blood vessels and brain tissue that normally keeps harmful substances out. Unfortunately, some breast cancer cells, particularly HER2-positive and triple-negative types, can cross this barrier. Once in the brain, many chemotherapy drugs cannot follow them because they are blocked by the same barrier.',
        doctorTip: 'HER2+ BC brain mets: tucatinib + trastuzumab + capecitabine (HER2CLIMB trial) showed CNS benefit. Neratinib + capecitabine also active. T-DXd: remarkable systemic activity; CNS activity under investigation. TNBC brain mets: SRS for limited lesions; sacituzumab govitecan for systemic disease.',
        diagram: null,
      },
      {
        title: 'Lung Metastases: The Breathing Challenge',
        narrative: 'Breast cancer can spread to the lungs in two ways: as round nodules scattered through the lung tissue, or as lymphangitic carcinomatosis — where cancer cells spread through the lymph channels of the lung, creating a net-like pattern. Lymphangitic spread is particularly dangerous because it blocks normal lymphatic drainage and causes severe breathlessness.',
        doctorTip: 'Lymphangitic carcinomatosis on CT: thickened interlobular septa, peribronchial thickening, preserved lung architecture. Distinguish from edema (unilateral, rapid change with diuretics). May not appear on PET. Often ER+ lobular BC histology. Rapid symptomatic decline; systemic therapy initiation is urgent.',
        diagram: null,
      },
      {
        title: 'Living with Stage IV: A Chronic Disease',
        narrative: 'An important message for patients with Stage IV breast cancer: this is not necessarily the end. Modern treatments — including targeted therapies, CDK4/6 inhibitors, antibody-drug conjugates, and immunotherapy — have transformed Stage IV breast cancer into a chronic condition for many patients. Many people live for years, even a decade or more, with excellent quality of life while on treatment.',
        doctorTip: 'Median OS for ER+/HER2- mBC with CDK4/6i + ET: ~53–60 months (MONALEESA-2, PALOMA-3 updates). HER2+ mBC: ~56 months with sequential HER2-directed therapies. TNBC: median OS ~24 months with modern immuno-chemo. Individual patient outcomes vary widely — communicate prognosis with nuance.',
        diagram: null,
      },
    ],
  },

  'lymphNodes-3': {
    title: 'Stage III Lymphoma: The Lymphatic Network',
    slides: [
      {
        title: 'What Stage III Lymphoma Means',
        narrative: 'Stage III lymphoma means the cancer is present in lymph nodes on both sides of the diaphragm — the muscle that separates your chest from your abdomen. The diaphragm is like a horizontal line across your body. If lymphoma is found both above this line (in the chest/neck) AND below it (in the abdomen/pelvis), it is classified as Stage III.',
        doctorTip: 'Ann Arbor staging system: Stage III = nodes on both sides of diaphragm +/- spleen involvement. Stage III1 (upper abdomen only) vs Stage III2 (lower abdominal nodes — para-aortic, iliac, mesenteric). Clinical vs pathological staging distinction matters less in the PET-CT era.',
        diagram: 'lymph-spread',
      },
      {
        title: 'How Lymphoma Uses the Lymphatic System',
        narrative: 'The lymphatic system is a network of vessels connecting hundreds of lymph nodes throughout your body. Unlike blood vessels, which form a closed loop, lymph vessels are more like a one-way drainage system. Lymphoma cells travel from one lymph node to the next through these connecting channels — and because the lymphatic system connects every part of the body, lymphoma can spread widely.',
        doctorTip: 'Hodgkin lymphoma spreads contiguously (predictably node by node) — the basis for mantle field radiation. DLBCL and other NHLs spread non-contiguously (skip patterns). This distinction matters for radiation planning. PET-CT is superior to CT alone for staging and response assessment.',
        diagram: 'lymph-spread',
      },
      {
        title: 'The Spleen: The Central Hub',
        narrative: "The spleen is often involved in Stage III lymphoma. It is the largest lymphoid organ in the body — essentially a giant lymph node. When lymphoma involves the spleen, you may notice it is enlarged, causing a sense of fullness or discomfort on the left side of your abdomen. Spleen involvement does not change the prognosis dramatically but is an important staging feature.",
        doctorTip: 'Splenic involvement in HL: counted as a single nodal site (not extranodal). Splenomegaly on CT does not equal involvement — PET positivity required. "Bulky" splenic disease (>one-third of thoracic diameter): associated with worse prognosis. Splenectomy rarely performed in the modern era.',
        diagram: null,
      },
      {
        title: 'Disease Above and Below: Why It Matters',
        narrative: 'The reason oncologists care so much about whether lymphoma is above or below the diaphragm comes from treatment history. Older radiation treatments could only cover one area at a time. If the cancer was only above the diaphragm, radiation alone could cure it. Stage III disease with involvement on both sides means chemotherapy — which travels through the entire body — is required.',
        doctorTip: 'Classic HL Stage III: ABVD x 6 cycles or BV-AVD (ECHELON-1, improved PFS vs ABVD in advanced HL). DLBCL Stage III: R-CHOP x 6 cycles +/- RT to bulky sites. Pola-R-CHP (POLARIX trial) emerging as alternative for R-IPI high-risk DLBCL. PET-2 (after 2 cycles) guides therapy de-escalation in HL.',
        diagram: null,
      },
      {
        title: 'The Goal: Complete Remission',
        narrative: 'In lymphoma, unlike solid tumors, the goal of treatment is not just control but complete remission — making the cancer disappear entirely from all lymph nodes and organs, as confirmed by PET scan. Many Stage III lymphoma patients achieve complete remission with chemotherapy. Hodgkin lymphoma in particular has cure rates above 80% even at Stage III.',
        doctorTip: 'Post-treatment PET-CT (Deauville score 1-2 = complete metabolic response) is the gold standard. DS 3: consider observation in HL (ECHELON-1 data). DS 4-5: consolidation IFRT or salvage therapy. For DLBCL achieving CMR: no further therapy. Consider consolidative CAR-T earlier in high-risk second-line setting (ZUMA-7, TRANSFORM trials).',
        diagram: null,
      },
    ],
  },
}
