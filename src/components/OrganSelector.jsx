import ORGANS from '../data/organs'

const SPECIALTIES = [
  { key: 'oncology', label: 'Oncology' },
  { key: 'hematology', label: 'Hematology' },
  { key: 'dermatology', label: 'Dermatology' },
]

export default function OrganSelector({ selected, onSelect }) {
  return (
    <div className="w-52 flex-shrink-0 bg-slate-900/80 border-r border-slate-700 flex flex-col overflow-y-auto">
      <div className="px-4 py-3 border-b border-slate-700">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Organs</p>
      </div>

      {SPECIALTIES.map(spec => {
        const organs = Object.entries(ORGANS).filter(([, o]) => o.specialty.includes(spec.key))
        if (!organs.length) return null
        return (
          <div key={spec.key}>
            <p className="px-4 pt-4 pb-1 text-xs uppercase tracking-wider text-slate-500">{spec.label}</p>
            {organs.map(([key, organ]) => (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  selected === key
                    ? 'bg-violet-600/30 text-violet-200 border-l-2 border-violet-500'
                    : 'text-slate-300 hover:bg-slate-800 border-l-2 border-transparent'
                }`}
              >
                <span className="text-lg">{organ.icon}</span>
                <span>{organ.label}</span>
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}
