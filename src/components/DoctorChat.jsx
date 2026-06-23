import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'
import { SLIDE_DECKS } from '../data/slideDeckTemplates'

const STAGE_ANATOMY = {
  1: 'The tumor is localized within the primary organ. At this stage cancer can already be present INSIDE the organ — in small lymphatics, submucosal layers, or ductal epithelium — even though the outer surface looks normal. Early micro-invasion of peri-tumoral lymphatics may be present histologically.',
  2: 'The tumor has grown and may have invaded regional lymph nodes. Intraluminal lymphatic spread is common. Peritumoral blood vessels show early lymphovascular invasion (LVI). The cancer is no longer just "on the surface" — it is tracking along internal vascular and lymphatic channels.',
  3: 'Regional spread: lymph node chains in the drainage territory are invaded. The cancer may be compressing or invading nearby blood vessels, nerves (perineural invasion), or adjacent organ structures. Lymphatic obstruction can cause edema in downstream tissues.',
  4: 'Distant metastatic disease. Tumor emboli have entered the systemic circulation (hematogenous spread) and seeded distant organs — commonly liver, lungs, bone, and brain. The lymphatic network is overwhelmed. Loss of lymphatic-neural signaling can disrupt organ function at a distance (e.g., lung cancer disrupting diaphragmatic nerve or brain signaling).',
}

// Organ-specific interior spread narrative per stage
const ORGAN_INTERIOR = {
  lungs: {
    1: 'In Stage I lung cancer, the tumor may be entirely within the bronchial wall or alveolar parenchyma. The peribronchial lymphatics and pulmonary arterioles inside the lung may already show microscopic tumor cells even when lymph nodes appear clear. The bronchial tree interior is the first highway for spread.',
    2: 'At Stage II, hilar lymph nodes (the nodes at the root of the lung where bronchi and vessels enter) are involved. Internally, the pulmonary artery branches and bronchial walls show perivascular invasion. The cancer tracks along the bronchovascular bundles visible in the interior.',
    3: 'Stage III lung cancer invades mediastinal structures — the pulmonary veins draining to the heart, the superior vena cava, phrenic nerve, or esophagus. The lymphatic channels connecting lung to mediastinum are blocked, causing pleural effusion.',
    4: 'Stage IV: tumor emboli enter the pulmonary veins → left heart → systemic circulation → brain, bone, liver, adrenal. The lung-brain neural axis (vagus nerve, phrenic nerve) is disrupted. Paraneoplastic syndromes arise from tumor signals traveling through blood and nerves.',
  },
  heart: {
    1: 'Primary cardiac tumors (usually myxoma) sit in a chamber — most often the left atrium. Even small tumors obstruct blood flow through the mitral valve, causing symptoms disproportionate to size.',
    2: 'The tumor grows along the endocardial surface and may extend into the coronary vasculature or pericardium.',
    3: 'Invasion of the myocardium and pericardium. Coronary arteries may be compressed, causing ischemia.',
    4: 'Pericardial effusion, tamponade, and systemic embolization through the aorta.',
  },
  kidney: {
    1: 'The tumor is confined to the renal parenchyma. However, it may already be growing into the renal tubules, calyces, or invading small intrarenal veins — the "venous highway" that RCC famously uses.',
    2: 'Renal vein involvement is the hallmark of Stage II RCC. Tumor thrombus grows inside the renal vein — visible as a filling defect extending toward the inferior vena cava.',
    3: 'Tumor thrombus extends into the IVC. Adrenal gland or perirenal fat involvement. Lymphatics draining to para-aortic nodes are invaded.',
    4: 'IVC thrombus reaches the heart. Hematogenous mets to lungs ("cannon-ball" mets), bone, brain. Loss of erythropoietin signaling → anemia.',
  },
  liver: {
    1: 'Single hepatocellular carcinoma nodule. The portal vein branches inside the liver are the primary spread route — HCC invades portal venules early, creating satellite nodules.',
    2: 'Multiple nodules or portal vein branch invasion. The bile ducts may be compressed causing jaundice. Hepatic artery branches show peritumoral arterial hypervascularity.',
    3: 'Main portal vein or hepatic vein invasion. Biliary obstruction. Lymphatics draining to hepatoduodenal ligament nodes are involved.',
    4: 'Extrahepatic spread via hepatic veins → IVC → lungs. Portal hypertension from vein obstruction causes varices and ascites.',
  },
  colon: {
    1: 'Tumor confined to mucosa/submucosa. But submucosal lymphatics are the first route — even T1 tumors have ~10% lymph node involvement. The venous drainage through the mesenteric veins begins carrying cells to the portal system.',
    2: 'Full-thickness bowel wall invasion. Pericolonic lymph nodes positive. Lymphovascular invasion of mesenteric vessels is key.',
    3: 'Regional lymph node chains along the mesenteric arteries are involved. The tumor may be tethered to adjacent organs.',
    4: 'Liver metastases via portal vein (most common). Then lung via hepatic veins → systemic circulation. The colon-liver-lung axis is the classic metastatic cascade.',
  },
  brain: {
    1: 'Primary brain tumors rarely metastasize outside the CNS. The cancer spreads along white matter tracts, perivascular spaces (Virchow-Robin spaces), and CSF pathways within the brain.',
    2: 'Local invasion along white matter tracts. Corpus callosum involvement allows spread to the contralateral hemisphere ("butterfly glioma").',
    3: 'Leptomeningeal spread via CSF. Ventricular system involvement.',
    4: 'CSF dissemination to spine. Rarely, systemic spread through the venous sinuses.',
  },
}

