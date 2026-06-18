import { useState, useRef, useEffect } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

function buildSystemPrompt(organ, data, stage) {
  const stageLabel = ['I', 'II', 'III', 'IV'][stage - 1]
  const survival = data.survival5yr?.[stage] || 'unknown'
  const treatments = (data.treatments?.[stage] || []).join('; ')
  const biomarkers = (data.biomarkers || []).join(', ')
  const tnm = data.tnm?.[stage] || {}

  return `You are a compassionate patient education assistant for OncoViz, a medical oncology platform. A patient is viewing information about their cancer diagnosis and has questions.

CURRENT PATIENT CONTEXT:
- Cancer type: ${data.fullName}
- Organ: ${organ.label}
- Stage: ${stageLabel} (${tnm.desc || ''})
- TNM: T=${tnm.T} N=${tnm.N} M=${tnm.M}
- 5-year survival (SEER average): ${survival}
- Common treatments at this stage: ${treatments}
- Relevant biomarkers: ${biomarkers}
- About this organ: ${organ.description}

INSTRUCTIONS:
- Speak in plain, warm, non-technical language a patient can understand
- Never say anything alarming without also being compassionate and reassuring
- Always encourage the patient to discuss their specific situation with their oncologist
- Keep responses concise (2-4 short paragraphs max)
- If asked about survival rates, contextualize that statistics are averages and individual outcomes vary
- Never provide specific treatment recommendations — only explain what treatments exist in general terms
- If asked something outside oncology, gently redirect to relevant cancer topics

Begin each conversation by briefly welcoming the patient and offering to answer their questions.`
}

export default function ChatBot({ organKey, stage }) {
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('oncoviz_apikey') || '')
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Reset chat when organ/stage changes
  useEffect(() => {
    setMessages([])
    setStarted(false)
  }, [organKey, stage])

  const saveKey = (key) => {
    setApiKey(key)
    localStorage.setItem('oncoviz_apikey', key)
  }

  const sendMessage = async (userText) => {
    if (!userText.trim() || !apiKey || loading) return

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const assistantMsg = { role: 'assistant', content: '' }
    setMessages([...newMessages, assistantMsg])

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 600,
          stream: true,
          system: buildSystemPrompt(organ, data, stage),
          messages: newMessages,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const evt = JSON.parse(data)
            if (evt.type === 'content_block_delta' && evt.delta?.text) {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + evt.delta.text,
                }
                return updated
              })
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `Sorry, I couldn't connect. ${err.message.includes('401') ? 'Please check your API key.' : err.message}`,
          error: true,
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const startChat = () => {
    setStarted(true)
    sendMessage('Hello, please introduce yourself briefly and tell me what you can help me with regarding my diagnosis.')
  }

  if (!organ || !data) return null

  // No API key yet
  if (!apiKey || showKeyInput) {
    return (
      <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
        <p className="text-violet-400 text-[10px] font-semibold uppercase tracking-wider mb-2">AI Patient Assistant</p>
        <p className="text-slate-400 text-xs mb-3 leading-relaxed">
          Ask plain-language questions about your diagnosis. Powered by Claude AI.
          Requires a free Anthropic API key.
        </p>
        <p className="text-slate-500 text-[10px] mb-2">
          Get a free key at <span className="text-violet-400 font-mono">console.anthropic.com</span>
        </p>
        <input
          type="password"
          placeholder="sk-ant-..."
          defaultValue={apiKey}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-violet-500 mb-2"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              saveKey(e.target.value.trim())
              setShowKeyInput(false)
            }
          }}
          id="apikey-input"
        />
        <button
          onClick={() => {
            const val = document.getElementById('apikey-input').value.trim()
            if (val) { saveKey(val); setShowKeyInput(false) }
          }}
          className="w-full py-1.5 rounded-lg bg-violet-700 hover:bg-violet-600 text-white text-xs font-semibold transition-colors"
        >
          Save & Start Chat
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/40 rounded-xl border border-slate-700/40 flex flex-col" style={{ height: '340px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/40 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          <span className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">AI Assistant</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => { setMessages([]); setStarted(false) }}
            className="text-[9px] text-slate-600 hover:text-slate-400 transition-colors px-1.5"
          >
            Clear
          </button>
          <button
            onClick={() => { setShowKeyInput(true) }}
            className="text-[9px] text-slate-600 hover:text-slate-400 transition-colors px-1.5"
          >
            Key
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {!started && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <p className="text-slate-500 text-[10px] leading-relaxed">
              Ask plain-language questions about<br />
              <span className="text-slate-400 font-medium">{data.fullName}</span>
            </p>
            <button
              onClick={startChat}
              className="px-4 py-2 rounded-lg bg-violet-700/60 hover:bg-violet-600/70 text-violet-200 text-[11px] font-semibold transition-colors border border-violet-600/40"
            >
              Start conversation
            </button>
            <div className="flex flex-wrap gap-1 justify-center mt-1">
              {[
                'What is this cancer?',
                'What does Stage ' + ['I','II','III','IV'][stage-1] + ' mean?',
                'What treatments exist?',
              ].map(q => (
                <button
                  key={q}
                  onClick={() => { setStarted(true); sendMessage(q) }}
                  className="text-[9px] px-2 py-1 rounded-full bg-slate-700/60 hover:bg-slate-600/60 text-slate-400 hover:text-slate-300 border border-slate-600/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
              msg.role === 'user'
                ? 'bg-violet-700/50 text-violet-100 rounded-br-sm'
                : msg.error
                  ? 'bg-red-900/30 text-red-400 border border-red-800/40 rounded-bl-sm'
                  : 'bg-slate-700/50 text-slate-200 rounded-bl-sm'
            }`}>
              {msg.content || (loading && i === messages.length - 1 ? <span className="animate-pulse text-slate-500">Thinking...</span> : '')}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-slate-700/40 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                setStarted(true)
                sendMessage(input)
              }
            }}
            placeholder="Ask a question..."
            disabled={loading}
            className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500 disabled:opacity-50"
          />
          <button
            onClick={() => { setStarted(true); sendMessage(input) }}
            disabled={loading || !input.trim()}
            className="px-3 py-1.5 rounded-lg bg-violet-700 hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-semibold transition-colors flex-shrink-0"
          >
            {loading ? '...' : '↑'}
          </button>
        </div>
      </div>
    </div>
  )
}
