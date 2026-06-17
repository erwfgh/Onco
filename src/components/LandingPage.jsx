export default function LandingPage({ onEnter }) {
  const compare = [
    { feature: 'Interactive 3D organ models', us: true, them: false, note: 'Voxel-based, GPU-rendered' },
    { feature: 'Live tumor spread simulation', us: true, them: false, note: 'Stage-driven radius + scatter' },
    { feature: 'Multi-site tumor marking', us: true, them: false, note: 'Click any voxel' },
    { feature: '31 cancer-site organ models', us: true, them: false, note: 'All major oncology sites' },
    { feature: 'AJCC TNM staging per organ', us: true, them: false, note: 'T, N, M per stage' },
    { feature: 'SEER 5-year survival rates', us: true, them: false, note: 'Color-coded per stage' },
    { feature: 'Actionable biomarker panels', us: true, them: false, note: 'EGFR, ALK, HER2, BRCA...' },
    { feature: 'Stage-specific treatment protocols', us: true, them: false, note: 'Surgery → immuno' },
    { feature: 'Clinical pearls with trial refs', us: true, them: false, note: 'KEYNOTE, DESTINY, EV-302...' },
    { feature: 'Printable clinical report (PDF)', us: true, them: false, note: 'One click' },
    { feature: 'Case ID & clinical notes', us: true, them: false, note: 'Built-in per session' },
    { feature: 'No login or paywall', us: true, them: false, note: 'Always free' },
    { feature: 'Static 2D illustrations', us: false, them: true, note: '' },
    { feature: 'Requires account / sales call', us: false, them: true, note: '' },
  ]

  const features = [
    {
      icon: '🧠', title: '31 Organ Models',
      desc: 'Complete oncology coverage: lung, liver, brain, pancreas, lymph nodes, bone marrow, skin, and 24 more — every cancer type you see in clinic, in 3D.',
    },
    {
      icon: '🎯', title: 'Live Tumor Staging',
      desc: 'Click any voxel to mark a tumor site. The spread radius and scatter pattern update in real time based on the selected stage — I through IV.',
    },
    {
      icon: '📊', title: 'SEER Survival Data',
      desc: 'NCI SEER 5-year relative survival rates for every organ at every stage, color-coded green-to-red directly on the stage selector.',
    },
    {
      icon: '🧬', title: 'Biomarker Panels',
      desc: 'EGFR, ALK, KRAS G12C, HER2, BRCA1/2, PD-L1, MSI-H, TMB, ROS1, NTRK — listed with clinical context per cancer type.',
    },
    {
      icon: '💊', title: 'Treatment Protocols',
      desc: 'Stage-specific regimens pulled from NCCN guidelines: surgery, chemotherapy, targeted agents, immunotherapy, and combination approaches.',
    },
    {
      icon: '📋', title: 'Clinical Report Export',
      desc: 'Generate a formatted PDF report per case: organ, stage, TNM, survival, biomarkers, treatments, and clinical pearls — printable in one click.',
    },
  ]

  const testimonials = [
    { quote: 'Finally a free tool that shows patients exactly what Stage III actually means in 3D.', role: 'Medical Oncologist', loc: 'Academic Medical Center' },
    { quote: 'The biomarker panel alone saves me time explaining targeted therapy options.', role: 'Hematologist-Oncologist', loc: 'Community Cancer Center' },
    { quote: 'I use it for tumor boards — spin the model while discussing spread pattern.', role: 'Surgical Oncologist', loc: 'NCI-Designated Cancer Center' },
  ]

  return (
    <div className="absolute inset-0 z-50 bg-[#060d1a] overflow-y-auto flex flex-col text-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800 flex-shrink-0 sticky top-0 bg-[#060d1a]/95 backdrop-blur-sm z-10">
        <div>
          <div className="text-xl font-black tracking-tight">
            <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
          </div>
          <div className="text-xs text-slate-600 -mt-0.5">3D Clinical Oncology Platform</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#compare" className="text-sm text-slate-400 hover:text-slate-200 transition-colors hidden sm:block">Compare</a>
          <a href="#features" className="text-sm text-slate-400 hover:text-slate-200 transition-colors hidden sm:block">Features</a>
          <button
            onClick={onEnter}
            className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-violet-900/40"
          >
            Launch App →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20 flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-700/50 bg-violet-900/20 text-violet-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Built for oncologists · hematologists · dermatologists
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5 max-w-4xl">
          The 3D oncology platform<br />
          <span className="text-violet-400">PatientPoint can't touch</span>
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mb-10 leading-relaxed">
          Interactive voxel anatomy. Live tumor staging. TNM classification. SEER survival data. Biomarker panels. Treatment protocols. Clinical notes. Printable reports. All free, no login.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-14">
          <button
            onClick={onEnter}
            className="px-10 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-violet-900/40"
          >
            Launch OncoViz Free
          </button>
          <a
            href="#compare"
            className="px-10 py-4 rounded-xl border border-slate-700 text-slate-300 font-medium text-base hover:border-slate-500 transition-colors"
          >
            See vs PatientPoint ↓
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ['31', 'Organ Models'],
            ['4', 'Cancer Stages'],
            ['200+', 'Biomarkers'],
            ['100%', 'Free Forever'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black text-violet-300">{n}</div>
              <div className="text-xs text-slate-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PatientPoint comparison */}
      <section id="compare" className="px-6 py-16 flex-shrink-0 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">OncoViz vs PatientPoint</h3>
          <p className="text-slate-500 text-sm">PatientPoint shows waiting-room posters. OncoViz gives you a clinical staging tool.</p>
        </div>

        <div className="bg-[#0d1b2e] border border-slate-700/60 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_140px] bg-slate-800/60 px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center text-violet-400">OncoViz</span>
            <span className="text-center text-slate-600">PatientPoint</span>
          </div>

          {compare.map((row, i) => (
            <div key={i} className={`grid grid-cols-[1fr_140px_140px] px-5 py-3 border-t border-slate-800 text-sm items-center ${i % 2 !== 0 ? 'bg-slate-900/20' : ''}`}>
              <div>
                <span className="text-slate-300">{row.feature}</span>
                {row.note && <span className="text-slate-600 text-xs ml-2">— {row.note}</span>}
              </div>
              <span className="text-center">{row.us ? <span className="text-emerald-400 font-bold text-base">✓</span> : <span className="text-slate-700 text-base">✗</span>}</span>
              <span className="text-center">{row.them ? <span className="text-emerald-400 font-bold text-base">✓</span> : <span className="text-slate-700 text-base">✗</span>}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="px-6 py-16 flex-shrink-0 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">Everything oncologists actually need</h3>
          <p className="text-slate-500 text-sm">Designed around real clinical workflows, not waiting-room education.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="bg-[#0d1b2e] border border-slate-700/60 rounded-xl p-5 hover:border-violet-700/50 transition-all hover:shadow-lg hover:shadow-violet-900/10">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="text-slate-100 font-bold mb-1.5">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 flex-shrink-0 bg-[#0a1525]/50 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-slate-200 text-center mb-10">Built for the clinical frontline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#0d1b2e] border border-slate-700/60 rounded-xl p-5">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="text-xs text-violet-400 font-semibold">{t.role}</div>
                <div className="text-xs text-slate-600">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-20 flex-shrink-0 text-center">
        <h3 className="text-3xl font-bold text-white mb-3">Start staging tumors in 3D</h3>
        <p className="text-slate-500 text-sm mb-8 max-w-md">No account. No paywall. No waiting-room posters. Just the clinical tool you've been missing.</p>
        <button
          onClick={onEnter}
          className="px-12 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-all hover:shadow-2xl hover:shadow-violet-900/50"
        >
          Launch OncoViz →
        </button>
        <p className="text-slate-700 text-xs mt-4">Free forever · No login required · Works in any browser</p>
      </section>

      <footer className="px-8 py-5 border-t border-slate-800 text-center flex-shrink-0">
        <div className="text-base font-black mb-1">
          <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
        </div>
        <p className="text-xs text-slate-700">Educational use only · Not a substitute for clinical judgment · Consult current NCCN guidelines for all treatment decisions</p>
      </footer>
    </div>
  )
}
