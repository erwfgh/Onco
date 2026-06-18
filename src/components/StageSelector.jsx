const STAGES = [
  {
    value: 1,
    label: 'I',
    name: 'Stage I',
    desc: 'Localized',
    detail: 'Single voxel — confined to site of origin',
    active: 'bg-blue-50 border-blue-500 shadow-blue-100',
    dot: 'bg-blue-500',
  },
  {
    value: 2,
    label: 'II',
    name: 'Stage II',
    desc: 'Regional',
    detail: 'Local spread — nearby tissue involvement',
    active: 'bg-blue-50 border-blue-600 shadow-blue-100',
    dot: 'bg-blue-600',
  },
  {
    value: 3,
    label: 'III',
    name: 'Stage III',
    desc: 'Extended',
    detail: 'Wide regional spread — lymph node involvement',
    active: 'bg-orange-50 border-orange-500 shadow-orange-100',
    dot: 'bg-orange-500',
  },
  {
    value: 4,
    label: 'IV',
    name: 'Stage IV',
    desc: 'Metastatic',
    detail: 'Distant metastasis — scatter pattern throughout organ',
    active: 'bg-red-50 border-red-500 shadow-red-100',
    dot: 'bg-red-500',
  },
]

const SURVIVAL_COLOR = pct => {
  const n = parseInt(pct || '0')
  if (n >= 70) return 'text-emerald-600'
  if (n >= 40) return 'text-amber-600'
  if (n >= 20) return 'text-orange-600'
  return 'text-red-600'
}

export default function StageSelector({ stage, onStageChange, clinical }) {
  const current = STAGES.find(s => s.value === stage)

  return (
    <div className="flex items-center gap-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">Cancer Stage</p>
        <div className="flex gap-1.5">
          {STAGES.map(s => {
            const surv = clinical?.survival5yr?.[s.value]
            return (
              <button
                key={s.value}
                onClick={() => onStageChange(s.value)}
                className={`flex flex-col items-center w-20 py-2 rounded-lg border-2 transition-all duration-150 ${
                  stage === s.value
                    ? s.active + ' shadow-md'
                    : 'border-blue-100 bg-white text-slate-400 hover:border-blue-300 hover:text-slate-600'
                }`}
              >
                <span className={`text-lg font-black tracking-tighter ${stage === s.value ? 'text-slate-700' : ''}`}>{s.label}</span>
                <span className="text-xs mt-0.5">{s.desc}</span>
                {surv && (
                  <span className={`text-[9px] mt-0.5 font-semibold ${SURVIVAL_COLOR(surv)}`}>{surv}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 border-l border-blue-100 pl-6">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-3 h-3 rounded-sm ${current.dot}`}></div>
          <span className="text-sm font-semibold text-slate-700">{current.name} — {current.desc}</span>
          {clinical?.survival5yr?.[stage] && (
            <span className={`text-xs font-bold ml-2 ${SURVIVAL_COLOR(clinical.survival5yr[stage])}`}>
              {clinical.survival5yr[stage]} 5-yr survival
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400">{current.detail}</p>
        <p className="text-xs text-slate-300 mt-1">Click any voxel to mark tumor site · Multiple sites supported</p>
      </div>
    </div>
  )
}
