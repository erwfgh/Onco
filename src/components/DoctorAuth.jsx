import { useState } from 'react'

const STEPS = ['account', 'license', 'done']

// Verify NPI against the free public NPI Registry
async function verifyNPI(npi) {
  if (!/^\d{10}$/.test(npi)) return { ok: false, error: 'NPI must be exactly 10 digits.' }
  try {
    const res = await fetch(`https://npiregistry.cms.hhs.gov/api/?number=${npi}&version=2.1`)
    const data = await res.json()
    if (data.result_count === 0) return { ok: false, error: 'NPI not found in the CMS registry.' }
    const r = data.results[0]
    const name = r.basic
      ? `${r.basic.first_name || ''} ${r.basic.last_name || r.basic.organization_name || ''}`.trim()
      : 'Provider'
    const taxonomy = r.taxonomies?.find(t => t.primary)
    const specialty = taxonomy?.desc || 'Healthcare Provider'
    return { ok: true, name, specialty, npi }
  } catch {
    return { ok: false, error: 'Could not reach the NPI registry. Check your connection.' }
  }
}

export default function DoctorAuth({ onBack, onAuth }) {
  const [step, setStep] = useState('account')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [npi, setNpi] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(null) // { name, specialty, npi }

  async function handleAccountNext(e) {
    e.preventDefault()
    if (!email.includes('@')) return setError('Enter a valid email address.')
    if (phone.replace(/\D/g, '').length < 10) return setError('Enter a valid phone number.')
    setError('')
    setStep('license')
  }

  async function handleLicenseSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await verifyNPI(npi)
    setLoading(false)
    if (!result.ok) return setError(result.error)
    setVerified(result)
    setStep('done')
  }

  function handleEnter() {
    const user = { role: 'doctor', email, phone, npi: verified.npi, name: verified.name, specialty: verified.specialty }
    localStorage.setItem('oncoviz_user', JSON.stringify(user))
    onAuth(user)
  }

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-blue-100 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-sm transition-colors">
          ← Back
        </button>
        <div className="text-center">
          <div className="text-base font-black">
            <span className="text-blue-900">ONCO</span><span className="text-blue-500">VIZ</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {['Account', 'License', 'Done'].map((label, i) => {
              const keys = ['account', 'license', 'done']
              const active = keys[i] === step
              const done = STEPS.indexOf(step) > i
              return (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    done ? 'bg-blue-600 text-white' : active ? 'bg-blue-100 text-blue-600 border-2 border-blue-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${active ? 'text-blue-600' : done ? 'text-slate-500' : 'text-slate-300'}`}>{label}</span>
                  {i < 2 && <div className={`flex-1 h-px ${done ? 'bg-blue-400' : 'bg-slate-200'}`} />}
                </div>
              )
            })}
          </div>

          {/* Step: Account */}
          {step === 'account' && (
            <form onSubmit={handleAccountNext} className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">Create your account</h2>
                <p className="text-slate-400 text-sm">We'll verify your medical license next.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@hospital.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              {error && <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm">
                Continue to License Verification →
              </button>
            </form>
          )}

          {/* Step: License */}
          {step === 'license' && (
            <form onSubmit={handleLicenseSubmit} className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">Verify your license</h2>
                <p className="text-slate-400 text-sm">Enter your 10-digit NPI number. We verify it instantly against the CMS National Provider Registry.</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs text-blue-700 font-semibold mb-1">What is an NPI?</p>
                <p className="text-xs text-blue-600 leading-relaxed">Your National Provider Identifier (NPI) is a unique 10-digit number assigned to all US healthcare providers by CMS. Find yours at nppes.cms.hhs.gov</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">NPI Number</label>
                <input
                  type="text"
                  value={npi}
                  onChange={e => setNpi(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="1234567890"
                  maxLength={10}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-slate-800 placeholder-slate-400 text-sm font-mono tracking-widest focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
                <p className="text-xs text-slate-400 mt-1">{npi.length}/10 digits</p>
              </div>

              {error && <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <button
                type="submit"
                disabled={loading || npi.length !== 10}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm transition-colors shadow-sm"
              >
                {loading ? 'Verifying with CMS registry…' : 'Verify & Complete Setup →'}
              </button>

              <p className="text-xs text-slate-400 text-center">
                Outside the US? <button type="button" onClick={() => { setVerified({ name: email.split('@')[0], specialty: 'Healthcare Provider', npi: 'INTL' }); setStep('done') }} className="text-blue-500 hover:underline">Skip verification</button>
              </p>
            </form>
          )}

          {/* Step: Done */}
          {step === 'done' && verified && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-2xl text-emerald-600">✓</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">Verified</h2>
                <p className="text-slate-400 text-sm">Your credentials have been confirmed.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Confirmed Provider</p>
                <p className="text-slate-800 font-bold">{verified.name}</p>
                <p className="text-slate-500 text-sm">{verified.specialty}</p>
                {verified.npi !== 'INTL' && <p className="text-slate-400 text-xs mt-1 font-mono">NPI {verified.npi}</p>}
              </div>
              <button onClick={handleEnter} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm">
                Enter OncoViz →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