function getOrganInterior(organKey, stage) {
  return ORGAN_INTERIOR[organKey]?.[stage] || ''
}

const XRAY_RE = /lymph|vessel|vein|artery|blood|inside|interior|spread|metastas|circulat|nerve|duct|capillar|emboli|thrombus/i

// Keyword → organKey detection for auto-selecting the right 3D model per slide
const ORGAN_DETECT = [
  { key: 'liver',        words: ['liver', 'hepat', 'portal vein', 'bile', 'biliary', 'cirrhosis', 'hepatocell'] },
  { key: 'colon',        words: ['colon', 'colorect', 'rectum', 'sigmoid', 'bowel', 'mesenteric vein', 'cecum'] },
  { key: 'lungs',        words: ['lung', 'bronch', 'pulmon', 'alveol', 'pleura', 'airway', 'trachea'] },
  { key: 'brain',        words: ['brain', 'cerebr', 'glioma', 'cns ', 'neural', 'meninges', 'spinal cord', 'ventricle', 'csf'] },
  { key: 'kidney',       words: ['kidney', 'renal', 'nephron', 'ureter', 'rcc'] },
  { key: 'heart',        words: ['heart', 'cardiac', 'coronar', 'aorta', 'atrium', 'myocard', 'pericardi'] },
  { key: 'breast',       words: ['breast', 'mammary', 'ductal', 'lobular'] },
  { key: 'pancreas',     words: ['pancrea', 'islet', 'whipple'] },
  { key: 'stomach',      words: ['stomach', 'gastric', 'gastro'] },
  { key: 'lymphNodes',   words: ['lymph node', 'lymphoma', 'lymphat', 'hilum', 'mediastinal node', 'hilar'] },
  { key: 'bonemarrow',   words: ['bone marrow', 'marrow', 'hematolog', 'leukemia', 'myeloma'] },
  { key: 'spleen',       words: ['spleen', 'splenic'] },
  { key: 'bladder',      words: ['bladder', 'urothelial', 'cystectomy'] },
  { key: 'prostate',     words: ['prostate', 'psa ', 'androgen'] },
  { key: 'ovaries',      words: ['ovari', 'fallopian', 'peritoneal'] },
  { key: 'uterus',       words: ['uter', 'endometri', 'uterine'] },
  { key: 'thyroid',      words: ['thyroid', 'papillary', 'follicular', 'thyroglobulin'] },
  { key: 'esophagus',    words: ['esophag', 'barrett', 'squamous esoph'] },
  { key: 'skin',         words: ['skin', 'melanoma', 'dermis', 'epidermis'] },
  { key: 'bone',         words: ['bone ', 'osseous', 'osteo', 'skeletal', 'fracture'] },
  { key: 'adrenal',      words: ['adrenal', 'cortisol', 'aldosterone', 'pheochromocytoma'] },
  { key: 'smallintestine', words: ['small intestine', 'duodenum', 'jejunum', 'ileum'] },
  { key: 'oralCavity',   words: ['oral', 'mouth', 'tongue', 'gingival', 'buccal'] },
  { key: 'nasopharynx',  words: ['nasopharyn', 'epstein-barr', 'ebv'] },
  { key: 'larynx',       words: ['laryn', 'vocal cord', 'glottis'] },
]

