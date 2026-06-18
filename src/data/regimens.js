// Named chemotherapy/treatment regimens per organ per stage
// category: "Chemotherapy" | "Targeted" | "Immunotherapy" | "Hormonal" | "Surgery" | "Radiation" | "Combination"

const R = (name, drugs, cycle, category, notes) => ({ name, drugs, cycle, category, notes })

export default {
  lungs: {
    1: [
      R('Lobectomy / VATS', ['Surgical resection'], 'One-time procedure', 'Surgery', 'Preferred for resectable Stage I NSCLC; minimally invasive VATS when feasible.'),
      R('SBRT / SABR', ['Stereotactic body radiation'], '3–5 fractions', 'Radiation', 'For medically inoperable Stage I; equivalent local control to surgery.'),
      R('Osimertinib adjuvant', ['Osimertinib 80 mg daily'], '3 years', 'Targeted', 'ADAURA trial: indicated post-resection in EGFR-mutant NSCLC.'),
    ],
    2: [
      R('Carboplatin + Paclitaxel', ['Carboplatin AUC 6', 'Paclitaxel 200 mg/m²'], 'Every 3 weeks × 4 cycles', 'Chemotherapy', 'Standard adjuvant doublet for Stage II NSCLC post-resection.'),
      R('Cisplatin + Vinorelbine', ['Cisplatin 75 mg/m²', 'Vinorelbine 30 mg/m²'], 'Every 3 weeks × 4 cycles', 'Chemotherapy', 'LACE meta-analysis preferred regimen; superior OS vs other doublets.'),
      R('Atezolizumab adjuvant', ['Atezolizumab 1200 mg'], 'Every 3 weeks × 1 year', 'Immunotherapy', 'IMpower010: for PD-L1 ≥1% Stage II–IIIA after platinum chemo.'),
    ],
    3: [
      R('Carboplatin + Paclitaxel + Pembrolizumab', ['Carboplatin AUC 5', 'Paclitaxel 200 mg/m²', 'Pembrolizumab 200 mg'], 'Every 3 weeks × 4 then pembro Q3W', 'Combination', 'KEYNOTE-789: first-line for Stage IIIB–IV PD-L1 ≥1%.'),
      R('Concurrent chemoradiation → Durvalumab', ['Cisplatin', 'Etoposide', 'RT 60 Gy', 'Durvalumab 10 mg/kg'], 'CRT × 6 wks then durva × 12 mo', 'Combination', 'PACIFIC trial: standard of care for unresectable Stage III NSCLC.'),
      R('Alectinib (ALK+)', ['Alectinib 600 mg BID'], 'Daily continuous', 'Targeted', 'ALEX trial: superior PFS vs crizotinib for ALK-rearranged NSCLC.'),
    ],
    4: [
      R('Pembrolizumab monotherapy', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'KEYNOTE-024: first-line for PD-L1 ≥50%; superior OS vs chemo.'),
      R('Osimertinib (EGFR+)', ['Osimertinib 80 mg daily'], 'Daily continuous', 'Targeted', 'FLAURA trial: first-line EGFR ex19del/L858R; crosses BBB for brain mets.'),
      R('Carboplatin + Pemetrexed + Pembro', ['Carboplatin AUC 5', 'Pemetrexed 500 mg/m²', 'Pembrolizumab 200 mg'], 'Every 3 weeks × 4 then pembro+pem maintenance', 'Combination', 'KEYNOTE-189: standard first-line for non-squamous stage IV.'),
      R('Sotorasib (KRAS G12C)', ['Sotorasib 960 mg daily'], 'Daily continuous', 'Targeted', 'CodeBreaK100: for KRAS G12C mutant NSCLC post-platinum.'),
    ],
  },

  esophagus: {
    1: [
      R('Endoscopic Mucosal Resection', ['EMR/ESD procedure'], 'One-time', 'Surgery', 'For T1a lesions; curative with low recurrence when margins clear.'),
      R('Esophagectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Ivor Lewis or transhiatal for T1b–T2 without nodal involvement.'),
    ],
    2: [
      R('CROSS regimen (Carboplatin + Paclitaxel + RT)', ['Carboplatin AUC 2', 'Paclitaxel 50 mg/m²', 'RT 41.4 Gy'], 'Weekly × 5 weeks concurrent with RT', 'Combination', 'CROSS trial: neoadjuvant standard for resectable esophageal cancer.'),
    ],
    3: [
      R('CROSS + Esophagectomy', ['Carboplatin', 'Paclitaxel', 'RT 41.4 Gy', 'Surgery'], 'Neoadjuvant CRT then resection', 'Combination', 'Trimodality therapy; significant pCR rates with squamous histology.'),
      R('Nivolumab + Chemo', ['Nivolumab 360 mg', 'Fluorouracil', 'Cisplatin'], 'Every 3 weeks × 6 cycles', 'Combination', 'CheckMate-648: first-line for unresectable/metastatic esophageal SCC.'),
    ],
    4: [
      R('Pembrolizumab + Chemo', ['Pembrolizumab 200 mg', 'Cisplatin', '5-FU'], 'Every 3 weeks', 'Combination', 'KEYNOTE-590: OS benefit for PD-L1 CPS ≥10 esophageal/GEJ cancer.'),
      R('Ramucirumab + Paclitaxel', ['Ramucirumab 8 mg/kg', 'Paclitaxel 80 mg/m²'], 'Every 2 weeks', 'Combination', 'RAINBOW trial: second-line standard for GEJ adenocarcinoma.'),
    ],
  },

  liver: {
    1: [
      R('Hepatic Resection', ['Surgical resection'], 'One-time', 'Surgery', 'Curative intent for solitary HCC ≤5 cm with preserved liver function.'),
      R('Ablation (RFA/MWA)', ['Radiofrequency or microwave ablation'], 'One-time', 'Surgery', 'Preferred for tumors ≤3 cm or surgical candidates; comparable OS to resection.'),
      R('Liver Transplant (Milan criteria)', ['OLT procedure'], 'One-time', 'Surgery', 'Milan criteria (single ≤5 cm or ≤3 nodules ≤3 cm); 5-yr OS >70%.'),
    ],
    2: [
      R('TACE', ['Doxorubicin-eluting beads', 'Lipiodol'], 'Repeat every 6–8 weeks as needed', 'Combination', 'Transarterial chemoembolization: BCLC B standard; bridges to transplant.'),
      R('TARE (Y-90)', ['Yttrium-90 microspheres'], 'One to two treatments', 'Radiation', 'Selective internal radiation therapy; alternative to TACE for portal vein involvement.'),
    ],
    3: [
      R('Atezolizumab + Bevacizumab', ['Atezolizumab 1200 mg', 'Bevacizumab 15 mg/kg'], 'Every 3 weeks', 'Combination', 'IMbrave150: first-line standard; superior OS/PFS vs sorafenib.'),
      R('Tremelimumab + Durvalumab (STRIDE)', ['Tremelimumab 300 mg × 1', 'Durvalumab 1500 mg'], 'Tremelimumab single dose then durva Q4W', 'Immunotherapy', 'HIMALAYA trial: non-inferior OS to sorafenib; option for HBV/HCV.'),
    ],
    4: [
      R('Sorafenib', ['Sorafenib 400 mg BID'], 'Daily continuous', 'Targeted', 'SHARP trial: first approved systemic agent; now second-line after IO failure.'),
      R('Cabozantinib', ['Cabozantinib 60 mg daily'], 'Daily continuous', 'Targeted', 'CELESTIAL trial: second-line after sorafenib; MET/VEGFR/RET inhibitor.'),
      R('Ramucirumab', ['Ramucirumab 8 mg/kg'], 'Every 2 weeks', 'Targeted', 'REACH-2: for AFP ≥400 ng/mL second-line; VEGFR-2 antibody.'),
    ],
  },

  gallbladder: {
    1: [R('Cholecystectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Simple cholecystectomy curative for T1a; T1b may require re-resection.')],
    2: [
      R('Extended Cholecystectomy', ['En bloc liver resection', 'Lymph node dissection'], 'One-time', 'Surgery', 'Resection of segment IVb/V with hepatoduodenal lymphadenectomy.'),
      R('Capecitabine adjuvant', ['Capecitabine 1250 mg/m² BID'], 'Every 3 weeks × 8 cycles', 'Chemotherapy', 'BILCAP trial: adjuvant capecitabine improves OS in biliary tract cancers.'),
    ],
    3: [
      R('Gemcitabine + Cisplatin + Durvalumab', ['Gemcitabine 1000 mg/m²', 'Cisplatin 25 mg/m²', 'Durvalumab 1500 mg'], 'Every 3 weeks × 8 cycles then durva maintenance', 'Combination', 'TOPAZ-1: first-line standard for advanced biliary tract cancer.'),
    ],
    4: [
      R('Gemcitabine + Cisplatin', ['Gemcitabine 1000 mg/m²', 'Cisplatin 25 mg/m²'], 'Every 3 weeks', 'Chemotherapy', 'ABC-02 trial: established first-line for unresectable biliary cancer.'),
      R('FOLFOX', ['Oxaliplatin 85 mg/m²', 'Leucovorin 400 mg/m²', '5-FU 400 bolus then 2400 CI'], 'Every 2 weeks', 'Chemotherapy', 'ABC-06: second-line standard post gem-cis failure.'),
    ],
  },

  pancreas: {
    1: [
      R('Whipple / Distal Pancreatectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Pancreaticoduodenectomy for head; distal pancreatectomy for body/tail.'),
      R('Modified FOLFIRINOX adjuvant', ['Oxaliplatin 85 mg/m²', 'Irinotecan 150 mg/m²', 'Leucovorin', '5-FU 2400 mg/m² CI'], 'Every 2 weeks × 12 cycles', 'Chemotherapy', 'PRODIGE 24: adjuvant mFOLFIRINOX superior OS vs gemcitabine.'),
    ],
    2: [
      R('Gemcitabine + nab-Paclitaxel adjuvant', ['Gemcitabine 1000 mg/m²', 'nab-Paclitaxel 125 mg/m²'], 'Days 1,8,15 every 4 weeks × 6 cycles', 'Chemotherapy', 'APACT trial: adjuvant option if FOLFIRINOX not tolerated.'),
      R('Chemoradiation (borderline resectable)', ['Gemcitabine', 'RT 50.4 Gy'], 'Concurrent then reassess resectability', 'Combination', 'Neoadjuvant CRT to convert borderline resectable to resectable.'),
    ],
    3: [
      R('FOLFIRINOX', ['Oxaliplatin 85 mg/m²', 'Irinotecan 180 mg/m²', 'Leucovorin 400 mg/m²', '5-FU 2400 mg/m² CI'], 'Every 2 weeks', 'Chemotherapy', 'PRODIGE 4/ACCORD 11: superior OS vs gemcitabine in locally advanced.'),
      R('Olaparib (BRCA1/2)', ['Olaparib 300 mg BID'], 'Daily continuous', 'Targeted', 'POLO trial: maintenance PARP inhibition for BRCA-mutant after platinum.'),
    ],
    4: [
      R('Gemcitabine + nab-Paclitaxel', ['Gemcitabine 1000 mg/m²', 'nab-Paclitaxel 125 mg/m²'], 'Days 1,8,15 every 4 weeks', 'Chemotherapy', 'MPACT trial: first-line metastatic standard if FOLFIRINOX not suitable.'),
      R('FOLFIRINOX', ['Oxaliplatin', 'Irinotecan', 'Leucovorin', '5-FU'], 'Every 2 weeks', 'Chemotherapy', 'For PS 0–1 patients; highest response rate in first-line metastatic.'),
      R('Entrectinib / Larotrectinib (NTRK+)', ['Larotrectinib 100 mg BID'], 'Daily continuous', 'Targeted', 'NTRK fusion (~1%): tissue-agnostic approval with high ORR.'),
    ],
  },

  stomach: {
    1: [
      R('Endoscopic Submucosal Dissection', ['ESD procedure'], 'One-time', 'Surgery', 'Curative for T1a differentiated tumors ≤2 cm without ulceration.'),
      R('Subtotal / Total Gastrectomy', ['D2 lymph node dissection'], 'One-time', 'Surgery', 'D2 dissection standard; total gastrectomy for proximal tumors.'),
    ],
    2: [
      R('FLOT perioperative', ['Docetaxel 50 mg/m²', 'Oxaliplatin 85 mg/m²', 'Leucovorin 200 mg/m²', '5-FU 2600 mg/m²'], 'Every 2 weeks × 4 pre-op, 4 post-op', 'Chemotherapy', 'FLOT4: superior OS vs ECF/ECX; perioperative standard in Europe/US.'),
    ],
    3: [
      R('FLOT + Surgery', ['Docetaxel', 'Oxaliplatin', 'Leucovorin', '5-FU', 'Surgery'], 'Perioperative FLOT × 8 cycles', 'Combination', 'Perioperative FLOT for resectable Stage III gastric/GEJ.'),
      R('Nivolumab + FOLFOX/XELOX', ['Nivolumab 360 mg', 'Oxaliplatin', '5-FU or Capecitabine'], 'Every 3 weeks', 'Combination', 'CheckMate-649: first-line for CPS ≥5 HER2-negative advanced gastric.'),
    ],
    4: [
      R('Trastuzumab + Chemo (HER2+)', ['Trastuzumab 8→6 mg/kg', 'Cisplatin 80 mg/m²', '5-FU 800 mg/m²'], 'Every 3 weeks × 6 cycles then trast maintenance', 'Combination', 'ToGA trial: HER2+ (IHC 3+ or FISH+) first-line; +2.7 mo OS.'),
      R('Ramucirumab + Paclitaxel', ['Ramucirumab 8 mg/kg', 'Paclitaxel 80 mg/m²'], 'Days 1,8,15 every 4 weeks', 'Combination', 'RAINBOW: second-line standard; VEGFR-2 + taxane.'),
      R('Trastuzumab deruxtecan (HER2+)', ['T-DXd 6.4 mg/kg'], 'Every 3 weeks', 'Targeted', 'DESTINY-Gastric02: HER2+ second-line; 40% ORR.'),
    ],
  },

  smallintestine: {
    1: [R('Segmental Resection', ['Surgical resection'], 'One-time', 'Surgery', 'Wide local excision with mesenteric lymph node dissection.')],
    2: [
      R('Segmental Resection + Observation', ['Surgery'], 'One-time', 'Surgery', 'No proven adjuvant benefit; surveillance CT every 6 months.'),
      R('FOLFOX adjuvant (adenocarcinoma)', ['Oxaliplatin', 'Leucovorin', '5-FU'], 'Every 2 weeks × 12 cycles', 'Chemotherapy', 'Extrapolated from colon cancer data; used in high-risk Stage II.'),
    ],
    3: [
      R('FOLFOX or FOLFIRI', ['Oxaliplatin/Irinotecan', 'Leucovorin', '5-FU'], 'Every 2 weeks', 'Chemotherapy', 'First-line metastatic small bowel adenocarcinoma; modest ORR.'),
      R('Pembrolizumab (MSI-H)', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'Tissue-agnostic approval for dMMR/MSI-H tumors; high ORR in SBA.'),
    ],
    4: [
      R('FOLFOX + Bevacizumab', ['Oxaliplatin', '5-FU', 'Leucovorin', 'Bevacizumab 5 mg/kg'], 'Every 2 weeks', 'Combination', 'Extrapolated from CRC; best available first-line for metastatic SBA.'),
    ],
  },

  colon: {
    1: [
      R('Colectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Segmental colectomy with lymph node dissection; no adjuvant for T1–2N0.'),
      R('Endoscopic Resection', ['Polypectomy / EMR'], 'One-time', 'Surgery', 'For pedunculated/sessile polyps with clear margins and favorable features.'),
    ],
    2: [
      R('FOLFOX adjuvant (high-risk)', ['Oxaliplatin 85 mg/m²', 'Leucovorin 400 mg/m²', '5-FU 2400 mg/m²'], 'Every 2 weeks × 12 cycles', 'Chemotherapy', 'For high-risk Stage II (T4, poor differentiation, perineural invasion, <12 nodes).'),
      R('Capecitabine adjuvant', ['Capecitabine 1250 mg/m² BID'], 'Days 1–14 every 3 weeks × 8 cycles', 'Chemotherapy', 'Oral alternative to 5-FU; X-ACT trial; equivalent DFS.'),
    ],
    3: [
      R('FOLFOX', ['Oxaliplatin 85 mg/m²', 'Leucovorin 400 mg/m²', '5-FU 400 mg/m² bolus + 2400 CI'], 'Every 2 weeks × 12 cycles', 'Chemotherapy', 'MOSAIC trial: standard adjuvant for Stage III; 6-month FOLFOX.'),
      R('CAPOX (XELOX)', ['Oxaliplatin 130 mg/m²', 'Capecitabine 1000 mg/m² BID'], 'Every 3 weeks × 8 cycles', 'Chemotherapy', 'IDEA collaboration: 3 months CAPOX non-inferior to 6 months for low-risk Stage III.'),
    ],
    4: [
      R('FOLFIRI + Bevacizumab', ['Irinotecan 180 mg/m²', 'Leucovorin', '5-FU', 'Bevacizumab 5 mg/kg'], 'Every 2 weeks', 'Combination', 'IFL/BICC-C/NO16966: first-line metastatic CRC; PFS benefit.'),
      R('FOLFOX + Cetuximab (RAS WT)', ['Oxaliplatin', 'Leucovorin', '5-FU', 'Cetuximab 400→250 mg/m²'], 'Every 2 weeks', 'Combination', 'OPUS/CRYSTAL: first-line for left-sided RAS/RAF WT mCRC.'),
      R('Pembrolizumab (MSI-H)', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'KEYNOTE-177: first-line for dMMR/MSI-H mCRC; 43.8 mo PFS.'),
      R('FOLFOXIRI + Bevacizumab', ['Oxaliplatin', 'Irinotecan', 'Leucovorin', '5-FU', 'Bevacizumab'], 'Every 2 weeks', 'Combination', 'TRIBE2: triplet + bev for conversion to resectable metastatic CRC.'),
    ],
  },

  spleen: {
    1: [R('Splenectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Staging splenectomy for lymphoma or splenic marginal zone lymphoma.')],
    2: [
      R('R-CHOP', ['Rituximab 375 mg/m²', 'Cyclophosphamide 750 mg/m²', 'Doxorubicin 50 mg/m²', 'Vincristine 1.4 mg/m²', 'Prednisone 100 mg'], 'Every 21 days × 6 cycles', 'Combination', 'Standard for splenic diffuse large B-cell lymphoma.'),
    ],
    3: [
      R('Rituximab monotherapy', ['Rituximab 375 mg/m²'], 'Weekly × 4 then maintenance Q2M', 'Immunotherapy', 'For splenic marginal zone lymphoma; high response rate.'),
    ],
    4: [
      R('R-CHOP × 6', ['Rituximab', 'Cyclophosphamide', 'Doxorubicin', 'Vincristine', 'Prednisone'], 'Every 21 days × 6 cycles', 'Combination', 'Standard for aggressive B-cell lymphomas involving spleen.'),
    ],
  },

  kidney: {
    1: [
      R('Partial / Radical Nephrectomy', ['Surgical resection'], 'One-time', 'Surgery', 'Partial nephron-sparing preferred for T1; radical for T2 or complex anatomy.'),
      R('Active Surveillance', ['CT/MRI every 3–6 months'], 'Ongoing', 'Surgery', 'For small renal masses ≤2 cm or elderly/comorbid patients.'),
    ],
    2: [
      R('Radical Nephrectomy', ['Surgical resection with vascular control'], 'One-time', 'Surgery', 'Standard for T2; no proven adjuvant benefit for ccRCC after resection.'),
      R('Pembrolizumab adjuvant', ['Pembrolizumab 200 mg'], 'Every 6 weeks × 1 year', 'Immunotherapy', 'KEYNOTE-564: first adjuvant therapy approved for intermediate/high-risk RCC.'),
    ],
    3: [
      R('Pembrolizumab + Axitinib', ['Pembrolizumab 200 mg', 'Axitinib 5 mg BID'], 'Pembro Q3W + daily axitinib', 'Combination', 'KEYNOTE-426: superior OS/PFS vs sunitinib across all IMDC risk groups.'),
      R('Nivolumab + Cabozantinib', ['Nivolumab 240 mg', 'Cabozantinib 40 mg daily'], 'Nivo Q2W + daily cabo', 'Combination', 'CheckMate-9ER: superior OS/PFS vs sunitinib; preferred for intermediate/poor risk.'),
    ],
    4: [
      R('Ipilimumab + Nivolumab', ['Ipilimumab 1 mg/kg', 'Nivolumab 3 mg/kg'], 'Every 3 weeks × 4 doses then nivo maintenance', 'Immunotherapy', 'CheckMate-214: superior OS for intermediate/poor risk; complete responses seen.'),
      R('Cabozantinib', ['Cabozantinib 60 mg daily'], 'Daily continuous', 'Targeted', 'METEOR trial: superior OS vs everolimus as second-line; also VEGFR/MET/AXL.'),
      R('Lenvatinib + Pembrolizumab', ['Lenvatinib 20 mg daily', 'Pembrolizumab 200 mg'], 'Lenva daily + pembro Q3W', 'Combination', 'CLEAR trial: superior PFS/OS vs sunitinib; option first-line.'),
    ],
  },

  bladder: {
    1: [
      R('TURBT', ['Transurethral resection'], 'One-time + re-TURBT', 'Surgery', 'For non-muscle invasive disease; re-TURBT at 4–6 weeks for T1/high-grade.'),
      R('BCG intravesical', ['BCG 81 mg intravesical'], 'Induction × 6 weeks then maintenance', 'Immunotherapy', 'Standard adjuvant for high-risk NMIBC; reduces recurrence and progression.'),
    ],
    2: [
      R('Neoadjuvant Gemcitabine + Cisplatin → Cystectomy', ['Gemcitabine 1000 mg/m²', 'Cisplatin 70 mg/m²', 'Radical cystectomy'], '4 cycles then surgery', 'Combination', 'SWOG 8710/Nordic: neoadjuvant GC improves OS before RC.'),
      R('Trimodality Therapy (TMT)', ['TURBT', 'Concurrent cisplatin', 'RT 64–65 Gy'], '5–6 weeks concurrent CRT', 'Combination', 'Bladder-preservation alternative for select patients with T2 disease.'),
    ],
    3: [
      R('Gemcitabine + Cisplatin', ['Gemcitabine 1000 mg/m²', 'Cisplatin 70 mg/m²'], 'Days 1,8 every 3 weeks', 'Chemotherapy', 'GC trial: equivalent OS to MVAC; preferred for muscle-invasive/metastatic.'),
      R('Nivolumab adjuvant', ['Nivolumab 240 mg'], 'Every 2 weeks × 1 year', 'Immunotherapy', 'CheckMate-274: DFS benefit in high-risk post-RC patients regardless of PD-L1.'),
    ],
    4: [
      R('Enfortumab Vedotin + Pembrolizumab', ['EV 1.25 mg/kg days 1,8', 'Pembrolizumab 200 mg'], 'Every 3 weeks', 'Combination', 'EV-302: new first-line standard; superior OS vs platinum chemo.'),
      R('Atezolizumab or Pembrolizumab', ['Atezolizumab 1200 mg or Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'For cisplatin-ineligible patients; approved first-line for PD-L1 high.'),
      R('Erdafitinib (FGFR2/3)', ['Erdafitinib 8 mg daily'], 'Daily continuous', 'Targeted', 'FIGHT-201: for FGFR2/3 alterations post-platinum; ORR 40%.'),
    ],
  },

  prostate: {
    1: [
      R('Active Surveillance', ['PSA every 3–6 months', 'Annual biopsy'], 'Ongoing', 'Surgery', 'Standard for very-low and low-risk disease (Grade Group 1); avoids overtreatment.'),
      R('Radical Prostatectomy (RARP)', ['Robot-assisted prostatectomy'], 'One-time', 'Surgery', 'For localized low-to-intermediate risk; excellent cancer control.'),
      R('External Beam RT (EBRT)', ['IMRT 78–81 Gy'], '8–9 weeks', 'Radiation', 'IMRT or proton therapy; equivalent OS to surgery for localized disease.'),
    ],
    2: [
      R('RP + Adjuvant RT if high-risk features', ['Radical prostatectomy', 'Adjuvant EBRT 64–66 Gy', 'Short-course ADT'], 'Surgery then RT + 6 months ADT', 'Combination', 'SWS/ARO: adjuvant RT for pT3/positive margins improves bPFS.'),
      R('EBRT + Short-course ADT', ['IMRT 78 Gy', 'LHRH agonist × 6 months'], '6 months total', 'Combination', 'D`Amico high-risk: RT + 6-month ADT; superior OS vs RT alone.'),
    ],
    3: [
      R('ADT + Docetaxel', ['LHRH agonist continuous', 'Docetaxel 75 mg/m²'], 'ADT + 6 cycles chemo', 'Combination', 'CHAARTED/STAMPEDE: for high-volume metastatic hormone-sensitive PCa.'),
      R('ADT + Abiraterone + Prednisone', ['LHRH agonist', 'Abiraterone 1000 mg daily', 'Prednisone 5 mg BID'], 'Continuous', 'Combination', 'LATITUDE/STAMPEDE: for high-risk metastatic hormone-sensitive; superior OS.'),
      R('ADT + Apalutamide', ['LHRH agonist', 'Apalutamide 240 mg daily'], 'Continuous', 'Hormonal', 'TITAN trial: superior OS/rPFS for metastatic hormone-sensitive PCa.'),
    ],
    4: [
      R('Enzalutamide', ['Enzalutamide 160 mg daily'], 'Daily continuous', 'Hormonal', 'PREVAIL/AFFIRM: standard for metastatic CRPC pre- and post-chemo.'),
      R('Lutetium-177 PSMA (Lu-PSMA-617)', ['¹⁷⁷Lu-PSMA-617 7.4 GBq'], 'Every 6 weeks × 6 cycles', 'Targeted', 'VISION trial: OS/rPFS benefit for PSMA+ mCRPC post-ARSI and taxane.'),
      R('Olaparib (BRCA1/2 / HRR)', ['Olaparib 300 mg BID'], 'Daily continuous', 'Targeted', 'PROfound: PARP inhibitor for HRR-mutant mCRPC post-ARSI.'),
      R('Docetaxel', ['Docetaxel 75 mg/m²', 'Prednisone 5 mg BID'], 'Every 3 weeks × 10 cycles', 'Chemotherapy', 'TAX327: first chemo to show OS benefit in mCRPC.'),
    ],
  },

  testes: {
    1: [
      R('Radical Orchiectomy', ['Inguinal orchiectomy'], 'One-time', 'Surgery', 'Diagnostic and therapeutic; retroperitoneal surveillance vs nerve-sparing RPLND.'),
      R('Carboplatin × 1 (Seminoma)', ['Carboplatin AUC 7'], 'Single infusion', 'Chemotherapy', 'Single-dose adjuvant carboplatin for Stage I seminoma; equivalent to RT.'),
    ],
    2: [
      R('BEP × 3 cycles', ['Bleomycin 30 U days 2,9,16', 'Etoposide 100 mg/m² days 1–5', 'Cisplatin 20 mg/m² days 1–5'], 'Every 3 weeks × 3 cycles', 'Chemotherapy', 'Standard for Stage II non-seminoma or Stage IIC+ seminoma; high cure rate.'),
      R('EP × 4 cycles (if no bleomycin)', ['Etoposide 100 mg/m² days 1–5', 'Cisplatin 20 mg/m² days 1–5'], 'Every 3 weeks × 4 cycles', 'Chemotherapy', 'For bleomycin-ineligible patients; equivalent efficacy to BEP.'),
    ],
    3: [
      R('BEP × 3–4 cycles', ['Bleomycin', 'Etoposide', 'Cisplatin'], 'Every 3 weeks', 'Chemotherapy', 'Good-risk: 3 cycles; intermediate/poor-risk: 4 cycles BEP or VIP.'),
      R('VIP (salvage)', ['Vinblastine or Etoposide', 'Ifosfamide', 'Cisplatin'], 'Every 3 weeks × 4 cycles', 'Chemotherapy', 'For intermediate/poor risk or BEP-refractory; alternative to TIP.'),
    ],
    4: [
      R('TIP salvage', ['Paclitaxel 250 mg/m²', 'Ifosfamide 1500 mg/m²', 'Cisplatin 25 mg/m²'], 'Every 3 weeks × 4 cycles', 'Chemotherapy', 'First salvage for GCT relapse; Indiana regimen standard.'),
      R('High-dose chemo + ASCT', ['Carboplatin', 'Etoposide', 'Autologous stem cell transplant'], 'Tandem transplant x2', 'Chemotherapy', 'For multiply relapsed/refractory GCT; curative in 30–40%.'),
    ],
  },

  ovaries: {
    1: [
      R('Surgery + Staging', ['Total hysterectomy', 'BSO', 'Omentectomy', 'Lymph node dissection'], 'One-time', 'Surgery', 'Complete surgical staging; fertility-sparing salpingo-oophorectomy for Stage IA Grade 1.'),
      R('Carboplatin + Paclitaxel × 3–6', ['Carboplatin AUC 5–6', 'Paclitaxel 175 mg/m²'], 'Every 3 weeks × 3–6 cycles', 'Chemotherapy', 'Adjuvant for high-risk Stage I (Grade 3, IC, clear cell).'),
    ],
    2: [
      R('Carboplatin + Paclitaxel × 6', ['Carboplatin AUC 6', 'Paclitaxel 175 mg/m²'], 'Every 3 weeks × 6 cycles', 'Chemotherapy', 'Standard first-line; GOG 158: equivalent to cisplatin-based.'),
      R('Bevacizumab + Carbo + Taxol → Bev maintenance', ['Bevacizumab 15 mg/kg', 'Carboplatin', 'Paclitaxel'], '6 cycles + 16 months bev maintenance', 'Combination', 'GOG-218/ICON7: bev added in high-risk Stage III–IV.'),
    ],
    3: [
      R('Carboplatin + Paclitaxel + Niraparib maintenance', ['Carboplatin AUC 6', 'Paclitaxel 175 mg/m²', 'Niraparib 300 mg daily'], '6 cycles chemo then niraparib maintenance', 'Combination', 'PRIMA trial: niraparib maintenance for HRD+ advanced ovarian cancer.'),
      R('Olaparib maintenance (BRCA+)', ['Olaparib 300 mg BID'], 'Daily continuous after platinum', 'Targeted', 'SOLO-1: superior PFS for BRCA-mutant Stage III–IV in CR/PR after plat.'),
    ],
    4: [
      R('Carboplatin + Paclitaxel + Bevacizumab', ['Carboplatin AUC 6', 'Paclitaxel 175 mg/m²', 'Bevacizumab 15 mg/kg'], 'Every 3 weeks × 6 then bev maintenance', 'Combination', 'GOG-218: standard first-line for Stage IV; bevacizumab adds PFS.'),
      R('Mirvetuximab soravtansine (FRα high)', ['Mirvetuximab 6 mg/kg'], 'Every 3 weeks', 'Targeted', 'MIRASOL trial: ADC for FRα-high platinum-resistant ovarian; 17% ORR improvement.'),
      R('Liposomal Doxorubicin (PLD)', ['PLD 40–50 mg/m²'], 'Every 4 weeks', 'Chemotherapy', 'ICON4: for platinum-sensitive relapse; used widely in second-line.'),
    ],
  },

  uterus: {
    1: [
      R('Total Hysterectomy + BSO + SLNB', ['Robotic/laparoscopic hysterectomy', 'Sentinel lymph node biopsy'], 'One-time', 'Surgery', 'Standard for Stage I endometrioid Grade 1–2; minimally invasive preferred.'),
      R('Vaginal Brachytherapy', ['High-dose rate brachytherapy'], '3–5 fractions', 'Radiation', 'PORTEC-2: adjuvant VBT for intermediate-risk; reduces vaginal recurrence.'),
    ],
    2: [
      R('Hysterectomy + EBRT + VBT', ['Surgery', 'EBRT 45 Gy', 'VBT boost'], 'Surgery then radiation', 'Combination', 'For cervical stromal involvement; combined pelvic RT + VBT boost.'),
    ],
    3: [
      R('Carboplatin + Paclitaxel', ['Carboplatin AUC 5', 'Paclitaxel 175 mg/m²'], 'Every 3 weeks × 6 cycles', 'Chemotherapy', 'GOG 209: standard first-line for advanced/recurrent endometrial.'),
      R('Dostarlimab + Carboplatin + Paclitaxel (dMMR)', ['Dostarlimab 500 mg', 'Carboplatin AUC 5', 'Paclitaxel 175 mg/m²'], 'Every 3 weeks × 6 then dostarlimab Q6W', 'Combination', 'GARNET/RUBY: superior OS for dMMR Stage III–IV endometrial.'),
    ],
    4: [
      R('Pembrolizumab + Lenvatinib', ['Pembrolizumab 200 mg Q3W', 'Lenvatinib 20 mg daily'], 'Continuous', 'Combination', 'KEYNOTE-775: superior OS/PFS vs chemo for previously treated; pMMR and dMMR.'),
      R('Dostarlimab (dMMR)', ['Dostarlimab 500 mg'], 'Every 3 weeks × 4 then Q6W', 'Immunotherapy', 'GARNET: 42% ORR for dMMR/MSI-H recurrent endometrial; durable responses.'),
    ],
  },

  cervix: {
    1: [
      R('Conization / LEEP', ['Cold-knife cone', 'LEEP'], 'One-time', 'Surgery', 'Fertility-sparing for Stage IA1; clear margins required.'),
      R('Radical Hysterectomy (Wertheim)', ['Type III radical hysterectomy', 'Bilateral lymph node dissection'], 'One-time', 'Surgery', 'Standard for Stage IA2–IB1; excellent 5-yr OS >90%.'),
    ],
    2: [
      R('Radical Hysterectomy or Chemoradiation', ['Surgery or Cisplatin + RT'], 'One-time or 5 weeks concurrent', 'Surgery', 'Stage IB2–IIA: surgery equivalent to CRT; CRT preferred for bulky tumors.'),
      R('Cisplatin + RT (concurrent)', ['Cisplatin 40 mg/m² weekly', 'EBRT 45 Gy + VBT'], '5 weeks concurrent', 'Combination', 'GOG 120/123: cisplatin-based CRT superior to RT alone; standard.'),
    ],
    3: [
      R('Cisplatin + RT + Brachytherapy → Pembrolizumab', ['Cisplatin 40 mg/m² weekly', 'EBRT 45 Gy', 'VBT', 'Pembrolizumab 200 mg'], 'Concurrent CRT then pembro × 2 years', 'Combination', 'KEYNOTE-A18: OS benefit adding pembro to concurrent CRT for Stage IIIB–IVA.'),
    ],
    4: [
      R('Pembrolizumab + Carboplatin + Paclitaxel ± Bev', ['Pembrolizumab 200 mg', 'Carboplatin AUC 5', 'Paclitaxel 175 mg/m²', 'Bevacizumab 15 mg/kg'], 'Every 3 weeks', 'Combination', 'KEYNOTE-826: OS/PFS benefit for PD-L1 CPS ≥1 recurrent/metastatic cervical.'),
      R('Tisotumab Vedotin', ['Tisotumab vedotin 2 mg/kg'], 'Every 3 weeks', 'Targeted', 'innovaTV 204/301: TF-targeted ADC; ORR 24% in platinum-resistant.'),
    ],
  },

  brain: {
    1: [
      R('Maximal Safe Resection', ['Surgical resection with intraoperative mapping'], 'One-time', 'Surgery', 'Extent of resection correlates with survival; awake craniotomy for eloquent cortex.'),
      R('Observation (IDH-mutant WHO Grade 2)', ['MRI every 3–6 months'], 'Ongoing', 'Surgery', 'For low-grade IDH-mutant gliomas in young patients; EORTC 22033 supports observation.'),
    ],
    2: [
      R('RT + Procarbazine + CCNU + Vincristine (PCV)', ['RT 54 Gy', 'Procarbazine 60 mg/m²', 'CCNU 110 mg/m²', 'Vincristine 1.4 mg/m²'], 'RT concurrent with PCV × 6 cycles', 'Combination', 'RTOG 9802: RT + PCV for high-risk IDH-mutant low-grade glioma; superior OS.'),
      R('Temozolomide + RT (IDH-mutant)', ['TMZ 75 mg/m² concurrent', 'RT 54–59.4 Gy', 'TMZ 150–200 mg/m² adjuvant'], '6 weeks CRT + 6 cycles adjuvant', 'Combination', 'For IDH-mutant Grade 3 glioma; TMZ + RT improves PFS.'),
    ],
    3: [
      R('Temozolomide + RT (Stupp Protocol)', ['TMZ 75 mg/m² concurrent', 'RT 60 Gy', 'TMZ 150–200 mg/m² adjuvant'], '6 weeks CRT + 6 cycles adjuvant', 'Combination', 'Stupp 2005: standard of care for GBM; MGMT methylation predicts benefit.'),
      R('Tumor Treating Fields (TTFields) + TMZ', ['NovoTTF-200A device continuous', 'TMZ 150–200 mg/m²'], 'TTFields continuous + monthly TMZ', 'Combination', 'EF-14: TTFields + maintenance TMZ improved OS vs TMZ alone in GBM.'),
    ],
    4: [
      R('Stupp Protocol (RT + TMZ)', ['RT 60 Gy', 'TMZ concurrent + adjuvant'], '6 weeks then 6 cycles', 'Combination', 'Universal standard for GBM regardless of IDH status; median OS 14–16 months.'),
      R('Bevacizumab', ['Bevacizumab 10 mg/kg'], 'Every 2 weeks', 'Targeted', 'AVAglio/RTOG0825: approved for recurrent GBM; PFS benefit, no OS benefit.'),
      R('Lomustine (CCNU)', ['CCNU 110 mg/m²'], 'Every 6 weeks', 'Chemotherapy', 'Second-line for MGMT-methylated GBM at recurrence; BELOB/CeTeG data.'),
    ],
  },

  thyroid: {
    1: [
      R('Thyroidectomy + RAI', ['Total thyroidectomy', 'Radioactive iodine 30–100 mCi'], 'Surgery then RAI at 4–6 weeks', 'Combination', 'For DTC >4 cm or extrathyroidal extension; RAI ablates remnant tissue.'),
      R('Hemithyroidectomy', ['Lobectomy + isthmus'], 'One-time', 'Surgery', 'For unifocal PTC <4 cm without high-risk features; ATA 2015 guideline.'),
    ],
    2: [
      R('Total Thyroidectomy + RAI + TSH suppression', ['Thyroidectomy', 'RAI 30–150 mCi', 'Levothyroxine TSH <0.1'], 'Surgery → RAI → lifelong TSH suppression', 'Combination', 'Standard for Stage II DTC; TSH suppression with T4 reduces recurrence.'),
    ],
    3: [
      R('RAI (if RAI-avid)', ['Radioactive iodine 100–200 mCi'], 'Every 6–12 months until disease free or RAI-refractory', 'Targeted', 'For RAI-avid metastatic DTC; repeat dosing for persistent disease.'),
      R('Lenvatinib', ['Lenvatinib 24 mg daily'], 'Daily continuous', 'Targeted', 'SELECT trial: superior PFS vs placebo for RAI-refractory DTC; first-line TKI.'),
      R('Selpercatinib (RET-mutant)', ['Selpercatinib 160 mg BID'], 'Daily continuous', 'Targeted', 'LIBRETTO-001: for RET-mutant MTC and DTC; 69% ORR, durable.'),
    ],
    4: [
      R('Lenvatinib or Sorafenib', ['Lenvatinib 24 mg or Sorafenib 400 mg BID'], 'Daily continuous', 'Targeted', 'For progressive RAI-refractory DTC; lenvatinib preferred based on SELECT PFS.'),
      R('Vandetanib or Cabozantinib (MTC)', ['Vandetanib 300 mg daily or Cabozantinib 140 mg daily'], 'Daily continuous', 'Targeted', 'ZETA/EXAM trials: for progressive metastatic MTC; RET/VEGFR inhibitors.'),
    ],
  },

  larynx: {
    1: [
      R('Transoral Laser Microsurgery (TLM)', ['CO2 laser endoscopic resection'], 'One-time', 'Surgery', 'Organ-preserving for glottic T1; excellent local control with voice preservation.'),
      R('RT (definitive)', ['IMRT 66–70 Gy'], '6–7 weeks', 'Radiation', 'For T1–T2 glottic/supraglottic; equivalent LC to surgery with better voice quality.'),
    ],
    2: [
      R('Concurrent Cisplatin + RT', ['Cisplatin 100 mg/m² days 1,22,43', 'IMRT 70 Gy'], '7 weeks concurrent', 'Combination', 'RTOG 91-11: organ preservation with CRT for T2–T3 larynx; standard of care.'),
    ],
    3: [
      R('Cisplatin + RT (organ preservation)', ['Cisplatin 100 mg/m²', 'RT 70 Gy'], '7 weeks concurrent', 'Combination', 'RTOG 91-11 backbone; superior larynx preservation vs induction chemo alone.'),
      R('Total Laryngectomy', ['Total laryngectomy + ND'], 'One-time', 'Surgery', 'For T4a or CRT failure; salvage laryngectomy standard.'),
    ],
    4: [
      R('Pembrolizumab ± Platinum + 5-FU', ['Pembrolizumab 200 mg ± Cisplatin 100 mg/m² + 5-FU'], 'Every 3 weeks × 6 then pembro', 'Combination', 'KEYNOTE-048: first-line for recurrent/metastatic H&N SCC; pembro superior for CPS ≥1.'),
      R('Nivolumab', ['Nivolumab 3 mg/kg'], 'Every 2 weeks', 'Immunotherapy', 'CheckMate-141: second-line after platinum; OS benefit vs investigator choice.'),
    ],
  },

  oralCavity: {
    1: [
      R('Wide Local Excision ± SLN biopsy', ['Surgical resection with 1 cm margins', 'Sentinel lymph node biopsy'], 'One-time', 'Surgery', 'Standard for T1–T2; SLN biopsy for occult nodal disease.'),
    ],
    2: [
      R('Composite Resection + Neck Dissection', ['Hemimandibulectomy', 'Level I–III ND', 'Free flap reconstruction'], 'One-time', 'Surgery', 'For T2–T3 with mandible proximity; microvascular free flap for reconstruction.'),
      R('Adjuvant RT ± Cisplatin', ['PORT 60–66 Gy', '± Cisplatin 100 mg/m²'], '6 weeks PORT ± concurrent cisplatin', 'Combination', 'For positive margins/ECE: EORTC 22931/RTOG 9501 support adjuvant CRT.'),
    ],
    3: [
      R('Surgery + Adjuvant CRT', ['Resection + ND', 'Cisplatin 100 mg/m²', 'RT 66 Gy'], 'Surgery then 6 weeks CRT', 'Combination', 'For Stage III–IVA resectable oral cavity: standard trimodality.'),
    ],
    4: [
      R('Pembrolizumab + Platinum + 5-FU', ['Pembrolizumab 200 mg', 'Cisplatin 100 mg/m²', '5-FU 1000 mg/m²'], 'Every 3 weeks × 6 then pembro', 'Combination', 'KEYNOTE-048: superior OS for R/M HNSCC; first-line standard.'),
      R('Cetuximab + Platinum + 5-FU (EXTREME)', ['Cetuximab 400→250 mg/m²', 'Cisplatin 100 mg/m²', '5-FU 1000 mg/m²'], 'Every 3 weeks × 6 then cetux maintenance', 'Combination', 'EXTREME trial: first regimen to show OS benefit in R/M HNSCC; now largely replaced by IO.'),
    ],
  },

  salivaryGland: {
    1: [
      R('Parotidectomy / Submandibular Gland Excision', ['Superficial or total parotidectomy with facial nerve preservation'], 'One-time', 'Surgery', 'Standard; facial nerve preservation paramount in parotid surgery.'),
    ],
    2: [
      R('Surgery + Adjuvant RT', ['Total parotidectomy + ND', 'PORT 60–66 Gy'], 'Surgery then 6 weeks RT', 'Combination', 'For high-grade histology, T3–T4, positive margins, or ECE.'),
    ],
    3: [
      R('Surgery + CRT', ['Resection', 'Cisplatin 40 mg/m² weekly', 'RT 66 Gy'], 'Surgery then concurrent CRT', 'Combination', 'For advanced resectable disease with high-risk features.'),
      R('Trastuzumab + Docetaxel (HER2+)', ['Trastuzumab 8→6 mg/kg', 'Docetaxel 75 mg/m²'], 'Every 3 weeks', 'Combination', 'For HER2-amplified salivary gland carcinoma; ~70% are HER2+.'),
    ],
    4: [
      R('Trastuzumab + Paclitaxel (HER2+)', ['Trastuzumab 4→2 mg/kg weekly', 'Paclitaxel 80 mg/m² weekly'], 'Weekly', 'Combination', 'For HER2+ metastatic salivary gland; ORR ~50% in retrospective series.'),
      R('Androgen Deprivation (AR+)', ['Leuprolide + Bicalutamide'], 'Continuous', 'Hormonal', 'For AR+ salivary duct carcinoma; AR expressed in >70%; ORR 50–60%.'),
    ],
  },

  nasopharynx: {
    1: [
      R('RT alone', ['IMRT 66–70 Gy'], '6–7 weeks', 'Radiation', 'For T1N0 NPC; IMRT delivers high dose to primary with parotid sparing.'),
    ],
    2: [
      R('Concurrent Cisplatin + RT', ['Cisplatin 100 mg/m² days 1,22,43', 'IMRT 70 Gy'], '7 weeks', 'Combination', 'INT-0099: CRT superior to RT alone for Stage II–IV NPC; OAL standard.'),
      R('Induction Gemcitabine + Cisplatin → CRT', ['Gemcitabine 1000 mg/m² days 1,8', 'Cisplatin 80 mg/m²', 'Concurrent cisplatin + RT'], '3 cycles induction then CRT', 'Combination', 'Sun Yat-Sen GC induction: superior OS/PFS for Stage III–IVB.'),
    ],
    3: [
      R('Induction GP → Cisplatin-RT', ['Gemcitabine 1000 mg/m² + Cisplatin 80 mg/m² × 3', 'Cisplatin 100 mg/m² + IMRT 70 Gy'], '3 months induction + 7 weeks CRT', 'Combination', 'NPC-0501/Sun Yat-sen: gold standard for locally advanced NPC.'),
    ],
    4: [
      R('Gemcitabine + Cisplatin', ['Gemcitabine 1000 mg/m² days 1,8', 'Cisplatin 80 mg/m²'], 'Every 3 weeks', 'Chemotherapy', 'GEMSTONE-301 backbone: first-line for metastatic NPC; high ORR.'),
      R('Camrelizumab + Gemcitabine + Cisplatin', ['Camrelizumab 200 mg', 'Gemcitabine 1000 mg/m²', 'Cisplatin 80 mg/m²'], 'Every 3 weeks × 6 then camrelizumab maintenance', 'Combination', 'CAPTAIN-1st: PD-1 + GC superior OS for metastatic NPC.'),
    ],
  },

  breast: {
    1: [
      R('Lumpectomy + Sentinel LN Biopsy + RT', ['BCS + SLNB', 'Whole breast RT 40–50 Gy or APBI'], 'Surgery then RT', 'Combination', 'NSABP B-06: BCS + RT equivalent to mastectomy; gold standard for Stage I.'),
      R('Endocrine Therapy (ER+)', ['Tamoxifen 20 mg daily (premenopausal)', 'Aromatase inhibitor (postmenopausal)'], '5–10 years', 'Hormonal', 'ATLAS/aTTom: 10 years tamoxifen for premenopausal; AI × 5 years for post-menopausal.'),
    ],
    2: [
      R('AC-T (dose-dense)', ['Doxorubicin 60 mg/m²', 'Cyclophosphamide 600 mg/m² × 4', 'Paclitaxel 175 mg/m² × 4'], 'Every 2 weeks × 8 cycles', 'Chemotherapy', 'CALGB 9741: dose-dense AC-T superior OS; standard for high-risk HER2- BC.'),
      R('TC (Docetaxel + Cyclophosphamide)', ['Docetaxel 75 mg/m²', 'Cyclophosphamide 600 mg/m²'], 'Every 3 weeks × 6 cycles', 'Chemotherapy', 'US Oncology 9735: TC superior to AC; preferred for intermediate-risk node-negative.'),
      R('Trastuzumab + Pertuzumab + Docetaxel (HER2+)', ['Trastuzumab 8→6 mg/kg', 'Pertuzumab 840→420 mg', 'Docetaxel 75 mg/m²'], 'Every 3 weeks × 6 then HP maintenance × 1 year', 'Combination', 'CLEOPATRA: HP doublet standard for HER2+ MBC first-line; OS >56 months.'),
    ],
    3: [
      R('Neoadjuvant AC-T + HP (HER2+)', ['Doxorubicin', 'Cyclophosphamide × 4', 'Paclitaxel + Trastuzumab + Pertuzumab × 4'], 'Neoadjuvant × 8 cycles then surgery', 'Combination', 'NeoSphere/TRYPHAENA: dual HER2 blockade + chemo; pCR ~56%.'),
      R('Olaparib adjuvant (BRCA1/2)', ['Olaparib 300 mg BID'], '1 year', 'Targeted', 'OlympiA: adjuvant PARP inhibitor for gBRCA1/2 HER2- high-risk; superior iDFS.'),
      R('Abemaciclib + AI (HR+ high-risk)', ['Abemaciclib 150 mg BID', 'Aromatase inhibitor'], '2 years abema + 5–10 years AI', 'Combination', 'monarchE: CDK4/6 inhibitor + ET for high-risk HR+/HER2- node-positive; superior IDFS.'),
    ],
    4: [
      R('Trastuzumab deruxtecan (HER2+/low)', ['T-DXd 5.4 mg/kg'], 'Every 3 weeks', 'Targeted', 'DESTINY-Breast03/04: superior OS/PFS vs TDM-1 and chemo; HER2-low active.'),
      R('Sacituzumab govitecan (TNBC)', ['SG 10 mg/kg days 1,8'], 'Every 3 weeks', 'Targeted', 'ASCENT: OS/PFS superior vs chemo for relapsed TNBC; TROP2-ADC.'),
      R('Pembrolizumab + Chemo (TNBC)', ['Pembrolizumab 200 mg', 'Nab-Paclitaxel or Gem/Carbo'], 'Every 3 weeks', 'Combination', 'KEYNOTE-522/355: pembro + chemo for PD-L1 CPS ≥10 TNBC; first-line.'),
      R('CDK4/6 Inhibitor + Fulvestrant (HR+)', ['Palbociclib/Ribociclib/Abemaciclib', 'Fulvestrant 500 mg'], 'Monthly fulvestrant + daily CDK4/6i', 'Combination', 'PALOMA-3/MONARCH-2/MONALEESA-3: CDK4/6i + fulvestrant for endocrine-resistant HR+ MBC.'),
    ],
  },

  bonemarrow: {
    1: [
      R('Ibrutinib monotherapy (CLL)', ['Ibrutinib 420 mg daily'], 'Daily continuous', 'Targeted', 'RESONATE-2: first-line CLL; superior PFS vs chlorambucil.'),
      R('Observation (Smoldering MM / low-risk MDS)', ['Surveillance labs every 3 months'], 'Ongoing', 'Surgery', 'IMWG: smoldering MM < 20% risk 2-yr; watchful waiting standard.'),
    ],
    2: [
      R('VRd (Bortezomib + Lenalidomide + Dex)', ['Bortezomib 1.3 mg/m²', 'Lenalidomide 25 mg', 'Dexamethasone 40 mg'], 'Days 1,4,8,11 + days 1–21 every 28 days × 8', 'Combination', 'SWOG S0777: VRd superior OS vs Rd for transplant-ineligible MM; backbone regimen.'),
      R('Daratumumab + VRd (Dara-VRd)', ['Daratumumab 16 mg/kg', 'Bortezomib', 'Lenalidomide', 'Dexamethasone'], 'Dara-VRd × 4 cycles → ASCT → Dara-Rd maintenance', 'Combination', 'PERSEUS: Dara-VRd → ASCT → Dara-Rd; new transplant-eligible standard.'),
    ],
    3: [
      R('VRd → ASCT → Lenalidomide maintenance', ['Bortezomib + Len + Dex induction', 'High-dose melphalan', 'Autologous SCT', 'Lenalidomide 10 mg maintenance'], 'Induction × 4–6 cycles → ASCT → maintenance', 'Combination', 'IFM 2009/DETERMINATION: ASCT improves PFS; lenalidomide maintenance extends PFS.'),
      R('Venetoclax + Dexamethasone (t(11;14))', ['Venetoclax 800 mg daily', 'Dexamethasone 40 mg weekly'], 'Daily continuous', 'Targeted', 'BELLINI: venetoclax for t(11;14) or BCL2-high MM; high ORR in selected population.'),
    ],
    4: [
      R('Daratumumab + Pomalidomide + Dex (DPd)', ['Daratumumab 16 mg/kg', 'Pomalidomide 4 mg days 1–21', 'Dexamethasone 40 mg'], 'Every 28 days', 'Combination', 'APOLLO: DPd superior PFS vs Pd for relapsed/refractory MM.'),
      R('Ide-cel or Cilta-cel (CAR-T)', ['Idecabtagene vicleucel or Ciltacabtagene autoleucel'], 'One-time infusion after lymphodepletion', 'Immunotherapy', 'KarMMa-3/CARTITUDE-4: CAR-T superior PFS vs standard regimens for early relapse.'),
      R('Teclistamab (BCMA × CD3 bispecific)', ['Teclistamab 1.5 mg/kg weekly'], 'Weekly then Q2W', 'Immunotherapy', 'MajesTEC-1: ORR 63% in heavily pre-treated MM; first approved bispecific.'),
    ],
  },

  lymphNodes: {
    1: [
      R('ABVD (Hodgkin)', ['Doxorubicin 25 mg/m²', 'Bleomycin 10 U/m²', 'Vinblastine 6 mg/m²', 'Dacarbazine 375 mg/m²'], 'Days 1,15 every 28 days × 2–4 cycles', 'Chemotherapy', 'GHSG HD13: ABVD × 2 cycles ± ISRT 20 Gy standard for Stage IA–IIA favorable HL.'),
      R('R-CVP (Follicular NHL)', ['Rituximab 375 mg/m²', 'Cyclophosphamide 750 mg/m²', 'Vincristine 1.4 mg/m²', 'Prednisone 40 mg/m²'], 'Every 21 days × 6', 'Combination', 'For indolent NHL Stage I–II; rituximab monotherapy alternative.'),
    ],
    2: [
      R('ABVD × 4 + ISRT (Hodgkin)', ['ABVD × 4 cycles', 'ISRT 30 Gy'], 'Chemotherapy then radiation', 'Combination', 'GHSG HD11/14: ABVD × 4 + RT standard for Stage I–II unfavorable HL.'),
      R('R-CHOP × 6 (DLBCL)', ['Rituximab 375 mg/m²', 'Cyclophosphamide 750 mg/m²', 'Doxorubicin 50 mg/m²', 'Vincristine 1.4 mg/m²', 'Prednisone 100 mg'], 'Every 21 days × 6', 'Combination', 'GELA LNH-98.5: R-CHOP standard for DLBCL Stage II–IV; superior to CHOP.'),
    ],
    3: [
      R('BrECADD (Hodgkin, advanced)', ['Brentuximab vedotin 1.8 mg/kg', 'Etoposide 150 mg/m²', 'Cyclophosphamide 375 mg/m²', 'Doxorubicin 25 mg/m²', 'Dacarbazine 250 mg/m²', 'Dexamethasone 40 mg'], 'Every 21 days × 6', 'Combination', 'HD21: BrECADD superior to BEACOPP for advanced HL with better tolerability.'),
      R('Pola-R-CHP (DLBCL)', ['Polatuzumab vedotin 1.8 mg/kg', 'Rituximab 375 mg/m²', 'Cyclophosphamide 750 mg/m²', 'Doxorubicin 50 mg/m²', 'Prednisone 100 mg'], 'Every 21 days × 6', 'Combination', 'POLARIX: superior PFS vs R-CHOP for DLBCL IPI ≥2.'),
    ],
    4: [
      R('R-CHOP or Pola-R-CHP (DLBCL)', ['Rituximab or Polatuzumab + CHOP backbone'], 'Every 21 days × 6', 'Combination', 'Frontline standard for disseminated DLBCL; consolidative ASCT in eligible PR patients.'),
      R('Venetoclax + Ibrutinib (CLL/MCL)', ['Venetoclax 400 mg daily', 'Ibrutinib 560 mg daily'], 'Daily continuous', 'Targeted', 'CAPTIVATE/SYMPATICO: time-limited venetoclax + BTKi for CLL/MCL.'),
      R('Tisagenlecleucel or Axicabtagene (r/r DLBCL)', ['CAR-T product'], 'One-time infusion', 'Immunotherapy', 'ZUMA-7/TRANSFORM: CAR-T superior to ASCT for relapsed DLBCL.'),
    ],
  },

  adrenal: {
    1: [R('Adrenalectomy (laparoscopic)', ['Laparoscopic or retroperitoneoscopic adrenalectomy'], 'One-time', 'Surgery', 'Curative for Stage I ACC ≤5 cm; laparoscopic approach for most patients.')],
    2: [
      R('Open Adrenalectomy + Mitotane', ['Open radical adrenalectomy', 'Mitotane 2–6 g/day'], 'Surgery then mitotane ongoing', 'Combination', 'FIRM-ACT: adjuvant mitotane after resection reduces recurrence in Stage II–III ACC.'),
    ],
    3: [
      R('EDP-M (Etoposide + Doxorubicin + Cisplatin + Mitotane)', ['Etoposide 100 mg/m² days 2–4', 'Doxorubicin 40 mg/m²', 'Cisplatin 40 mg/m² days 3–4', 'Mitotane 2–3 g/day'], 'Every 28 days', 'Combination', 'FIRM-ACT: EDP-M superior to mitotane + streptozocin for advanced ACC.'),
    ],
    4: [
      R('EDP-M', ['Etoposide', 'Doxorubicin', 'Cisplatin', 'Mitotane'], 'Every 28 days', 'Combination', 'Standard first-line for metastatic ACC; ORR ~23%.'),
      R('Pembrolizumab (salvage)', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'For PD-L1+ or MSI-H ACC; modest ORR ~15% in salvage.'),
    ],
  },

  skin: {
    1: [
      R('Wide Local Excision', ['WLE with 1 cm margins (T1a)', '2 cm margins (T1b–T2)'], 'One-time', 'Surgery', 'NCCN: 1 cm margin for ≤1 mm Breslow; 2 cm for 1–2 mm; SLN biopsy for >0.8 mm.'),
      R('SLNB ± Completion ND', ['Sentinel lymph node biopsy', '± CLND'], 'At time of WLE', 'Surgery', 'MSLT-I/II: SLNB standard for T1b+ melanoma; completion ND no survival benefit.'),
    ],
    2: [
      R('Pembrolizumab adjuvant', ['Pembrolizumab 200 mg'], 'Every 3 weeks × 1 year', 'Immunotherapy', 'KEYNOTE-716: adjuvant pembro for Stage IIB–IIC; superior RFS vs placebo.'),
      R('Nivolumab adjuvant', ['Nivolumab 480 mg'], 'Every 4 weeks × 1 year', 'Immunotherapy', 'CheckMate-76K: adjuvant nivo for Stage IIB–C; superior RFS.'),
    ],
    3: [
      R('Nivolumab + Ipilimumab', ['Nivolumab 1 mg/kg + Ipilimumab 3 mg/kg'], 'Every 3 weeks × 4 then nivo Q4W', 'Immunotherapy', 'CheckMate-067: first-line for Stage III–IV; 5-yr OS 52%; deepest responses.'),
      R('Dabrafenib + Trametinib (BRAF V600)', ['Dabrafenib 150 mg BID', 'Trametinib 2 mg daily'], 'Daily continuous', 'Targeted', 'COMBI-d/v: BRAF+MEK for BRAF V600E/K mutant; ORR 68%, 5-yr OS 34%.'),
      R('Pembrolizumab adjuvant (Stage III)', ['Pembrolizumab 200 mg'], 'Every 3 weeks × 1 year', 'Immunotherapy', 'KEYNOTE-054: adjuvant pembro for resected Stage III; 5-yr RFS benefit.'),
    ],
    4: [
      R('Nivolumab + Ipilimumab', ['Nivolumab 1 mg/kg', 'Ipilimumab 3 mg/kg'], 'Every 3 weeks × 4 then nivo Q4W maintenance', 'Immunotherapy', 'CheckMate-067: superior OS vs mono; 6.5-yr OS 49% with ipi-nivo.'),
      R('Pembrolizumab', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'KEYNOTE-006: superior OS vs ipilimumab; first-line option for PD-L1+.'),
      R('Dabrafenib + Trametinib (BRAF V600+)', ['Dabrafenib 150 mg BID', 'Trametinib 2 mg daily'], 'Daily continuous', 'Targeted', 'COMBI-d/v: for BRAF V600-mutant; rapid response; 5-yr OS 34%.'),
      R('Lifileucel (TIL therapy)', ['Lifileucel infusion after lymphodepletion'], 'One-time', 'Immunotherapy', 'C-144-01: first TIL therapy approved; ORR 31% in anti-PD-1 relapsed melanoma.'),
    ],
  },

  bone: {
    1: [
      R('Limb-Salvage Surgery + Adjuvant Chemo', ['Wide resection + reconstruction', 'MAP: Methotrexate + Adriamycin + Cisplatin'], 'Surgery then MAP × 6 cycles', 'Combination', 'COSS/ISG: limb-salvage with neoadjuvant chemo standard for osteosarcoma.'),
      R('Curettage + Cementation (GCT)', ['Intralesional curettage', 'Polymethylmethacrylate cement'], 'One-time', 'Surgery', 'For Stage 1 giant cell tumor; denosumab to downsize if locally aggressive.'),
    ],
    2: [
      R('Neoadjuvant MAP → Surgery → Adjuvant MAP', ['Methotrexate 12 g/m²', 'Doxorubicin 75 mg/m²', 'Cisplatin 120 mg/m²'], 'Neoadjuvant × 2 then surgery then adjuvant × 4', 'Combination', 'EURAMOS-1: MAP neoadjuvant backbone for high-grade osteosarcoma.'),
      R('VAC/IE (Ewing Sarcoma)', ['Vincristine + Actinomycin + Cyclophosphamide', 'alternating', 'Ifosfamide + Etoposide'], 'VDC/IE every 2 weeks × 14 cycles', 'Chemotherapy', 'AEWS0031: dose-dense VDC/IE superior to standard dosing in Ewing sarcoma.'),
    ],
    3: [
      R('VAC/IE + RT (Ewing, unresectable)', ['VDC/IE × 14 cycles', 'RT 45–50 Gy to primary'], 'Concurrent or sequential', 'Combination', 'For unresectable Ewing: consolidative RT after chemo induction.'),
      R('Denosumab (GCT)', ['Denosumab 120 mg days 1,8,15,29 then monthly'], 'Continuous', 'Targeted', 'RANK-L inhibitor for recurrent/unresectable GCT; 96% response rate.'),
    ],
    4: [
      R('Gemcitabine + Docetaxel (OS relapse)', ['Gemcitabine 675 mg/m² days 1,8', 'Docetaxel 75 mg/m²'], 'Every 3 weeks', 'Chemotherapy', 'Salvage for relapsed osteosarcoma; modest ORR ~20%.'),
      R('Regorafenib (OS/Ewing)', ['Regorafenib 160 mg days 1–21'], 'Every 28 days', 'Targeted', 'REGOBONE: regorafenib superior to placebo in relapsed bone sarcomas; PFS benefit.'),
    ],
  },

  softTissue: {
    1: [
      R('Wide Excision (R0)', ['Wide local excision with 1–2 cm margins'], 'One-time', 'Surgery', 'R0 resection primary goal; re-excision if margins positive.'),
      R('RT + Surgery (large, deep, high-grade)', ['Preoperative EBRT 50 Gy + surgery', 'OR surgery + adjuvant RT 60–66 Gy'], 'RT then surgery or surgery then RT', 'Combination', 'NCI sarcoma trial: limb-salvage with RT; equivalent LC to amputation.'),
    ],
    2: [
      R('Preoperative RT → R0 Resection', ['EBRT 50 Gy', 'Wide excision ≥6 weeks post-RT'], 'RT then surgery', 'Combination', 'O'Sullivan 2002: preop RT better wound toxicity profile vs postop for extremity STS.'),
      R('Doxorubicin + Ifosfamide (high-grade)', ['Doxorubicin 75 mg/m²', 'Ifosfamide 10 g/m²'], 'Every 3 weeks × 3 cycles neoadjuvant', 'Chemotherapy', 'For high-risk Stage II where response assessment guides surgery.'),
    ],
    3: [
      R('Doxorubicin + Ifosfamide', ['Doxorubicin 75 mg/m²', 'Ifosfamide 10 g/m²'], 'Every 3 weeks × 6 cycles', 'Chemotherapy', 'Most active first-line doublet for STS; ORR ~25%; RT ± surgery consolidation.'),
    ],
    4: [
      R('Doxorubicin monotherapy', ['Doxorubicin 75 mg/m²'], 'Every 3 weeks', 'Chemotherapy', 'EORTC 62012: first-line for metastatic STS; equivalent to combination in OS.'),
      R('Trabectedin (L-sarcoma)', ['Trabectedin 1.5 mg/m² 24-hr infusion'], 'Every 3 weeks', 'Chemotherapy', 'T-DIS: for liposarcoma/leiomyosarcoma second-line; superior PFS vs DTIC.'),
      R('Pazopanib (non-adipocytic STS)', ['Pazopanib 800 mg daily'], 'Daily continuous', 'Targeted', 'PALETTE: pazopanib superior PFS vs placebo for non-adipocytic STS; second-line.'),
      R('Pembrolizumab (undifferentiated/alveolar)', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'SARC028: subset activity in UPS and dedifferentiated liposarcoma; ORR ~18%.'),
    ],
  },

  heart: {
    1: [R('Surgical Resection', ['Complete cardiac tumor resection'], 'One-time', 'Surgery', 'Rare primary cardiac tumors; resection curative for benign myxomas.')],
    2: [R('Resection + Adjuvant Chemo', ['Cardiac resection', 'Doxorubicin-based chemotherapy'], 'Surgery then chemo', 'Combination', 'For primary cardiac sarcoma; limited data given rarity.')],
    3: [
      R('Anthracycline-based Chemo', ['Doxorubicin 75 mg/m²', 'Ifosfamide 10 g/m²'], 'Every 3 weeks', 'Chemotherapy', 'Extrapolated from soft tissue sarcoma data for cardiac angiosarcoma.'),
    ],
    4: [
      R('Paclitaxel (Angiosarcoma)', ['Paclitaxel 80 mg/m² weekly'], 'Weekly', 'Chemotherapy', 'Most active single agent for cardiac angiosarcoma; ORR ~20%.'),
      R('Pembrolizumab', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'Case series data for cardiac sarcoma; being investigated in basket trials.'),
    ],
  },

  thymus: {
    1: [
      R('Extended Thymectomy', ['Complete thymectomy via sternotomy or VATS'], 'One-time', 'Surgery', 'Standard for Stage I thymoma; minimally invasive acceptable for encapsulated.'),
    ],
    2: [
      R('Thymectomy + Adjuvant RT', ['Extended thymectomy', 'PORT 45–50 Gy'], 'Surgery then RT', 'Combination', 'For Stage II with close/positive margins or high-risk histology (B2/B3).'),
    ],
    3: [
      R('CAP (Cisplatin + Doxorubicin + Cyclophosphamide) → Surgery', ['Cisplatin 50 mg/m²', 'Doxorubicin 50 mg/m²', 'Cyclophosphamide 500 mg/m²'], 'Every 3 weeks × 3–4 cycles then reassess', 'Combination', 'For unresectable Stage III; neoadjuvant to convert to resectable.'),
      R('Pembrolizumab (Thymic Carcinoma)', ['Pembrolizumab 200 mg'], 'Every 3 weeks', 'Immunotherapy', 'KEYNOTE-119: for thymic carcinoma (not thymoma due to irAE risk); ORR 22.5%.'),
    ],
    4: [
      R('Sunitinib', ['Sunitinib 50 mg days 1–28'], 'Every 6 weeks', 'Targeted', 'For relapsed thymic carcinoma; ORR 26%.'),
      R('CAP + Prednisone', ['Cisplatin', 'Doxorubicin', 'Cyclophosphamide', 'Prednisone'], 'Every 3 weeks', 'Combination', 'ECOG E1C82: most active regimen for advanced thymoma/carcinoma.'),
    ],
  },
}
