import { useState } from 'react'
import ORGANS from '../data/organs'

const SYSTEM_ORDER = [
  'Thoracic', 'Abdominal', 'Urological', 'Gynecological',
  'Head & Neck', 'Breast', 'Hematological', 'Endocrine',
  'Dermatological', 'Musculoskeletal',
]

const SYSTEM_ICONS = {
  'Thoracic': 'Ψ',
  'Abdominal': '◈',
  'Urological': '▽',
  'Gynecological': '∩',
  'Head & Neck': 'Ω',
  'Breast': '⌒',
  'Hematological': '❖',
  'Endocrine': '△',
  'Dermatological': '□',
  'Musculoskeletal': '✚',
}

export default function OrganSelector({ selected, onSelect }) {
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState({})

  const groups = {}
  Object.entries(ORGANS).forEach(([key, organ]) => {
    const sys = organ.system
    if (!groups[sys]) groups[sys] = []
    groups[sys].push([key, organ])
  })

  const q = search.toLowerCase()
  const toggleCollapse = sys =>
    setCollapsed(c => ({ ...c, [sys]: !c[sys] }))

  return (
    <div className="w-56 flex-shrink-0 bg-[#0d1b2e] border-r border-slate-700/60 flex flex-col overflow-hidden">
      {/* Search */}
      <div className="px-3 py-2.5 border-b border-slate-700/60 flex-shrink-0">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search organs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-md pl-7 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Organ list */}
      <div className="flex-1 overflow-y-auto">
        {SYSTEM_ORDER.map(sys => {
          const items = (groups[sys] || []).filter(([, o]) =>
            !q || o.label.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
          )
          if (!items.length) return null
          const isCollapsed = collapsed[sys] && !q

          return (
            <div key={sys}>
              <button
                onClick={() => toggleCollapse(sys)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-500 uppercase tracking-wider hover:text-slate-400 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span>{SYSTEM_ICONS[sys]}</span>
                  <span className="font-semibold">{sys}</span>
                </span>
                <span className="text-slate-600">{isCollapsed ? '▶' : '▼'}</span>
              </button>

              {!isCollapsed && items.map(([key, organ]) => (
                <button
                  key={key}
                  onClick={() => onSelect(key)}
                  className={`w-full flex items-start gap-2.5 px-3 py-2 text-left transition-all ${
                    selected === key
                      ? 'bg-violet-600/20 text-violet-200 border-l-2 border-violet-500'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300 border-l-2 border-transparent'
                  }`}
                >
                  <span className="text-base mt-0.5 flex-shrink-0">{organ.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-tight">{organ.label}</div>
                    <div className="text-xs text-slate-600 leading-tight mt-0.5 truncate">{organ.description.split('(')[0].trim()}</div>
                  </div>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      {/* Count */}
      <div className="px-3 py-2 border-t border-slate-700/60 flex-shrink-0">
        <p className="text-xs text-slate-600">{Object.keys(ORGANS).length} organ models</p>
      </div>
    </div>
  )
}
