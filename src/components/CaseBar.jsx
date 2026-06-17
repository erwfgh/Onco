export default function CaseBar({ caseId, setCaseId, notes, setNotes, showNotes, setShowNotes }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-600 font-mono uppercase tracking-wider">Case</span>
        <input
          type="text"
          value={caseId}
          onChange={e => setCaseId(e.target.value)}
          placeholder="PT-0001"
          className="w-24 bg-slate-800/60 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500 font-mono"
        />
      </div>
      <button
        onClick={() => setShowNotes(v => !v)}
        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition-colors ${
          showNotes
            ? 'bg-violet-900/30 border-violet-700/60 text-violet-300'
            : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:text-slate-400'
        }`}
      >
        📝 Notes {notes ? <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> : null}
      </button>

      {showNotes && (
        <div className="absolute top-full left-0 right-0 z-30 bg-[#0a1525] border-b border-slate-700/60 px-5 py-3">
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add clinical notes, observations, or treatment plan notes here..."
            rows={3}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>
      )}
    </div>
  )
}
