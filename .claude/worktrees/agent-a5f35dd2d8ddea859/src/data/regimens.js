export default {
  lungs: {
    1: [
      {
        name: "Surgical Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Lobectomy or segmentectomy is the standard of care for resectable stage I NSCLC."
      },
      {
        name: "SBRT (Stereotactic Body Radiation Therapy)",
        drugs: [],
        cycle: "3-5 fractions",
        category: "Radiation",
        notes: "SBRT is preferred for medically inoperable stage I NSCLC with excellent local control rates."
      },
      {
        name: "Osimertinib (Adjuvant, EGFR+)",
        drugs: ["Osimertinib"],
        cycle: "Daily for 3 years",
        category: "Targeted",
        notes: "Adjuvant osimertinib significantly improves DFS in resected EGFR-mutant NSCLC per ADAURA trial."
      }
    ],
    2: [
      {
        name: "Carboplatin + Paclitaxel (Adjuvant)",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "Adjuvant platinum-based chemotherapy is standard after resection for stage II NSCLC."
      },
      {
        name: "Osimertinib (Adjuvant, EGFR+)",
        drugs: ["Osimertinib"],
        cycle: "Daily for 3 years",
        category: "Targeted",
        notes: "EGFR-mutant patients benefit from adjuvant osimertinib following resection and adjuvant chemotherapy."
      },
      {
        name: "Cisplatin + Vinorelbine (Adjuvant)",
        drugs: ["Cisplatin", "Vinorelbine"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "Cisplatin-vinorelbine is a well-established adjuvant regimen for resected stage II NSCLC."
      }
    ],
    3: [
      {
        name: "Concurrent Chemoradiation + Durvalumab",
        drugs: ["Cisplatin", "Etoposide", "Durvalumab"],
        cycle: "CRT followed by durvalumab x12 months",
        category: "Immunotherapy",
        notes: "Durvalumab consolidation after concurrent CRT improves PFS in unresectable stage III NSCLC per PACIFIC trial."
      },
      {
        name: "Carboplatin + Paclitaxel + RT",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Weekly during RT",
        category: "Chemotherapy",
        notes: "Carboplatin-paclitaxel concurrent with thoracic RT is an alternative backbone for stage III NSCLC."
      },
      {
        name: "Alectinib (ALK+)",
        drugs: ["Alectinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Alectinib is preferred first-line therapy for ALK-rearranged advanced NSCLC with superior CNS penetration."
      }
    ],
    4: [
      {
        name: "Pembrolizumab (KEYNOTE-024, PD-L1 ≥50%)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab monotherapy is first-line standard for metastatic NSCLC with PD-L1 TPS ≥50% and no driver mutations."
      },
      {
        name: "Carboplatin + Paclitaxel + Pembrolizumab (KEYNOTE-189)",
        drugs: ["Carboplatin", "Paclitaxel", "Pembrolizumab"],
        cycle: "Every 3 weeks x4, then pembro maintenance",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus platinum doublet significantly improves OS in metastatic non-squamous NSCLC regardless of PD-L1."
      },
      {
        name: "Osimertinib (EGFR Exon 19/21)",
        drugs: ["Osimertinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Osimertinib is the preferred first-line agent for EGFR-mutant (ex19del or L858R) metastatic NSCLC per FLAURA trial."
      },
      {
        name: "Alectinib (ALK+, ALEX Trial)",
        drugs: ["Alectinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Alectinib demonstrated superior PFS over crizotinib in ALK-positive metastatic NSCLC in the ALEX trial."
      }
    ]
  },

  esophagus: {
    1: [
      {
        name: "Endoscopic Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Endoscopic mucosal resection or submucosal dissection is preferred for T1a esophageal cancers."
      },
      {
        name: "Esophagectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Surgical resection with adequate margins is the definitive treatment for early-stage resectable esophageal cancer."
      }
    ],
    2: [
      {
        name: "Carboplatin + Paclitaxel + RT (CROSS)",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Weekly x5 during RT",
        category: "Chemotherapy",
        notes: "Neoadjuvant chemoradiation per CROSS regimen followed by surgery is standard for resectable esophageal cancer."
      },
      {
        name: "Cisplatin + 5-FU + RT",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "Every 4 weeks x2 during RT",
        category: "Chemotherapy",
        notes: "Cisplatin plus 5-FU with concurrent RT is an alternative neoadjuvant approach for esophageal squamous cell carcinoma."
      }
    ],
    3: [
      {
        name: "Carboplatin + Paclitaxel + RT (CROSS) + Nivolumab",
        drugs: ["Carboplatin", "Paclitaxel", "Nivolumab"],
        cycle: "Neoadjuvant CRT then adjuvant nivolumab x1 year",
        category: "Immunotherapy",
        notes: "Adjuvant nivolumab after neoadjuvant CRT and resection improves DFS in esophageal cancer per CheckMate 577."
      },
      {
        name: "Definitive Chemoradiation",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "Every 4 weeks x2 concurrent with RT",
        category: "Chemotherapy",
        notes: "Definitive concurrent chemoradiation is preferred for unresectable or cervical esophageal squamous cell carcinoma."
      },
      {
        name: "FLOT (Perioperative)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin", "Docetaxel"],
        cycle: "Every 2 weeks x4 pre-op and x4 post-op",
        category: "Chemotherapy",
        notes: "Perioperative FLOT improves overall survival for resectable gastroesophageal junction adenocarcinoma per FLOT4 trial."
      }
    ],
    4: [
      {
        name: "Pembrolizumab + Cisplatin + 5-FU (KEYNOTE-590)",
        drugs: ["Pembrolizumab", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus chemotherapy is first-line standard for metastatic esophageal cancer with improved OS in KEYNOTE-590."
      },
      {
        name: "Nivolumab + Ipilimumab (CheckMate 648)",
        drugs: ["Nivolumab", "Ipilimumab"],
        cycle: "Nivolumab every 2 weeks, Ipilimumab every 6 weeks",
        category: "Immunotherapy",
        notes: "Nivolumab plus ipilimumab improved OS versus chemotherapy in metastatic esophageal squamous cell carcinoma."
      },
      {
        name: "Ramucirumab + Paclitaxel",
        drugs: ["Ramucirumab", "Paclitaxel"],
        cycle: "Every 4 weeks",
        category: "Targeted",
        notes: "Ramucirumab plus paclitaxel is a second-line option for advanced gastric or gastroesophageal junction adenocarcinoma."
      }
    ]
  },

  liver: {
    1: [
      {
        name: "Hepatic Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Surgical resection is the preferred curative option for solitary HCC in patients with adequate hepatic reserve."
      },
      {
        name: "Radiofrequency Ablation (RFA)",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "RFA achieves excellent local control for early-stage HCC lesions less than 3 cm."
      }
    ],
    2: [
      {
        name: "Liver Transplantation (Milan Criteria)",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Liver transplantation within Milan criteria offers the best long-term survival and cure for selected HCC patients."
      },
      {
        name: "TACE (Transarterial Chemoembolization)",
        drugs: ["Doxorubicin"],
        cycle: "Every 6-8 weeks as needed",
        category: "Chemotherapy",
        notes: "TACE is used for bridging to transplant or as locoregional therapy for intermediate-stage unresectable HCC."
      }
    ],
    3: [
      {
        name: "TACE + Sorafenib",
        drugs: ["Doxorubicin", "Sorafenib"],
        cycle: "TACE as needed; Sorafenib daily",
        category: "Targeted",
        notes: "Combining TACE with sorafenib has been investigated for intermediate-stage HCC though benefit remains debated."
      },
      {
        name: "SBRT (Stereotactic Body Radiation)",
        drugs: [],
        cycle: "3-5 fractions",
        category: "Radiation",
        notes: "SBRT provides effective locoregional control for unresectable HCC not amenable to ablation or TACE."
      },
      {
        name: "Atezolizumab + Bevacizumab (IMbrave150)",
        drugs: ["Atezolizumab", "Bevacizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Atezolizumab plus bevacizumab is first-line standard for advanced unresectable HCC with superior OS over sorafenib."
      }
    ],
    4: [
      {
        name: "Atezolizumab + Bevacizumab",
        drugs: ["Atezolizumab", "Bevacizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Atezo-bev is the preferred first-line regimen for advanced HCC based on IMbrave150 overall survival benefit."
      },
      {
        name: "Sorafenib",
        drugs: ["Sorafenib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Sorafenib was the first systemic agent showing OS benefit in advanced HCC and remains an alternative first-line option."
      },
      {
        name: "Lenvatinib",
        drugs: ["Lenvatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Lenvatinib is non-inferior to sorafenib in OS and is an alternative first-line oral option for advanced HCC."
      },
      {
        name: "Regorafenib (Second-line)",
        drugs: ["Regorafenib"],
        cycle: "Daily 3 weeks on, 1 week off",
        category: "Targeted",
        notes: "Regorafenib improves OS in sorafenib-tolerant patients with HCC progression on first-line sorafenib."
      }
    ]
  },

  gallbladder: {
    1: [
      {
        name: "Cholecystectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Simple or radical cholecystectomy is curative for early-stage gallbladder cancer confined to the mucosa."
      },
      {
        name: "Extended Cholecystectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Extended resection including hepatic bed and regional lymph nodes is recommended for T2 gallbladder cancer."
      }
    ],
    2: [
      {
        name: "Gemcitabine + Cisplatin (Adjuvant)",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Adjuvant gemcitabine-cisplatin is considered for resected gallbladder cancer with high-risk features."
      },
      {
        name: "Capecitabine (Adjuvant)",
        drugs: ["Capecitabine"],
        cycle: "Daily x14 days, every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Adjuvant capecitabine for 6 months improved OS in resected biliary tract cancer per the BILCAP trial."
      }
    ],
    3: [
      {
        name: "Gemcitabine + Cisplatin",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-cisplatin is the standard first-line regimen for locally advanced unresectable biliary tract cancer."
      },
      {
        name: "RT + Capecitabine",
        drugs: ["Capecitabine"],
        cycle: "Daily during RT",
        category: "Chemotherapy",
        notes: "Concurrent chemoradiation with capecitabine may provide locoregional control in unresectable gallbladder cancer."
      }
    ],
    4: [
      {
        name: "Gemcitabine + Cisplatin + Durvalumab (TOPAZ-1)",
        drugs: ["Gemcitabine", "Cisplatin", "Durvalumab"],
        cycle: "Every 3 weeks x8, then durvalumab maintenance",
        category: "Immunotherapy",
        notes: "Adding durvalumab to gemcitabine-cisplatin improved OS in advanced biliary tract cancer per TOPAZ-1."
      },
      {
        name: "Gemcitabine + Cisplatin",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-cisplatin remains a standard first-line option for metastatic gallbladder and biliary tract cancers."
      },
      {
        name: "FOLFOX (Second-line)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFOX is an active second-line regimen for advanced biliary tract cancer after platinum-based first-line therapy."
      }
    ]
  },

  pancreas: {
    1: [
      {
        name: "Pancreaticoduodenectomy (Whipple)",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Whipple procedure is the standard curative resection for resectable pancreatic head adenocarcinoma."
      },
      {
        name: "Gemcitabine (Adjuvant)",
        drugs: ["Gemcitabine"],
        cycle: "Weekly x3, every 4 weeks x6 months",
        category: "Chemotherapy",
        notes: "Adjuvant gemcitabine for 6 months after resection remains an evidence-based option for pancreatic adenocarcinoma."
      }
    ],
    2: [
      {
        name: "FOLFIRINOX (Adjuvant)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Irinotecan", "Oxaliplatin"],
        cycle: "Every 2 weeks x12",
        category: "Chemotherapy",
        notes: "Adjuvant modified FOLFIRINOX significantly improves DFS and OS over gemcitabine in resected pancreatic cancer per PRODIGE 24."
      },
      {
        name: "Gemcitabine + Capecitabine (Adjuvant)",
        drugs: ["Gemcitabine", "Capecitabine"],
        cycle: "Every 4 weeks x6 months",
        category: "Chemotherapy",
        notes: "Gemcitabine plus capecitabine is an alternative adjuvant regimen with improved OS over gemcitabine alone per ESPAC-4."
      }
    ],
    3: [
      {
        name: "FOLFIRINOX (Neoadjuvant/Unresectable)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Irinotecan", "Oxaliplatin"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFIRINOX is the preferred neoadjuvant regimen for borderline resectable and locally advanced pancreatic cancer."
      },
      {
        name: "Gemcitabine + nab-Paclitaxel",
        drugs: ["Gemcitabine", "nab-Paclitaxel"],
        cycle: "Every 4 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine plus nab-paclitaxel is an effective regimen for locally advanced and metastatic pancreatic adenocarcinoma."
      },
      {
        name: "Gemcitabine + RT",
        drugs: ["Gemcitabine"],
        cycle: "Weekly during RT",
        category: "Chemotherapy",
        notes: "Gemcitabine-based chemoradiation is used for locally advanced unresectable pancreatic cancer after induction chemotherapy."
      }
    ],
    4: [
      {
        name: "FOLFIRINOX",
        drugs: ["5-Fluorouracil", "Leucovorin", "Irinotecan", "Oxaliplatin"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFIRINOX significantly improved OS versus gemcitabine monotherapy for metastatic pancreatic cancer in PRODIGE 4."
      },
      {
        name: "Gemcitabine + nab-Paclitaxel",
        drugs: ["Gemcitabine", "nab-Paclitaxel"],
        cycle: "Days 1, 8, 15 every 28 days",
        category: "Chemotherapy",
        notes: "Gemcitabine plus nab-paclitaxel improved median OS to 8.5 months versus 6.7 for gemcitabine alone in MPACT trial."
      },
      {
        name: "Gemcitabine Monotherapy",
        drugs: ["Gemcitabine"],
        cycle: "Weekly x7, then weekly x3 every 4 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine monotherapy remains appropriate for patients with poor performance status and metastatic pancreatic cancer."
      },
      {
        name: "Olaparib (BRCA1/2 Maintenance)",
        drugs: ["Olaparib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Olaparib maintenance improved PFS in germline BRCA-mutant metastatic pancreatic cancer after platinum-based therapy per POLO."
      }
    ]
  },

  stomach: {
    1: [
      {
        name: "Endoscopic Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Endoscopic submucosal dissection is appropriate for T1a gastric cancers meeting expanded criteria without lymph node risk."
      },
      {
        name: "Gastrectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Total or subtotal gastrectomy with D2 lymph node dissection is the standard curative surgery for resectable gastric cancer."
      }
    ],
    2: [
      {
        name: "FLOT (Perioperative)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin", "Docetaxel"],
        cycle: "Every 2 weeks x4 pre-op and x4 post-op",
        category: "Chemotherapy",
        notes: "Perioperative FLOT is the preferred regimen for resectable gastric and GEJ adenocarcinoma based on FLOT4 survival benefit."
      },
      {
        name: "Capecitabine + Oxaliplatin (CAPOX) Perioperative",
        drugs: ["Capecitabine", "Oxaliplatin"],
        cycle: "Every 3 weeks x3 pre-op and x3 post-op",
        category: "Chemotherapy",
        notes: "Perioperative CAPOX is an alternative to FLOT for resectable gastric cancer with equivalent tolerability."
      }
    ],
    3: [
      {
        name: "Cisplatin + 5-FU + RT (Chemoradiation)",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "Concurrent with RT",
        category: "Chemotherapy",
        notes: "Concurrent chemoradiation is used for locoregionally advanced unresectable gastric cancer."
      },
      {
        name: "FLOT",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin", "Docetaxel"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FLOT chemotherapy alone may be used for locally advanced unresectable gastric cancer to achieve downsizing."
      },
      {
        name: "Nivolumab + Chemotherapy",
        drugs: ["Nivolumab", "Oxaliplatin", "Capecitabine"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Nivolumab added to chemotherapy improved OS in advanced gastric cancer with CPS ≥5 per CheckMate 649."
      }
    ],
    4: [
      {
        name: "Nivolumab + CAPOX (CheckMate 649)",
        drugs: ["Nivolumab", "Capecitabine", "Oxaliplatin"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Nivolumab plus CAPOX is first-line standard for HER2-negative metastatic gastric cancer with CPS ≥5."
      },
      {
        name: "Trastuzumab + Cisplatin + 5-FU (HER2+)",
        drugs: ["Trastuzumab", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Trastuzumab plus cisplatin-fluoropyrimidine is first-line standard for HER2-positive metastatic gastric cancer."
      },
      {
        name: "Ramucirumab + Paclitaxel",
        drugs: ["Ramucirumab", "Paclitaxel"],
        cycle: "Days 1, 8, 15 every 28 days",
        category: "Targeted",
        notes: "Ramucirumab plus paclitaxel is a standard second-line regimen for advanced gastric and GEJ adenocarcinoma."
      },
      {
        name: "Irinotecan Monotherapy",
        drugs: ["Irinotecan"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "Irinotecan monotherapy is an option for third-line or later treatment of metastatic gastric cancer."
      }
    ]
  },

  smallintestine: {
    1: [
      {
        name: "Surgical Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Wide resection with regional lymphadenectomy is the curative treatment for resectable small intestinal adenocarcinoma."
      }
    ],
    2: [
      {
        name: "FOLFOX (Adjuvant)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks x12",
        category: "Chemotherapy",
        notes: "Adjuvant FOLFOX is commonly used for resected small bowel adenocarcinoma extrapolated from colon cancer data."
      },
      {
        name: "Capecitabine + Oxaliplatin (CAPOX Adjuvant)",
        drugs: ["Capecitabine", "Oxaliplatin"],
        cycle: "Every 3 weeks x8",
        category: "Chemotherapy",
        notes: "Adjuvant CAPOX is an oral alternative regimen for resected small bowel adenocarcinoma."
      }
    ],
    3: [
      {
        name: "FOLFOX",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFOX is the preferred first-line regimen for locally advanced unresectable small bowel adenocarcinoma."
      },
      {
        name: "Octreotide (Neuroendocrine)",
        drugs: ["Octreotide LAR"],
        cycle: "Monthly injection",
        category: "Targeted",
        notes: "Octreotide LAR controls symptoms and delays progression in well-differentiated small intestinal neuroendocrine tumors."
      }
    ],
    4: [
      {
        name: "FOLFOX",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFOX is the standard first-line regimen for metastatic small bowel adenocarcinoma based on retrospective data."
      },
      {
        name: "FOLFIRI",
        drugs: ["5-Fluorouracil", "Leucovorin", "Irinotecan"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFIRI is an active second-line option for metastatic small bowel adenocarcinoma after oxaliplatin-based therapy."
      },
      {
        name: "Everolimus (Neuroendocrine)",
        drugs: ["Everolimus"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Everolimus demonstrated improved PFS in progressive pancreatic and GI neuroendocrine tumors per RADIANT trials."
      }
    ]
  },

  colon: {
    1: [
      {
        name: "Colectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Surgical resection with adequate margins and regional lymphadenectomy is curative for stage I colon cancer."
      }
    ],
    2: [
      {
        name: "Colectomy Alone",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Most stage II colon cancer patients are adequately treated with surgery alone without adjuvant chemotherapy."
      },
      {
        name: "FOLFOX (High-Risk Stage II)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks x12",
        category: "Chemotherapy",
        notes: "Adjuvant FOLFOX is considered for high-risk stage II colon cancer features such as T4, perforation, or inadequate nodes."
      },
      {
        name: "Capecitabine (Adjuvant)",
        drugs: ["Capecitabine"],
        cycle: "Daily x14 days every 3 weeks x8",
        category: "Chemotherapy",
        notes: "Adjuvant capecitabine is an oral alternative to 5-FU for stage II colon cancer patients unable to tolerate oxaliplatin."
      }
    ],
    3: [
      {
        name: "FOLFOX (Adjuvant)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin"],
        cycle: "Every 2 weeks x12",
        category: "Chemotherapy",
        notes: "Adjuvant FOLFOX for 6 months is the standard of care for stage III colon cancer after surgical resection."
      },
      {
        name: "CAPOX (Adjuvant)",
        drugs: ["Capecitabine", "Oxaliplatin"],
        cycle: "Every 3 weeks x8",
        category: "Chemotherapy",
        notes: "Adjuvant CAPOX for 3-6 months is non-inferior to 6-month FOLFOX for stage III colon cancer per IDEA collaboration."
      },
      {
        name: "Pembrolizumab (MSI-H/dMMR)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab is highly active in MSI-H/dMMR colon cancer and is being studied in the adjuvant setting."
      }
    ],
    4: [
      {
        name: "FOLFOX + Bevacizumab",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin", "Bevacizumab"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFOX plus bevacizumab is a standard first-line regimen for RAS-mutant metastatic colorectal cancer."
      },
      {
        name: "FOLFIRI + Cetuximab (RAS WT)",
        drugs: ["5-Fluorouracil", "Leucovorin", "Irinotecan", "Cetuximab"],
        cycle: "Every 2 weeks",
        category: "Targeted",
        notes: "Cetuximab added to FOLFIRI improves OS in RAS/BRAF wild-type left-sided metastatic colorectal cancer."
      },
      {
        name: "FOLFOXIRI + Bevacizumab",
        drugs: ["5-Fluorouracil", "Leucovorin", "Oxaliplatin", "Irinotecan", "Bevacizumab"],
        cycle: "Every 2 weeks",
        category: "Chemotherapy",
        notes: "FOLFOXIRI plus bevacizumab offers high response rates and improved PFS for fit patients with metastatic CRC per TRIBE."
      },
      {
        name: "Pembrolizumab (MSI-H/dMMR, KEYNOTE-177)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab is first-line preferred treatment for MSI-H/dMMR metastatic colorectal cancer with superior PFS over chemo."
      }
    ]
  },

  kidney: {
    1: [
      {
        name: "Partial Nephrectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Nephron-sparing partial nephrectomy is preferred for T1 renal cell carcinoma when technically feasible."
      },
      {
        name: "Active Surveillance",
        drugs: [],
        cycle: "Ongoing monitoring",
        category: "Surgery",
        notes: "Active surveillance with serial imaging is appropriate for small incidentally discovered renal masses in elderly patients."
      }
    ],
    2: [
      {
        name: "Radical Nephrectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Radical nephrectomy with retroperitoneal lymph node dissection is standard for T2 renal cell carcinoma."
      },
      {
        name: "Sunitinib (Adjuvant)",
        drugs: ["Sunitinib"],
        cycle: "Daily 4 weeks on, 2 weeks off x9 cycles",
        category: "Targeted",
        notes: "Adjuvant sunitinib is FDA-approved for high-risk RCC after nephrectomy, though OS benefit remains uncertain."
      }
    ],
    3: [
      {
        name: "Nephrectomy + Pembrolizumab (Adjuvant)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 6 weeks x17 cycles",
        category: "Immunotherapy",
        notes: "Adjuvant pembrolizumab significantly improved DFS in high-risk resected RCC per KEYNOTE-564 trial."
      },
      {
        name: "Cytoreductive Nephrectomy + Systemic Therapy",
        drugs: ["Sunitinib"],
        cycle: "Surgery followed by systemic therapy",
        category: "Surgery",
        notes: "Cytoreductive nephrectomy followed by targeted therapy may benefit selected patients with synchronous metastatic RCC."
      }
    ],
    4: [
      {
        name: "Ipilimumab + Nivolumab (CheckMate 214)",
        drugs: ["Ipilimumab", "Nivolumab"],
        cycle: "Every 3 weeks x4, then nivolumab every 4 weeks",
        category: "Immunotherapy",
        notes: "Ipilimumab plus nivolumab is preferred first-line for intermediate and poor-risk metastatic clear cell RCC."
      },
      {
        name: "Pembrolizumab + Axitinib (KEYNOTE-426)",
        drugs: ["Pembrolizumab", "Axitinib"],
        cycle: "Pembrolizumab every 3 weeks; axitinib daily",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus axitinib improved OS versus sunitinib across all IMDC risk groups in metastatic RCC."
      },
      {
        name: "Cabozantinib",
        drugs: ["Cabozantinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Cabozantinib improved PFS and OS over everolimus in previously treated metastatic RCC per METEOR trial."
      },
      {
        name: "Sunitinib",
        drugs: ["Sunitinib"],
        cycle: "Daily 4 weeks on, 2 weeks off",
        category: "Targeted",
        notes: "Sunitinib was a previous standard first-line option for metastatic RCC and remains active in the second-line setting."
      }
    ]
  },

  bladder: {
    1: [
      {
        name: "TURBT + Intravesical BCG",
        drugs: ["BCG"],
        cycle: "Weekly x6, then maintenance",
        category: "Immunotherapy",
        notes: "Intravesical BCG after TURBT reduces recurrence and progression risk in high-grade non-muscle-invasive bladder cancer."
      },
      {
        name: "TURBT + Mitomycin C",
        drugs: ["Mitomycin C"],
        cycle: "Single instillation post-TURBT",
        category: "Chemotherapy",
        notes: "Single immediate post-TURBT intravesical mitomycin C reduces early recurrence risk for low-grade bladder cancer."
      }
    ],
    2: [
      {
        name: "Neoadjuvant DDMVAC + Cystectomy",
        drugs: ["Methotrexate", "Vinblastine", "Doxorubicin", "Cisplatin"],
        cycle: "Every 2 weeks x3-4 pre-op",
        category: "Chemotherapy",
        notes: "Dose-dense MVAC neoadjuvant chemotherapy followed by radical cystectomy improves OS for muscle-invasive bladder cancer."
      },
      {
        name: "Gemcitabine + Cisplatin (Neoadjuvant)",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks x4 pre-op",
        category: "Chemotherapy",
        notes: "Neoadjuvant gemcitabine-cisplatin is widely used as an alternative to MVAC for muscle-invasive bladder cancer."
      }
    ],
    3: [
      {
        name: "Radical Cystectomy + Adjuvant Nivolumab",
        drugs: ["Nivolumab"],
        cycle: "Every 4 weeks x1 year",
        category: "Immunotherapy",
        notes: "Adjuvant nivolumab improved DFS in high-risk muscle-invasive bladder cancer after radical cystectomy per CheckMate 274."
      },
      {
        name: "Concurrent Chemoradiation (Bladder Preservation)",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "Concurrent with RT",
        category: "Chemotherapy",
        notes: "Trimodal therapy (TURBT + chemoradiation) is a bladder-preserving alternative to radical cystectomy for selected patients."
      }
    ],
    4: [
      {
        name: "Gemcitabine + Cisplatin",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-cisplatin is equivalent to MVAC with a better tolerability profile and is standard first-line for metastatic bladder cancer."
      },
      {
        name: "Pembrolizumab (Second-line, KEYNOTE-045)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab improved OS over chemotherapy in platinum-refractory metastatic urothelial carcinoma per KEYNOTE-045."
      },
      {
        name: "Enfortumab Vedotin + Pembrolizumab (EV-302)",
        drugs: ["Enfortumab Vedotin", "Pembrolizumab"],
        cycle: "Days 1 and 8 every 3 weeks",
        category: "Immunotherapy",
        notes: "Enfortumab vedotin plus pembrolizumab demonstrated superior OS over chemotherapy as first-line therapy for metastatic urothelial cancer."
      }
    ]
  },

  prostate: {
    1: [
      {
        name: "Radical Prostatectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Radical prostatectomy offers excellent biochemical control for localized prostate cancer with low-to-intermediate risk."
      },
      {
        name: "External Beam Radiation Therapy (EBRT)",
        drugs: [],
        cycle: "~8 weeks",
        category: "Radiation",
        notes: "EBRT alone achieves equivalent biochemical control to surgery for low-risk localized prostate cancer."
      }
    ],
    2: [
      {
        name: "EBRT + Short-course ADT",
        drugs: ["Leuprolide"],
        cycle: "RT with 4-6 months ADT",
        category: "Hormonal",
        notes: "Combined EBRT with short-term ADT improves biochemical control in intermediate-risk localized prostate cancer."
      },
      {
        name: "Brachytherapy",
        drugs: [],
        cycle: "One-time",
        category: "Radiation",
        notes: "Brachytherapy (LDR or HDR) is an effective treatment for favorable intermediate-risk prostate cancer."
      }
    ],
    3: [
      {
        name: "EBRT + Long-course ADT (2-3 years)",
        drugs: ["Leuprolide", "Bicalutamide"],
        cycle: "RT with 2-3 years ADT",
        category: "Hormonal",
        notes: "Long-term ADT combined with EBRT significantly improves OS in high-risk locally advanced prostate cancer."
      },
      {
        name: "Abiraterone + ADT (STAMPEDE)",
        drugs: ["Abiraterone", "Prednisone", "Leuprolide"],
        cycle: "Daily continuous",
        category: "Hormonal",
        notes: "Adding abiraterone to standard ADT improves failure-free survival in high-risk locally advanced prostate cancer."
      },
      {
        name: "Docetaxel + ADT",
        drugs: ["Docetaxel", "Leuprolide"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Addition of docetaxel to ADT improves OS in high-volume locally advanced or metastatic prostate cancer per STAMPEDE."
      }
    ],
    4: [
      {
        name: "ADT (LHRH Agonist/Antagonist)",
        drugs: ["Leuprolide"],
        cycle: "Monthly or quarterly injections",
        category: "Hormonal",
        notes: "Androgen deprivation therapy is the backbone of systemic treatment for metastatic hormone-sensitive prostate cancer."
      },
      {
        name: "Enzalutamide + ADT",
        drugs: ["Enzalutamide", "Leuprolide"],
        cycle: "Daily continuous",
        category: "Hormonal",
        notes: "Enzalutamide plus ADT improved radiographic PFS and OS in metastatic castration-resistant prostate cancer per ARCHES."
      },
      {
        name: "Docetaxel + ADT",
        drugs: ["Docetaxel", "Leuprolide"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Docetaxel combined with ADT improves survival in metastatic hormone-sensitive prostate cancer with high-volume disease."
      },
      {
        name: "Lutetium-177 PSMA-617 (VISION Trial)",
        drugs: ["Lutetium-177 PSMA-617"],
        cycle: "Every 6 weeks x6",
        category: "Targeted",
        notes: "Lu-177-PSMA-617 improved OS in PSMA-positive metastatic castration-resistant prostate cancer per the VISION trial."
      }
    ]
  },

  testes: {
    1: [
      {
        name: "Radical Orchiectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Radical inguinal orchiectomy is both diagnostic and therapeutic for stage I testicular germ cell tumors."
      },
      {
        name: "Surveillance",
        drugs: [],
        cycle: "Active monitoring",
        category: "Surgery",
        notes: "Active surveillance after orchiectomy is the preferred management for low-risk stage I nonseminomatous GCT."
      }
    ],
    2: [
      {
        name: "BEP x3 cycles",
        drugs: ["Bleomycin", "Etoposide", "Cisplatin"],
        cycle: "Every 3 weeks x3",
        category: "Chemotherapy",
        notes: "Three cycles of BEP is the standard chemotherapy for good-risk metastatic testicular germ cell tumors."
      },
      {
        name: "EP x4 cycles",
        drugs: ["Etoposide", "Cisplatin"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "Four cycles of EP without bleomycin is an alternative for good-risk GCT in patients with bleomycin contraindications."
      }
    ],
    3: [
      {
        name: "BEP x4 cycles",
        drugs: ["Bleomycin", "Etoposide", "Cisplatin"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "Four cycles of BEP is the standard for intermediate-risk metastatic testicular germ cell tumors."
      },
      {
        name: "VIP (Salvage)",
        drugs: ["Vinblastine", "Ifosfamide", "Cisplatin"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "VIP is an active salvage regimen for relapsed or refractory germ cell tumors following BEP failure."
      }
    ],
    4: [
      {
        name: "BEP x4 cycles (Poor Risk)",
        drugs: ["Bleomycin", "Etoposide", "Cisplatin"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "Four cycles of BEP is the standard for poor-risk metastatic germ cell tumors with cure rates around 50%."
      },
      {
        name: "TIP (Paclitaxel + Ifosfamide + Cisplatin)",
        drugs: ["Paclitaxel", "Ifosfamide", "Cisplatin"],
        cycle: "Every 3 weeks x4",
        category: "Chemotherapy",
        notes: "TIP is an effective salvage regimen for relapsed GCT and may be used as induction before high-dose chemotherapy."
      },
      {
        name: "High-Dose Chemotherapy + ASCT",
        drugs: ["Carboplatin", "Etoposide"],
        cycle: "High-dose x2-3 cycles with stem cell rescue",
        category: "Chemotherapy",
        notes: "High-dose chemotherapy followed by autologous stem cell transplant is potentially curative for chemosensitive relapsed GCT."
      }
    ]
  },

  ovaries: {
    1: [
      {
        name: "Surgical Staging + Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Complete surgical staging followed by adjuvant carboplatin-paclitaxel is standard for high-grade stage I ovarian cancer."
      },
      {
        name: "Surgical Staging Alone",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Comprehensive surgical staging without adjuvant chemotherapy may suffice for low-grade stage IA-IB ovarian cancer."
      }
    ],
    2: [
      {
        name: "Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Carboplatin plus paclitaxel every 3 weeks is the standard first-line chemotherapy for stage II epithelial ovarian cancer."
      },
      {
        name: "Carboplatin + Paclitaxel + Bevacizumab",
        drugs: ["Carboplatin", "Paclitaxel", "Bevacizumab"],
        cycle: "Every 3 weeks x6, then bev maintenance x15 months",
        category: "Targeted",
        notes: "Adding bevacizumab to chemotherapy and as maintenance improves PFS in advanced ovarian cancer per GOG-0218."
      }
    ],
    3: [
      {
        name: "Carboplatin + Paclitaxel + Bevacizumab (Maintenance)",
        drugs: ["Carboplatin", "Paclitaxel", "Bevacizumab"],
        cycle: "Every 3 weeks x6, then bev maintenance",
        category: "Targeted",
        notes: "Bevacizumab maintenance after carboplatin-paclitaxel significantly prolongs PFS in stage III-IV ovarian cancer."
      },
      {
        name: "Olaparib Maintenance (BRCA1/2, SOLO-1)",
        drugs: ["Olaparib"],
        cycle: "Daily continuous for up to 2 years",
        category: "Targeted",
        notes: "Olaparib maintenance dramatically improved PFS in BRCA-mutant advanced ovarian cancer in complete/partial response."
      },
      {
        name: "Niraparib Maintenance (PRIMA)",
        drugs: ["Niraparib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Niraparib maintenance improved PFS in newly diagnosed advanced ovarian cancer regardless of BRCA status per PRIMA trial."
      }
    ],
    4: [
      {
        name: "Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Carboplatin-paclitaxel doublet is the backbone first-line regimen for advanced metastatic epithelial ovarian cancer."
      },
      {
        name: "Olaparib (BRCA-Mutant)",
        drugs: ["Olaparib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Olaparib PARP inhibitor therapy is active in germline or somatic BRCA-mutant platinum-sensitive recurrent ovarian cancer."
      },
      {
        name: "Niraparib",
        drugs: ["Niraparib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Niraparib is effective maintenance therapy for recurrent platinum-sensitive ovarian cancer in HRD-positive tumors."
      },
      {
        name: "Gemcitabine + Carboplatin (Platinum-Sensitive Relapse)",
        drugs: ["Gemcitabine", "Carboplatin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-carboplatin is an active regimen for platinum-sensitive recurrent ovarian cancer with favorable tolerability."
      }
    ]
  },

  uterus: {
    1: [
      {
        name: "Total Hysterectomy + BSO",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Total hysterectomy with bilateral salpingo-oophorectomy is curative for stage I endometrial cancer."
      },
      {
        name: "Vaginal Brachytherapy (Adjuvant)",
        drugs: [],
        cycle: "3-5 fractions",
        category: "Radiation",
        notes: "Adjuvant vaginal brachytherapy reduces locoregional recurrence in intermediate-risk stage I endometrial cancer."
      }
    ],
    2: [
      {
        name: "Surgery + Pelvic RT",
        drugs: [],
        cycle: "Surgery followed by pelvic EBRT",
        category: "Radiation",
        notes: "Adjuvant pelvic radiation after hysterectomy reduces locoregional recurrence in stage II endometrial cancer."
      },
      {
        name: "Surgery + Chemotherapy + RT",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Surgery then chemoradiation (sandwich)",
        category: "Chemotherapy",
        notes: "Sandwich chemotherapy and radiation is used for high-risk stage II endometrial cancer to treat local and systemic disease."
      }
    ],
    3: [
      {
        name: "Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Carboplatin-paclitaxel is the standard adjuvant chemotherapy regimen for stage III endometrial carcinoma."
      },
      {
        name: "Pembrolizumab + Carboplatin + Paclitaxel (dMMR)",
        drugs: ["Pembrolizumab", "Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6, then pembro maintenance",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus chemotherapy significantly improves PFS in dMMR/MSI-H advanced endometrial cancer per KEYNOTE-868."
      }
    ],
    4: [
      {
        name: "Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Carboplatin-paclitaxel is the standard first-line chemotherapy for metastatic or recurrent endometrial cancer."
      },
      {
        name: "Pembrolizumab + Lenvatinib (KEYNOTE-775)",
        drugs: ["Pembrolizumab", "Lenvatinib"],
        cycle: "Pembro every 3 weeks; lenvatinib daily",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus lenvatinib improved OS over chemotherapy in platinum-pretreated advanced endometrial cancer."
      },
      {
        name: "Dostarlimab (dMMR/MSI-H)",
        drugs: ["Dostarlimab"],
        cycle: "Every 3 weeks x4, then every 6 weeks",
        category: "Immunotherapy",
        notes: "Dostarlimab showed high response rates in dMMR/MSI-H recurrent or advanced endometrial cancer per GARNET trial."
      }
    ]
  },

  cervix: {
    1: [
      {
        name: "Radical Hysterectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Radical hysterectomy with pelvic lymph node dissection is curative for early-stage IA2 to IB1 cervical cancer."
      },
      {
        name: "Definitive Chemoradiation",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during RT",
        category: "Chemotherapy",
        notes: "Cisplatin-based concurrent chemoradiation is an alternative to surgery for early-stage cervical cancer."
      }
    ],
    2: [
      {
        name: "Cisplatin + RT (Concurrent CRT)",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during pelvic RT",
        category: "Chemotherapy",
        notes: "Concurrent cisplatin with external beam RT followed by brachytherapy is standard for stage II cervical cancer."
      },
      {
        name: "Cisplatin + 5-FU + RT",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "Every 4 weeks x2 concurrent with RT",
        category: "Chemotherapy",
        notes: "Cisplatin and 5-FU concurrent with RT is an alternative chemoradiation regimen for locally advanced cervical cancer."
      }
    ],
    3: [
      {
        name: "Cisplatin + RT + Brachytherapy",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during EBRT, then brachytherapy",
        category: "Chemotherapy",
        notes: "Concurrent cisplatin with EBRT followed by intracavitary brachytherapy is the standard for locally advanced cervical cancer."
      },
      {
        name: "Pembrolizumab + Chemoradiation (KEYNOTE-A18)",
        drugs: ["Pembrolizumab", "Cisplatin"],
        cycle: "Pembro every 3 weeks + CRT, then pembro maintenance",
        category: "Immunotherapy",
        notes: "Adding pembrolizumab to chemoradiation improved PFS in high-risk locally advanced cervical cancer per KEYNOTE-A18."
      }
    ],
    4: [
      {
        name: "Carboplatin + Paclitaxel + Bevacizumab (GOG-240)",
        drugs: ["Carboplatin", "Paclitaxel", "Bevacizumab"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Adding bevacizumab to platinum doublet improved OS in metastatic or recurrent cervical cancer per GOG-240."
      },
      {
        name: "Pembrolizumab + Carboplatin + Paclitaxel + Bevacizumab",
        drugs: ["Pembrolizumab", "Carboplatin", "Paclitaxel", "Bevacizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab added to chemo-bev is the preferred first-line regimen for PD-L1-positive metastatic cervical cancer per KEYNOTE-826."
      },
      {
        name: "Tisotumab Vedotin",
        drugs: ["Tisotumab Vedotin"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Tisotumab vedotin is an ADC with clinical activity in recurrent or metastatic cervical cancer after prior therapy."
      }
    ]
  },

  brain: {
    1: [
      {
        name: "Surgical Resection",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Maximal safe resection is the first step in management of surgically accessible primary brain tumors."
      },
      {
        name: "Stereotactic Radiosurgery (SRS)",
        drugs: [],
        cycle: "Single fraction",
        category: "Radiation",
        notes: "SRS is highly effective for small brain metastases and selected benign lesions such as acoustic neuromas."
      }
    ],
    2: [
      {
        name: "Temozolomide + RT (Stupp Protocol)",
        drugs: ["Temozolomide"],
        cycle: "Daily during RT, then adjuvant x6 cycles",
        category: "Chemotherapy",
        notes: "Concurrent and adjuvant temozolomide with RT is the standard of care for IDH-wild-type glioblastoma per Stupp trial."
      },
      {
        name: "RT Alone (Low-Grade Glioma)",
        drugs: [],
        cycle: "~6 weeks",
        category: "Radiation",
        notes: "Radiation alone may be used for low-grade glioma where chemotherapy is deferred due to patient factors."
      }
    ],
    3: [
      {
        name: "Temozolomide + RT + Tumor Treating Fields",
        drugs: ["Temozolomide"],
        cycle: "Concurrent RT + TTF, then adjuvant TMZ + TTF",
        category: "Chemotherapy",
        notes: "Adding tumor treating fields to standard temozolomide-RT improves OS in newly diagnosed GBM per EF-14 trial."
      },
      {
        name: "PCV (Procarbazine + CCNU + Vincristine)",
        drugs: ["Procarbazine", "CCNU", "Vincristine"],
        cycle: "Every 6-8 weeks x6",
        category: "Chemotherapy",
        notes: "PCV chemotherapy with RT significantly improves OS in IDH-mutant grade 3 oligodendroglioma and anaplastic astrocytoma."
      },
      {
        name: "WBRT (Whole Brain Radiation Therapy)",
        drugs: [],
        cycle: "10-15 fractions",
        category: "Radiation",
        notes: "WBRT controls multiple brain metastases but is associated with neurocognitive toxicity limiting its use in younger patients."
      }
    ],
    4: [
      {
        name: "Bevacizumab (Recurrent GBM)",
        drugs: ["Bevacizumab"],
        cycle: "Every 2 weeks",
        category: "Targeted",
        notes: "Bevacizumab is FDA-approved for recurrent GBM, providing radiographic response and steroid reduction but not OS benefit."
      },
      {
        name: "WBRT",
        drugs: [],
        cycle: "10-15 fractions",
        category: "Radiation",
        notes: "WBRT is palliative standard for multiple brain metastases in patients with limited systemic disease control."
      },
      {
        name: "Temozolomide (Recurrent)",
        drugs: ["Temozolomide"],
        cycle: "Daily x5 days every 28 days",
        category: "Chemotherapy",
        notes: "Re-challenge with temozolomide can be considered for recurrent GBM if prior benefit was observed and MGMT is methylated."
      },
      {
        name: "Lomustine (CCNU) Monotherapy",
        drugs: ["Lomustine"],
        cycle: "Every 6 weeks",
        category: "Chemotherapy",
        notes: "Lomustine is an alternative single-agent chemotherapy for recurrent high-grade glioma after first-line failure."
      }
    ]
  },

  thyroid: {
    1: [
      {
        name: "Thyroidectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Total or hemithyroidectomy is curative for differentiated thyroid cancer with excellent long-term survival."
      },
      {
        name: "Radioactive Iodine (RAI)",
        drugs: ["Iodine-131"],
        cycle: "Single dose post-thyroidectomy",
        category: "Targeted",
        notes: "Radioactive iodine ablation after thyroidectomy reduces recurrence risk in intermediate-to-high-risk differentiated thyroid cancer."
      }
    ],
    2: [
      {
        name: "Thyroidectomy + RAI",
        drugs: ["Iodine-131"],
        cycle: "Surgery then single RAI dose",
        category: "Targeted",
        notes: "Total thyroidectomy followed by radioactive iodine is standard for stage II differentiated thyroid cancer."
      },
      {
        name: "TSH Suppression",
        drugs: ["Levothyroxine"],
        cycle: "Daily ongoing",
        category: "Hormonal",
        notes: "Thyroid-stimulating hormone suppression with levothyroxine reduces recurrence risk in differentiated thyroid cancer."
      }
    ],
    3: [
      {
        name: "RAI + External Beam RT",
        drugs: ["Iodine-131"],
        cycle: "RAI then EBRT as needed",
        category: "Radiation",
        notes: "External beam radiation is used for unresectable or gross residual differentiated thyroid cancer not amenable to RAI."
      },
      {
        name: "Lenvatinib",
        drugs: ["Lenvatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Lenvatinib improved PFS in radioiodine-refractory differentiated thyroid cancer per SELECT trial."
      }
    ],
    4: [
      {
        name: "Lenvatinib",
        drugs: ["Lenvatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Lenvatinib is a preferred agent for metastatic RAI-refractory differentiated thyroid cancer with high response rates."
      },
      {
        name: "Sorafenib",
        drugs: ["Sorafenib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Sorafenib improved PFS in RAI-refractory differentiated thyroid cancer and is an FDA-approved alternative to lenvatinib."
      },
      {
        name: "Vandetanib (Medullary)",
        drugs: ["Vandetanib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Vandetanib is FDA-approved for symptomatic or progressive metastatic medullary thyroid cancer."
      },
      {
        name: "Selpercatinib (RET-mutant Medullary)",
        drugs: ["Selpercatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Selpercatinib is highly active in RET-mutant medullary thyroid cancer with durable responses per LIBRETTO-001."
      }
    ]
  },

  larynx: {
    1: [
      {
        name: "Transoral Laser Surgery",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Transoral laser microsurgery is a voice-preserving option for selected T1-T2 glottic laryngeal cancers."
      },
      {
        name: "Definitive RT",
        drugs: [],
        cycle: "~6-7 weeks",
        category: "Radiation",
        notes: "Definitive radiation therapy offers equivalent cure rates to surgery for T1-T2 glottic laryngeal carcinoma with voice preservation."
      }
    ],
    2: [
      {
        name: "Concurrent Cisplatin + RT",
        drugs: ["Cisplatin"],
        cycle: "Every 3 weeks x3 during RT",
        category: "Chemotherapy",
        notes: "Cisplatin-based concurrent chemoradiation is the standard for larynx preservation in advanced laryngeal cancer."
      },
      {
        name: "Total Laryngectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Total laryngectomy is recommended for T4 or chemoradiation failure in locally advanced laryngeal cancer."
      }
    ],
    3: [
      {
        name: "Cisplatin + RT (Definitive)",
        drugs: ["Cisplatin"],
        cycle: "Every 3 weeks x3 during RT",
        category: "Chemotherapy",
        notes: "High-dose cisplatin concurrent with RT is standard for larynx preservation in stage III laryngeal squamous cell carcinoma."
      },
      {
        name: "Induction TPF + RT",
        drugs: ["Docetaxel", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks x3, then RT",
        category: "Chemotherapy",
        notes: "Induction TPF chemotherapy followed by RT is used for larynx preservation in selected locally advanced laryngeal cancers."
      },
      {
        name: "Cetuximab + RT",
        drugs: ["Cetuximab"],
        cycle: "Weekly during RT",
        category: "Targeted",
        notes: "Cetuximab with RT is an alternative for cisplatin-ineligible patients with locally advanced laryngeal cancer."
      }
    ],
    4: [
      {
        name: "Pembrolizumab (PD-L1+, KEYNOTE-048)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab monotherapy is first-line preferred for CPS ≥1 recurrent/metastatic HNSCC including laryngeal cancer."
      },
      {
        name: "Pembrolizumab + Platinum + 5-FU",
        drugs: ["Pembrolizumab", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus platinum-5FU is first-line standard for PD-L1 positive recurrent or metastatic HNSCC."
      },
      {
        name: "Cetuximab + Platinum + 5-FU (EXTREME)",
        drugs: ["Cetuximab", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks x6, then cetuximab maintenance",
        category: "Targeted",
        notes: "Cetuximab plus platinum-5FU (EXTREME regimen) was the prior standard for recurrent metastatic HNSCC before immunotherapy."
      }
    ]
  },

  oralCavity: {
    1: [
      {
        name: "Wide Local Excision",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Wide surgical excision with clear margins is the standard curative treatment for early stage I oral cavity cancer."
      },
      {
        name: "Adjuvant RT",
        drugs: [],
        cycle: "~6 weeks",
        category: "Radiation",
        notes: "Adjuvant radiation may be considered for close margins or perineural invasion in stage I oral cavity carcinoma."
      }
    ],
    2: [
      {
        name: "Surgery + Adjuvant RT",
        drugs: [],
        cycle: "Surgery then 6 weeks RT",
        category: "Surgery",
        notes: "Surgical resection followed by adjuvant radiation is standard for stage II oral cavity cancer with adverse features."
      },
      {
        name: "Surgery + Adjuvant Cisplatin + RT",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during adjuvant RT",
        category: "Chemotherapy",
        notes: "Adjuvant chemoradiation with cisplatin is indicated for positive margins or extranodal extension in oral cavity cancer."
      }
    ],
    3: [
      {
        name: "Cisplatin + RT (Definitive)",
        drugs: ["Cisplatin"],
        cycle: "Every 3 weeks x3 during RT",
        category: "Chemotherapy",
        notes: "Concurrent cisplatin-RT is standard for unresectable stage III oral cavity squamous cell carcinoma."
      },
      {
        name: "Surgery + Adjuvant Cisplatin + RT",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during post-op RT",
        category: "Chemotherapy",
        notes: "Post-operative chemoradiation improves locoregional control in stage III oral cavity cancer with high-risk pathologic features."
      },
      {
        name: "Induction TPF",
        drugs: ["Docetaxel", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks x3",
        category: "Chemotherapy",
        notes: "Induction TPF chemotherapy may be used to reduce tumor bulk in locally advanced oral cavity cancer before definitive treatment."
      }
    ],
    4: [
      {
        name: "Pembrolizumab + Platinum + 5-FU",
        drugs: ["Pembrolizumab", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus chemotherapy is the preferred first-line regimen for recurrent/metastatic oral cavity squamous cell carcinoma."
      },
      {
        name: "Pembrolizumab Monotherapy (CPS ≥1)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab monotherapy improves OS versus EXTREME chemotherapy in PD-L1-positive recurrent/metastatic HNSCC."
      },
      {
        name: "Nivolumab (Second-line, CheckMate 141)",
        drugs: ["Nivolumab"],
        cycle: "Every 2 weeks",
        category: "Immunotherapy",
        notes: "Nivolumab improved OS over investigator's choice chemotherapy in platinum-refractory recurrent/metastatic HNSCC."
      }
    ]
  },

  salivaryGland: {
    1: [
      {
        name: "Parotidectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Superficial or total parotidectomy with facial nerve preservation is the standard treatment for localized parotid tumors."
      }
    ],
    2: [
      {
        name: "Surgery + Adjuvant RT",
        drugs: [],
        cycle: "Surgery then 6-7 weeks RT",
        category: "Radiation",
        notes: "Adjuvant radiation after surgery reduces locoregional recurrence in high-grade or close-margin salivary gland cancers."
      },
      {
        name: "Surgery + Adjuvant Neutron RT",
        drugs: [],
        cycle: "Surgery then neutron beam RT",
        category: "Radiation",
        notes: "Neutron beam radiation may improve local control for high-grade salivary gland carcinomas compared to photon therapy."
      }
    ],
    3: [
      {
        name: "Concurrent Chemoradiation",
        drugs: ["Cisplatin"],
        cycle: "Weekly cisplatin during RT",
        category: "Chemotherapy",
        notes: "Concurrent chemoradiation is used for unresectable locally advanced salivary gland carcinoma."
      },
      {
        name: "Trastuzumab (HER2+ Salivary Duct Ca.)",
        drugs: ["Trastuzumab"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Trastuzumab-based therapy is active in HER2-positive salivary duct carcinoma and is used in the advanced setting."
      }
    ],
    4: [
      {
        name: "Carboplatin + Paclitaxel",
        drugs: ["Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Carboplatin-paclitaxel is an active regimen for recurrent or metastatic salivary gland carcinoma."
      },
      {
        name: "Androgen Deprivation (AR+ Salivary Duct Ca.)",
        drugs: ["Leuprolide", "Bicalutamide"],
        cycle: "Continuous",
        category: "Hormonal",
        notes: "Androgen receptor-targeted therapy is effective in AR-positive salivary duct carcinoma with objective response rates around 40%."
      },
      {
        name: "Larotrectinib (NTRK-Fusion+)",
        drugs: ["Larotrectinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Larotrectinib produces high response rates in NTRK fusion-positive salivary gland and other solid tumors."
      }
    ]
  },

  nasopharynx: {
    1: [
      {
        name: "Definitive RT",
        drugs: [],
        cycle: "~7 weeks IMRT",
        category: "Radiation",
        notes: "Definitive IMRT alone is curative for stage I nasopharyngeal carcinoma with excellent locoregional control."
      }
    ],
    2: [
      {
        name: "Cisplatin + RT",
        drugs: ["Cisplatin"],
        cycle: "Every 3 weeks x3 during RT",
        category: "Chemotherapy",
        notes: "Concurrent high-dose cisplatin with IMRT is standard for stage II-IVA nasopharyngeal carcinoma."
      },
      {
        name: "Induction Gemcitabine + Cisplatin + RT",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks x3, then CRT",
        category: "Chemotherapy",
        notes: "Induction gemcitabine-cisplatin before concurrent CRT improves failure-free survival in stage III-IVB NPC per CSNO 0601."
      }
    ],
    3: [
      {
        name: "Induction TPF + CRT",
        drugs: ["Docetaxel", "Cisplatin", "5-Fluorouracil"],
        cycle: "Every 3 weeks x3, then cisplatin + RT",
        category: "Chemotherapy",
        notes: "Induction TPF followed by concurrent chemoradiation is used for locally advanced nasopharyngeal carcinoma."
      },
      {
        name: "Concurrent Cisplatin + RT + Adjuvant Cisplatin + 5-FU",
        drugs: ["Cisplatin", "5-Fluorouracil"],
        cycle: "CRT then adjuvant x3 cycles",
        category: "Chemotherapy",
        notes: "Concurrent CRT followed by adjuvant chemotherapy is a standard approach for stage III NPC per Intergroup 0099."
      }
    ],
    4: [
      {
        name: "Gemcitabine + Cisplatin (Recurrent/Metastatic)",
        drugs: ["Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine plus cisplatin is a standard first-line regimen for recurrent or metastatic nasopharyngeal carcinoma."
      },
      {
        name: "Pembrolizumab (Second-line)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab has meaningful activity in platinum-refractory recurrent or metastatic nasopharyngeal carcinoma."
      },
      {
        name: "Camrelizumab + Gemcitabine + Cisplatin",
        drugs: ["Camrelizumab", "Gemcitabine", "Cisplatin"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Camrelizumab plus gemcitabine-cisplatin improved PFS as first-line therapy for recurrent or metastatic NPC."
      }
    ]
  },

  breast: {
    1: [
      {
        name: "Lumpectomy + RT",
        drugs: [],
        cycle: "Surgery then ~5-6 weeks RT",
        category: "Surgery",
        notes: "Breast-conserving surgery followed by whole breast radiation is standard for stage I breast cancer with equivalent survival to mastectomy."
      },
      {
        name: "AC-T (Adjuvant)",
        drugs: ["Doxorubicin", "Cyclophosphamide", "Paclitaxel"],
        cycle: "AC every 2-3 weeks x4, then T every week x12",
        category: "Chemotherapy",
        notes: "AC followed by paclitaxel is the standard adjuvant chemotherapy for high-risk hormone receptor-positive or triple-negative breast cancer."
      }
    ],
    2: [
      {
        name: "TC (Docetaxel + Cyclophosphamide)",
        drugs: ["Docetaxel", "Cyclophosphamide"],
        cycle: "Every 3 weeks x4-6",
        category: "Chemotherapy",
        notes: "TC adjuvant chemotherapy is non-inferior to AC with less cardiotoxicity and is preferred for low-risk HER2-negative breast cancer."
      },
      {
        name: "CMF",
        drugs: ["Cyclophosphamide", "Methotrexate", "5-Fluorouracil"],
        cycle: "Every 4 weeks x6",
        category: "Chemotherapy",
        notes: "CMF is a classic adjuvant regimen for breast cancer now largely replaced by anthracycline-taxane regimens."
      },
      {
        name: "Pertuzumab + Trastuzumab + Paclitaxel (HER2+)",
        drugs: ["Pertuzumab", "Trastuzumab", "Paclitaxel"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Dual HER2 blockade with pertuzumab-trastuzumab plus taxane is first-line standard for HER2-positive metastatic breast cancer."
      }
    ],
    3: [
      {
        name: "AC-T + Trastuzumab + Pertuzumab (HER2+, Neoadjuvant)",
        drugs: ["Doxorubicin", "Cyclophosphamide", "Paclitaxel", "Trastuzumab", "Pertuzumab"],
        cycle: "AC x4 then THP x4 cycles",
        category: "Targeted",
        notes: "Neoadjuvant AC followed by paclitaxel-trastuzumab-pertuzumab achieves high pCR rates in HER2-positive breast cancer."
      },
      {
        name: "CDK4/6 Inhibitor + Aromatase Inhibitor",
        drugs: ["Palbociclib", "Letrozole"],
        cycle: "Palbociclib 21 days on/7 off; letrozole daily",
        category: "Targeted",
        notes: "CDK4/6 inhibitors combined with aromatase inhibitors significantly improve PFS in HR+/HER2-negative metastatic breast cancer."
      },
      {
        name: "Olaparib (BRCA-mutant, OlympiAD)",
        drugs: ["Olaparib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Olaparib monotherapy improved PFS versus chemotherapy in germline BRCA-mutant HER2-negative metastatic breast cancer."
      }
    ],
    4: [
      {
        name: "CDK4/6i + Fulvestrant (HR+/HER2-)",
        drugs: ["Palbociclib", "Fulvestrant"],
        cycle: "Palbociclib 21/7; fulvestrant monthly",
        category: "Hormonal",
        notes: "CDK4/6 inhibitor plus fulvestrant is standard for HR-positive HER2-negative metastatic breast cancer after prior endocrine therapy."
      },
      {
        name: "T-DXd (Trastuzumab Deruxtecan, HER2+)",
        drugs: ["Trastuzumab Deruxtecan"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "T-DXd significantly improved OS over T-DM1 in HER2-positive metastatic breast cancer previously treated with trastuzumab."
      },
      {
        name: "Sacituzumab Govitecan (TNBC)",
        drugs: ["Sacituzumab Govitecan"],
        cycle: "Days 1 and 8 every 21 days",
        category: "Targeted",
        notes: "Sacituzumab govitecan improved OS over single-agent chemotherapy in pretreated metastatic triple-negative breast cancer."
      },
      {
        name: "Pembrolizumab + Chemotherapy (TNBC, KEYNOTE-522)",
        drugs: ["Pembrolizumab", "Carboplatin", "Paclitaxel"],
        cycle: "Every 3 weeks (neoadjuvant/adjuvant)",
        category: "Immunotherapy",
        notes: "Pembrolizumab plus chemotherapy improves pCR and EFS in early high-risk triple-negative breast cancer per KEYNOTE-522."
      }
    ]
  },

  bonemarrow: {
    1: [
      {
        name: "VRd (Bortezomib + Lenalidomide + Dexamethasone)",
        drugs: ["Bortezomib", "Lenalidomide", "Dexamethasone"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "VRd is the preferred first-line induction regimen for newly diagnosed multiple myeloma regardless of transplant eligibility."
      },
      {
        name: "Daratumumab + VRd (DaraVRd)",
        drugs: ["Daratumumab", "Bortezomib", "Lenalidomide", "Dexamethasone"],
        cycle: "Every 3 weeks",
        category: "Targeted",
        notes: "Daratumumab added to VRd significantly deepens response and improves PFS in newly diagnosed transplant-eligible myeloma."
      }
    ],
    2: [
      {
        name: "High-Dose Melphalan + ASCT",
        drugs: ["Melphalan"],
        cycle: "Single high-dose conditioning, one-time",
        category: "Chemotherapy",
        notes: "High-dose melphalan followed by autologous stem cell transplant improves PFS and remains standard for eligible myeloma."
      },
      {
        name: "Lenalidomide Maintenance (Post-ASCT)",
        drugs: ["Lenalidomide"],
        cycle: "Daily continuous until progression",
        category: "Targeted",
        notes: "Lenalidomide maintenance after ASCT prolongs both PFS and OS in transplant-eligible multiple myeloma."
      }
    ],
    3: [
      {
        name: "Ibrutinib (MCL/CLL)",
        drugs: ["Ibrutinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Ibrutinib is a BTK inhibitor with high single-agent activity in relapsed mantle cell lymphoma and CLL."
      },
      {
        name: "Venetoclax + Ibrutinib (CLL/17p deletion)",
        drugs: ["Venetoclax", "Ibrutinib"],
        cycle: "Daily continuous with venetoclax ramp-up",
        category: "Targeted",
        notes: "Venetoclax plus ibrutinib achieves deep remissions including MRD negativity in CLL including high-risk disease."
      },
      {
        name: "Azacitidine + Venetoclax (AML)",
        drugs: ["Azacitidine", "Venetoclax"],
        cycle: "28-day cycles",
        category: "Targeted",
        notes: "Azacitidine plus venetoclax is the preferred regimen for older or unfit patients with newly diagnosed AML."
      }
    ],
    4: [
      {
        name: "Daratumumab + Pomalidomide + Dex (Relapsed MM)",
        drugs: ["Daratumumab", "Pomalidomide", "Dexamethasone"],
        cycle: "Every 4 weeks",
        category: "Targeted",
        notes: "Daratumumab-pomalidomide-dex is effective for lenalidomide-refractory relapsed/refractory multiple myeloma."
      },
      {
        name: "Venetoclax (CLL/17p deletion)",
        drugs: ["Venetoclax"],
        cycle: "Daily continuous with weekly ramp-up",
        category: "Targeted",
        notes: "Venetoclax achieves durable responses in relapsed/refractory CLL including those with 17p deletion or TP53 mutation."
      },
      {
        name: "High-Dose Chemotherapy + ASCT",
        drugs: ["Busulfan", "Cyclophosphamide"],
        cycle: "Conditioning then stem cell infusion",
        category: "Chemotherapy",
        notes: "High-dose chemotherapy with ASCT is potentially curative for chemosensitive relapsed aggressive lymphoma."
      },
      {
        name: "Ciltacabtagene Autoleucel (CAR-T, Myeloma)",
        drugs: ["Ciltacabtagene Autoleucel"],
        cycle: "Single infusion",
        category: "Immunotherapy",
        notes: "BCMA-directed CAR-T cell therapy achieves deep and durable responses in heavily pretreated relapsed/refractory myeloma."
      }
    ]
  },

  lymphNodes: {
    1: [
      {
        name: "ABVD (Hodgkin Lymphoma)",
        drugs: ["Doxorubicin", "Bleomycin", "Vinblastine", "Dacarbazine"],
        cycle: "Every 4 weeks x2-4 cycles",
        category: "Chemotherapy",
        notes: "ABVD for 2-4 cycles with or without RT is standard for early-stage favorable Hodgkin lymphoma with excellent cure rates."
      },
      {
        name: "Involved Site RT",
        drugs: [],
        cycle: "20 Gy in 10 fractions",
        category: "Radiation",
        notes: "Involved site radiation after abbreviated ABVD is recommended for early-stage favorable Hodgkin lymphoma."
      }
    ],
    2: [
      {
        name: "ABVD x6 cycles",
        drugs: ["Doxorubicin", "Bleomycin", "Vinblastine", "Dacarbazine"],
        cycle: "Every 4 weeks x6",
        category: "Chemotherapy",
        notes: "Six cycles of ABVD is standard for early-stage unfavorable or advanced-stage Hodgkin lymphoma."
      },
      {
        name: "BEP (Testicular/Mediastinal GCT)",
        drugs: ["Bleomycin", "Etoposide", "Cisplatin"],
        cycle: "Every 3 weeks x3-4",
        category: "Chemotherapy",
        notes: "BEP chemotherapy is the standard curative regimen for advanced germ cell tumors involving lymph nodes."
      }
    ],
    3: [
      {
        name: "R-CHOP (Diffuse Large B-Cell Lymphoma)",
        drugs: ["Rituximab", "Cyclophosphamide", "Doxorubicin", "Vincristine", "Prednisone"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "R-CHOP for 6 cycles is the standard first-line curative regimen for diffuse large B-cell lymphoma."
      },
      {
        name: "BEACOPP Escalated (Advanced Hodgkin)",
        drugs: ["Bleomycin", "Etoposide", "Doxorubicin", "Cyclophosphamide", "Vincristine", "Procarbazine", "Prednisone"],
        cycle: "Every 3 weeks x6-8",
        category: "Chemotherapy",
        notes: "Escalated BEACOPP improves tumor control over ABVD in advanced Hodgkin lymphoma but with higher toxicity."
      },
      {
        name: "Nivolumab (Relapsed/Refractory Hodgkin)",
        drugs: ["Nivolumab"],
        cycle: "Every 2 weeks",
        category: "Immunotherapy",
        notes: "Nivolumab achieves high response rates in relapsed or refractory classical Hodgkin lymphoma after multiple prior therapies."
      }
    ],
    4: [
      {
        name: "R-CHOP",
        drugs: ["Rituximab", "Cyclophosphamide", "Doxorubicin", "Vincristine", "Prednisone"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "R-CHOP is the gold standard for metastatic/advanced DLBCL and several other aggressive B-cell lymphomas."
      },
      {
        name: "Venetoclax (CLL/SLL/MCL)",
        drugs: ["Venetoclax"],
        cycle: "Daily continuous with ramp-up",
        category: "Targeted",
        notes: "Venetoclax targets BCL-2 and is effective in CLL, SLL, and mantle cell lymphoma particularly with 17p deletion."
      },
      {
        name: "Axicabtagene Ciloleucel (CAR-T, DLBCL)",
        drugs: ["Axicabtagene Ciloleucel"],
        cycle: "Single infusion",
        category: "Immunotherapy",
        notes: "Axi-cel CAR-T cell therapy is approved for relapsed/refractory DLBCL after two or more prior lines of therapy."
      },
      {
        name: "Bendamustine + Rituximab (Indolent NHL)",
        drugs: ["Bendamustine", "Rituximab"],
        cycle: "Every 4 weeks x6",
        category: "Chemotherapy",
        notes: "Bendamustine-rituximab is a preferred first-line regimen for advanced follicular and mantle cell lymphoma."
      }
    ]
  },

  adrenal: {
    1: [
      {
        name: "Adrenalectomy",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Laparoscopic or open adrenalectomy is curative for localized adrenocortical carcinoma and pheochromocytoma."
      }
    ],
    2: [
      {
        name: "Adrenalectomy + Mitotane (Adjuvant)",
        drugs: ["Mitotane"],
        cycle: "Daily continuous for 2-5 years",
        category: "Chemotherapy",
        notes: "Adjuvant mitotane after resection of adrenocortical carcinoma reduces recurrence risk in high-risk patients."
      },
      {
        name: "Mitotane Monotherapy",
        drugs: ["Mitotane"],
        cycle: "Daily continuous",
        category: "Chemotherapy",
        notes: "Mitotane is an adrenolytic agent used for adjuvant and palliative therapy in adrenocortical carcinoma."
      }
    ],
    3: [
      {
        name: "Mitotane + EDP",
        drugs: ["Mitotane", "Etoposide", "Doxorubicin", "Cisplatin"],
        cycle: "Every 4 weeks",
        category: "Chemotherapy",
        notes: "EDP plus mitotane is the standard first-line regimen for locally advanced or metastatic adrenocortical carcinoma."
      },
      {
        name: "MIBG Therapy (Pheochromocytoma)",
        drugs: ["Iobenguane I-131"],
        cycle: "2 doses 90 days apart",
        category: "Targeted",
        notes: "I-131 MIBG is FDA-approved for MIBG-avid unresectable pheochromocytoma and paraganglioma."
      }
    ],
    4: [
      {
        name: "Mitotane + EDP",
        drugs: ["Mitotane", "Etoposide", "Doxorubicin", "Cisplatin"],
        cycle: "Every 4 weeks",
        category: "Chemotherapy",
        notes: "EDP-mitotane is the reference first-line chemotherapy for metastatic adrenocortical carcinoma per FIRM-ACT trial."
      },
      {
        name: "Sunitinib (Pheochromocytoma/Paraganglioma)",
        drugs: ["Sunitinib"],
        cycle: "Daily 4 weeks on, 2 weeks off",
        category: "Targeted",
        notes: "Sunitinib has activity in progressive metastatic pheochromocytoma and paraganglioma and is used off-label."
      },
      {
        name: "Pembrolizumab (MSI-H/dMMR ACC)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab may benefit adrenocortical carcinoma patients with MSI-H or dMMR tumors based on tumor-agnostic approval."
      }
    ]
  },

  skin: {
    1: [
      {
        name: "Wide Local Excision",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Wide local excision with sentinel lymph node biopsy is standard for stage I melanoma with appropriate margins."
      },
      {
        name: "Mohs Surgery (NMSC)",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Mohs micrographic surgery achieves highest cure rates for basal cell and squamous cell carcinoma on the face."
      }
    ],
    2: [
      {
        name: "Wide Excision + SLNB",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Wide excision with sentinel lymph node biopsy for staging is standard for T2 melanoma greater than 1 mm thickness."
      },
      {
        name: "Adjuvant Pembrolizumab (Stage IIB-IIC)",
        drugs: ["Pembrolizumab"],
        cycle: "Every 6 weeks x18 doses",
        category: "Immunotherapy",
        notes: "Adjuvant pembrolizumab improved recurrence-free survival in high-risk stage IIB-IIC melanoma per KEYNOTE-716."
      }
    ],
    3: [
      {
        name: "Adjuvant Nivolumab (Stage III)",
        drugs: ["Nivolumab"],
        cycle: "Every 4 weeks x1 year",
        category: "Immunotherapy",
        notes: "Adjuvant nivolumab improves recurrence-free survival in completely resected stage III-IV melanoma per CheckMate 238."
      },
      {
        name: "Adjuvant Dabrafenib + Trametinib (BRAF V600+)",
        drugs: ["Dabrafenib", "Trametinib"],
        cycle: "Daily continuous x1 year",
        category: "Targeted",
        notes: "Adjuvant dabrafenib-trametinib significantly improves relapse-free and OS in resected BRAF V600-mutant stage III melanoma."
      },
      {
        name: "Adjuvant Ipilimumab",
        drugs: ["Ipilimumab"],
        cycle: "Every 3 weeks x4, then every 3 months x4",
        category: "Immunotherapy",
        notes: "High-dose adjuvant ipilimumab improves OS in completely resected stage III melanoma but is limited by toxicity."
      }
    ],
    4: [
      {
        name: "Ipilimumab + Nivolumab (CheckMate 067)",
        drugs: ["Ipilimumab", "Nivolumab"],
        cycle: "Every 3 weeks x4, then nivolumab every 4 weeks",
        category: "Immunotherapy",
        notes: "Ipilimumab plus nivolumab produces durable long-term survival in metastatic melanoma with 5-year OS of ~52%."
      },
      {
        name: "Pembrolizumab",
        drugs: ["Pembrolizumab"],
        cycle: "Every 3 weeks",
        category: "Immunotherapy",
        notes: "Pembrolizumab monotherapy achieves durable responses in advanced melanoma and is an alternative to combination immunotherapy."
      },
      {
        name: "Dabrafenib + Trametinib (BRAF V600E/K)",
        drugs: ["Dabrafenib", "Trametinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Dabrafenib-trametinib combination BRAF/MEK inhibition is first-line standard for BRAF V600-mutant metastatic melanoma."
      },
      {
        name: "Vemurafenib + Cobimetinib (BRAF+)",
        drugs: ["Vemurafenib", "Cobimetinib"],
        cycle: "Vemurafenib daily; cobimetinib 21 days on, 7 off",
        category: "Targeted",
        notes: "Vemurafenib plus cobimetinib is an alternative BRAF/MEK inhibitor combination for BRAF V600-mutant metastatic melanoma."
      }
    ]
  },

  bone: {
    1: [
      {
        name: "Limb-Sparing Surgery",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Limb-salvage surgery with wide margins is the preferred approach for resectable extremity osteosarcoma."
      },
      {
        name: "Neoadjuvant MAP (Methotrexate + Doxorubicin + Cisplatin)",
        drugs: ["Methotrexate", "Doxorubicin", "Cisplatin"],
        cycle: "Every 3 weeks x2-3 pre-op",
        category: "Chemotherapy",
        notes: "Neoadjuvant MAP chemotherapy allows histologic response assessment and may enable limb-sparing surgery in osteosarcoma."
      }
    ],
    2: [
      {
        name: "MAP (Adjuvant)",
        drugs: ["Methotrexate", "Doxorubicin", "Cisplatin"],
        cycle: "Every 3 weeks x6 post-op",
        category: "Chemotherapy",
        notes: "Post-operative MAP chemotherapy is standard adjuvant treatment for resected high-grade osteosarcoma."
      },
      {
        name: "Ewing Sarcoma: VDC/IE",
        drugs: ["Vincristine", "Doxorubicin", "Cyclophosphamide", "Ifosfamide", "Etoposide"],
        cycle: "Alternating every 2 weeks x14 cycles",
        category: "Chemotherapy",
        notes: "Alternating VDC and IE chemotherapy is the standard neoadjuvant and adjuvant regimen for Ewing sarcoma."
      }
    ],
    3: [
      {
        name: "Zoledronic Acid + Systemic Therapy",
        drugs: ["Zoledronic Acid"],
        cycle: "Monthly IV",
        category: "Targeted",
        notes: "Bisphosphonates reduce skeletal-related events in patients with bone metastases from multiple primary cancers."
      },
      {
        name: "Denosumab (Giant Cell Tumor of Bone)",
        drugs: ["Denosumab"],
        cycle: "Monthly SC injection",
        category: "Targeted",
        notes: "Denosumab is highly active for unresectable or recurrent giant cell tumor of bone by inhibiting RANKL."
      },
      {
        name: "MAP + Ifosfamide (High-Risk Osteosarcoma)",
        drugs: ["Methotrexate", "Doxorubicin", "Cisplatin", "Ifosfamide"],
        cycle: "Every 3 weeks x6",
        category: "Chemotherapy",
        notes: "Adding ifosfamide to MAP may improve outcomes in poor histologic responders with high-grade osteosarcoma."
      }
    ],
    4: [
      {
        name: "Gemcitabine + Docetaxel (Osteosarcoma Relapse)",
        drugs: ["Gemcitabine", "Docetaxel"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-docetaxel has activity in relapsed osteosarcoma and is commonly used for second-line treatment."
      },
      {
        name: "Sorafenib (Recurrent Osteosarcoma)",
        drugs: ["Sorafenib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Sorafenib demonstrated progression-free survival benefit in recurrent and unresectable osteosarcoma per Italian Sarcoma Group."
      },
      {
        name: "Regorafenib (Ewing Sarcoma Relapse)",
        drugs: ["Regorafenib"],
        cycle: "Daily 3 weeks on, 1 week off",
        category: "Targeted",
        notes: "Regorafenib improved PFS in pre-treated recurrent Ewing sarcoma and osteosarcoma per REGOBONE trial."
      },
      {
        name: "Pazopanib",
        drugs: ["Pazopanib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Pazopanib has antitumor activity in relapsed osteosarcoma and other bone sarcomas after prior chemotherapy."
      }
    ]
  },

  softTissue: {
    1: [
      {
        name: "Wide Excision",
        drugs: [],
        cycle: "One-time",
        category: "Surgery",
        notes: "Wide local excision with negative margins is the primary treatment for resectable soft tissue sarcoma."
      },
      {
        name: "Surgery + Adjuvant RT",
        drugs: [],
        cycle: "Surgery then 5-6 weeks RT",
        category: "Radiation",
        notes: "Adjuvant radiation after limb-sparing surgery reduces local recurrence rates in high-grade soft tissue sarcoma."
      }
    ],
    2: [
      {
        name: "Surgery + Pre/Post-operative RT",
        drugs: [],
        cycle: "Surgery with perioperative RT",
        category: "Radiation",
        notes: "Perioperative radiation combined with surgery is standard for intermediate/high-grade extremity soft tissue sarcoma."
      },
      {
        name: "Doxorubicin + Ifosfamide (Adjuvant)",
        drugs: ["Doxorubicin", "Ifosfamide"],
        cycle: "Every 3 weeks x4-6",
        category: "Chemotherapy",
        notes: "Adjuvant doxorubicin-ifosfamide may reduce recurrence in selected high-risk soft tissue sarcomas with favorable histology."
      }
    ],
    3: [
      {
        name: "Doxorubicin Monotherapy",
        drugs: ["Doxorubicin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Single-agent doxorubicin is the standard first-line chemotherapy for advanced or metastatic soft tissue sarcoma."
      },
      {
        name: "Doxorubicin + Ifosfamide",
        drugs: ["Doxorubicin", "Ifosfamide"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Doxorubicin plus ifosfamide is used for locally advanced unresectable sarcoma where response is needed for resectability."
      },
      {
        name: "Imatinib (GIST)",
        drugs: ["Imatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Imatinib 400 mg daily is the standard first-line targeted therapy for KIT/PDGFRA-mutant GIST."
      }
    ],
    4: [
      {
        name: "Doxorubicin Monotherapy",
        drugs: ["Doxorubicin"],
        cycle: "Every 3 weeks up to 6 cycles",
        category: "Chemotherapy",
        notes: "Doxorubicin remains the reference first-line single agent for metastatic soft tissue sarcoma across multiple histologies."
      },
      {
        name: "Gemcitabine + Docetaxel (Leiomyosarcoma)",
        drugs: ["Gemcitabine", "Docetaxel"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Gemcitabine-docetaxel is particularly active in uterine and non-uterine leiomyosarcoma and undifferentiated pleomorphic sarcoma."
      },
      {
        name: "Imatinib (Metastatic GIST)",
        drugs: ["Imatinib"],
        cycle: "Daily continuous",
        category: "Targeted",
        notes: "Imatinib produces sustained responses in metastatic GIST and should be continued indefinitely until progression or intolerance."
      },
      {
        name: "Trabectedin (Liposarcoma/Leiomyosarcoma)",
        drugs: ["Trabectedin"],
        cycle: "Every 3 weeks",
        category: "Chemotherapy",
        notes: "Trabectedin is FDA-approved for unresectable or metastatic liposarcoma and leiomyosarcoma after prior anthracycline therapy."
      }
    ]
  }
};
