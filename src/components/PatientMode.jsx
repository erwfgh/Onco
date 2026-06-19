import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

export default function PatientMode({ organKey, stage }) {
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
          body: JSON.stringify({
            organ: organ?.label, stage, message: text,
            history: messages, patientMode: true,
          }),
        })
        const d = await res.json()
        if (!res.ok) throw new Error(d.error || 'Server error')
        reply = d.reply
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Sorry, something went wrong. Please try again.` }])
    }
    setLoading(false)
  }

  const starters = organ ? [
    `What does Stage ${stageLabel} ${organ.label} cancer mean for me?`,
    `What are my treatment options in plain language?`,
    `What questions should I ask my doctor?`,
    `How might this affect my daily life?`,
  ] : [
    `What is immunotherapy?`,
    `What does it mean if cancer has spread?`,
    `What questions should I ask my oncologist?`,
    `What is the difference between chemotherapy and radiation?`,
  ]

  return (
    <div className="flex flex-col h-full -mx-4 -my-3">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-white">
        {messages.length === 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
              {organ ? `Ask about your ${organ.label} diagnosis` : 'Ask anything'}
            </p>
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
            placeholder="Ask anything about your diagnosis..."
            disabled={loading}
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-medium transition-colors"
          >
            Send
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-400 mt-1.5">For information only · always consult your doctor</p>
      </div>
    </div>
  )
}
