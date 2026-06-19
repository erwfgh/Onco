import { useState } from 'react'

export default function PatientAuth({ onBack, onAuth }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Please enter your name.')
    if (!email.includes('@')) return setError('Enter a valid email address.')
    if (phone.replace(/\D/g, '').length < 10) return setError('Enter a valid phone number.')
    setError('')
    const user = { v: 3, role: 'patient', email, phone, name: name.trim() }
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
        <div className="w-full max-w-md space-y-6">

          <div className="text-center">
            <div className="text-5xl mb-4 text-blue-400 font-light">♡</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Patient Sign In</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We'll guide you through your diagnosis in plain language — with 3D models, survival information, and an AI assistant to answer your questions.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs text-blue-700 font-semibold mb-1">Your privacy matters</p>
            <p className="text-xs text-blue-600 leading-relaxed">Your information is stored only on this device. We never share your data with anyone.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Your name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First name"
                required
                className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
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
              Enter Patient View →
            </button>
          </form>

          <p className="text-xs text-slate-300 text-center">
            Educational use only · Always discuss your diagnosis with your oncologist
          </p>
        </div>
      </div>
    </div>
  )
}
