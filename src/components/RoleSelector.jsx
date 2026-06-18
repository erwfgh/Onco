import { useState } from 'react'
import DoctorAuth from './DoctorAuth'
import PatientAuth from './PatientAuth'

export default function RoleSelector({ onAuth }) {
  const [role, setRole] = useState(null) // null | 'doctor' | 'patient'

  if (role === 'doctor') return <DoctorAuth onBack={() => setRole(null)} onAuth={onAuth} />
  if (role === 'patient') return <PatientAuth onBack={() => setRole(null)} onAuth={onAuth} />

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-blue-100 flex-shrink-0">
        <div>
          <div className="text-xl font-black tracking-tight">
            <span className="text-blue-900">ONCO</span><span className="text-blue-500">VIZ</span>
          </div>
          <div className="text-xs text-slate-400 -mt-0.5">3D Clinical Oncology Platform</div>
        </div>
        <div className="text-xs text-slate-400">Free · No paywall · Educational use only</div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-12 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Welcome to OncoViz
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 leading-tight">
            Who are you here as?
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            OncoViz serves both clinicians and patients — choose your role to get the right experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Doctor card */}
          <button
            onClick={() => setRole('doctor')}
            className="group text-left bg-white border-2 border-blue-100 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-blue-100 cursor-pointer"
          >
            <div className="text-4xl mb-5 text-blue-400 font-light group-hover:scale-110 transition-transform inline-block">✚</div>
            <h2 className="text-xl font-black text-slate-800 mb-2">I am a Doctor</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Access the full clinical platform — 3D tumor staging, TNM classification, treatment regimens, biomarker panels, and clinical report export.
            </p>
            <div className="space-y-1.5 mb-6">
              {['Interactive 3D organ models', 'NCCN treatment protocols', 'SEER survival data', 'Printable clinical reports'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-blue-400">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
              Sign in as Doctor <span>→</span>
            </div>
          </button>

          {/* Patient card */}
          <button
            onClick={() => setRole('patient')}
            className="group text-left bg-white border-2 border-blue-100 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-blue-100 cursor-pointer"
          >
            <div className="text-4xl mb-5 text-blue-400 font-light group-hover:scale-110 transition-transform inline-block">♡</div>
            <h2 className="text-xl font-black text-slate-800 mb-2">I am a Patient</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Understand your diagnosis in plain language — see your cancer in 3D, learn what your stage means, and get questions to ask your doctor.
            </p>
            <div className="space-y-1.5 mb-6">
              {['Plain-language explanations', 'Your stage in 3D', 'Survival statistics explained', 'AI assistant for questions'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-blue-400">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
              Sign in as Patient <span>→</span>
            </div>
          </button>
        </div>

        <p className="text-xs text-slate-300 mt-10 text-center max-w-md">
          Educational use only · Not a substitute for clinical judgment · Always consult your oncologist for treatment decisions
        </p>
      </div>
    </div>
  )
}
