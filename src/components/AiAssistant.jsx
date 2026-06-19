import { useState, useRef } from 'react';

const SUGGESTED_QUESTIONS = (organ) => [
  `What does the current staging mean for ${organ || 'this'} cancer?`,
  `What are the standard treatments for ${organ || 'this'} cancer?`,
  `What questions should my patient ask their oncologist?`,
];

export default function AiAssistant({ organ, stage, highlights }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organ: organ?.name || organ,
          stage,
          highlights,
          message: userMsg,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to AI assistant.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-96 rounded-xl border border-violet-800/40 bg-[#0a1525] shadow-2xl flex flex-col" style={{ height: '480px' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-violet-800/30">
            <div>
              <div className="text-white font-semibold text-sm">AI Oncology Assistant</div>
              <div className="text-violet-400 text-xs">powered by Groq</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-lg leading-none">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-gray-400 text-xs mb-3">Suggested questions:</p>
                {SUGGESTED_QUESTIONS(organ?.name || organ).map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    className="w-full text-left text-xs text-violet-300 bg-violet-900/20 hover:bg-violet-900/40 rounded-lg px-3 py-2 border border-violet-800/30 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                  msg.role === 'user'
                    ? 'bg-violet-700 text-white'
                    : 'bg-[#0f1f35] text-gray-200 border border-violet-800/20'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0f1f35] border border-violet-800/20 rounded-lg px-3 py-2 text-xs text-gray-400">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-violet-800/30">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about this organ, staging, or treatments..."
                className="flex-1 bg-[#0f1f35] border border-violet-800/30 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-600"
              />
              <button onClick={() => sendMessage()}
                className="px-3 py-2 bg-violet-700 hover:bg-violet-600 text-white text-xs rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        className="w-12 h-12 rounded-full bg-violet-700 hover:bg-violet-600 text-white shadow-lg flex items-center justify-center transition-colors text-xl">
        🤖
      </button>
    </div>
  );
}
