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

function generateDeck(question, reply, organ, stageLabel, stage) {
  const paras = reply
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 40)
    .slice(0, 5)

  if (paras.length === 0) {
    // Fallback: split by sentences into groups of 2
    const sents = reply.split(/(?<=[.!?])\s+/).filter(s => s.length > 20)
    for (let i = 0; i < sents.length; i += 2)
      paras.push(sents.slice(i, i + 2).join(' '))
  }

  if (paras.length === 0) return null

  const slides = paras.map((para, i) => {
    const firstSentence = para.split(/[.!?]/)[0].trim()
    const title = firstSentence.length > 65
      ? firstSentence.slice(0, 62) + '…'
      : firstSentence || `Part ${i + 1}`
    return {
      title,
      narrative: para,
      doctorTip: null,
      viewMode: XRAY_RE.test(para) ? 'xray' : 'normal',
    }
  })

  const shortQ = question.length > 55 ? question.slice(0, 52) + '…' : question
  return {
    title: `${organ?.label || ''} · Stage ${stageLabel} — ${shortQ}`,
    slides,
  }
}

export default function DoctorChat({ organKey, stage, highlights = [], onPresent }) {
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    setMessages([])
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
      ? `You are an expert oncologist and clinical AI assistant. The physician is using a 3D anatomical model with X-Ray transparency to visualize Stage ${stageLabel} ${organ.label} cancer (${data.fullName}) — including interior anatomy (lymphatics, blood vessels, ducts, nerves).

CRITICAL INSIGHT: Cancer is NOT always on the outside. ${STAGE_ANATOMY[stage]}${interiorDetail ? `\n\n${organ.label}-specific interior spread at Stage ${stageLabel}: ${interiorDetail}` : ''}${markedSites}

5-year survival: ${data.survival5yr?.[stage] || 'unknown'}. Common treatments: ${data.treatments?.[stage]?.slice(0, 3).join(', ') || 'see guidelines'}.

Your role:
- Help the doctor explain to patients what is happening INSIDE the organ — in lymphatics, blood vessels, ducts, and nerves — not just the outer surface
- Point out which interior structures visible in the 3D model are likely involved at this stage
- Give plain-language analogies (e.g. "the cancer is using the lymph vessels like highways to spread")
- Explain how distant organ communication is disrupted (e.g. nerve signaling, hormonal, vascular)
- Help the doctor prepare patients for what the interior view of the model shows

Be direct, medically accurate, and practical. Always emphasize that interior spread can exist even when the outer surface looks normal.`
      : `You are an expert oncologist AI assistant. Help physicians explain how cancer spreads through interior anatomy — lymphatics, blood vessels, ducts, nerves — not just the outer organ surface. Be medically accurate and use plain language analogies.`

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
      if (onPresent) {
        const deck = generateDeck(text, reply, organ, stageLabel, stage)
        if (deck) onPresent({ deck, organKey, stage })
      }
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
    <div className="rounded-xl border border-blue-100 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700">Patient Communication AI</div>
          <div className="text-[10px] text-slate-400">{organ.label} · Stage {stageLabel} · Scripts &amp; analogies</div>
        </div>
        <div className="flex items-center gap-2">
          {onPresent && SLIDE_DECKS[`${organKey}-${stage}`] && (
            <button
              onClick={() => onPresent({ deck: SLIDE_DECKS[`${organKey}-${stage}`], organKey, stage })}
              className="text-xs px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              ▷ Present
            </button>
          )}
          <div className="text-sm text-blue-500 font-bold">✦</div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-3 space-y-2.5 max-h-72 overflow-y-auto bg-white">
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
      <div className="px-4 py-3 border-t border-blue-100 bg-blue-50">
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
