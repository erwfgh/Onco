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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organ: organ?.label,
          stage,
          message: text,
          history: messages,
          patientMode: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
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
    <div className="rounded-xl border border-blue-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-blue-100 bg-blue-50 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700">AI Assistant</div>
          <div className="text-[10px] text-slate-400">{organ.label} · Stage {['I','II','III','IV'][stage-1]} · Plain-language answers</div>
        </div>
        <span className="text-lg">🤖</span>
      </div>

      {/* Messages */}
      <div className="px-4 py-3 space-y-2.5 max-h-72 overflow-y-auto bg-white">
        {messages.length === 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 mb-2">Suggested questions:</p>
            {starters.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 border border-blue-200 transition-colors leading-snug"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
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
            placeholder="Ask anything about your diagnosis..."
            disabled={loading}
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-[11px] font-semibold transition-colors"
          >
            Send
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-400 mt-1.5">For informational purposes only · Always consult your doctor</p>
      </div>
    </div>
  )
}