function detectOrganFromText(text, fallback) {
  const lower = text.toLowerCase()
  for (const { key, words } of ORGAN_DETECT) {
    if (words.some(w => lower.includes(w))) return key
  }
  return fallback
}

// Medical jargon → plain-English inline explanations
const MEDICAL_TERMS = [
  [/\bportal triad\b/gi, 'portal triad (the spot where blood vessels and bile ducts enter each section of your liver)'],
  [/\bportal vein\b/gi, 'portal vein (a large blood vessel that carries blood from your intestines to your liver)'],
  [/\bhepatic vein\b/gi, 'hepatic vein (the blood vessel that carries blood out of your liver)'],
  [/\blymph nodes?\b/gi, 'lymph nodes (small bean-shaped glands that are part of your immune system)'],
  [/\blymphatics\b/gi, 'lymphatics (a network of tiny vessels that carry fluid and help fight infection)'],
  [/\blymphatic channels?\b/gi, 'lymphatic channels (tiny tubes in your body that carry immune fluid)'],
  [/\bmetastas\w+/gi, 'spread (when cancer travels from where it started to other parts of your body)'],
  [/\blymphovascular invasion\b/gi, 'invasion of nearby blood and lymph vessels'],
  [/\bperineural invasion\b/gi, 'growth along nerve pathways'],
  [/\bhematogenous\b/gi, 'through the bloodstream'],
  [/\btumor thrombus\b/gi, 'tumor thrombus (a clump of cancer cells blocking a blood vessel)'],
  [/\binferior vena cava\b/gi, 'inferior vena cava (the large vein that carries blood back to your heart)'],
  [/\brenal vein\b/gi, 'renal vein (the blood vessel draining your kidney)'],
  [/\bmesenteric vein\b/gi, 'mesenteric vein (the blood vessel draining your intestines)'],
  [/\bpulmonary (vein|artery)\b/gi, 'pulmonary $1 (a blood vessel connecting your lungs and heart)'],
  [/\bbronchial\b/gi, 'bronchial (relating to the airways in your lungs)'],
  [/\balveol\w+\b/gi, 'alveoli (the tiny air sacs in your lungs where oxygen enters your blood)'],
  [/\bpleural effusion\b/gi, 'pleural effusion (a buildup of fluid around your lungs)'],
  [/\bsubmucosal\b/gi, 'submucosal (beneath the inner lining of the organ)'],
  [/\bduccal\b/gi, 'ductal (relating to the tubes that carry fluids through an organ)'],
  [/\bbile ducts?\b/gi, 'bile ducts (tubes that carry digestive fluid from your liver to your intestine)'],
  [/\bsuperior vena cava\b/gi, 'superior vena cava (the large vein that carries blood from your upper body to your heart)'],
  [/\bpericardium\b/gi, 'pericardium (the sac that surrounds your heart)'],
  [/\bmyocardium\b/gi, 'myocardium (the muscle of your heart)'],
  [/\bcoronary arteri\w+/gi, 'coronary arteries (the blood vessels that supply your heart muscle with blood)'],
  [/\bparaneoplastic\b/gi, 'paraneoplastic (a side effect caused by the cancer releasing substances into your body)'],
  [/\bvagus nerve\b/gi, 'vagus nerve (a major nerve that controls many organs in your body)'],
  [/\bphrenic nerve\b/gi, 'phrenic nerve (the nerve that controls your breathing muscle)'],
  [/\berythropoietin\b/gi, 'erythropoietin (a hormone your kidney makes to help produce red blood cells)'],
  [/\bportal hypertension\b/gi, 'portal hypertension (high blood pressure in the vein that feeds your liver)'],
  [/\bascites\b/gi, 'ascites (a buildup of fluid in your abdomen)'],
  [/\bvarices\b/gi, 'varices (swollen veins, often in the stomach or esophagus)'],
  [/\bjaundice\b/gi, 'jaundice (yellowing of the skin and eyes when bile builds up in your blood)'],
  [/\bcorpus callosum\b/gi, 'corpus callosum (the bridge connecting the two sides of your brain)'],
  [/\bleptomeningeal\b/gi, 'leptomeningeal (relating to the thin layers that cover your brain and spinal cord)'],
  [/\bcsf\b/gi, 'CSF (the fluid surrounding your brain and spinal cord)'],
  [/\bwhite matter\b/gi, 'white matter (the part of your brain that connects different regions together)'],
  [/\bglioma\b/gi, 'glioma (a type of brain tumor that starts in the supportive cells of the brain)'],
  [/\bpsa\b/gi, 'PSA (a protein made by the prostate — high levels can signal cancer)'],
  [/\bandrogen\b/gi, 'androgen (a male hormone like testosterone that can fuel prostate cancer growth)'],
  [/\bendometri\w+/gi, 'endometrium (the inner lining of the uterus)'],
  [/\bperitoneal\b/gi, 'peritoneal (relating to the lining of the abdominal cavity)'],
  [/\burothelial\b/gi, 'urothelial (relating to the inner lining of the bladder and urinary tract)'],
  [/\bthyroglobulin\b/gi, 'thyroglobulin (a protein made only by your thyroid — used to detect thyroid cancer)'],
  [/\bbarrett'?s?\b/gi, "Barrett's (a condition where stomach acid damages the lining of the esophagus, raising cancer risk)"],
  [/\bepidermis\b/gi, 'epidermis (the outer layer of your skin)'],
  [/\bdermis\b/gi, 'dermis (the deeper layer of your skin beneath the surface)'],
  [/\bosseous\b/gi, 'osseous (relating to bone)'],
  [/\bpheochromocytoma\b/gi, 'pheochromocytoma (a rare tumor in the adrenal glands that affects blood pressure)'],
  [/\bduodenum\b/gi, 'duodenum (the first section of your small intestine, just past your stomach)'],
  [/\bjejunum\b/gi, 'jejunum (the middle section of your small intestine)'],
  [/\bileum\b/gi, 'ileum (the last section of your small intestine)'],
  [/\bgingival\b/gi, 'gingival (relating to your gums)'],
  [/\bbuccal\b/gi, 'buccal (relating to the inner lining of your cheek)'],
  [/\bnasopharyn\w+/gi, 'nasopharynx (the upper part of your throat behind your nose)'],
  [/\bepstein-barr\b/gi, 'Epstein-Barr (a common virus linked to certain cancers)'],
  [/\bglottis\b/gi, 'glottis (the part of your larynx that contains your vocal cords)'],
  [/\bhilum\b/gi, 'hilum (the area where blood vessels and airways enter or leave an organ)'],
  [/\bmediastin\w+/gi, 'mediastinum (the space in the middle of your chest between your lungs)'],
]

function applyMedicalTerms(text) {
  let result = text
  const applied = new Set()
  for (const [pattern, replacement] of MEDICAL_TERMS) {
    const key = pattern.toString()
    result = result.replace(pattern, (match) => {
      if (applied.has(key)) return match
      applied.add(key)
      return replacement
    })
  }
  return result
}

// Patterns that represent doctor stage-directions or meta-commentary — strip entire sentence
const DOCTOR_META_RE = /^[^.!?]*(?:I(?:'d| would| want to)? (?:like to |now )?(?:point|refer|show|draw|highlight|direct|turn)|(?:point(?:ing)?|referring|looking|turning) to the(?: 3[dD])? model|now(?: I'?d? like)?,? let(?:'s| us)|as your doctor,?|let me (?:show|point|highlight|draw)|(?:here|here's where) (?:I|we) (?:see|look|show)|it (?:looks?|seems?) like (?:we have |there'?s? )?a different|I(?:'ll| will) walk you through|although this is|I should (?:note|mention|clarify)|this (?:is outside|falls outside)|that'?s? (?:not quite|a different))[^.!?]*[.!?]\s*/gi

function cleanForPatient(text) {
function cleanForPatient(text) {
  let t = text
    // Strip ALL markdown formatting
    .replace(/\*{1,3}(.+?)\*{1,3}/g, '$1')
    .replace(/_{1,2}(.+?)_{1,2}/g, '$1')
    .replace(/`+(.+?)`+/g, '$1')
    .replace(/["""'']/g, '')
    .replace(/#+\s*/g, '')
    // Strip parenthetical stage directions
    .replace(/\([^)]*(?:3[dD] model|point(?:ing)?|model|voxel|screen)[^)]*\)/gi, '')
    // Strip numbered list markers
    .replace(/^\s*\d+\.\s*/gm, '')
    // Strip bullet markers
    .replace(/^\s*[-•*]\s*/gm, '')
    // Colons at end of a line
    .replace(/:\s*\n/gm, '. ')
    .replace(/:\s*$/gm, '.')
    // Remove ":1", ":2" style numbering artifacts
    .replace(/:\d+/g, '')
    // Patient-facing substitutions
    .replace(/\bfor the patient\b/gi, 'for you')
    .replace(/\bwhat (this |it )?means for the patient\b/gi, 'what this means for you')
    .replace(/\bthe patient('s)?\b/gi, (_, s) => s ? 'your' : 'you')
    .replace(/\ba patient\b/gi, 'you')
    .replace(/\btheir doctor\b/gi, 'your doctor')
    .replace(/\bthe doctor\b/gi, 'your doctor')
    .replace(/\bwe (will|can|need to|want to|are going to)\b/gi, 'your care team $1')
    .replace(/\bour (goal|plan|next step|approach|treatment)\b/gi, 'your $1')
    .replace(/\bin (this|the) (?:3D )?model\b/gi, 'in the image on the screen')
    // Strip transition/meta labels like "Plain language analogies" or "What this means:"
    .replace(/^(?:plain[- ]language analogies?|what this means|key points?|summary|important|note)[:\s]*/gim, '')
    // If a phrase ends without punctuation then two+ spaces follow more text, add a colon
    .replace(/([a-zA-Z])\s{2,}([A-Z])/g, '$1: $2')
    // Clean up stray whitespace
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Strip doctor meta-note sentences
  let prev
  do {
    prev = t
    t = t.replace(DOCTOR_META_RE, '')
  } while (t !== prev)

  // Apply medical term explanations
  t = applyMedicalTerms(t)

  return t.trim()
}

function splitSentences(text) {
  const safe = text.replace(/\b(Dr|Mr|Mrs|Ms|Prof|vs|etc|e\.g|i\.e|approx|No|St|Fig|Vol)\./gi, '$1<DOT>')
  return safe
    .split(/(?<=[.!?])\s+/)
    .map(s => s.replace(/<DOT>/g, '.').trim())
    // Remove any remaining colon-only or number artifacts
    .map(s => s.replace(/:\s*\d*/g, '').replace(/\s{2,}/g, ' ').trim())
    .filter(s => s.length > 25 && /[a-z]/i.test(s))
}

function makeTitle(sentence) {
  // Return the full sentence as the title — let CSS wrap it
  return sentence.replace(/[.!?:]+$/, '').replace(/["""]/g, '').trim()
}

function generateDeck(question, reply, organ, stageLabel, stage, currentOrganKey) {
  const cleaned = cleanForPatient(reply)
  const allSentences = splitSentences(cleaned)
  if (allSentences.length === 0) return null

  // Group into 2–3 slides of ~6 sentences each (title + up to 5 bullets)
  const SENTS_PER_SLIDE = 6
  const TARGET_SLIDES = Math.min(3, Math.max(2, Math.ceil(allSentences.length / SENTS_PER_SLIDE)))
  const perSlide = Math.ceil(allSentences.length / TARGET_SLIDES)
  const groups = []
  for (let i = 0; i < allSentences.length; i += perSlide)
    groups.push(allSentences.slice(i, i + perSlide))

  const slides = groups.map(sents => {
    const title = makeTitle(sents[0] || '')
    const bulletSents = sents.length > 1 ? sents.slice(1) : sents
    return {
      title,
      bullets: bulletSents,
      viewMode: XRAY_RE.test(sents.join(' ')) ? 'xray' : 'normal',
      organKey: detectOrganFromText(sents.join(' '), currentOrganKey),
    }
  })

  return {
    title: `${organ?.label || 'Your Diagnosis'} — Stage ${stageLabel}`,
    slides,
  }
}

export default function DoctorChat({ organKey, stage, highlights = [], onPresent }) {
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastDeck, setLastDeck] = useState(null)
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    setMessages([])
    setLastDeck(null)
  }, [organKey, stage])

  const stageLabel = ['I', 'II', 'III', 'IV'][stage - 1]

  const sendMessage = async (userText) => {
    const text = userText || input.trim()
    if (!text || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)

    const markedSites = highlights.length > 0 ? ` The physician has marked ${highlights.length} tumor site${highlights.length !== 1 ? 's' : ''} on the 3D model.` : ''
    const interiorDetail = getOrganInterior(organKey, stage)
    const systemPrompt = organ && data
      ? `You are speaking directly to a patient. Write everything in second person — "you", "your body". Never say "the patient". Never use asterisks, quotes, or markdown. Never comment on which organ is selected, never say things like "it looks like a different organ is involved", never acknowledge a context switch, never mention what tool or model you are using. Just explain what is happening in the patient's body based on what the doctor described. Speak warmly and clearly, as if sitting next to the patient.

Background context: Stage ${stageLabel} ${organ.label} cancer. ${STAGE_ANATOMY[stage]}${interiorDetail ? ` ${interiorDetail}` : ''}${markedSites}

5-year survival: ${data.survival5yr?.[stage] || 'unknown'}. Likely treatments: ${data.treatments?.[stage]?.slice(0, 3).join(', ') || 'see guidelines'}.

Write clear flowing sentences. Explain any medical word the first time you use it. No bullet points, no headers, no labels.`
      : `You are speaking directly to a cancer patient. Write in second person ("you", "your body"). No headers, no markdown, no asterisks, no quotes. Use warm, plain language and always explain medical terms the first time they appear.`

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const endpoint = apiKey
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : '/api/chat'

      let reply
      if (apiKey) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            max_tokens: 600,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-10),
              { role: 'user', content: text },
            ],
          }),
        })
        const d = await res.json()
        if (!res.ok) throw new Error(d.error?.message || 'Groq error')
        reply = d.choices[0].message.content
      } else {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            organ: organ?.label, stage, message: text,
            history: messages, patientMode: false,
            systemOverride: systemPrompt,
          }),
        })
        const d = await res.json()
        if (!res.ok) throw new Error(d.error || 'Server error')
        reply = d.reply
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }])
      const deck = generateDeck(text, reply, organ, stageLabel, stage, organKey)
      if (deck) setLastDeck({ deck, organKey, stage })
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err.message}` }])
    }
    setLoading(false)
  }

  if (!organ || !data) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-5 text-center text-slate-400 text-xs">
        <div className="text-xl mb-2">✦</div>
        <p>Select an organ to use the AI consult.</p>
      </div>
    )
  }

  const starters = [
    `What's happening inside the ${organ.label} at Stage ${stageLabel} that the patient can't see from the outside?`,
    `How do I explain the lymphatic and vascular spread visible in the X-Ray view to my patient?`,
    `At Stage ${stageLabel}, which interior structures — lymphatics, blood vessels, nerves — are involved and why does it matter?`,
    `What analogy helps a patient understand how cancer travels through internal anatomy at this stage?`,
  ]

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="text-xs font-semibold text-slate-700">Patient Communication AI</div>
          <div className="text-[10px] text-slate-400">{organ.label} · Stage {stageLabel}</div>
        </div>
        <div className="flex items-center gap-2">
          {onPresent && lastDeck && (
            <button
              onClick={() => onPresent(lastDeck)}
              className="text-xs px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              ▷ Present
            </button>
          )}
          <div className="text-sm text-blue-500 font-bold">✦</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto bg-white min-h-0">
        {messages.length === 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">Ask for help explaining</p>
            {starters.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 border border-blue-200 transition-colors leading-snug"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
              m.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 border border-blue-100 text-slate-700'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 flex gap-1">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-blue-100 bg-blue-50 flex-shrink-0">
        <form onSubmit={e => { e.preventDefault(); sendMessage() }} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. How do I explain metastasis simply?"
            disabled={loading}
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-medium transition-colors"
          >
            Ask
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-400 mt-1.5">AI-generated scripts — use clinical judgment</p>
      </div>
    </div>
  )
}
