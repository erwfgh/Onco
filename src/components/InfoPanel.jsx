import { useState } from 'react'
import CLINICAL from '../data/clinicalData'

const TABS = ['Overview', 'TNM', 'Treatments', 'Biomarkers', 'Pearls']

const SURVIVAL_COLOR = pct => {
  const n = parseInt(pct)
  if (n >= 80) return 'text-emerald-400'
  if (n >= 50) return 'text-yellow-400'
  if (n >= 25) return 'text-orange-400'
  return 'text-red-400'
}

export default function InfoPanel({ organKey, stage }) {
  const [tab, setTab] = useState('Overview')
  const data = organKey ? CLINICAL[organKey] : null

  if (!data) {
    return (
      <div className="w-72 flex-shrink-0 bg-[#0d1b2e] border-l border-slate-700/60 flex flex-col items-center justify-center text-center px-6">
        <div className="text-3xl mb-3 opacity-20">📋</div>
        <p className="text-slate-600 text-sm">Select an organ to see clinical data</p>
      </div>
    )
  }

  const tnm = data.tnm?.[stage] || {}
  const survival = data.survival5yr?.[stage] || '—'
  const treatments = data.treatments?.[stage] || []

  return (
    <div className="w-72 flex-shrink-0 bg-[#0d1b2e] border-l border-slate-700/60 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/60 flex-shrink-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs text-slate-500 font-mono">{data.icd10}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/40">Stage {['I','II','III','IV'][stage-1]}</span>
        </div>
        <h2 className="text-sm font-bold text-slate-100 leading-tight">{data.fullName}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Incidence: {data.incidence}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/60 flex-shrink-0 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              tab === t
                ? 'text-violet-300 border-b-2 border-violet-400'
                : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs">

        {tab === 'Overview' && (
          <>
            {/* Survival */}
            <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1">5-Year Survival</p>
              <p className={`text-2xl font-black ${SURVIVAL_COLOR(survival)}`}>{survival}</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Stage {['I','II','III','IV'][stage-1]} — SEER database estimate</p>
            </div>

            {/* TNM quick */}
            {tnm.T && (
              <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-2">TNM Classification</p>
                <div className="flex gap-2">
                  {['T','N','M'].map(k => (
                    <div key={k} className="flex-1 text-center bg-slate-900/60 rounded py-1.5">
                      <div className="text-violet-400 font-black text-sm">{tnm[k]}</div>
                      <div className="text-slate-600 text-[9px] mt-0.5">{k === 'T' ? 'Tumor' : k === 'N' ? 'Node' : 'Meta'}</div>
                    </div>
                  ))}
                </div>
                {tnm.desc && <p className="text-slate-500 mt-2 leading-relaxed">{tnm.desc}</p>}
              </div>
            )}

            {/* Subtypes */}
            {data.subtypes?.length > 0 && (
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Key Subtypes</p>
                <div className="flex flex-wrap gap-1">
                  {data.subtypes.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'TNM' && (
          <div className="space-y-2">
            {[1,2,3,4].map(s => {
              const t = data.tnm?.[s] || {}
              const isActive = s === stage
              return (
                <div key={s} className={`rounded-lg p-3 border transition-colors ${
                  isActive ? 'bg-violet-900/20 border-violet-700/50' : 'bg-slate-800/30 border-slate-700/40'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-violet-300' : 'text-slate-500'}`}>
                      Stage {['I','II','III','IV'][s-1]}
                    </span>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-violet-400' : 'text-slate-600'}`}>
                      {t.T} {t.N} {t.M}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-[10px]">{t.desc}</p>
                  <p className={`text-[10px] font-semibold mt-1 ${SURVIVAL_COLOR(data.survival5yr?.[s] || '0')}`}>
                    ↗ {data.survival5yr?.[s]} 5-yr survival
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'Treatments' && (
          <>
            <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Stage {['I','II','III','IV'][stage-1]} Protocols</p>
            {treatments.length === 0 && <p className="text-slate-600">No data available</p>}
            <div className="space-y-1.5">
              {treatments.map((t, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-800/40 rounded p-2 border border-slate-700/40">
                  <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                  <span className="text-slate-300 leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Biomarkers' && (
          <>
            <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1">Actionable Biomarkers</p>
            {(data.biomarkers || []).map((b, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                <span className="text-slate-300">{b}</span>
              </div>
            ))}
          </>
        )}

        {tab === 'Pearls' && (
          <>
            <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1">Clinical Pearls</p>
            <div className="space-y-2">
              {(data.keyPearls || []).map((p, i) => (
                <div key={i} className="bg-slate-800/40 rounded p-2.5 border-l-2 border-violet-600">
                  <p className="text-slate-300 leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer note */}
      <div className="px-4 py-2 border-t border-slate-700/60 flex-shrink-0">
        <p className="text-[9px] text-slate-700 leading-tight">Clinical data for educational use only. Consult current NCCN guidelines for treatment decisions.</p>
      </div>
    </div>
  )
}
