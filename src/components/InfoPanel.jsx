import { useState } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'
import REGIMENS from '../data/regimens'
import SCREENING from '../data/screening'
import PatientMode from './PatientMode'
import DoctorChat from './DoctorChat'

const TABS = ['Overview', 'TNM', 'Regimens', 'Biomarkers', 'Screening', 'Pearls', 'Consult']

const SURVIVAL_COLOR = pct => {
  const n = parseInt(pct || '0')
  if (n >= 70) return 'text-emerald-600'
  if (n >= 40) return 'text-amber-600'
  if (n >= 20) return 'text-orange-600'
  return 'text-red-600'
}

const CATEGORY_COLOR = {
  'Chemotherapy': 'bg-blue-50 border-blue-200 text-blue-700',
  'Targeted': 'bg-violet-50 border-violet-200 text-violet-700',
  'Immunotherapy': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  'Hormonal': 'bg-pink-50 border-pink-200 text-pink-700',
  'Surgery': 'bg-amber-50 border-amber-200 text-amber-700',
  'Radiation': 'bg-orange-50 border-orange-200 text-orange-700',
  'Combination': 'bg-slate-50 border-slate-200 text-slate-600',
}

export default function InfoPanel({ organKey, stage, patientDefault = false }) {
  const [tab, setTab] = useState('Overview')
  const [patientMode, setPatientMode] = useState(patientDefault)

  const data = organKey ? CLINICAL[organKey] : null
  const organ = organKey ? ORGANS[organKey] : null

  if (!data || !organ) {
    return (
      <div className="w-72 flex-shrink-0 bg-white border-l border-blue-100 flex flex-col items-center justify-center text-center px-6">
        <div className="text-3xl mb-3 opacity-20 text-blue-400">▤</div>
        <p className="text-slate-400 text-sm">Select an organ to see clinical data</p>
      </div>
    )
  }

  const tnm = data.tnm?.[stage] || {}
  const survival = data.survival5yr?.[stage] || '—'
  const treatments = data.treatments?.[stage] || []
  const stageRegimens = REGIMENS[organKey]?.[stage] || []
  const screening = SCREENING[organKey] || {}

  return (
    <div className="w-72 flex-shrink-0 bg-white border-l border-blue-100 flex flex-col overflow-hidden shadow-sm">

      {/* Toggle — minimal, always visible */}
      <div className="px-3 py-2 border-b border-blue-100 flex-shrink-0 bg-blue-50">
        {!patientMode && (
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-[10px] font-mono text-slate-400">{data.icd10}</span>
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-semibold">
                Stage {['I','II','III','IV'][stage-1]}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-blue-100">
          <button
            onClick={() => setPatientMode(false)}
            className={`flex-1 text-[10px] py-1 rounded-md transition-colors font-semibold ${
              !patientMode ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Clinician
          </button>
          <button
            onClick={() => setPatientMode(true)}
            className={`flex-1 text-[10px] py-1 rounded-md transition-colors font-semibold ${
              patientMode ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Patient AI
          </button>
        </div>
      </div>

      {/* Patient mode — full height AI, no clinical noise */}
      {patientMode ? (
        <div className="flex-1 overflow-hidden flex flex-col">
          <PatientMode organKey={organKey} stage={stage} />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex border-b border-blue-100 flex-shrink-0 overflow-x-auto bg-white">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 py-2 text-[10px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  tab === t
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-600'
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
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1">5-Year Survival (SEER)</p>
                  <p className={`text-2xl font-black ${SURVIVAL_COLOR(survival)}`}>{survival}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">Stage {['I','II','III','IV'][stage-1]} — NCI SEER database</p>
                </div>

                {tnm.T && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-2">TNM Classification</p>
                    <div className="flex gap-2">
                      {['T','N','M'].map(k => (
                        <div key={k} className="flex-1 text-center bg-white rounded py-1.5 border border-blue-100">
                          <div className="text-blue-600 font-black text-sm">{tnm[k]}</div>
                          <div className="text-slate-400 text-[9px] mt-0.5">{k === 'T' ? 'Tumor' : k === 'N' ? 'Node' : 'Meta'}</div>
                        </div>
                      ))}
                    </div>
                    {tnm.desc && <p className="text-slate-500 mt-2 leading-relaxed">{tnm.desc}</p>}
                  </div>
                )}

                {data.subtypes?.length > 0 && (
                  <div>
                    <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Key Subtypes</p>
                    <div className="flex flex-wrap gap-1">
                      {data.subtypes.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Stage {['I','II','III','IV'][stage-1]} Treatments</p>
                  {treatments.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 border-b border-blue-50">
                      <span className="text-blue-400 flex-shrink-0 mt-0.5">▸</span>
                      <span className="text-slate-600 leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'TNM' && (
              <div className="space-y-2">
                {[1,2,3,4].map(s => {
                  const t = data.tnm?.[s] || {}
                  const isActive = s === stage
                  return (
                    <div key={s} className={`rounded-lg p-3 border transition-colors ${
                      isActive ? 'bg-blue-50 border-blue-300' : 'bg-white border-blue-100'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                          Stage {['I','II','III','IV'][s-1]}
                        </span>
                        <span className={`text-[10px] font-mono ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
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

            {tab === 'Regimens' && (
              <>
                <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                  Stage {['I','II','III','IV'][stage-1]} Regimens
                </p>
                {stageRegimens.length === 0 && (
                  <p className="text-slate-400">No regimen data available for this stage.</p>
                )}
                <div className="space-y-2">
                  {stageRegimens.map((r, i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-slate-800 font-bold leading-tight">{r.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border flex-shrink-0 ${CATEGORY_COLOR[r.category] || CATEGORY_COLOR['Combination']}`}>
                          {r.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {r.drugs.map(d => (
                          <span key={d} className="text-[9px] px-1.5 py-0.5 bg-white border border-blue-200 rounded text-blue-700">{d}</span>
                        ))}
                      </div>
                      <p className="text-slate-400 text-[10px]">⏱ {r.cycle}</p>
                      <p className="text-slate-500 text-[10px] mt-1 leading-relaxed">{r.notes}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'Biomarkers' && (
              <>
                <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1">Actionable Biomarkers</p>
                {(data.biomarkers || []).map((b, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-blue-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-slate-700">{b}</span>
                  </div>
                ))}
              </>
            )}

            {tab === 'Screening' && screening.guideline && (
              <>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1">Guideline</p>
                  <p className="text-blue-700 font-bold text-xs">{screening.guideline}</p>
                  <p className="text-slate-600 mt-1 leading-relaxed">{screening.eligible}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Methods</p>
                  {(screening.method || []).map((m, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 border-b border-blue-50">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-slate-600 leading-relaxed">{m}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Risk Factors</p>
                  {(screening.riskFactors || []).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-red-500 flex-shrink-0 mt-0.5">▸</span>
                      <span className="text-slate-600">{r}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">Early Warning Signs</p>
                  {(screening.earlyWarning || []).map((w, i) => (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
                      <span className="text-slate-600">{w}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'Pearls' && (
              <>
                <p className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold mb-1">Clinical Pearls</p>
                <div className="space-y-2">
                  {(data.keyPearls || []).map((p, i) => (
                    <div key={i} className="bg-blue-50 rounded p-2.5 border-l-2 border-blue-500">
                      <p className="text-slate-700 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'Consult' && (
              <DoctorChat organKey={organKey} stage={stage} />
            )}
          </div>
        </>
      )}

      {/* Footer — clinician only */}
      {!patientMode && (
        <div className="px-4 py-2 border-t border-blue-100 flex-shrink-0 bg-blue-50">
          <p className="text-[9px] text-slate-400 leading-tight">
            Educational use only. Consult NCCN guidelines for treatment decisions.
          </p>
        </div>
      )}
    </div>
  )
}
