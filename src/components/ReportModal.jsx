import { useRef, useState } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

const STAGE_LABEL = ['I', 'II', 'III', 'IV']

function loadUser() {
  try { return JSON.parse(localStorage.getItem('oncoviz_user')) } catch { return null }
}

export default function ReportModal({ organKey, stage, highlights, caseId, notes, onClose }) {
  const printRef = useRef()
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]
  const user = loadUser()
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const [patientName, setPatientName] = useState('')
  const [dob, setDob] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [prescribedPlan, setPrescribedPlan] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState(notes || '')

  if (!organ || !data) return null

  const tnm = data.tnm?.[stage] || {}
  const survival = data.survival5yr?.[stage] || '—'
  const stageLabel = STAGE_LABEL[stage - 1]

  const handlePrint = () => {
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head>
      <title>OncoViz Report — ${organ.label} Stage ${stageLabel}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; background: #f0f6ff; padding: 0; font-size: 12px; line-height: 1.5; }
        .page { background: #fff; max-width: 820px; margin: 0 auto; padding: 48px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; background: #1d4ed8; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; }
        .brand { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #fff; }
        .brand span { color: #93c5fd; }
        .brand .sub { font-size: 10px; font-weight: 400; color: #93c5fd; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 2px; }
        .report-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 4px; text-align: right; }
        .report-sub { font-size: 12px; color: #bfdbfe; font-weight: 600; text-align: right; }
        .meta-row { display: flex; gap: 16px; margin-top: 6px; justify-content: flex-end; }
        .meta-item { font-size: 10px; color: #bfdbfe; }
        .meta-item strong { color: #fff; }
        .section { margin-bottom: 22px; }
        .section-title { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #1d4ed8; border-bottom: 2px solid #dbeafe; padding-bottom: 5px; margin-bottom: 12px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .card { border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px; background: #eff6ff; }
        .big-number { font-size: 40px; font-weight: 900; color: #1d4ed8; line-height: 1; }
        .big-label { font-size: 10px; color: #3b82f6; margin-top: 4px; font-weight: 600; }
        .big-sub { font-size: 10px; color: #64748b; margin-top: 6px; line-height: 1.4; }
        .tnm-row { display: flex; gap: 10px; margin-bottom: 8px; }
        .tnm-cell { flex: 1; text-align: center; background: #fff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 6px; }
        .tnm-val { font-size: 22px; font-weight: 900; color: #1d4ed8; }
        .tnm-lbl { font-size: 9px; color: #64748b; margin-top: 2px; }
        .tnm-desc { font-size: 10px; color: #475569; margin-top: 6px; line-height: 1.4; }
        .biomarker-list { display: flex; flex-wrap: wrap; gap: 5px; }
        .biomarker { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 3px 8px; font-size: 10px; color: #1d4ed8; font-weight: 600; }
        .text-box { border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; min-height: 80px; white-space: pre-wrap; font-size: 11px; color: #334155; background: #eff6ff; line-height: 1.6; }
        .text-box.prescribed { border-color: #1d4ed8; border-width: 2px; background: #dbeafe; }
        .empty-box { border: 1px dashed #bfdbfe; border-radius: 8px; padding: 14px; min-height: 80px; background: #f8fbff; }
        .patient-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 4px; }
        .field-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #3b82f6; margin-bottom: 4px; }
        .field-value { font-size: 12px; color: #1e293b; font-weight: 500; border-bottom: 2px solid #bfdbfe; padding-bottom: 4px; min-height: 22px; }
        .sites-badge { display: inline-flex; align-items: center; gap: 5px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 20px; padding: 4px 14px; font-size: 11px; color: #1d4ed8; font-weight: 600; }
        .footer { margin-top: 32px; padding-top: 14px; border-top: 2px solid #dbeafe; display: flex; justify-content: space-between; align-items: flex-end; }
        .footer-brand { font-size: 14px; font-weight: 900; color: #1d4ed8; letter-spacing: -0.3px; }
        .disclaimer { font-size: 9px; color: #94a3b8; max-width: 480px; line-height: 1.4; margin-top: 3px; }
        .sig-block { text-align: right; }
        .sig-line { border-bottom: 2px solid #1d4ed8; width: 200px; margin-bottom: 4px; height: 28px; }
        .sig-label { font-size: 9px; color: #3b82f6; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        @media print { body { background: #fff; } .page { padding: 28px; } }
      </style>
    </head><body><div class="page">
      <div class="header">
        <div>
          <div class="brand">ONCO<span>VIZ</span><div class="sub">3D Clinical Oncology Platform</div></div>
        </div>
        <div style="text-align:right">
          <div class="report-title">Clinical Staging Report</div>
          <div class="report-sub">${data.fullName} &mdash; Stage ${stageLabel}</div>
          <div class="meta-row" style="justify-content:flex-end">
            <div class="meta-item">ICD-10 <strong>${data.icd10}</strong></div>
            ${caseId ? `<div class="meta-item">Case <strong>${caseId}</strong></div>` : ''}
            <div class="meta-item">Date <strong>${date}</strong></div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Patient Information</div>
        <div class="patient-grid">
          <div class="field"><div class="field-label">Patient Name</div><div class="field-value">${patientName || ''}</div></div>
          <div class="field"><div class="field-label">Date of Birth</div><div class="field-value">${dob || ''}</div></div>
          <div class="field"><div class="field-label">Follow-Up Date</div><div class="field-value">${followUp || ''}</div></div>
        </div>
        <div style="margin-top:10px">
          <div class="field-label" style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:4px">Tumor Sites Marked</div>
          <div class="sites-badge">${highlights.length} site${highlights.length !== 1 ? 's' : ''} marked on 3D model</div>
        </div>
      </div>

      <div class="grid2">
        <div class="section">
          <div class="section-title">5-Year Survival (NCI SEER)</div>
          <div class="card">
            <div class="big-number">${survival}</div>
            <div class="big-label">Stage ${stageLabel} &mdash; ${data.fullName}</div>
            <div class="big-sub">Population-level statistic. Individual prognosis depends on performance status, comorbidities, and treatment response.</div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">TNM Classification (AJCC 8th Ed.)</div>
          <div class="card">
            <div class="tnm-row">
              ${['T','N','M'].map(k => `<div class="tnm-cell"><div class="tnm-val">${tnm[k] || '—'}</div><div class="tnm-lbl">${k === 'T' ? 'Tumor' : k === 'N' ? 'Node' : 'Metastasis'}</div></div>`).join('')}
            </div>
            ${tnm.desc ? `<div class="tnm-desc">${tnm.desc}</div>` : ''}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Actionable Biomarkers</div>
        <div class="biomarker-list">
          ${(data.biomarkers || []).map(b => `<span class="biomarker">${b}</span>`).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Prescribed Treatment Plan</div>
        ${prescribedPlan ? `<div class="text-box prescribed">${prescribedPlan}</div>` : '<div class="empty-box"></div>'}
      </div>

      <div class="section">
        <div class="section-title">Additional Notes</div>
        ${additionalNotes ? `<div class="text-box">${additionalNotes}</div>` : '<div class="empty-box"></div>'}
      </div>

      <div class="footer">
        <div>
          <div class="footer-brand">ONCOVIZ</div>
          <div class="disclaimer">For clinical reference only. Not a substitute for professional judgment. Treatment decisions must be individualized per current NCCN guidelines and patient-specific factors.</div>
        </div>
        <div class="sig-block">
          ${user?.name ? `<div style="font-size:11px;font-weight:600;color:#334155;margin-bottom:4px">${user.name}</div>` : ''}
          ${user?.specialty ? `<div style="font-size:10px;color:#64748b;margin-bottom:8px">${user.specialty}</div>` : ''}
          <div class="sig-line"></div>
          <div class="sig-label">Physician Signature</div>
        </div>
      </div>
    </div></body></html>`)
    w.document.close()
    w.focus()
    setTimeout(() => { w.print(); w.close() }, 400)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-blue-100 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 flex-shrink-0 bg-blue-50 rounded-t-2xl">
          <div>
            <h2 className="text-slate-800 font-bold text-base">Clinical Staging Report</h2>
            <p className="text-slate-500 text-xs mt-0.5">{data.fullName} · Stage {stageLabel} · {highlights.length} site{highlights.length !== 1 ? 's' : ''} marked</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm">
              ▤ Print / Save PDF
            </button>
            <button onClick={onClose} className="px-3 py-2 rounded-lg border border-blue-200 text-slate-500 hover:text-slate-700 text-sm transition-colors">✕</button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Patient info */}
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Patient Information</p>
            <div className="grid grid-cols-3 gap-3">
              {[['Patient Name', patientName, setPatientName, 'Jane Smith'], ['Date of Birth', dob, setDob, 'MM/DD/YYYY'], ['Follow-Up Date', followUp, setFollowUp, 'MM/DD/YYYY']].map(([label, val, set, ph]) => (
                <div key={label}>
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">{label}</label>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-blue-50 text-slate-700 text-xs focus:outline-none focus:border-blue-400 placeholder-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Fixed clinical data */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">5-Year Survival (SEER)</p>
              <p className="text-3xl font-black text-slate-800">{survival}</p>
              <p className="text-[10px] text-slate-400 mt-1">Stage {stageLabel} · {data.fullName}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">TNM (AJCC 8th Ed.)</p>
              <div className="flex gap-2 mb-2">
                {['T','N','M'].map(k => (
                  <div key={k} className="flex-1 text-center bg-white border border-blue-200 rounded-lg py-1.5">
                    <div className="text-blue-700 font-black text-sm">{tnm[k] || '—'}</div>
                    <div className="text-[9px] text-slate-400">{k === 'T' ? 'Tumor' : k === 'N' ? 'Node' : 'Meta'}</div>
                  </div>
                ))}
              </div>
              {tnm.desc && <p className="text-[10px] text-slate-500 leading-relaxed">{tnm.desc}</p>}
            </div>
          </div>

          {/* Biomarkers */}
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Actionable Biomarkers</p>
            <div className="flex flex-wrap gap-1.5">
              {(data.biomarkers || []).map(b => (
                <span key={b} className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-medium">{b}</span>
              ))}
            </div>
          </div>

          {/* Doctor-prescribed treatment plan */}
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Prescribed Treatment Plan</p>
            <textarea
              value={prescribedPlan}
              onChange={e => setPrescribedPlan(e.target.value)}
              placeholder="Enter your prescribed treatment plan, dosages, schedule, and rationale..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50 text-slate-700 text-xs focus:outline-none focus:border-blue-400 placeholder-slate-300 resize-none"
            />
          </div>

          {/* Additional notes */}
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Additional Notes</p>
            <textarea
              value={additionalNotes}
              onChange={e => setAdditionalNotes(e.target.value)}
              placeholder="Clinical observations, patient concerns, referrals, follow-up instructions..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50 text-slate-700 text-xs focus:outline-none focus:border-blue-400 placeholder-slate-300 resize-none"
            />
          </div>

        </div>
      </div>
    </div>
  )
}
