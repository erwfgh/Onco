import { useState } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'
import REGIMENS from '../data/regimens'
import SCREENING from '../data/screening'
import PatientMode from './PatientMode'

const TABS = ['Overview', 'TNM', 'Regimens', 'Biomarkers', 'Screening', 'Pearls']

const SURVIVAL_COLOR = pct => {
  const n = parseInt(pct || '0')
  if (n >= 70) return 'text-emerald-400'
  if (n >= 40) return 'text-yellow-400'
  if (n >= 20) return 'text-orange-400'
  return 'text-red-400'
}

const CATEGORY_COLOR = {
  'Chemotherapy': 'bg-blue-900/30 border-blue-700/40 text-blue-300',
  'Targeted': 'bg-violet-900/30 border-violet-700/40 text-violet-300',
  'Immunotherapy': 'bg-emerald-900/30 border-emerald-700/40 text-emerald-300',
  'Hormonal': 'bg-pink-900/30 border-pink-700/40 text-pink-300',
  'Surgery': 'bg-amber-900/30 border-amber-700/40 text-amber-300',
  'Radiation': 'bg-orange-900/30 border-orange-700/40 text-orange-300',
  'Combination': 'bg-slate-800/60 border-slate-600/40 text-slate-300',
}

export default function InfoPanel({ organKey, stage }) {
  const [tab, setTab] = useState('Overview')
  const [patientMode, setPatientMode] = useState(false)

  const data = organKey ? CLINICAL[organKey] : null
  const organ = organKey ? ORGANS[organKey] : null

  if (!data || !organ) {
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
  const stageRegimens = REGIMENS[organKey]?.[stage] || []
  const screening = SCREENING[organKey] || {}

  return (
    <div className="w-72 flex-shrink-0 bg-[#0d1b2e] border-l border-slate-700/60 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/60 flex-shrink-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs text-slate-500 font-mono">{data.icd10}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/40">
            Stage {['I','II','III','IV'][stage-1]}
          </span>
        </div>
        <h2 className="text-sm font-bold text-slate-100 leading-tight">{data.fullName}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Incidence: {data.incidence}</p>

        {/* Patient/Clinician mode toggle */}
        <div className="flex items-center gap-1.5 mt-2.5 bg-slate-900/60 rounded-lg p-0.5">
          <button
            onClick={() => setPatientMode(false)}
            className={`flex-1 text-[10px] py-1 rounded-md transition-colors font-semibold ${
              !patientMode ? 'bg-violet-700 text-white' : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            Clinician
          </button>
          <button
            onClick={() => setPatientMode(true)}
            className={`flex-1 text-[10px] py-1 rounded-md transition-colors font-semibold ${
              patientMode ? 'bg-violet-700 text-white' : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            Patient View
          </button>
        </div>
      </div>

      {/* Patient mode content */}
      {patientMode ? (
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <PatientMode organKey={organKey} stage={stage} />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex border-b border-slate-700/60 flex-shrink-0 overflow-x-auto">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 py-2 text-[10px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
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

            {/* ── OVERVIEW ── */}
            {tab === 'Overview' && (
              <>
                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1">5-Year Survival (SEER)</p>
                  <p className={`text-2xl font-black ${SURVIVAL_COLOR(survival)}`}>{survival}</p>
                  <p className="text-slate-600 text-[10px] mt-0.5">Stage {['I','II','III','IV'][stage-1]} — NCI SEER database</p>
                </div>

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

                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Stage {['I','II','III','IV'][stage-1]} Treatments (summary)</p>
                  {treatments.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 border-b border-slate-800/60">
                      <span className="text-violet-600 flex-shrink-0 mt-0.5">▸</span>
                      <span className="text-slate-400 leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── TNM ── */}
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

            {/* ── REGIMENS ── */}
            {tab === 'Regimens' && (
              <>
                <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                  Stage {['I','II','III','IV'][stage-1]} Regimens
                </p>
                {stageRegimens.length === 0 && (
                  <p className="text-slate-600">No regimen data available for this stage.</p>
                )}
                <div className="space-y-2">
                  {stageRegimens.map((r, i) => (
                    <div key={i} className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-slate-100 font-bold leading-tight">{r.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border flex-shrink-0 ${CATEGORY_COLOR[r.category] || CATEGORY_COLOR['Combination']}`}>
                          {r.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {r.drugs.map(d => (
                          <span key={d} className="text-[9px] px-1.5 py-0.5 bg-slate-900/60 border border-slate-700 rounded text-slate-400">{d}</span>
                        ))}
                      </div>
                      <p className="text-slate-600 text-[10px]">⏱ {r.cycle}</p>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">{r.notes}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── BIOMARKERS ── */}
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

            {/* ── SCREENING ── */}
            {tab === 'Screening' && screening.guideline && (
              <>
                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1">Guideline</p>
                  <p className="text-violet-300 font-bold text-xs">{screening.guideline}</p>
                  <p className="text-slate-400 mt-1 leading-relaxed">{screening.eligible}</p>
                </div>

                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Screening Methods</p>
                  {(screening.method || []).map((m, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 border-b border-slate-800/60">
                      <span className="text-emerald-600 flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-slate-300 leading-relaxed">{m}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Key Risk Factors</p>
                  {(screening.riskFactors || []).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-red-700 flex-shrink-0 mt-0.5">▸</span>
                      <span className="text-slate-400">{r}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Prevention</p>
                  {(screening.prevention || []).map((p, i) => (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-emerald-700 flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-slate-400">{p}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Early Warning Signs</p>
                  {(screening.earlyWarning || []).map((w, i) => (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-yellow-700 flex-shrink-0 mt-0.5">⚠</span>
                      <span className="text-slate-400">{w}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── PEARLS ── */}
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
        </>
      )}

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-700/60 flex-shrink-0">
        <p className="text-[9px] text-slate-700 leading-tight">
          {patientMode
            ? 'Patient education only. Discuss your specific situation with your oncologist.'
            : 'Educational use only. Consult NCCN guidelines for treatment decisions.'}
        </p>
      </div>
    </div>
  )
}
