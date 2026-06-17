// Screening guidelines, risk factors, prevention strategies, and early warning signs per cancer type

const S = (guideline, eligible, method, frequency, riskFactors, prevention, earlyWarning) =>
  ({ guideline, eligible, method, frequency, riskFactors, prevention, earlyWarning })

export default {
  lungs: S(
    'USPSTF 2021',
    'Adults 50–80 years with ≥20 pack-year history who currently smoke or quit within 15 years',
    ['Annual low-dose CT (LDCT) chest'],
    'Annually',
    ['Tobacco smoking (≥20 pack-years)', 'Radon gas exposure', 'Occupational asbestos/arsenic', 'Prior lung cancer or radiation', 'Family history of lung cancer'],
    ['Smoking cessation (most impactful)', 'Radon home testing and mitigation', 'Occupational respiratory protection', 'Avoid secondhand smoke', 'Lung cancer chemoprevention trials (investigational)'],
    ['Persistent cough >3 weeks', 'Blood in sputum (hemoptysis)', 'Shortness of breath without exertion', 'Unexplained weight loss', 'Chest or shoulder pain', 'Hoarseness']
  ),

  esophagus: S(
    'ACG/AGA 2022',
    'Adults with chronic GERD (>5 years) + ≥3 risk factors for Barrett\'s esophagus; EGD every 3–5 years if Barrett\'s confirmed',
    ['Upper endoscopy (EGD) for Barrett\'s screening', 'Surveillance EGD every 3–5 years (non-dysplastic Barrett\'s)', 'EGD every 6–12 months (Barrett\'s with dysplasia)'],
    'Based on dysplasia grade',
    ['Chronic GERD (>5 years)', 'Obesity (central adiposity)', 'White male ≥50 years', 'Tobacco use', 'Prior achalasia or caustic injury (squamous)'],
    ['GERD management with PPIs', 'Weight loss and healthy BMI', 'Limit alcohol and tobacco', 'Eat smaller meals; avoid lying down after eating', 'H. pylori eradication (squamous risk)'],
    ['Difficulty swallowing (dysphagia)', 'Food getting stuck in throat/chest', 'Unexplained weight loss', 'Persistent heartburn not responding to PPIs', 'Vomiting blood or dark stools']
  ),

  liver: S(
    'AASLD/EASL 2018',
    'All cirrhosis patients; HBV carriers (even non-cirrhotic) with family history or from high-prevalence region',
    ['Ultrasound + AFP every 6 months', 'CT or MRI if ultrasound inadequate (obese/cirrhotic)'],
    'Every 6 months',
    ['Hepatitis B or C infection', 'Alcohol-related cirrhosis', 'NAFLD/NASH-related cirrhosis', 'Hemochromatosis', 'Primary biliary cholangitis', 'Aflatoxin exposure'],
    ['HBV vaccination', 'HCV treatment (SVR eliminates most HCV risk)', 'Alcohol moderation', 'Weight loss for NAFLD', 'Avoid aflatoxin-contaminated foods'],
    ['Right upper quadrant abdominal pain', 'Jaundice or yellowing of skin/eyes', 'Unexplained weight loss', 'Abdominal swelling (ascites)', 'Easy bruising or bleeding']
  ),

  gallbladder: S(
    'NCCN 2024',
    'No routine population screening. Ultrasound surveillance for gallbladder polyps ≥6 mm (annually); cholecystectomy for polyps ≥10 mm or rapid growth',
    ['No routine screening recommended', 'Annual ultrasound for polyps 6–9 mm', 'Cholecystectomy for polyps ≥10 mm or symptomatic gallstones'],
    'Annual ultrasound if polyps detected',
    ['Gallstones (cholelithiasis)', 'Gallbladder polyps ≥10 mm', 'Porcelain gallbladder', 'Chronic inflammation / typhoid carrier', 'Female sex, obesity, age >60'],
    ['Maintain healthy weight', 'Low-fat, high-fiber diet', 'Regular physical activity', 'Prompt treatment of symptomatic gallstones'],
    ['Right upper quadrant pain (especially after fatty meals)', 'Nausea and vomiting', 'Jaundice', 'Fever and chills (cholecystitis)', 'Unexplained weight loss']
  ),

  pancreas: S(
    'NCCN / CAPS Consortium 2022',
    'No routine screening for general population. High-risk individuals: BRCA2/PALB2 mutation carriers, STK11 (Peutz-Jeghers), CDKN2A, ATM, Lynch syndrome, familial pancreatic cancer (≥2 first-degree relatives)',
    ['No routine screening recommended for general population', 'Annual EUS or MRI/MRCP for high-risk individuals starting age 50 (or 10 years before youngest affected relative)'],
    'Annual for high-risk',
    ['BRCA2 / PALB2 / ATM germline mutation', 'Peutz-Jeghers syndrome (STK11)', 'Familial pancreatic cancer (≥2 FDR)', 'New-onset diabetes >50 years (relative risk 5–8×)', 'Chronic pancreatitis / heavy smoking'],
    ['Smoking cessation', 'Limit alcohol (≤2 drinks/day)', 'Maintain healthy weight', 'Diabetic surveillance in at-risk populations', 'Genetic counseling for familial pancreatic cancer'],
    ['Unexplained back or abdominal pain', 'New-onset diabetes over age 50', 'Jaundice with pale stools and dark urine', 'Unexplained weight loss', 'Fatty/floating stools (steatorrhea)']
  ),

  stomach: S(
    'ACG 2023 / ASGE 2021',
    'H. pylori test-and-treat for all dyspeptic patients. EGD surveillance for intestinal metaplasia, dysplasia, or prior gastric polyps. High-risk: immigrants from East Asia, Eastern Europe; family history of gastric cancer',
    ['H. pylori testing (urea breath test or stool antigen) for all with dyspepsia', 'Upper endoscopy (EGD) with biopsy for high-risk', 'Surveillance EGD every 2–3 years for intestinal metaplasia'],
    'Based on risk stratification (OLGA/OLGIM)',
    ['H. pylori infection', 'Diet high in salt/smoked/pickled foods', 'Smoking', 'Family history of gastric cancer', 'Pernicious anemia or atrophic gastritis'],
    ['H. pylori eradication reduces risk by 50%', 'Reduce smoked/salted/processed foods', 'Increase fruits and vegetables', 'Smoking cessation', 'NSAIDs and COX-2 inhibitors (investigational)'],
    ['Persistent indigestion or heartburn', 'Feeling full quickly with small meals (early satiety)', 'Nausea or vomiting', 'Blood in stool or black tarry stools', 'Unexplained weight loss', 'Persistent stomach pain']
  ),

  smallintestine: S(
    'ACG / ESMO 2022',
    'No routine population screening. Surveillance for FAP (capsule endoscopy/push enteroscopy from age 25–30), Lynch syndrome (consider CT enterography), Crohn\'s disease (long-standing), and hereditary polyposis syndromes',
    ['No routine screening for general population', 'Capsule endoscopy annually for FAP polyps', 'CT enterography for Lynch syndrome carriers every 2–3 years', 'Balloon-assisted enteroscopy for suspicious lesions'],
    'Based on syndrome (annual for FAP)',
    ['Familial adenomatous polyposis (FAP)', 'Lynch syndrome / HNPCC', 'Peutz-Jeghers syndrome', 'Crohn\'s disease (long-standing)', 'Celiac disease (EATL risk)'],
    ['Genetic counseling for FAP and Lynch syndrome', 'COX-2 inhibitors for FAP polyp burden', 'Gluten-free diet for celiac disease', 'Maintain surveillance schedule'],
    ['Unexplained abdominal pain or cramping', 'Blood in stool', 'Bowel obstruction symptoms (nausea, distension)', 'Unexplained weight loss', 'Iron deficiency anemia without GI source identified']
  ),

  colon: S(
    'USPSTF 2021 / ACS 2018',
    'Average risk: all adults starting at age 45. High-risk: age 40 or 10 years before youngest affected relative (familial CRC, Lynch syndrome, FAP, IBD ≥8 years)',
    [
      'Colonoscopy every 10 years (gold standard)',
      'Annual FIT (fecal immunochemical test)',
      'Annual Cologuard (stool DNA) every 3 years',
      'Flexible sigmoidoscopy every 5 years',
      'CT colonography every 5 years',
    ],
    'Annual (FIT/Cologuard) or every 5–10 years (structural)',
    ['Personal/family history of CRC or adenomas', 'Lynch syndrome / FAP / MAP', 'Inflammatory bowel disease (UC/Crohn ≥8 years)', 'Obesity, physical inactivity', 'Red/processed meat consumption, tobacco, alcohol'],
    ['Annual FIT or colonoscopy starting age 45', 'High-fiber, low-red-meat diet', 'Daily aspirin (high-risk; discuss with physician)', 'Regular physical activity', 'Maintain healthy weight and limit alcohol'],
    ['Change in bowel habits lasting >2 weeks', 'Blood in stool (bright red or dark)', 'Abdominal pain or cramping', 'Feeling of incomplete bowel emptying', 'Unexplained weight loss or fatigue']
  ),

  spleen: S(
    'ASH 2023',
    'No routine population screening. Splenic marginal zone lymphoma surveillance with CBC/spleen size every 3–6 months.',
    ['No routine screening recommended', 'CBC with differential for unexplained splenomegaly', 'CT abdomen for splenic masses or lymphadenopathy'],
    'Clinical indication based',
    ['Non-Hodgkin lymphoma involving spleen', 'Hepatitis C-associated lymphoproliferative disease', 'Autoimmune conditions (lupus, rheumatoid arthritis)', 'Chronic immunosuppression'],
    ['HCV treatment', 'Manage autoimmune conditions', 'Avoid prolonged immunosuppression when possible'],
    ['Enlarged spleen (left-sided abdominal fullness)', 'Pain in the upper left abdomen', 'Feeling full quickly after small meals', 'Easy bruising or bleeding (thrombocytopenia)', 'Fatigue and recurrent infections']
  ),

  kidney: S(
    'AUA 2023',
    'No routine screening for average-risk adults. Surveillance for: VHL syndrome (annual CT/MRI from age 15), HLRCC (annual MRI from age 20), Birt-Hogg-Dubé, TSC. Annual ultrasound for dialysis patients (acquired cystic disease)',
    ['No routine screening for general population', 'Annual CT/MRI for VHL, HLRCC, BHD, TSC from syndrome-specific age', 'Annual ultrasound for dialysis patients ≥3 years'],
    'Annual for hereditary syndrome carriers',
    ['VHL syndrome', 'Hereditary leiomyomatosis and RCC (HLRCC)', 'Birt-Hogg-Dubé syndrome', 'Hypertension and chronic kidney disease', 'Obesity, smoking, long-term dialysis'],
    ['Blood pressure control', 'Smoking cessation', 'Maintain healthy weight', 'Genetic counseling for VHL/HLRCC/BHD', 'Avoid prolonged analgesic overuse (aristolochic acid)'],
    ['Blood in urine (hematuria) — often painless', 'Persistent back or flank pain', 'Palpable mass in abdomen or side', 'Unexplained weight loss', 'Fever without infection', 'Fatigue and anemia']
  ),

  bladder: S(
    'USPSTF 2022 / AUA 2023',
    'No screening for general population. Post-treatment surveillance: cystoscopy + urine cytology every 3 months × 2 years, then every 6 months × 2 years, then annually. High-risk occupational screening under evaluation.',
    ['No routine population screening recommended', 'Cystoscopy + cytology every 3 months for first 2 years post-TURBT (NMIBC)', 'Annual upper tract imaging (CT urogram) for high-risk NMIBC'],
    'Post-TURBT surveillance protocol',
    ['Tobacco smoking (most important modifiable risk)', 'Occupational exposure (aromatic amines, benzidine, dyes, rubber)', 'Chronic bladder infection or catheterization', 'Cyclophosphamide or pioglitazone use', 'Lynch syndrome (HNPCC)'],
    ['Smoking cessation', 'Occupational protective equipment and regulations', 'Increase fluid intake (dilutes carcinogens)', 'Limit processed foods/dyes when possible', 'Screening for Lynch syndrome carriers'],
    ['Painless blood in urine (most common symptom)', 'Urinary urgency or frequency not explained by UTI', 'Burning sensation during urination', 'Pelvic pain', 'Back pain (advanced disease)']
  ),

  prostate: S(
    'USPSTF 2018 / ACS 2023 / NCCN 2024',
    'Shared decision-making for PSA testing: average-risk men age 50–69; African American men and those with first-degree relative with PCa starting age 40–45; BRCA2 carriers from age 40',
    ['PSA (prostate-specific antigen) blood test', 'Digital rectal exam (DRE) — limited sensitivity', 'MRI-targeted biopsy (PI-RADS) for PSA ≥3 ng/mL'],
    'Annual PSA for high-risk; shared decision-making for average-risk',
    ['African American race (2× risk)', 'Family history (FDR with PCa)', 'BRCA2 germline mutation', 'Age >50 (average risk)', 'Western diet high in red meat and dairy'],
    ['Regular PSA discussions with physician starting age 40–50', 'Plant-rich diet (lycopene, selenium, green tea)', 'Regular physical activity', 'Finasteride/dutasteride for chemo-prevention (discuss with urologist)', 'Maintain healthy weight'],
    ['Frequent urination, especially at night (nocturia)', 'Difficulty starting or stopping urination', 'Weak or interrupted urine stream', 'Blood in urine or semen', 'Pain in hips, back, or chest (advanced)']
  ),

  testes: S(
    'USPSTF 2011 (recommends against routine screening) / ACS',
    'No routine screening recommended. Monthly self-examination encouraged for high-risk men (cryptorchidism, personal/family history, Klinefelter syndrome). Orchiopexy in childhood does not fully eliminate risk.',
    ['No routine screening recommended', 'Monthly testicular self-examination (high-risk)', 'Scrotal ultrasound for palpable mass or asymmetry', 'Serum tumor markers: AFP, β-hCG, LDH if GCT suspected'],
    'Monthly self-exam for high-risk',
    ['Cryptorchidism (undescended testis)', 'Prior GCT in contralateral testis (25× risk)', 'Family history of testicular cancer', 'Klinefelter syndrome', 'Age 15–35 (peak incidence)'],
    ['Orchiopexy before age 12 for undescended testis', 'Monthly self-exam for high-risk men', 'Contralateral testis biopsy if carcinoma-in-situ suspected', 'Genetic counseling for familial GCT'],
    ['Painless lump or swelling in one testicle', 'Feeling of heaviness in the scrotum', 'Dull ache in lower abdomen or groin', 'Breast tenderness (gynecomastia from β-hCG)', 'Back pain (retroperitoneal metastasis)']
  ),

  ovaries: S(
    'USPSTF 2018',
    'No routine screening for average-risk women. BRCA1/2 carriers: annual TVUS + CA-125 from age 30–35 (or 5–10 years before earliest family member diagnosis); risk-reducing bilateral salpingo-oophorectomy (RRBSO) after childbearing by age 35–40 (BRCA1) or 40–45 (BRCA2)',
    ['No routine population screening recommended (USPSTF D recommendation)', 'Annual TVUS + CA-125 for BRCA1/2 carriers before RRBSO', 'Consider RRBSO for BRCA1 by age 40, BRCA2 by age 45'],
    'Annual for BRCA carriers; RRBSO timing per guidelines',
    ['BRCA1 or BRCA2 germline mutation', 'Lynch syndrome (MLH1, MSH2)', 'Personal history of breast cancer', 'Family history of ovarian or breast cancer', 'Nulliparity and late menopause'],
    ['RRBSO for BRCA carriers (reduces ovarian cancer risk by 80–96%)', 'Oral contraceptive use (reduces risk ~40% with prolonged use)', 'Breastfeeding reduces risk', 'Genetic testing for women with family history', 'Tubal ligation (modest protective effect)'],
    ['Bloating or abdominal distension', 'Pelvic or abdominal pain', 'Feeling full quickly (early satiety)', 'Urinary frequency or urgency', 'Unexplained fatigue or weight changes']
  ),

  uterus: S(
    'ACS 2015 / SGO 2014',
    'No routine population screening for average-risk women. Lynch syndrome carriers: annual endometrial sampling from age 35. Post-menopausal bleeding is a medical emergency requiring immediate evaluation.',
    ['No routine screening for average-risk women', 'Annual endometrial biopsy for Lynch syndrome carriers from age 35', 'Immediate evaluation of postmenopausal bleeding with TVUS ± biopsy'],
    'Annual sampling for Lynch syndrome carriers',
    ['Obesity (greatest modifiable risk; aromatization of androgens)', 'Unopposed estrogen (without progestin in intact uterus)', 'Lynch syndrome (MLH1/MSH2/MSH6/PMS2)', 'Nulliparity, late menopause', 'Tamoxifen use (increases risk 2–3×)'],
    ['Maintain healthy weight (most impactful)', 'Combined oral contraceptives reduce risk 40%', 'Progestin-releasing IUD protective', 'Regular physical activity', 'Genetic testing for Lynch syndrome'],
    ['Postmenopausal vaginal bleeding (any amount requires immediate evaluation)', 'Abnormal uterine bleeding between periods', 'Pelvic pain or pressure', 'Watery or blood-tinged vaginal discharge', 'Pain or difficulty urinating']
  ),

  cervix: S(
    'USPSTF 2018 / ACS 2020 / ASCCP 2019',
    'Average-risk women: Pap smear every 3 years (age 21–29); co-test (Pap + HPV) or primary HPV test every 5 years (age 30–65); stop screening at 65 with adequate prior screening',
    ['Pap smear (cytology) every 3 years for ages 21–29', 'Co-test (Pap + HPV) or primary HPV test every 5 years for ages 30–65', 'HPV genotyping (16/18) for abnormal results', 'Colposcopy ± biopsy for HSIL or positive HPV 16/18'],
    'Every 3 years (Pap) or every 5 years (co-test/primary HPV)',
    ['HPV infection (types 16 and 18 cause 70% of cases)', 'Smoking', 'Immunosuppression (HIV, transplant)', 'Multiple sexual partners', 'Long-term oral contraceptive use (modest)'],
    ['HPV vaccination (Gardasil 9) — ideally before sexual debut; up to age 45', 'Regular cervical cancer screening (Pap/HPV)', 'Smoking cessation', 'Condom use reduces HPV transmission', 'HIV treatment and immune suppression management'],
    ['Unusual vaginal bleeding (after sex, between periods, or after menopause)', 'Unusual vaginal discharge (watery, bloody, foul-smelling)', 'Pelvic pain during intercourse', 'Lower back or leg pain (advanced)', 'Swollen legs or difficulty urinating (advanced)']
  ),

  brain: S(
    'NCCN 2024 / ACMG',
    'No routine population screening. MRI surveillance for hereditary syndromes: NF1 (annual MRI brain/spine from birth), NF2 (annual MRI), VHL (annual MRI), Li-Fraumeni syndrome (annual brain MRI from age 0), tuberous sclerosis (MRI every 1–3 years)',
    ['No routine screening for general population', 'Annual MRI brain/spine for NF1, NF2, VHL, Li-Fraumeni', 'Annual MRI for tuberous sclerosis complex', 'Prompt MRI for persistent/progressive neurological symptoms'],
    'Annual for hereditary syndrome carriers',
    ['Neurofibromatosis type 1 (NF1) — low-grade glioma', 'Neurofibromatosis type 2 (NF2) — meningioma, ependymoma', 'VHL syndrome — hemangioblastoma', 'Li-Fraumeni syndrome (TP53) — multiple primary cancers', 'Prior ionizing radiation to head (greatest environmental risk)'],
    ['Minimize unnecessary head CT/radiation exposure in children', 'Genetic counseling for known hereditary syndromes', 'Annual MRI surveillance for at-risk individuals', 'Report new persistent neurological symptoms promptly'],
    ['New or worsening headaches (especially morning headaches)', 'Seizures — new onset in an adult always requires workup', 'Vision changes, double vision, or loss of peripheral vision', 'Weakness or numbness on one side of the body', 'Personality or cognitive changes', 'Nausea/vomiting without other cause']
  ),

  thyroid: S(
    'USPSTF 2017',
    'USPSTF recommends against routine screening (I/D statement). Exception: annual neck ultrasound + serum calcitonin for RET proto-oncogene carriers (MEN2A, MEN2B) and hereditary medullary thyroid carcinoma families. Prophylactic thyroidectomy for RET carriers.',
    ['No routine screening for general population (USPSTF)', 'Annual neck ultrasound + calcitonin for RET mutation carriers', 'Prophylactic total thyroidectomy for RET carriers (timing per RET variant)'],
    'Annual for RET carriers until prophylactic surgery',
    ['RET proto-oncogene mutation (MEN2A/2B, FMTC)', 'Prior head/neck radiation (especially childhood)', 'Family history of thyroid cancer or MEN2', 'Female sex (3× higher incidence)', 'Iodine deficiency (follicular > papillary)'],
    ['Prophylactic thyroidectomy for RET mutation carriers', 'Adequate iodine intake (iodized salt)', 'Minimize unnecessary head/neck radiation', 'Genetic counseling for MEN2 families'],
    ['Painless lump or swelling in the neck', 'Hoarseness or voice changes not explained by cold', 'Difficulty swallowing (dysphagia)', 'Swollen lymph nodes in the neck', 'Pain in front of neck or throat', 'Difficulty breathing']
  ),

  larynx: S(
    'NCCN 2024 / AAO-HNS',
    'No routine population screening. Annual laryngoscopy for high-risk individuals with known dysplasia, chronic hoarseness, or heavy tobacco/alcohol use. Post-treatment laryngoscopy surveillance every 1–3 months × 1 year, then less frequently.',
    ['No routine screening for general population', 'Annual indirect/flexible laryngoscopy for tobacco/alcohol users with chronic hoarseness', 'Microlaryngoscopy with biopsy for suspicious lesions', 'Post-treatment: laryngoscopy every 1–3 months × 1 year'],
    'Annual for high-risk; post-treatment per protocol',
    ['Heavy tobacco smoking (risk increases with pack-years)', 'Excessive alcohol use (synergistic with tobacco)', 'Occupational exposure to wood dust, nickel, asbestos', 'GERD / laryngopharyngeal reflux', 'HPV infection (HPV 16/18 — oropharynx more than glottis)'],
    ['Smoking cessation (most impactful)', 'Moderate alcohol use', 'GERD management', 'HPV vaccination (reduces HPV-related HNSCC risk)', 'Vocal hygiene for professional voice users'],
    ['Persistent hoarseness or voice change >3 weeks in a smoker', 'Sore throat that does not resolve', 'Difficulty swallowing', 'Ear pain without infection (referred otalgia)', 'Lump in the neck (cervical lymph node)', 'Coughing up blood']
  ),

  oralCavity: S(
    'USPSTF 2013 / ADA 2020',
    'ADA recommends annual visual and tactile oral cancer exam for all dental patients. No USPSTF recommendation for general population. High-risk: tobacco and heavy alcohol users, HPV-positive individuals, immunosuppressed patients.',
    ['Annual visual and tactile oral exam by dentist or physician (ADA)', 'Biopsy for suspicious white (leukoplakia) or red (erythroplakia) lesions', 'Toluidine blue or VELscope as adjunct screening tools'],
    'Annual for all dental patients',
    ['Tobacco use (smoked and smokeless)', 'Heavy alcohol consumption (>3 drinks/day)', 'HPV infection (types 16 and 18 for oropharynx)', 'Sun exposure (lip cancer)', 'Betel nut chewing (Asia/Pacific)'],
    ['Smoking and smokeless tobacco cessation', 'Limit alcohol consumption', 'HPV vaccination (reduces oropharyngeal SCC risk)', 'Annual dental exam and oral cancer screening', 'Lip balm with SPF for lip cancer prevention'],
    ['Sore or ulcer in mouth that does not heal in 2 weeks', 'Red or white patch in mouth', 'Lump or thickening in cheek', 'Difficulty chewing or swallowing', 'Persistent ear pain (referred otalgia)', 'Numbness in the lip or tongue']
  ),

  salivaryGland: S(
    'NCCN 2024',
    'No routine population screening. Clinical examination of salivary glands at routine dental and medical visits. Ultrasound or FNA for any persistent salivary gland mass.',
    ['No routine screening recommended', 'Clinical palpation of parotid, submandibular, and sublingual glands at medical/dental visits', 'Ultrasound + FNA for any salivary gland mass >1 cm or persisting >4 weeks'],
    'Clinical indication based',
    ['Prior radiation to head and neck (especially in childhood)', 'Sjögren\'s syndrome (lymphoma risk)', 'Family history of salivary gland tumors', 'Occupational exposure to silica dust', 'Age >60 years'],
    ['Minimize unnecessary head/neck radiation exposure', 'Manage Sjögren\'s with appropriate immunotherapy', 'Routine dental and medical exam for early detection'],
    ['Painless lump near the jaw, ear, or cheek', 'Numbness or weakness on one side of the face', 'Pain in the face, chin, or neck', 'Difficulty opening the mouth (trismus)', 'Difficulty swallowing']
  ),

  nasopharynx: S(
    'NCCN 2024 / HK Cancer Registry',
    'EBV serology screening (EBV VCA IgA + EA IgA or cell-free EBV DNA) for high-risk populations in endemic regions (Southern China, Southeast Asia, North Africa, Middle East). Not recommended for general Western populations.',
    ['No routine screening in Western populations', 'EBV VCA IgA + cell-free EBV DNA annually for high-risk populations', 'Nasopharyngoscopy for abnormal EBV serology', 'MRI of nasopharynx + neck if endoscopy abnormal'],
    'Annual for high-risk populations in endemic areas',
    ['EBV infection (Epstein-Barr virus, most important)', 'Chinese, Southeast Asian, North African ancestry', 'Diet high in salt-preserved fish and meat', 'Tobacco and alcohol use', 'Family history of NPC'],
    ['EBV vaccination (investigational — under clinical trials)', 'Reduce salted/preserved food consumption', 'Smoking cessation', 'Annual EBV serology for high-risk individuals in endemic areas'],
    ['Persistent unilateral nosebleeds', 'Lump in neck (cervical lymph node) — often first sign', 'Unilateral hearing loss, ringing in ear (tinnitus)', 'Persistent nasal congestion or discharge', 'Double vision or facial numbness (advanced)']
  ),

  breast: S(
    'USPSTF 2024 / ACS 2023 / ACR 2023',
    'Average risk: annual mammography starting age 40 (ACS/ACR); biennial starting age 40–74 (USPSTF 2024). High-risk (lifetime risk ≥20%): annual MRI + mammography starting age 25–30. BRCA1/2: consider bilateral risk-reducing mastectomy.',
    ['Annual digital mammography or 3D tomosynthesis from age 40', 'Annual MRI + mammography for lifetime risk ≥20% or BRCA1/2 carriers', 'Clinical breast exam every 1–3 years (age 20–39), annually (age 40+)', 'Breast self-awareness recommended for all women'],
    'Annual mammography ± MRI',
    ['BRCA1 or BRCA2 germline mutation (50–70% lifetime risk)', 'Dense breast tissue (limits mammography sensitivity)', 'Prior chest radiation (e.g., Hodgkin lymphoma)', 'Personal or family history of breast cancer', 'Hormone therapy with combined estrogen + progestin'],
    ['Genetic testing for BRCA1/2 and PALB2 for high-risk women', 'Chemoprevention (Tamoxifen or Raloxifene) for high-risk premenopausal/postmenopausal women', 'Limit alcohol consumption (<1 drink/day)', 'Maintain healthy weight and regular exercise', 'Breastfeeding reduces risk'],
    ['New lump or thickening in breast or underarm', 'Change in breast size, shape, or skin texture', 'Skin dimpling ("orange peel" appearance)', 'Nipple discharge (especially bloody or clear)', 'Nipple inversion or change in direction', 'Persistent breast or nipple pain']
  ),

  bonemarrow: S(
    'ASH 2023 / IMWG / MDS Foundation',
    'No routine screening for average-risk adults. CBC surveillance every 6–12 months for MGUS (IMWG); CHIP surveillance under investigation. High-risk: prior radiation, chemotherapy exposure, age >70, unexplained cytopenias.',
    ['No routine population screening', 'CBC + SPEP every 6–12 months for MGUS (IMWG risk-stratified)', 'Annual CBC with differential for CHIP with TET2/DNMT3A mutations (if known)', 'Bone marrow biopsy for unexplained cytopenias, elevated paraprotein, or high CHIP VAF'],
    'Every 6–12 months for MGUS; clinical indication for general population',
    ['Prior chemotherapy or radiation therapy (MDS/AML risk)', 'Monoclonal gammopathy of undetermined significance (MGUS)', 'Clonal hematopoiesis of indeterminate potential (CHIP)', 'Benzene or chemical exposure', 'Family history of hematologic malignancy'],
    ['Minimize unnecessary chemotherapy/radiation exposure', 'Avoid benzene exposure', 'Regular CBC surveillance for MGUS and CHIP carriers', 'Genetic counseling for familial hematologic cancer syndromes'],
    ['Unusual fatigue or weakness (anemia)', 'Frequent infections (neutropenia)', 'Easy bruising or bleeding (thrombocytopenia)', 'Bone pain, especially back or ribs (MM)', 'Night sweats and fever without infection', 'Unexplained weight loss']
  ),

  lymphNodes: S(
    'ASH 2023 / NCCN 2024',
    'No routine population screening. Post-treatment CT/PET surveillance per lymphoma type: DLBCL/HL every 3–6 months × 2 years, then annually. Monitor for secondary malignancies after alkylating agents and radiation.',
    ['No routine screening for general population', 'CT or PET-CT surveillance per lymphoma type post-treatment', 'Annual physical exam with lymph node palpation for prior lymphoma', 'Immediate evaluation of persistent lymphadenopathy >4 weeks'],
    'Post-treatment per lymphoma-specific protocol',
    ['HIV infection (non-Hodgkin lymphoma risk 100×)', 'Epstein-Barr virus (Hodgkin lymphoma)', 'H. pylori (MALT lymphoma)', 'Autoimmune disease (Sjögren\'s, RA, celiac disease)', 'Prior chemotherapy or radiation (secondary lymphoma)'],
    ['HIV treatment and prevention', 'H. pylori eradication for MALT lymphoma', 'Immunosuppression management', 'Hepatitis C treatment', 'Avoid unnecessary alkylating agent exposure'],
    ['Painless swollen lymph nodes in neck, armpit, or groin', 'Fever, night sweats, unexplained weight loss (B-symptoms)', 'Itchy skin without rash (pruritus)', 'Fatigue or decreased exercise tolerance', 'Abdominal pain or fullness (abdominal lymphoma)']
  ),

  adrenal: S(
    'Endocrine Society 2016 / AAES 2022',
    'No routine population screening. Adrenal incidentalomas on CT/MRI: measure serum metanephrines, 1-mg DST, and 17-hydroxyprogesterone. Follow non-functioning tumors <4 cm with imaging ± repeat hormonal evaluation at 6 and 12 months.',
    ['No routine screening', 'Serum/urine fractionated metanephrines for all adrenal masses (pheochromocytoma rule-out)', '1-mg overnight DST to assess cortisol autonomy', 'Annual imaging + hormonal evaluation for adrenal incidentaloma <4 cm', 'Adrenalectomy for masses ≥4 cm or growing ≥1 cm/year'],
    'Annual for adrenal incidentalomas; immediate for functional tumors',
    ['Li-Fraumeni syndrome (TP53) — major ACC predisposition', 'Lynch syndrome, MEN1, Beckwith-Wiedemann', 'Adrenal incidentaloma >4 cm', 'Prior malignancy (adrenal metastasis)', 'Obesity and metabolic syndrome (cortisol autonomy)'],
    ['Genetic counseling for Li-Fraumeni/MEN1 families', 'Prompt evaluation of adrenal incidentalomas', 'Manage hypertension and metabolic syndrome', 'Annual surveillance for known hereditary adrenal syndromes'],
    ['High blood pressure difficult to control', 'Episodes of sweating, headache, palpitations (pheochromocytoma)', 'Unexplained weight gain and facial rounding (Cushing)', 'Abdominal or flank pain', 'Fatigue, muscle weakness', 'Unexplained weight loss (advanced ACC)']
  ),

  skin: S(
    'AAD 2023 / ACS 2023 / USPSTF',
    'Annual full-body skin exam by dermatologist for high-risk individuals (personal/family history of melanoma, multiple dysplastic nevi, immunosuppression, Fitzpatrick type I–II). Monthly self-exam recommended for all adults. USPSTF: insufficient evidence for routine screening of general population.',
    ['Annual full-body dermatology exam for high-risk patients', 'Monthly self-examination using the ABCDEs of melanoma', 'Dermoscopy for suspicious lesions', 'Total-body photography + serial dermoscopy for multiple dysplastic nevi (>50 nevi)'],
    'Annual for high-risk; monthly self-exam for all',
    ['Personal or family history of melanoma', 'Multiple dysplastic (atypical) moles (>5 atypical)', 'Fitzpatrick skin type I–II (fair skin, light eyes)', 'Excessive UV exposure or history of sunburns', 'Immunosuppression (organ transplant, HIV)'],
    ['Daily SPF 30+ broad-spectrum sunscreen', 'Avoid tanning beds (banned for minors in many states)', 'Protective clothing, hats, and UV-blocking sunglasses', 'Avoid peak UV hours (10 AM–4 PM)', 'Annual dermatology exam for high-risk individuals'],
    ['New mole or spot that is Asymmetric', 'Border is irregular, ragged, or poorly defined', 'Color variation (multiple shades of brown, black, red, or white)', 'Diameter >6 mm (size of a pencil eraser)', 'Evolving — any mole that changes in size, shape, or color', 'Itching, bleeding, or crusting of a mole']
  ),

  bone: S(
    'ESMO 2022 / COG / NCCN 2024',
    'No routine population screening. Annual MRI/X-ray surveillance for Li-Fraumeni syndrome (TP53) from birth; MRI every 2–4 years for Paget\'s disease of bone; annual X-ray for hereditary multiple exostoses (EXT1/EXT2). Monitor for secondary osteosarcoma in prior radiation fields.',
    ['No routine population screening', 'Annual MRI for Li-Fraumeni syndrome from birth', 'Annual radiograph for hereditary multiple exostoses', 'X-ray/CT/MRI for any new bone pain or soft tissue mass', 'Bone scan or PET-CT for staging suspicious lesions'],
    'Annual for hereditary syndrome carriers',
    ['Li-Fraumeni syndrome (TP53 germline mutation)', 'Prior radiation therapy to bone', 'Paget\'s disease of bone (>40-year-olds)', 'Hereditary multiple exostoses (EXT1/EXT2)', 'Familial retinoblastoma (RB1 mutation)'],
    ['Genetic counseling for TP53/RB1 families', 'Minimize unnecessary radiation exposure in children', 'Annual surveillance for Li-Fraumeni carriers', 'Manage Paget\'s disease with bisphosphonates', 'Report persistent bone pain promptly'],
    ['Persistent bone pain, especially at night or at rest', 'Swelling or mass over a bone or joint', 'Bone fracture with minimal trauma (pathological fracture)', 'Limping or restricted movement of a limb', 'Unexplained fever and weight loss', 'Numbness or tingling (spinal involvement)']
  ),

  softTissue: S(
    'ESMO 2021 / NCCN 2024',
    'No routine population screening. Urgent MRI evaluation for any soft tissue mass ≥5 cm, deep-seated, or enlarging. Annual MRI for Li-Fraumeni (TP53), NF1, and DICER1 syndrome carriers. Post-treatment MRI/CT every 3–4 months × 2 years, then every 6 months.',
    ['No routine screening for general population', 'Annual MRI for NF1, Li-Fraumeni (TP53), DICER1 syndrome carriers', 'Urgent MRI for any soft tissue mass ≥5 cm or deep to fascia within 4 weeks', 'Post-treatment imaging every 3–6 months × 2–3 years'],
    'Annual for hereditary syndrome carriers; urgent for suspicious masses',
    ['NF1 (neurofibromatosis type 1) — MPNST risk', 'Li-Fraumeni syndrome (TP53) — multiple STS subtypes', 'Prior radiation therapy (radiation-induced sarcoma; 10–20 year latency)', 'Lymphedema (Stewart-Treves syndrome / lymphangiosarcoma)', 'Occupational exposure to dioxins, vinyl chloride, arsenic'],
    ['Genetic counseling for NF1 and Li-Fraumeni families', 'Minimize radiation field and dose in pediatric patients', 'Annual MRI surveillance for high-risk syndrome carriers', 'Prompt evaluation of any enlarging soft tissue mass', 'Report any mass not resolving within 4–6 weeks'],
    ['Painless lump anywhere in the body that is enlarging', 'Lump that is deep (below skin level) or larger than a golf ball', 'Pain or tenderness in a mass (may indicate rapid growth)', 'Limb swelling or weakness', 'Abdominal fullness or pain (retroperitoneal STS)', 'Bowel obstruction symptoms (intra-abdominal STS)']
  ),

  heart: S(
    'ACC/AHA 2022',
    'No routine screening for primary cardiac tumors (extremely rare). Incidental discovery on echocardiogram or cardiac MRI. Hereditary myxoma syndromes (Carney complex — PRKAR1A): annual echo from childhood.',
    ['No routine screening for general population', 'Annual echocardiogram for Carney complex (PRKAR1A) carriers', 'Prompt cardiac MRI/echo for unexplained cardiac symptoms'],
    'Annual echo for Carney complex carriers',
    ['Carney complex (PRKAR1A germline mutation) — cardiac myxoma', 'Prior mediastinal radiation', 'Angiosarcoma: no known hereditary risk'],
    ['Genetic counseling for Carney complex families', 'Annual echocardiogram surveillance for PRKAR1A carriers', 'Prompt evaluation of unexplained cardiac symptoms'],
    ['Unexplained shortness of breath', 'New heart murmur', 'Palpitations or irregular heartbeat', 'Fainting or near-fainting (syncope)', 'Embolic events (stroke) without atrial fibrillation']
  ),

  thymus: S(
    'NCCN 2024 / ITMIG',
    'No routine population screening. Anterior mediastinal mass found incidentally on chest CT/X-ray requires evaluation. Workup: CT chest with contrast, β-hCG, AFP (rule out GCT), and consider thymoma vs lymphoma vs germ cell tumor.',
    ['No routine screening for general population', 'CT chest with contrast for any anterior mediastinal mass', 'Biopsy (CT-guided core needle or VATS) for tissue diagnosis', 'PET-CT for staging and to distinguish thymoma from lymphoma'],
    'Clinical indication; no surveillance protocol for average-risk',
    ['Myasthenia gravis (10–15% have thymoma; 30–50% of thymomas have MG)', 'Pure red cell aplasia and hypogammaglobulinemia (paraneoplastic)', 'Prior ionizing radiation to mediastinum', 'MEN1 and other hereditary syndromes (rare)'],
    ['Annual chest CT for Myasthenia Gravis patients without prior thymectomy', 'Post-thymectomy: CT every 6 months × 2 years then annually × 10 years (WHO B3/C)', 'Genetic counseling for MEN1 families'],
    ['Chest pain or pressure', 'Persistent cough not explained by infection', 'Shortness of breath', 'Muscle weakness (arm/leg) or drooping eyelids (myasthenia gravis)', 'Superior vena cava syndrome: facial/arm swelling, headache', 'Unexplained weight loss']
  ),
}
