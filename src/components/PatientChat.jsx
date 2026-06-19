import { useState, useRef, useEffect } from 'react'
import { SignIn, useUser, UserButton } from '@clerk/clerk-react'

const STARTERS = [
  'What is immunotherapy?',
  'Can you explain what chemotherapy does?',
  'What does it mean if cancer has spread to lymph nodes?',
  'What is the difference between benign and malignant tumors?',
  'What questions should I ask my oncologist at my next visit?',
]

function Chat({ onExit, embedded }) {
  const { user } = useUser()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (msg) => {
    const text = msg || input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organ: null,
          stage: null,
          message: text,
          history: messages,
          patientMode: true,
        }),
      })
      const { reply } = await res.json()
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#060d1a] text-white">
      {/* Header — only shown when not embedded inside PatientApp */}
      {!embedded && (
        <header className="flex items-center justify-between px-5 py-3 border-b border-slate-700/60 bg-[#0a1525]/90 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-black tracking-tight">
                <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">Patient Oncology Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Hi, {user?.firstName || user?.primaryEmailAddress?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
            <button
              onClick={onExit}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        </header>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="mt-8 space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🩺</div>
              <h2 className="text-xl font-semibold text-white mb-1">How can I help you today?</h2>
              <p className="text-slate-400 text-sm">Ask me anything about cancer, treatments, or what to expect.</p>
            </div>
            <div className="grid gap-2">
              {STARTERS.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-left px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-violet-900/30 border border-slate-700/40 hover:border-violet-500/40 text-slate-300 text-sm transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">🤖</div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-violet-600 text-white rounded-br-sm'
                : 'bg-[#0a1525] border border-slate-700/50 text-slate-200 rounded-bl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">🤖</div>
            <div className="bg-[#0a1525] border border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700/60 bg-[#0a1525]/80 px-4 py-4 flex-shrink-0">
        <form
          onSubmit={e => { e.preventDefault(); send() }}
          className="max-w-3xl mx-auto flex gap-3"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about cancer, treatments, symptoms..."
            disabled={loading}
            className="flex-1 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-medium transition-colors"
          >
            Send
          </button>
        </form>
        <p className="text-center text-xs text-slate-600 mt-2">
          For informational purposes only. Always consult your doctor for medical advice.
        </p>
      </div>
    </div>
  )
}

export default function PatientChat({ onExit, embedded }) {
  const { isLoaded, isSignedIn } = useUser()

  // When embedded, skip the auth gate — AI is free and immediate
  if (embedded) return <Chat onExit={onExit} embedded />

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-[#060d1a]">
        <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#060d1a] px-4">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🩺</div>
          <h1 className="text-2xl font-black tracking-tight mb-2">
            <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
            <span className="text-slate-400 font-normal text-lg ml-2">for Patients</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xs">
            Sign in with your email and phone number to chat with our oncology AI — no subscription needed.
          </p>
        </div>
        <SignIn routing="hash" />
        <button
          onClick={onExit}
          className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  return <Chat onExit={onExit} />
}
