import { useRef } from 'react'
import CLINICAL from '../data/clinicalData'
import ORGANS from '../data/organs'

const STAGE_LABEL = ['I', 'II', 'III', 'IV']
const DATE = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function ReportModal({ organKey, stage, highlights, caseId, notes, onClose }) {
  const printRef = useRef()
  const organ = ORGANS[organKey]
  const data = CLINICAL[organKey]

  if (!organ || !data) return null

  const tnm = data.tnm?.[stage] || {}
  const survival = data.survival5yr?.[stage] || '—'
  const treatments = data.treatments?.[stage] || []
  const stageLabel = STAGE_LABEL[stage - 1]

  const handlePrint = () => {
    const content = printRef.current.innerHTML
    const w = window.open('', '_blank')
    w.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OncoViz Clinical Report — ${organ.label}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Georgia', serif; color: #111; background: #fff; padding: 40px; font-size: 13px; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            h2 { font-size: 14px; font-weight: 700; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: .05em; color: #444; }
            h3 { font-size: 12px; color: #777; margin-bottom: 6px; }
            .header { border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 20px; }
            .brand { font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #888; margin-bottom: 8px; }
            .meta { display: flex; gap: 40px; font-size: 11px; color: #666; margin-top: 8px; }
            .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .box { border: 1px solid #ddd; border-radius: 6px; padding: 12px; }
            .tnm { display: flex; gap: 12px; }
            .tnm-cell { flex: 1; text-align: center; background: #f5f5f5; border-radius: 4px; padding: 8px; }
            .tnm-cell .val { font-size: 18px; font-weight: 900; }
            .tnm-cell .lbl { font-size: 10px; color: #888; }
            .survival { font-size: 32px; font-weight: 900; }
            ul { list-style: none; }
            ul li { padding: 4px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; }
            ul li:before { content: "▸ "; color: #888; }
            .tag { display: inline-block; background: #f0f0f0; border-radius: 3px; padding: 2px 6px; font-size: 10px; margin: 2px; }
            .pearl { border-left: 3px solid #7c3aed; padding-left: 10px; margin: 6px 0; font-size: 11px; color: #444; }
            .disclaimer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 10px; color: #999; }
            .notes-box { background: #fafafa; border: 1px solid #ddd; border-radius: 6px; padding: 12px; min-height: 60px; white-space: pre-wrap; font-size: 12px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `)
    w.document.close()
    w.focus()
    setTimeout(() => { w.print(); w.close() }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0d1b2e] border border-slate-700/60 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 flex-shrink-0">
          <div>
            <h2 className="text-slate-100 font-bold text-base">Clinical Staging Report</h2>
            <p className="text-slate-500 text-xs mt-0.5">{organ.label} · Stage {stageLabel} · {highlights.length} site{highlights.length !== 1 ? 's' : ''} marked</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
              🖨️ Print / Save PDF
            </button>
            <button onClick={onClose} className="px-3 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition-colors">✕</button>
          </div>
        </div>

        {/* Printable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div ref={printRef}>

            {/* Report header */}
            <div style={{ borderBottom: '2px solid #111', paddingBottom: '12px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.15em', color: '#888', marginBottom: '8px' }}>OncoViz · 3D Clinical Oncology Platform</div>
              <h1 style={{ fontSize: '22px', marginBottom: '4px', color: '#111' }}>Clinical Staging Report</h1>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#7c3aed' }}>{organ.label} — Stage {stageLabel}</div>
              <div style={{ display: 'flex', gap: '30px', fontSize: '11px', color: '#666', marginTop: '8px' }}>
                <span>ICD-10: <strong>{data.icd10}</strong></span>
                {caseId && <span>Case ID: <strong>{caseId}</strong></span>}
                <span>Date: <strong>{DATE}</strong></span>
                <span>Sites marked: <strong>{highlights.length}</strong></span>
              </div>
            </div>

            {/* Grid: survival + TNM */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '14px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>5-Year Survival (SEER)</h2>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#111' }}>{survival}</div>
                <div style={{ fontSize: '11px', color: '#777', marginTop: '4px' }}>{data.fullName} — Stage {stageLabel}</div>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '14px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>TNM Classification</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['T', 'N', 'M'].map(k => (
                    <div key={k} style={{ flex: 1, textAlign: 'center', background: '#f5f5f5', borderRadius: '4px', padding: '8px' }}>
                      <div style={{ fontSize: '20px', fontWeight: '900' }}>{tnm[k]}</div>
                      <div style={{ fontSize: '10px', color: '#888' }}>{k === 'T' ? 'Tumor' : k === 'N' ? 'Node' : 'Metastasis'}</div>
                    </div>
                  ))}
                </div>
                {tnm.desc && <p style={{ marginTop: '8px', fontSize: '11px', color: '#555' }}>{tnm.desc}</p>}
              </div>
            </div>

            {/* Treatments */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>Stage {stageLabel} Treatment Protocols</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {treatments.map((t, i) => (
                  <li key={i} style={{ padding: '5px 0', borderBottom: '1px solid #f0f0f0', fontSize: '12px' }}>▸ {t}</li>
                ))}
              </ul>
            </div>

            {/* Biomarkers */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>Actionable Biomarkers</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {(data.biomarkers || []).map(b => (
                  <span key={b} style={{ background: '#f0f0f0', borderRadius: '3px', padding: '3px 8px', fontSize: '11px' }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Key pearls */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>Clinical Pearls</h2>
              {(data.keyPearls || []).map((p, i) => (
                <div key={i} style={{ borderLeft: '3px solid #7c3aed', paddingLeft: '10px', margin: '8px 0', fontSize: '11px', color: '#444' }}>{p}</div>
              ))}
            </div>

            {/* Notes */}
            {notes && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.05em', color: '#444', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>Clinical Notes</h2>
                <div style={{ background: '#fafafa', border: '1px solid #ddd', borderRadius: '6px', padding: '12px', whiteSpace: 'pre-wrap', fontSize: '12px' }}>{notes}</div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ marginTop: '30px', paddingTop: '12px', borderTop: '1px solid #ddd', fontSize: '10px', color: '#999' }}>
              This report was generated by OncoViz for educational and clinical reference purposes only. It is not a substitute for professional medical judgment. Treatment decisions should follow current NCCN guidelines and be tailored to individual patient factors. Survival statistics from NCI SEER database; TNM per AJCC 8th Edition.
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
