export default {
  lungs: {
    guideline: "USPSTF 2021",
    eligible:
      "Adults aged 50–80 years with a 20 pack-year smoking history who currently smoke or quit within the past 15 years",
    method: ["Low-dose computed tomography (LDCT)"],
    frequency: "Annually",
    riskFactors: [
      "Current or former cigarette smoking",
      "Occupational exposures (asbestos, radon, arsenic)",
      "Family history of lung cancer",
      "Chronic obstructive pulmonary disease (COPD)",
      "Prior lung cancer or thoracic radiation",
    ],
    prevention: [
      "Smoking cessation",
      "Radon testing and mitigation in the home",
      "Avoidance of occupational carcinogens",
      "Reduction of indoor air pollution",
    ],
    earlyWarning: [
      "Persistent or worsening cough",
      "Hemoptysis (coughing up blood)",
      "Unexplained weight loss",
      "Chest pain or dyspnea",
      "Recurrent respiratory infections",
    ],
  },

  esophagus: {
    guideline: "ACG 2022 / AGA 2022",
    eligible:
      "High-risk individuals with chronic GERD (≥5 years) plus risk factors: male sex, age >50, obesity, smoking, or family history — for Barrett's esophagus surveillance; no population-level screening recommended",
    method: ["Upper endoscopy (EGD)", "Transnasal esophagoscopy (TNE)", "Cytosponge (investigational)"],
    frequency:
      "Initial endoscopy for high-risk GERD patients; surveillance every 3–5 years for non-dysplastic Barrett's esophagus",
    riskFactors: [
      "Chronic gastroesophageal reflux disease (GERD)",
      "Barrett's esophagus",
      "Tobacco use",
      "Obesity and central adiposity",
      "Male sex and age over 50",
    ],
    prevention: [
      "Treatment and control of GERD with proton pump inhibitors",
      "Smoking cessation",
      "Weight loss and healthy diet",
      "Limiting alcohol consumption",
    ],
    earlyWarning: [
      "Progressive dysphagia (difficulty swallowing)",
      "Odynophagia (painful swallowing)",
      "Unexplained weight loss",
      "Persistent heartburn unresponsive to antacids",
      "Regurgitation of food or blood",
    ],
  },

  liver: {
    guideline: "AASLD 2018 / EASL 2018",
    eligible:
      "Patients with cirrhosis of any etiology and patients with chronic hepatitis B (even without cirrhosis) who meet criteria (Asian males ≥40, Asian females ≥50, Africans ≥20, family history of HCC)",
    method: ["Liver ultrasound", "Serum alpha-fetoprotein (AFP) (adjunct)"],
    frequency: "Every 6 months",
    riskFactors: [
      "Chronic hepatitis B virus (HBV) infection",
      "Chronic hepatitis C virus (HCV) infection",
      "Liver cirrhosis of any cause",
      "Nonalcoholic fatty liver disease (NAFLD) / NASH with cirrhosis",
      "Excessive alcohol use",
    ],
    prevention: [
      "Hepatitis B vaccination",
      "Antiviral therapy for chronic HBV and HCV",
      "Avoidance of excessive alcohol",
      "Management of metabolic syndrome and NAFLD",
    ],
    earlyWarning: [
      "Right upper quadrant abdominal pain or fullness",
      "Unexplained weight loss and fatigue",
      "Jaundice or scleral icterus",
      "Abdominal swelling (ascites)",
      "Elevated liver enzymes on routine blood work",
    ],
  },

  gallbladder: {
    guideline: "NCCN 2024",
    eligible:
      "No routine population screening; high-risk surveillance for patients with porcelain gallbladder, large gallbladder polyps (≥10 mm), anomalous pancreaticobiliary junction, or primary sclerosing cholangitis",
    method: ["Abdominal ultrasound (high-risk surveillance)", "CT or MRI/MRCP for selected high-risk patients"],
    frequency: "Annually for high-risk patients with gallbladder polyps; otherwise no routine screening",
    riskFactors: [
      "Gallstones (cholelithiasis)",
      "Female sex, obesity, and multiparity",
      "Gallbladder polyps ≥10 mm",
      "Anomalous pancreaticobiliary ductal junction",
      "Chronic Salmonella typhi infection",
    ],
    prevention: [
      "Weight management to prevent gallstones",
      "Regular physical activity",
      "Cholecystectomy in selected high-risk patients",
      "Avoidance of rapid weight loss diets",
    ],
    earlyWarning: [
      "Right upper quadrant pain, particularly postprandial",
      "Jaundice or dark urine",
      "Nausea and vomiting",
      "Palpable abdominal mass",
      "Unexplained weight loss",
    ],
  },

  pancreas: {
    guideline: "USPSTF 2019 / NCCN 2024",
    eligible:
      "No routine screening for the general population; high-risk surveillance for individuals with hereditary pancreatitis, BRCA2/PALB2/ATM mutation carriers with family history, Peutz-Jeghers syndrome, Lynch syndrome with family history, or familial pancreatic cancer (≥2 first-degree relatives)",
    method: [
      "No routine screening recommended",
      "Endoscopic ultrasound (EUS) for high-risk individuals",
      "MRI/MRCP for high-risk individuals",
    ],
    frequency:
      "Annual surveillance starting at age 50 (or 10 years before earliest affected relative) for high-risk individuals",
    riskFactors: [
      "Family history of pancreatic cancer in first-degree relatives",
      "Hereditary pancreatitis or chronic pancreatitis",
      "Germline mutations (BRCA1/2, PALB2, ATM, MLH1, CDKN2A)",
      "New-onset diabetes mellitus, especially after age 50",
      "Heavy tobacco use and obesity",
    ],
    prevention: [
      "Smoking cessation",
      "Maintaining healthy body weight",
      "Limiting alcohol consumption",
      "Genetic counseling for high-risk families",
    ],
    earlyWarning: [
      "New-onset or worsening diabetes",
      "Painless jaundice",
      "Epigastric or back pain radiating to the back",
      "Unexplained weight loss and anorexia",
      "Steatorrhea (fatty, malodorous stools)",
    ],
  },

  stomach: {
    guideline: "NCCN 2024 / ACG 2023",
    eligible:
      "No routine screening in low-incidence Western countries; endoscopic surveillance recommended for high-risk individuals including those with H. pylori infection, atrophic gastritis, gastric intestinal metaplasia, familial adenomatous polyposis, hereditary diffuse gastric cancer (CDH1 mutation), or immigrants from high-incidence regions (East Asia, Eastern Europe, South America)",
    method: [
      "Upper endoscopy (EGD) for high-risk surveillance",
      "H. pylori testing and eradication",
    ],
    frequency:
      "Variable by risk category; H. pylori test-and-treat for high-risk individuals; endoscopy every 3–5 years for intestinal metaplasia",
    riskFactors: [
      "Helicobacter pylori infection",
      "Diet high in salted, smoked, or pickled foods",
      "Tobacco use",
      "Family history of gastric cancer",
      "Atrophic gastritis or gastric intestinal metaplasia",
    ],
    prevention: [
      "H. pylori testing and eradication therapy",
      "Increased consumption of fresh fruits and vegetables",
      "Reduced intake of salt-preserved and processed foods",
      "Smoking cessation",
    ],
    earlyWarning: [
      "Persistent epigastric pain or discomfort",
      "Early satiety and loss of appetite",
      "Unexplained weight loss",
      "Nausea, vomiting, or hematemesis",
      "Iron-deficiency anemia",
    ],
  },

  smallintestine: {
    guideline: "NCCN 2024 / ACG 2023",
    eligible:
      "No routine screening for the general population; high-risk surveillance for patients with Crohn's disease, Peutz-Jeghers syndrome, familial adenomatous polyposis (FAP), Lynch syndrome, or celiac disease with persistent symptoms",
    method: [
      "No routine screening recommended",
      "Capsule endoscopy for high-risk individuals",
      "CT enterography or MR enterography for surveillance",
    ],
    frequency: "Individualized surveillance intervals based on hereditary syndrome and prior findings",
    riskFactors: [
      "Hereditary polyposis syndromes (FAP, Peutz-Jeghers, Lynch)",
      "Crohn's disease with long-standing inflammation",
      "Celiac disease",
      "Prior abdominal radiation",
      "Immunodeficiency states",
    ],
    prevention: [
      "Management and surveillance of hereditary polyposis syndromes",
      "Adherence to gluten-free diet in celiac disease",
      "Anti-inflammatory therapy for Crohn's disease",
      "Genetic counseling for hereditary syndromes",
    ],
    earlyWarning: [
      "Recurrent crampy abdominal pain",
      "Unexplained iron-deficiency anemia or GI bleeding",
      "Bowel obstruction symptoms",
      "Unexplained weight loss",
      "Nausea and vomiting",
    ],
  },

  colon: {
    guideline: "USPSTF 2021 / ACS 2018",
    eligible:
      "All average-risk adults beginning at age 45; earlier and more frequent screening for those with family history of CRC or adenomas, hereditary syndromes (Lynch, FAP), or personal history of adenomas or IBD",
    method: [
      "Colonoscopy",
      "Annual fecal immunochemical test (FIT)",
      "Annual high-sensitivity guaiac fecal occult blood test (gFOBT)",
      "Multi-target stool DNA test (Cologuard) every 1–3 years",
      "CT colonography every 5 years",
      "Flexible sigmoidoscopy every 5 years",
    ],
    frequency:
      "Colonoscopy every 10 years; FIT or gFOBT annually; stool DNA every 1–3 years; CT colonography every 5 years",
    riskFactors: [
      "Age 45 and older",
      "Personal or family history of colorectal cancer or adenomatous polyps",
      "Hereditary syndromes (Lynch syndrome, FAP)",
      "Inflammatory bowel disease (Crohn's or ulcerative colitis)",
      "Obesity, physical inactivity, red/processed meat consumption, tobacco, and alcohol",
    ],
    prevention: [
      "Regular physical activity and healthy weight maintenance",
      "Diet rich in fiber, fruits, and vegetables with limited red and processed meat",
      "Avoidance of tobacco and excess alcohol",
      "Aspirin chemoprevention in selected high-risk individuals per USPSTF guidance",
    ],
    earlyWarning: [
      "Rectal bleeding or blood in stool",
      "Change in bowel habits persisting more than a few weeks",
      "Abdominal pain, cramps, or discomfort",
      "Unexplained weight loss",
      "Persistent fatigue due to iron-deficiency anemia",
    ],
  },

  kidney: {
    guideline: "NCCN 2024 / AUA 2023",
    eligible:
      "No routine screening for average-risk population; surveillance recommended for high-risk individuals including those with hereditary RCC syndromes (VHL, HLRCC, BHD, TSC), dialysis patients, or solid organ transplant recipients",
    method: [
      "No routine screening recommended",
      "Renal ultrasound or CT for high-risk surveillance",
    ],
    frequency:
      "Annual imaging for hereditary RCC syndromes starting at age 8–10 (VHL) or as indicated; individualized for other high-risk groups",
    riskFactors: [
      "Tobacco use",
      "Obesity and hypertension",
      "Family history of kidney cancer",
      "Hereditary syndromes (Von Hippel-Lindau, hereditary papillary RCC, Birt-Hogg-Dubé)",
      "Chronic kidney disease and long-term dialysis",
    ],
    prevention: [
      "Smoking cessation",
      "Blood pressure control",
      "Weight management",
      "Limiting occupational exposure to trichloroethylene",
    ],
    earlyWarning: [
      "Hematuria (blood in urine)",
      "Flank pain or palpable abdominal mass",
      "Unexplained weight loss",
      "Persistent fatigue and anemia",
      "Hypertension that is new or difficult to control",
    ],
  },

  bladder: {
    guideline: "USPSTF 2022 / AUA 2024",
    eligible:
      "USPSTF concludes insufficient evidence for routine screening in asymptomatic adults; surveillance with cystoscopy and urine cytology every 3–6 months for the first 2 years after treatment, then annually, for patients with prior non-muscle-invasive bladder cancer",
    method: [
      "Cystoscopy (surveillance for prior bladder cancer)",
      "Urine cytology",
      "Urine-based biomarker tests (NMP22, BTA, FISH — adjuncts in surveillance)",
    ],
    frequency:
      "No routine population screening; surveillance cystoscopy every 3 months × 2 years, then every 6 months × 2 years, then annually for low-grade NMIBC",
    riskFactors: [
      "Tobacco use (greatest modifiable risk factor)",
      "Occupational exposure to aromatic amines (dye, rubber, leather industries)",
      "Chronic bladder infections or schistosomiasis (squamous cell type)",
      "Prior pelvic radiation or cyclophosphamide therapy",
      "Male sex and older age",
    ],
    prevention: [
      "Smoking cessation",
      "Adequate fluid intake to dilute carcinogens in urine",
      "Avoidance of occupational carcinogen exposure",
      "Prompt evaluation of hematuria",
    ],
    earlyWarning: [
      "Painless gross hematuria",
      "Microscopic hematuria on urinalysis",
      "Urinary frequency, urgency, or dysuria without infection",
      "Pelvic or flank pain",
      "Unexplained weight loss",
    ],
  },

  prostate: {
    guideline: "USPSTF 2018 / ACS 2023 / AUA 2023",
    eligible:
      "Individualized decision-making for men aged 55–69 after discussing benefits and harms with their clinician; ACS recommends discussion at age 50 (average risk), 45 (African American men or first-degree relative with prostate cancer before 65), or 40 (more than one first-degree relative with prostate cancer at early age)",
    method: ["Prostate-specific antigen (PSA) blood test", "Digital rectal exam (DRE) (adjunct)"],
    frequency:
      "If PSA <1 ng/mL, rescreen every 2–4 years; if PSA 1–3 ng/mL, rescreen every 1–2 years; if PSA >3 ng/mL, further evaluation",
    riskFactors: [
      "Age ≥50 years",
      "African American race",
      "Family history of prostate cancer (father or brother)",
      "Germline mutations (BRCA1/2, Lynch syndrome)",
      "Obesity and sedentary lifestyle",
    ],
    prevention: [
      "Healthy diet low in saturated fat and red meat",
      "Regular physical activity",
      "Avoidance of obesity",
      "Discussion of risk with healthcare provider for informed decision-making",
    ],
    earlyWarning: [
      "Weak or interrupted urine flow",
      "Urinary frequency, urgency, or nocturia",
      "Difficulty starting or stopping urination",
      "Hematuria or hematospermia",
      "Bone pain (advanced disease)",
    ],
  },

  testes: {
    guideline: "USPSTF 2011 / AUA 2023",
    eligible:
      "USPSTF recommends against routine screening in asymptomatic adolescent and adult males; clinical awareness recommended; high-risk surveillance (self-examination and clinical follow-up) for individuals with cryptorchidism, prior testicular cancer, or Klinefelter syndrome",
    method: [
      "No routine screening recommended",
      "Testicular self-examination (patient education)",
      "Scrotal ultrasound for symptomatic or high-risk individuals",
    ],
    frequency: "No routine screening; prompt evaluation of new testicular masses",
    riskFactors: [
      "Cryptorchidism (undescended testis)",
      "Personal or family history of testicular cancer",
      "Klinefelter syndrome",
      "Caucasian race",
      "Age 15–35 years (peak incidence)",
    ],
    prevention: [
      "Surgical correction (orchiopexy) of cryptorchidism in early childhood",
      "Patient education regarding testicular self-awareness",
      "Prompt medical evaluation of testicular masses",
      "Genetic counseling for hereditary predisposition",
    ],
    earlyWarning: [
      "Painless testicular lump or swelling",
      "Feeling of heaviness in the scrotum",
      "Dull ache in the lower abdomen or groin",
      "Sudden accumulation of fluid in the scrotum",
      "Gynecomastia (breast tenderness)",
    ],
  },

  ovaries: {
    guideline: "USPSTF 2018 / SGO 2017 / NCCN 2024",
    eligible:
      "USPSTF recommends against routine screening in average-risk women; surveillance with CA-125 and transvaginal ultrasound every 6 months for women with BRCA1/2 mutations or Lynch syndrome who have not undergone risk-reducing salpingo-oophorectomy",
    method: [
      "No routine screening recommended for average risk",
      "Transvaginal ultrasound (TVUS) for high-risk surveillance",
      "CA-125 serum level for high-risk surveillance",
      "ROCA (Risk of Ovarian Cancer Algorithm) for high-risk individuals",
    ],
    frequency:
      "No routine population screening; semi-annual TVUS + CA-125 for BRCA1/2 or Lynch syndrome carriers until risk-reducing surgery",
    riskFactors: [
      "BRCA1 or BRCA2 germline mutation",
      "Lynch syndrome (hereditary nonpolyposis colorectal cancer)",
      "Family history of ovarian or breast cancer",
      "Nulliparity and infertility",
      "Postmenopausal hormone therapy and increasing age",
    ],
    prevention: [
      "Oral contraceptive use (reduces risk by 40–50%)",
      "Risk-reducing bilateral salpingo-oophorectomy in BRCA carriers after childbearing",
      "Breastfeeding and multiparity",
      "Genetic testing and counseling for high-risk families",
    ],
    earlyWarning: [
      "Persistent bloating or abdominal distension",
      "Pelvic or abdominal pain",
      "Difficulty eating or feeling full quickly",
      "Urinary urgency or frequency",
      "Unexplained fatigue or weight changes",
    ],
  },

  uterus: {
    guideline: "ACS 2015 / NCCN 2024 / SGO 2020",
    eligible:
      "No routine screening for average-risk women; ACS recommends that all women be informed about risks and symptoms of endometrial cancer at menopause; endometrial biopsy for women with Lynch syndrome annually beginning at age 35; biopsy for postmenopausal women with vaginal bleeding",
    method: [
      "No routine screening recommended for average-risk women",
      "Endometrial biopsy (for symptomatic or high-risk women)",
      "Transvaginal ultrasound (endometrial stripe measurement)",
    ],
    frequency:
      "Annual endometrial sampling starting at age 35 for Lynch syndrome carriers; otherwise, prompt evaluation of abnormal uterine bleeding",
    riskFactors: [
      "Obesity and metabolic syndrome",
      "Unopposed estrogen therapy or tamoxifen use",
      "Lynch syndrome or family history",
      "Nulliparity, polycystic ovary syndrome, or diabetes",
      "Late menopause or prolonged anovulation",
    ],
    prevention: [
      "Maintenance of healthy body weight",
      "Use of combined oral contraceptives or progestins",
      "Prompt evaluation and treatment of abnormal uterine bleeding",
      "Genetic testing and surveillance for Lynch syndrome",
    ],
    earlyWarning: [
      "Abnormal uterine bleeding or postmenopausal bleeding",
      "Unusual vaginal discharge",
      "Pelvic pain or pressure",
      "Difficult or painful urination",
      "Pain during intercourse",
    ],
  },

  cervix: {
    guideline: "USPSTF 2018 / ASCCP 2019 / ACS 2020",
    eligible:
      "Women aged 21–65; cotesting (Pap + HPV) preferred for ages 30–65; Pap alone acceptable for ages 21–29; women over 65 with adequate prior negative screening may discontinue; women who have had a total hysterectomy for benign reasons may discontinue",
    method: [
      "Cervical cytology (Pap smear)",
      "High-risk HPV (hrHPV) testing",
      "Co-testing (Pap + hrHPV)",
      "Primary hrHPV testing (FDA-approved, ACS preferred strategy 2020)",
    ],
    frequency:
      "Ages 21–29: Pap smear every 3 years; ages 30–65: co-testing every 5 years or Pap alone every 3 years; primary HPV testing every 5 years (ACS preferred)",
    riskFactors: [
      "Persistent high-risk human papillomavirus (HPV) infection",
      "Smoking",
      "Multiple sexual partners or early sexual debut",
      "Immunosuppression (HIV, organ transplant)",
      "History of sexually transmitted infections",
    ],
    prevention: [
      "HPV vaccination (Gardasil 9) recommended through age 26; shared decision-making ages 27–45",
      "Regular cervical cancer screening per guidelines",
      "Smoking cessation",
      "Consistent condom use to reduce HPV transmission",
    ],
    earlyWarning: [
      "Abnormal vaginal bleeding (between periods, after intercourse, postmenopause)",
      "Unusual vaginal discharge (watery, bloody, foul-smelling)",
      "Pelvic pain during intercourse",
      "Pelvic or back pain",
      "Leg swelling or pain (advanced disease)",
    ],
  },

  brain: {
    guideline: "NCCN 2024 / SNO 2023",
    eligible:
      "No routine screening for the general population; surveillance MRI for patients with hereditary syndromes (neurofibromatosis type 1 or 2, Li-Fraumeni syndrome, tuberous sclerosis, VHL disease) or prior brain tumor treatment",
    method: [
      "No routine screening recommended",
      "MRI brain with and without contrast (high-risk surveillance)",
      "Genetic counseling and testing for hereditary syndromes",
    ],
    frequency:
      "Individualized MRI surveillance intervals (typically every 6–12 months) based on hereditary syndrome and clinical risk",
    riskFactors: [
      "Prior ionizing radiation to the head",
      "Hereditary syndromes (NF1, NF2, Li-Fraumeni, tuberous sclerosis, VHL)",
      "Immunosuppression (primary CNS lymphoma)",
      "Family history of brain tumors",
      "Age (glioblastoma peaks at 55–75 years)",
    ],
    prevention: [
      "Avoidance of unnecessary cranial radiation",
      "Genetic counseling for hereditary brain tumor syndromes",
      "Avoidance of vinyl chloride and other industrial neurotoxins",
      "Management of immunosuppression risks",
    ],
    earlyWarning: [
      "New or progressively worsening headaches",
      "Seizures with no prior history",
      "Focal neurological deficits (weakness, numbness, speech changes)",
      "Cognitive or personality changes",
      "Nausea, vomiting, or visual disturbances",
    ],
  },

  thyroid: {
    guideline: "USPSTF 2017 / ATA 2015",
    eligible:
      "USPSTF recommends against routine screening for thyroid cancer in asymptomatic adults; ultrasound surveillance every 6–12 months for patients with MEN2A/2B (RET mutation), familial medullary thyroid carcinoma, or prior thyroid cancer; annual calcitonin or ultrasound for RET mutation carriers",
    method: [
      "No routine screening recommended for average-risk individuals",
      "Neck ultrasound (for high-risk or palpable nodule evaluation)",
      "Serum calcitonin (for medullary thyroid cancer risk in RET mutation carriers)",
      "Fine-needle aspiration biopsy (FNA) of suspicious nodules",
    ],
    frequency:
      "Annual ultrasound and calcitonin for RET mutation carriers; every 6–12 months post-thyroidectomy surveillance for thyroid cancer survivors",
    riskFactors: [
      "Ionizing radiation exposure to the neck (especially in childhood)",
      "Family history of thyroid cancer or hereditary syndromes (MEN2, FAP, Cowden)",
      "RET, PTEN, or APC germline mutations",
      "Female sex (3–4× higher incidence than males)",
      "Age 25–65 years",
    ],
    prevention: [
      "Avoidance of unnecessary head and neck radiation exposure",
      "Prophylactic thyroidectomy for RET mutation carriers",
      "Genetic counseling and testing for hereditary thyroid cancer syndromes",
      "Potassium iodide use in nuclear radiation emergencies",
    ],
    earlyWarning: [
      "Palpable thyroid nodule or neck mass",
      "Hoarseness or voice changes",
      "Difficulty swallowing or breathing",
      "Persistent neck pain or lymphadenopathy",
      "Rapidly enlarging thyroid gland",
    ],
  },

  larynx: {
    guideline: "NCCN 2024 / AAO-HNS 2022",
    eligible:
      "No routine population screening recommended; high-risk surveillance with laryngoscopy for individuals with chronic laryngeal dysplasia, heavy tobacco and alcohol use, or prior laryngeal cancer; indirect or direct laryngoscopy for symptomatic patients",
    method: [
      "No routine screening recommended",
      "Flexible or rigid laryngoscopy (symptomatic or high-risk surveillance)",
      "Stroboscopy for persistent dysphonia evaluation",
    ],
    frequency:
      "No routine population screening; individualized surveillance every 3–6 months for laryngeal dysplasia; annual review for high-risk patients",
    riskFactors: [
      "Tobacco use (strongest risk factor)",
      "Heavy alcohol consumption",
      "Combined tobacco and alcohol synergy",
      "Human papillomavirus (HPV) infection",
      "Occupational exposure to asbestos, nickel, or sulfuric acid mist",
    ],
    prevention: [
      "Smoking cessation",
      "Reduction of alcohol consumption",
      "HPV vaccination",
      "Avoidance of occupational inhalation hazards",
    ],
    earlyWarning: [
      "Persistent hoarseness or voice change lasting more than 3 weeks",
      "Sore throat or pain with swallowing",
      "Chronic cough or coughing up blood",
      "Sensation of a lump in the throat",
      "Ear pain without obvious cause",
    ],
  },

  oralCavity: {
    guideline: "USPSTF 2023 / ADA 2023 / NCCN 2024",
    eligible:
      "USPSTF concludes insufficient evidence for routine screening by primary care providers; ADA recommends annual oral cancer examination by a dentist for all patients; high-risk individuals (tobacco users, heavy alcohol users, HPV-positive, prior oral cancer) should have thorough oral examination at every dental visit",
    method: [
      "Visual and tactile oral examination by clinician or dentist",
      "Toluidine blue staining (adjunct)",
      "Tissue biopsy of suspicious lesions",
      "HPV testing of suspicious lesions",
    ],
    frequency:
      "Annual dental examination with oral cancer screening; more frequent for high-risk individuals",
    riskFactors: [
      "Tobacco use (smoked or smokeless)",
      "Heavy alcohol consumption",
      "HPV infection (especially HPV-16 for oropharyngeal cancer)",
      "Chronic sun exposure (lip cancer)",
      "Poor oral hygiene and chronic irritation",
    ],
    prevention: [
      "Tobacco and smokeless tobacco cessation",
      "Reduction of alcohol consumption",
      "HPV vaccination",
      "Regular dental check-ups with oral examination",
    ],
    earlyWarning: [
      "Non-healing oral ulcer or sore lasting more than 2 weeks",
      "Red or white patch (erythroplakia or leukoplakia) in the mouth",
      "Persistent pain or numbness in the mouth, tongue, or lips",
      "Difficulty chewing, swallowing, or moving the jaw",
      "Unexplained neck lump or lymph node enlargement",
    ],
  },

  salivaryGland: {
    guideline: "NCCN 2024 / AAO-HNS 2022",
    eligible:
      "No routine population screening recommended; evaluation of salivary gland masses by ultrasound and fine-needle aspiration for symptomatic patients or incidental findings; surveillance for patients with prior salivary gland malignancy",
    method: [
      "No routine screening recommended",
      "Salivary gland ultrasound (diagnostic for symptomatic masses)",
      "Fine-needle aspiration cytology (FNA) of salivary masses",
      "MRI for extent of disease characterization",
    ],
    frequency: "No routine screening; prompt evaluation of any persistent salivary gland swelling",
    riskFactors: [
      "Prior radiation therapy to the head and neck",
      "Occupational exposures (rubber manufacturing, hairdressing, asbestos)",
      "Smoking (Warthin tumor association)",
      "Sjogren syndrome (lymphoma risk)",
      "Certain viral infections (Epstein-Barr virus)",
    ],
    prevention: [
      "Avoidance of unnecessary head and neck radiation",
      "Smoking cessation",
      "Management of Sjogren syndrome",
      "Limiting occupational carcinogen exposure",
    ],
    earlyWarning: [
      "Painless swelling of the parotid, submandibular, or sublingual gland",
      "Facial nerve weakness or paralysis",
      "Pain in or around the ear",
      "Difficulty opening the mouth",
      "Numbness of the face or mouth",
    ],
  },

  nasopharynx: {
    guideline: "NCCN 2024 / ASCO 2022",
    eligible:
      "Routine screening not recommended in low-incidence Western populations; EBV serology (VCA-IgA, EA-IgA) and/or plasma EBV DNA screening in high-incidence regions (southern China, Southeast Asia) or in high-risk individuals (first-degree relatives of NPC patients from endemic areas)",
    method: [
      "EBV serology (VCA-IgA, EBNA-IgA) for high-risk populations",
      "Plasma EBV DNA quantification",
      "Nasopharyngoscopy with biopsy for suspicious lesions",
      "MRI nasopharynx for staging",
    ],
    frequency:
      "Annual EBV serology for high-risk individuals in endemic regions; prompt endoscopic evaluation for elevated EBV titers",
    riskFactors: [
      "Epstein-Barr virus (EBV) infection",
      "Chinese or Southeast Asian ethnicity",
      "Family history of nasopharyngeal carcinoma",
      "Diet high in salt-preserved fish and foods",
      "Tobacco and alcohol use",
    ],
    prevention: [
      "Reduction of salt-preserved food consumption",
      "Smoking cessation",
      "Improved ventilation to reduce wood smoke exposure",
      "EBV vaccination research is ongoing",
    ],
    earlyWarning: [
      "Painless neck lymphadenopathy",
      "Nasal obstruction or epistaxis",
      "Hearing loss or tinnitus (unilateral)",
      "Headache and cranial nerve palsies",
      "Serous otitis media in an adult",
    ],
  },

  breast: {
    guideline: "USPSTF 2024 / ACS 2015 / ACR 2017 / NCCN 2024",
    eligible:
      "Average-risk women: USPSTF recommends biennial mammography starting at age 40; ACS recommends annual mammography starting at 45 (option to start at 40), transitioning to biennial at 55; ACR recommends annual mammography starting at 40. High-risk women (lifetime risk ≥20%): annual MRI + mammography starting at age 30 (ACR/NCCN); BRCA1/2 mutation carriers begin annual MRI at 25",
    method: [
      "Digital mammography",
      "Digital breast tomosynthesis (DBT / 3D mammography)",
      "Breast MRI with contrast (high-risk women)",
      "Breast ultrasound (adjunct for dense breasts or MRI-ineligible)",
      "Clinical breast examination (CBE)",
    ],
    frequency:
      "Annual or biennial mammography for average-risk women aged 40–74; annual MRI + mammography for high-risk women; discussion of screening cessation beyond age 74 based on health and life expectancy",
    riskFactors: [
      "BRCA1 or BRCA2 germline mutation or other high-risk genes (PALB2, CHEK2, ATM)",
      "Family history of breast or ovarian cancer",
      "Prior breast biopsy showing atypical ductal or lobular hyperplasia",
      "Dense breast tissue (heterogeneously or extremely dense)",
      "Postmenopausal hormone therapy, nulliparity, late first pregnancy",
    ],
    prevention: [
      "Regular physical activity and healthy weight maintenance",
      "Limiting alcohol consumption",
      "Breastfeeding when possible",
      "Chemoprevention (tamoxifen, raloxifene, aromatase inhibitors) for high-risk women per USPSTF 2019",
    ],
    earlyWarning: [
      "New palpable breast lump or thickening",
      "Change in breast size, shape, or contour",
      "Nipple discharge (especially unilateral and bloody)",
      "Skin changes (dimpling, peau d'orange, redness)",
      "Nipple retraction or inversion",
    ],
  },

  bonemarrow: {
    guideline: "NCCN 2024 / ASH 2023",
    eligible:
      "No routine population screening; complete blood count (CBC) with differential for symptomatic patients; annual CBC monitoring for patients with clonal hematopoiesis of indeterminate potential (CHIP), myelodysplastic syndromes (MDS), or prior hematologic treatment with alkylating agents or radiation; MGUS surveillance with serum protein electrophoresis every 6–12 months",
    method: [
      "Complete blood count (CBC) with differential",
      "Serum protein electrophoresis (SPEP) for MGUS/myeloma surveillance",
      "Bone marrow biopsy and aspirate (diagnostic, not screening)",
      "Flow cytometry for immunophenotyping",
    ],
    frequency:
      "No population screening; annual CBC for CHIP and MDS surveillance; 6–12 month SPEP/SFLC for MGUS; individualized based on risk category",
    riskFactors: [
      "Prior chemotherapy or radiation therapy",
      "Occupational exposure to benzene or radiation",
      "Inherited bone marrow failure syndromes (Fanconi anemia, Diamond-Blackfan)",
      "Monoclonal gammopathy of undetermined significance (MGUS)",
      "Aging (AML, MDS risk increases with age)",
    ],
    prevention: [
      "Minimizing unnecessary radiation exposure",
      "Avoidance of benzene and other myelotoxic chemicals",
      "Careful monitoring and dose optimization in patients receiving myelotoxic therapy",
      "Genetic counseling for inherited bone marrow failure syndromes",
    ],
    earlyWarning: [
      "Unexplained fatigue and pallor (anemia)",
      "Recurrent or unusual infections (neutropenia)",
      "Easy bruising or bleeding (thrombocytopenia)",
      "Bone pain, particularly in the spine or ribs",
      "Unexplained weight loss, night sweats, or fever (B symptoms)",
    ],
  },

  lymphNodes: {
    guideline: "NCCN 2024 / ASH 2023",
    eligible:
      "No routine screening for the general population; surveillance with PET-CT or CT every 3–6 months for 2 years then annually up to 5 years for treated lymphoma patients; EBV monitoring for post-transplant lymphoproliferative disorder in solid organ and hematopoietic stem cell transplant recipients",
    method: [
      "No routine screening recommended for the general population",
      "CT of chest, abdomen, and pelvis (post-treatment surveillance)",
      "PET-CT (end-of-treatment response assessment and surveillance)",
      "Physical examination with lymph node assessment",
    ],
    frequency:
      "No population screening; post-treatment CT every 3–6 months for 2 years, then every 6–12 months up to 5 years for Hodgkin and aggressive NHL; clinical exam at each follow-up visit",
    riskFactors: [
      "Immunosuppression (HIV, post-transplant, congenital immunodeficiency)",
      "Epstein-Barr virus (EBV) or HTLV-1 infection",
      "Autoimmune diseases (Sjogren syndrome, rheumatoid arthritis)",
      "Prior chemotherapy or radiation therapy",
      "Family history of lymphoma or hereditary immunodeficiency",
    ],
    prevention: [
      "Antiretroviral therapy and immune reconstitution in HIV-positive individuals",
      "EBV monitoring and preemptive treatment in transplant recipients",
      "Management of chronic autoimmune conditions",
      "Avoidance of unnecessary immunosuppression",
    ],
    earlyWarning: [
      "Painless lymph node enlargement (cervical, axillary, inguinal)",
      "Unexplained fever, drenching night sweats, or weight loss (B symptoms)",
      "Persistent fatigue",
      "Splenomegaly or hepatomegaly",
      "Pruritus without identifiable skin cause",
    ],
  },

  adrenal: {
    guideline: "NCCN 2024 / Endocrine Society 2016",
    eligible:
      "No routine population screening; biochemical evaluation and dedicated adrenal CT or MRI for incidentally discovered adrenal masses (incidentalomas) ≥1 cm; annual imaging and hormonal evaluation for hereditary syndromes (MEN1, MEN2, VHL, SDH mutations, NF1, BWS); urinary catecholamines/metanephrines for pheochromocytoma in hereditary risk",
    method: [
      "No routine screening recommended",
      "Dedicated adrenal CT (non-contrast for washout protocol)",
      "Adrenal MRI (chemical shift imaging)",
      "24-hour urine or plasma metanephrines (pheochromocytoma)",
      "Low-dose dexamethasone suppression test (cortisol-secreting tumors)",
    ],
    frequency:
      "No population screening; annual imaging for hereditary adrenal syndromes; 6–12 month re-imaging for indeterminate adrenal incidentalomas",
    riskFactors: [
      "Hereditary syndromes (MEN1, MEN2, VHL, NF1, SDH mutations, Beckwith-Wiedemann)",
      "Li-Fraumeni syndrome (TP53 mutations) for adrenocortical carcinoma",
      "Family history of pheochromocytoma or paraganglioma",
      "Prior malignancy with adrenal metastasis risk",
      "Tobacco use (associated with adrenocortical carcinoma)",
    ],
    prevention: [
      "Genetic counseling and testing for hereditary adrenal tumor syndromes",
      "Surveillance in known mutation carriers",
      "Appropriate biochemical and imaging follow-up of adrenal incidentalomas",
      "Avoidance of exogenous hormone excess",
    ],
    earlyWarning: [
      "Hypertension that is new, severe, or refractory",
      "Paroxysmal hypertension with headache, sweating, and palpitations (pheochromocytoma)",
      "Signs of Cushing syndrome (weight gain, moon face, purple striae)",
      "Virilization or feminization signs",
      "Incidentally discovered adrenal mass on imaging",
    ],
  },

  skin: {
    guideline: "USPSTF 2023 / AAD 2023 / NCCN 2024",
    eligible:
      "USPSTF concludes insufficient evidence for or against routine visual skin examination by a clinician for skin cancer prevention in the general adult population; AAD recommends annual full-body skin examination by a dermatologist, especially for individuals with risk factors; monthly self-skin examination encouraged; patients with prior melanoma followed with full-body skin exam every 3–12 months",
    method: [
      "Full-body visual skin examination by a dermatologist",
      "Monthly self-skin examination",
      "Dermoscopy (dermatoscopy) for suspicious pigmented lesions",
      "Reflectance confocal microscopy or optical coherence tomography (adjunct)",
      "Excisional biopsy of suspicious lesions",
    ],
    frequency:
      "Annual full-body skin exam for high-risk individuals; every 3–6 months for the first 2 years after melanoma diagnosis, then every 6–12 months; self-exam monthly",
    riskFactors: [
      "Ultraviolet radiation exposure (sun and tanning bed use)",
      "History of sunburns, particularly blistering burns in childhood",
      "Fair skin, light eyes, and red or blonde hair (Fitzpatrick skin type I-II)",
      "Multiple or atypical melanocytic nevi",
      "Personal or family history of melanoma or non-melanoma skin cancer",
    ],
    prevention: [
      "Daily use of broad-spectrum SPF 30 or higher sunscreen",
      "Protective clothing, hats, and UV-protective eyewear",
      "Avoidance of tanning beds and peak UV hours (10 am to 4 pm)",
      "Regular self-skin examination and annual dermatologist evaluation for high-risk individuals",
    ],
    earlyWarning: [
      "New or changing skin lesion (ABCDE: Asymmetry, Border, Color, Diameter, Evolution)",
      "Non-healing sore or ulceration",
      "Pearly or waxy nodule (basal cell carcinoma)",
      "Firm red nodule or flat lesion with scaly surface (squamous cell carcinoma)",
      "Itching, bleeding, or crusting of a pigmented lesion",
    ],
  },

  bone: {
    guideline: "NCCN 2024 / ESMO 2022",
    eligible:
      "No routine population screening for primary bone tumors; surveillance imaging (X-ray, MRI, or CT) for patients with hereditary syndromes (Li-Fraumeni syndrome, hereditary retinoblastoma, Rothmund-Thomson syndrome, Werner syndrome); annual bone survey or MRI for patients with Ollier disease or Maffucci syndrome; surveillance after treatment for bone sarcomas",
    method: [
      "No routine screening recommended",
      "Plain radiography (X-ray) for initial evaluation of bone pain or mass",
      "MRI of suspected lesion (characterization and staging)",
      "Bone scintigraphy (technetium-99m bone scan) for systemic evaluation",
    ],
    frequency:
      "No population screening; individualized surveillance every 3–6 months for 2–3 years post-treatment, then annually; imaging for hereditary syndromes per clinical protocol",
    riskFactors: [
      "Prior radiation therapy to bones",
      "Hereditary syndromes (Li-Fraumeni, hereditary retinoblastoma, Rothmund-Thomson)",
      "Paget disease of bone (secondary osteosarcoma risk)",
      "Multiple exostoses (hereditary multiple osteochondromas)",
      "Ollier disease and Maffucci syndrome (enchondromatosis)",
    ],
    prevention: [
      "Genetic counseling and testing for hereditary bone tumor syndromes",
      "Minimizing unnecessary radiation exposure",
      "Surveillance imaging for patients with hereditary predisposition syndromes",
      "Prompt evaluation of unexplained bone pain or swelling",
    ],
    earlyWarning: [
      "Persistent or worsening bone pain not explained by injury",
      "Palpable, firm bone mass or swelling",
      "Pathologic fracture with minimal trauma",
      "Limb swelling with restriction of motion",
      "Unexplained fatigue or weight loss",
    ],
  },

  softTissue: {
    guideline: "NCCN 2024 / ESMO 2021",
    eligible:
      "No routine population screening; clinical surveillance for individuals with hereditary syndromes associated with soft tissue sarcoma risk (Li-Fraumeni syndrome, NF1, Gardner syndrome/FAP, Werner syndrome, Gorlin syndrome); MRI of soft tissue masses 5 cm or larger or deep-seated masses of any size warrants urgent evaluation",
    method: [
      "No routine screening recommended",
      "MRI with and without contrast (primary imaging modality for soft tissue masses)",
      "CT chest for pulmonary metastasis detection",
      "Core needle biopsy of suspicious lesions",
    ],
    frequency:
      "No population screening; post-treatment surveillance MRI every 3–6 months for 2–3 years, then annually for 5 years; clinical exam at each visit; hereditary syndrome carriers followed per institutional protocol",
    riskFactors: [
      "Prior ionizing radiation to soft tissue",
      "Hereditary syndromes (Li-Fraumeni/TP53, NF1, FAP with desmoid, Werner, Gorlin)",
      "Chronic lymphedema (Stewart-Treves syndrome — angiosarcoma)",
      "Exposure to vinyl chloride, arsenic, or dioxin",
      "Immunosuppression (Kaposi sarcoma with HHV-8)",
    ],
    prevention: [
      "Genetic counseling and testing for hereditary sarcoma syndromes",
      "Avoidance of unnecessary radiation exposure",
      "Management of chronic lymphedema",
      "Prompt referral of any deep or enlarging soft tissue mass to a sarcoma center",
    ],
    earlyWarning: [
      "Enlarging, painless soft tissue mass",
      "Mass greater than 5 cm in size",
      "Deep-seated mass beneath the fascia",
      "Mass that recurs after previous excision",
      "Unexplained limb swelling or restricted movement",
    ],
  },
};
