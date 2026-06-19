import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

const STAGE_ANATOMY = {
  1: 'The tumor is localized within the primary organ, likely involving only the innermost tissue layers. Lymph nodes are not yet affected. Blood vessels and lymphatics nearby may show early micro-invasion that is not yet clinically apparent.',
  2: 'The tumor has grown larger within the organ and may have begun invading regional lymph nodes (Stage II). Peri-tumoral lymphatics are at risk. Blood vessel walls adjacent to the tumor may show early permeation (lymphovascular invasion).',
  3: 'The tumor has spread to regional lymph nodes and may be invading nearby structures such as major blood vessels, nerves, or adjacent organs. Lymphatics are obstructed or invaded. Lymph node chains in the drainage territory are likely involved.',
  4: 'Distant metastatic disease. Cancer cells have entered the bloodstream (hematogenous spread) and/or lymphatic channels, seeding distant organs (liver, lungs, bones, brain). The lymphatic network is a highway for spread at this stage. Blood vessels within the organ show frank tumor emboli.',
}

export default function DoctorChat({ organKey, stage, highlights = [] }) {
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
    const systemPrompt = organ && data
      ? `You are an expert oncologist and clinical AI assistant. The physician is viewing a 3D anatomical model of Stage ${stageLabel} ${organ.label} cancer (${data.fullName}).

Anatomical context for Stage ${stageLabel}: ${STAGE_ANATOMY[stage]}${markedSites}

5-year survival: ${data.survival5yr?.[stage] || 'unknown'}. Common treatments: ${data.treatments?.[stage]?.slice(0, 3).join(', ') || 'see guidelines'}.

You help the doctor with:
- Explaining to patients how the tumor affects interior anatomy (lymph nodes, blood vessels, ducts, nerves) in plain language
- Describing how cancer spreads through the lymphatic system and vasculature at this stage
- Providing compassionate scripts and analogies for patient communication
- Answering clinical questions about interior spread and staging
- Suggesting what the interior anatomy view reveals about prognosis

Be medically accurate, detailed, and practical. Reference specific anatomical structures when relevant.`
      : `You are an expert oncologist AI assistant helping physicians explain cancer diagnoses, including how tumors affect interior anatomy like lymph nodes, blood vessels, and ducts. Be medically accurate and compassionate.`

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
    `How do I explain Stage ${stageLabel} ${organ.label} cancer to my patient, including what's happening inside the organ?`,
    `At Stage ${stageLabel}, how does this cancer spread through lymph nodes and blood vessels?`,
    `What analogy can I use to explain how ${data.treatments?.[stage]?.[0] || 'chemotherapy'} works against this cancer?`,
    `What does the interior anatomy view show us about prognosis at Stage ${stageLabel}?`,
  ]

  return (
    <div className="rounded-xl border border-blue-100 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700">Patient Communication AI</div>
          <div className="text-[10px] text-slate-400">{organ.label} · Stage {stageLabel} · Scripts &amp; analogies</div>
        </div>
        <div className="text-sm text-blue-500 font-bold">✦</div>
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
