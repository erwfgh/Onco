export default function LandingPage({ onEnter }) {
  const compare = [
    { feature: '3D Interactive Voxel Models', us: true, them: false },
    { feature: 'All 31 Cancer Types', us: true, them: false },
    { feature: 'TNM Staging Per Organ', us: true, them: false },
    { feature: 'Live Tumor Spread Simulation', us: true, them: false },
    { feature: '5-Year Survival by Stage', us: true, them: false },
    { feature: 'Actionable Biomarker Panel', us: true, them: false },
    { feature: 'Stage-Specific Treatment Protocols', us: true, them: false },
    { feature: 'Clinical Pearls (Trial-Referenced)', us: true, them: false },
    { feature: 'Multi-Site Tumor Marking', us: true, them: false },
    { feature: 'Free & Open Access', us: true, them: false },
    { feature: 'No Account Required', us: true, them: false },
    { feature: 'Static 2D Illustrations', us: false, them: true },
  ]

  const features = [
    { icon: '🧠', title: '31 Organ Models', desc: 'Full coverage: lung, liver, brain, pancreas, lymph nodes, skin, bone marrow, and 24 more — every cancer type oncologists encounter daily.' },
    { icon: '🎯', title: 'TNM Staging Engine', desc: 'Real AJCC TNM values per organ per stage. T, N, M breakdown with stage-appropriate descriptions for every model.' },
    { icon: '📊', title: 'SEER Survival Data', desc: '5-year relative survival rates from NCI SEER database, stratified by stage. Visual color coding: green to red.' },
    { icon: '🧬', title: 'Biomarker Panels', desc: 'EGFR, ALK, KRAS, HER2, BRCA, PD-L1, MSI-H, TMB and dozens more — with context on when each matters.' },
    { icon: '💊', title: 'Treatment Protocols', desc: 'Stage-specific regimens: surgery, chemo, targeted agents, immunotherapy. Referenced to current NCCN guidelines and landmark trials.' },
    { icon: '✨', title: 'Live Spread Simulation', desc: 'Click any voxel to mark tumor sites. Stage drives spread radius and scatter. Stage IV shows realistic metastatic scatter pattern.' },
  ]

  return (
    <div className="absolute inset-0 z-50 bg-[#060d1a] overflow-y-auto flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800 flex-shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-tight">
            <span className="text-white">ONCO</span><span className="text-violet-400">VIZ</span>
          </h1>
          <p className="text-xs text-slate-600 -mt-0.5">3D Clinical Oncology Platform</p>
        </div>
        <button
          onClick={onEnter}
          className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
        >
          Open App →
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-16 flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-700/50 bg-violet-900/20 text-violet-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Built for oncologists · hematologists · dermatologists
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 max-w-3xl">
          The 3D oncology tool<br />
          <span className="text-violet-400">PatientPoint can't match</span>
        </h2>

        <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
          Interactive voxel anatomy, live tumor staging, TNM classification, survival data, biomarker panels and treatment protocols — all in one free platform.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={onEnter}
            className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all hover:shadow-lg hover:shadow-violet-900/40"
          >
            Launch OncoViz
          </button>
          <a
            href="#compare"
            className="px-8 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium text-base hover:border-slate-500 transition-colors"
          >
            See Comparison ↓
          </a>
        </div>

        <div className="flex gap-8 mt-12 text-center">
          {[['31', 'Organ Models'], ['4', 'Cancer Stages'], ['200+', 'Biomarkers'], ['100%', 'Free']].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-violet-300">{n}</div>
              <div className="text-xs text-slate-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 flex-shrink-0 max-w-5xl mx-auto w-full">
        <h3 className="text-xl font-bold text-slate-200 text-center mb-8">Everything oncologists actually need</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="bg-[#0d1b2e] border border-slate-700/60 rounded-xl p-4 hover:border-violet-700/50 transition-colors">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h4 className="text-slate-200 font-semibold mb-1">{f.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="px-6 py-12 flex-shrink-0 max-w-3xl mx-auto w-full">
        <h3 className="text-xl font-bold text-slate-200 text-center mb-2">OncoViz vs PatientPoint</h3>
        <p className="text-slate-500 text-sm text-center mb-8">A direct feature comparison</p>

        <div className="bg-[#0d1b2e] border border-slate-700/60 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-800/50 px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center text-violet-400">OncoViz</span>
            <span className="text-center text-slate-600">PatientPoint</span>
          </div>
          {compare.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 px-4 py-2.5 text-sm border-t border-slate-800 ${i % 2 === 0 ? '' : 'bg-slate-900/20'}`}>
              <span className="text-slate-400 text-xs">{row.feature}</span>
              <span className="text-center">{row.us ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-slate-700">✗</span>}</span>
              <span className="text-center">{row.them ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-slate-700">✗</span>}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-16 flex-shrink-0 text-center border-t border-slate-800 mt-4">
        <h3 className="text-2xl font-bold text-white mb-3">Ready to stage tumors in 3D?</h3>
        <p className="text-slate-500 text-sm mb-6">No login. No paywall. Just clinical tools.</p>
        <button
          onClick={onEnter}
          className="px-10 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-violet-900/40"
        >
          Launch OncoViz Free →
        </button>
      </section>

      <footer className="px-8 py-4 border-t border-slate-800 text-center flex-shrink-0">
        <p className="text-xs text-slate-700">OncoViz · Educational use only · Not a substitute for clinical judgment · Consult NCCN guidelines</p>
      </footer>
    </div>
  )
}
