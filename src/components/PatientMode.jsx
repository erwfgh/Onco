import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

const STAGE_PLAIN = {
  1: { label: 'Stage I — Early', color: 'text-emerald-600', summary: 'The cancer is small and has not spread beyond where it started. This is the most treatable stage.' },
  2: { label: 'Stage II — Localized', color: 'text-yellow-600', summary: 'The cancer has grown larger but is still mostly in the area where it started. It may involve nearby tissue.' },
  3: { label: 'Stage III — Regional', color: 'text-orange-600', summary: 'The cancer has spread to nearby lymph nodes or tissue. Treatment often combines multiple approaches.' },
  4: { label: 'Stage IV — Advanced', color: 'text-red-600', summary: 'The cancer has spread to distant parts of the body (metastasis). Treatment focuses on controlling growth and maintaining quality of life.' },
}

const TREATMENT_PLAIN = {
  'Surgery':          { icon: '✂', desc: 'An operation to remove the tumor or affected tissue.' },
  'Chemotherapy':     { icon: '◈', desc: 'Medicines given through an IV or pills that kill fast-growing cancer cells.' },
  'Radiation':        { icon: '⚡', desc: 'High-energy beams aimed at the tumor to destroy cancer cells.' },
  'Immunotherapy':    { icon: '◉', desc: 'Medicines that help your immune system find and attack cancer cells.' },
  'Targeted therapy': { icon: '◎', desc: 'Drugs designed to block specific signals that make cancer cells grow.' },
  'Hormone therapy':  { icon: '◇', desc: 'Medicines that block hormones that fuel certain cancers.' },
  'Observation':      { icon: '○', desc: 'Careful monitoring without immediate treatment — also called watchful waiting.' },
}

function simplifyTreatment(text) {
  for (const [key, val] of Object.entries(TREATMENT_PLAIN)) {
    if (text.toLowerCase().includes(key.toLowerCase())) return val
  }
  return { icon: '▸', desc: text }
}

function PatientAI({ organKey, stage, organ, data }) {
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

  const systemPrompt = organ && data
    ? `You are a compassionate oncology assistant helping a patient understand their diagnosis. The patient has Stage ${stageLabel} ${organ.label} cancer (${data.fullName}). Explain everything in plain, warm, reassuring language. Avoid medical jargon. Always remind them to talk to their own doctor for personal advice.`
    : `You are a compassionate oncology assistant helping patients understand cancer in plain, warm language. Always remind them to talk to their own doctor for personal advice.`

  const sendMessage = async (userText) => {
    const text = userText || input.trim()
    if (!text || loading) return
    setInput('')
    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)
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
            max_tokens: 512,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-10),
              { role: 'user', content: text },
            ],
          }),
        })
        const d = await res.json()
        if (!res.ok) throw new Error(d.error?.message || 'AI error')
        reply = d.choices[0].message.content
      } else {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ organ: organ?.label, stage, message: text, history: messages, patientMode: true }),
        })
        const d = await res.json()
        if (!res.ok) throw new Error(d.error || 'Server error')
        reply = d.reply
      }
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const starters = organ ? [
    `What does Stage ${stageLabel} ${organ.label} cancer mean for me?`,
    `What are my treatment options in plain language?`,
    `What side effects should I expect?`,
    `How might this affect my daily life?`,
  ] : [
    'What is immunotherapy?',
    'What does it mean if cancer has spread?',
    'What questions should I ask my oncologist?',
  ]

  return (
    <div className="rounded-xl border border-blue-100 bg-white overflow-hidden">
      <div className="px-3 py-2 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-700">AI Assistant</div>
        <div className="text-xs text-blue-500 font-bold">✦</div>
      </div>
      <div className="px-3 py-2.5 space-y-2 max-h-56 overflow-y-auto bg-white">
        {messages.length === 0 && (
          <div className="space-y-1.5">
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
            }`}>{m.content}</div>
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
      <div className="px-3 py-2 border-t border-blue-100 bg-blue-50">
        <form onSubmit={e => { e.preventDefault(); sendMessage() }} className="flex gap-1.5">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your diagnosis..."
            disabled={loading}
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-medium transition-colors"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  )
}

export default function PatientMode({ organKey, stage }) {
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]
  if (!organ || !data) return null

  const stageInfo = STAGE_PLAIN[stage]
  const survival = data.survival5yr?.[stage] || '—'
  const treatments = data.treatments?.[stage] || []
  const tnm = data.tnm?.[stage] || {}

  return (
    <div className="space-y-3 text-xs">

      {/* What is this cancer */}
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
        <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">What is this cancer?</p>
        <p className="text-slate-600 leading-relaxed">{organ.description}.</p>
      </div>

      {/* What does your stage mean */}
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
        <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">What does your stage mean?</p>
        <p className={`font-bold mb-1.5 ${stageInfo.color}`}>{stageInfo.label}</p>
        <p className="text-slate-600 leading-relaxed">{stageInfo.summary}</p>
      </div>

      {/* Survival */}
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
        <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Survival outlook</p>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-2xl font-black text-slate-800">{survival}</span>
          <span className="text-slate-500 text-[10px]">of people alive at 5 years</span>
        </div>
        <p className="text-slate-500 leading-relaxed">
          This is an average across many people. Your personal outlook depends on many factors — your doctor can give you a clearer picture.
        </p>
      </div>

      {/* Treatment options */}
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
        <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-2">Your treatment options</p>
        <div className="space-y-2">
          {treatments.slice(0, 5).map((t, i) => {
            const plain = simplifyTreatment(t)
            return (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-blue-500 flex-shrink-0 mt-0.5">{plain.icon}</span>
                <p className="text-slate-700 leading-relaxed">{plain.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Questions to ask your doctor */}
      <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
        <p className="text-blue-600 uppercase tracking-wider text-[10px] font-semibold mb-2">Questions to ask your doctor</p>
        <div className="space-y-1.5">
          {[
            `What are my treatment options for Stage ${['I','II','III','IV'][stage-1]} ${organ.label} cancer?`,
            'Am I eligible for any clinical trials?',
            'Are there any genetic or biomarker tests I should have?',
            'What side effects should I expect from treatment?',
            'What support resources do you recommend?',
          ].map((q, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-blue-500 flex-shrink-0 mt-0.5">?</span>
              <p className="text-slate-700 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant */}
      <div>
        <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-2">Ask the AI Assistant</p>
        <PatientAI organKey={organKey} stage={stage} organ={organ} data={data} />
      </div>

      <p className="text-[9px] text-slate-400 text-center pb-2">
        This information is for education only. Always discuss your situation with your oncologist.
      </p>
    </div>
  )
}
