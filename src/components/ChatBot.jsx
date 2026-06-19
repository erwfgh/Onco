import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

export default function ChatBot({ organKey, stage }) {
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

  const sendMessage = async (userText) => {
    const text = userText || input.trim()
    if (!text || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)

    const systemPrompt = `You are a compassionate oncology assistant helping patients understand cancer. Explain medical terms in plain, simple English. Be warm, clear, and reassuring. Always remind users to consult their own doctor for personal medical advice.`

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const endpoint = apiKey
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : '/api/chat'

      let reply
      if (apiKey) {
        // Direct browser → Groq (uses VITE_GROQ_API_KEY build-time var)
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            max_tokens: 512,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-10),
              { role: 'user', content: text },
            ],
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error?.message || 'Groq error')
        reply = data.choices[0].message.content
      } else {
        // Fallback: server-side /api/chat
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ organ: organ?.label, stage, message: text, history: messages, patientMode: true }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Server error')
        reply = data.reply
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err.message}` }])
    }
    setLoading(false)
  }

  if (!organ || !data) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-6 text-center text-slate-400 text-sm">
        <div className="text-2xl mb-2">💬</div>
        <p>Select an organ to start chatting.</p>
      </div>
    )
  }

  const starters = [
    `What does Stage ${['I','II','III','IV'][stage-1]} ${organ.label} cancer mean?`,
    `What are the treatment options?`,
    `What questions should I ask my doctor?`,
    `How does this affect my daily life?`,
  ]

  return (
    <div className="rounded-2xl border border-blue-200 bg-white overflow-hidden shadow-md">
      {/* Header */}
      <div className="px-4 py-3 bg-blue-600 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-white">AI Assistant</div>
          <div className="text-[10px] text-blue-200">{organ.label} · Stage {['I','II','III','IV'][stage-1]} · Plain-language answers</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">🤖</div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 max-h-80 overflow-y-auto bg-[#f0f6ff]">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider mb-2">Suggested questions</p>
            {starters.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-xs text-blue-700 bg-white hover:bg-blue-50 rounded-xl px-3 py-2.5 border border-blue-200 shadow-sm transition-colors leading-snug font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
              m.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-white border border-blue-100 text-slate-700 rounded-bl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-blue-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-blue-100 bg-white">
        <form onSubmit={e => { e.preventDefault(); sendMessage() }} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about your diagnosis..."
            disabled={loading}
            className="flex-1 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Send
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-400 mt-1.5">For informational purposes only · Always consult your doctor</p>
      </div>
    </div>
  )
}
