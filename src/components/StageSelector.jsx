const STAGES = [
  { value: 1, label: 'Stage I', desc: 'Localized', color: 'bg-violet-400' },
  { value: 2, label: 'Stage II', desc: 'Regional', color: 'bg-violet-500' },
  { value: 3, label: 'Stage III', desc: 'Extended', color: 'bg-violet-700' },
  { value: 4, label: 'Stage IV', desc: 'Metastatic', color: 'bg-violet-900' },
]

export default function StageSelector({ stage, onStageChange }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Cancer Stage</p>
      <div className="flex gap-2">
        {STAGES.map(s => (
          <button
            key={s.value}
            onClick={() => onStageChange(s.value)}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border transition-all text-xs font-medium ${
              stage === s.value
                ? 'border-violet-500 bg-violet-600/30 text-violet-200'
                : 'border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="font-bold text-sm">{s.label}</span>
            <span className="opacity-70">{s.desc}</span>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
        <div className="w-3 h-3 rounded-sm bg-violet-500"></div>
        <span>Tap voxels to mark tumor spread • Stage affects spread radius</span>
      </div>
    </div>
  )
}
