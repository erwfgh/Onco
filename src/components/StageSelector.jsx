const STAGES = [
  {
    value: 1,
    label: 'I',
    name: 'Stage I',
    desc: 'Localized',
    detail: 'Single voxel — confined to site of origin',
    color: 'border-violet-400 text-violet-300',
    active: 'bg-violet-500/20 border-violet-400',
    dot: 'bg-violet-400',
  },
  {
    value: 2,
    label: 'II',
    name: 'Stage II',
    desc: 'Regional',
    detail: 'Local spread — nearby tissue involvement',
    color: 'border-violet-500 text-violet-300',
    active: 'bg-violet-600/20 border-violet-500',
    dot: 'bg-violet-500',
  },
  {
    value: 3,
    label: 'III',
    name: 'Stage III',
    desc: 'Extended',
    detail: 'Wide regional spread — lymph node involvement',
    color: 'border-violet-700 text-violet-300',
    active: 'bg-violet-700/20 border-violet-700',
    dot: 'bg-violet-700',
  },
  {
    value: 4,
    label: 'IV',
    name: 'Stage IV',
    desc: 'Metastatic',
    detail: 'Distant metastasis — scatter pattern throughout organ',
    color: 'border-violet-900 text-violet-300',
    active: 'bg-violet-900/30 border-violet-900',
    dot: 'bg-violet-900',
  },
]

export default function StageSelector({ stage, onStageChange }) {
  const current = STAGES.find(s => s.value === stage)

  return (
    <div className="flex items-center gap-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">Cancer Stage</p>
        <div className="flex gap-1.5">
          {STAGES.map(s => (
            <button
              key={s.value}
              onClick={() => onStageChange(s.value)}
              className={`flex flex-col items-center w-20 py-2.5 rounded-lg border-2 transition-all duration-150 ${
                stage === s.value
                  ? s.active + ' shadow-lg shadow-violet-900/30'
                  : 'border-slate-700 bg-slate-800/30 text-slate-500 hover:border-slate-600 hover:text-slate-400'
              }`}
            >
              <span className={`text-lg font-black tracking-tighter ${stage === s.value ? 'text-violet-200' : ''}`}>{s.label}</span>
              <span className="text-xs mt-0.5">{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stage info */}
      <div className="flex-1 border-l border-slate-700/60 pl-6">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-3 h-3 rounded-sm ${current.dot}`}></div>
          <span className="text-sm font-semibold text-slate-200">{current.name} — {current.desc}</span>
        </div>
        <p className="text-xs text-slate-500">{current.detail}</p>
        <p className="text-xs text-slate-600 mt-1">Click any voxel to mark tumor site • Multiple sites supported</p>
      </div>
    </div>
  )
}
