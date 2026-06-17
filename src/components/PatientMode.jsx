import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

const STAGE_PLAIN = {
  1: { label: 'Stage I — Early', color: 'text-emerald-400', summary: 'The cancer is small and has not spread beyond where it started. This is the most treatable stage.' },
  2: { label: 'Stage II — Localized', color: 'text-yellow-400', summary: 'The cancer has grown larger but is still mostly in the area where it started. It may involve nearby tissue.' },
  3: { label: 'Stage III — Regional', color: 'text-orange-400', summary: 'The cancer has spread to nearby lymph nodes or tissue. Treatment often combines multiple approaches.' },
  4: { label: 'Stage IV — Advanced', color: 'text-red-400', summary: 'The cancer has spread to distant parts of the body (metastasis). Treatment focuses on controlling growth and maintaining quality of life.' },
}

const TREATMENT_PLAIN = {
  'Surgery': { icon: '🔪', desc: 'An operation to remove the tumor or affected tissue.' },
  'Chemotherapy': { icon: '💊', desc: 'Medicines given through an IV or pills that kill fast-growing cancer cells.' },
  'Radiation': { icon: '⚡', desc: 'High-energy beams aimed at the tumor to destroy cancer cells.' },
  'Immunotherapy': { icon: '🛡️', desc: 'Medicines that help your immune system find and attack cancer cells.' },
  'Targeted therapy': { icon: '🎯', desc: 'Drugs designed to block specific signals that make cancer cells grow.' },
  'Hormone therapy': { icon: '🧪', desc: 'Medicines that block hormones that fuel certain cancers.' },
  'Observation': { icon: '👁️', desc: 'Careful monitoring without immediate treatment — also called watchful waiting.' },
}

function simplifyTreatment(text) {
  for (const [key, val] of Object.entries(TREATMENT_PLAIN)) {
    if (text.toLowerCase().includes(key.toLowerCase())) return val
  }
  return { icon: '💉', desc: text }
}

export default function PatientMode({ organKey, stage }) {
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]
  if (!organ || !data) return null

  const stageInfo = STAGE_PLAIN[stage]
  const survival = data.survival5yr?.[stage] || '—'
  const treatments = data.treatments?.[stage] || []
  const tnm = data.tnm?.[stage] || {}

  return (
    <div className="space-y-4 text-xs">

      {/* What is this cancer */}
      <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
        <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-2">What is this cancer?</p>
        <p className="text-slate-200 font-semibold mb-1">{data.fullName}</p>
        <p className="text-slate-400 leading-relaxed">
          {organ.description}. There are {data.subtypes?.length || 'several'} main types: {data.subtypes?.slice(0, 3).join(', ')}.
        </p>
      </div>

      {/* What does your stage mean */}
      <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
        <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-2">What does your stage mean?</p>
        <p className={`font-bold mb-2 ${stageInfo.color}`}>{stageInfo.label}</p>
        <p className="text-slate-400 leading-relaxed">{stageInfo.summary}</p>
        {tnm.desc && (
          <div className="mt-3 bg-slate-900/40 rounded-lg p-3">
            <p className="text-slate-500 text-[10px] mb-1">In medical terms:</p>
            <p className="text-slate-400">{tnm.desc}</p>
          </div>
        )}
      </div>

      {/* Survival */}
      <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
        <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-2">Survival outlook</p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-black text-slate-100">{survival}</span>
          <span className="text-slate-500 text-[10px]">of people are alive 5 years after diagnosis</span>
        </div>
        <p className="text-slate-500 leading-relaxed">
          This is a statistical average from the NCI SEER database. Your outcome depends on many personal factors — age, overall health, tumor biology, and how well treatment works for you. Your doctor can give you a more personalized estimate.
        </p>
      </div>

      {/* Treatment options */}
      <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
        <p className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold mb-3">Your treatment options</p>
        <div className="space-y-2">
          {treatments.slice(0, 5).map((t, i) => {
            const plain = simplifyTreatment(t)
            return (
              <div key={i} className="flex gap-2.5 items-start">
                <span className="text-base flex-shrink-0">{plain.icon}</span>
                <div>
                  <p className="text-slate-300 leading-relaxed">{plain.desc}</p>
                  <p className="text-slate-600 text-[10px] mt-0.5 italic">{t}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Questions to ask your doctor */}
      <div className="bg-violet-900/20 rounded-xl p-4 border border-violet-700/30">
        <p className="text-violet-400 uppercase tracking-wider text-[10px] font-semibold mb-3">Questions to ask your doctor</p>
        <div className="space-y-2">
          {[
            `What are my treatment options for ${organ.label} cancer at Stage ${['I','II','III','IV'][stage-1]}?`,
            'Am I eligible for any clinical trials?',
            `Should I be tested for biomarkers like ${data.biomarkers?.slice(0,2).join(' or ')}?`,
            'What side effects should I expect?',
            'What support resources do you recommend?',
          ].map((q, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-violet-600 flex-shrink-0 mt-0.5">?</span>
              <p className="text-slate-300 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[9px] text-slate-700 text-center pb-2">
        This information is for education only. Always discuss your specific situation with your oncologist.
      </p>
    </div>
  )
}
