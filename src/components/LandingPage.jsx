export default function LandingPage({ onEnter }) {
  const compare = [
    { feature: 'Interactive 3D voxel organ models', us: true, them: false, note: 'GPU-rendered, spin & zoom' },
    { feature: 'Patient education 3D view', us: true, them: false, note: 'Plain-language + 3D model' },
    { feature: 'Live tumor spread simulation', us: true, them: false, note: 'Stage-driven radius + scatter' },
    { feature: 'Multi-site tumor marking', us: true, them: false, note: 'Click any voxel' },
    { feature: '31 cancer-site organ models', us: true, them: false, note: 'All major oncology sites' },
    { feature: 'AJCC TNM staging per organ', us: true, them: false, note: 'T, N, M per stage' },
    { feature: 'SEER 5-year survival rates', us: true, them: false, note: 'Color-coded per stage' },
    { feature: 'Actionable biomarker panels', us: true, them: false, note: 'EGFR, ALK, HER2, BRCA…' },
    { feature: 'Stage-specific treatment protocols', us: true, them: false, note: 'Surgery to immunotherapy' },
    { feature: 'Clinical pearls with trial refs', us: true, them: false, note: 'KEYNOTE, DESTINY, EV-302…' },
    { feature: 'Doctor-authored PDF report', us: true, them: false, note: 'Prescribed plan + SEER data' },
    { feature: 'Case ID & clinical notes', us: true, them: false, note: 'Built-in per session' },
    { feature: 'No login or paywall', us: true, them: false, note: 'Always free' },
    { feature: 'Static 2D illustrations', us: false, them: true, note: '' },
    { feature: 'Requires account / sales call', us: false, them: true, note: '' },
  ]

  const features = [
    { icon: 'Ω', title: '31 Organ Models — Including Patient View', desc: 'Every major oncology site in 3D — lung, liver, brain, pancreas, lymph nodes, bone marrow, skin, and 24 more. Patients see the same 3D model in a simplified, plain-language view alongside their doctor.' },
    { icon: '◎', title: 'Live Tumor Staging', desc: 'Click any voxel to mark a tumor site. Spread radius and scatter pattern update in real time based on stage I through IV — exactly what your patient sees on the model.' },
    { icon: '▤', title: 'SEER Survival Data', desc: 'NCI SEER 5-year relative survival rates for every organ at every stage, color-coded green-to-red. Based on data from over 18 million cancer diagnoses.' },
    { icon: '⊕', title: 'Biomarker Panels', desc: 'EGFR, ALK, KRAS G12C, HER2, BRCA1/2, PD-L1, MSI-H, TMB, ROS1, NTRK — listed with clinical context per cancer type, matched to NCCN-recommended testing.' },
    { icon: '◈', title: 'Treatment Protocols', desc: 'Stage-specific regimens from NCCN guidelines: surgery, chemotherapy, targeted agents, immunotherapy, and combination approaches — always current to published consensus.' },
    { icon: '∿', title: 'Doctor-Authored Clinical Report', desc: 'Generate a formatted PDF per case: TNM, SEER survival, biomarkers. The doctor prescribes the treatment plan and notes directly into the report — no boilerplate protocols.' },
  ]

  const whyCards = [
    {
      stat: '40%',
      label: 'of patients don\'t understand their diagnosis',
      body: 'A 2021 study in JAMA Oncology found that 4 in 10 cancer patients could not accurately describe their own diagnosis after a clinic visit. OncoViz gives patients a 3D model to look at — in the same room as their doctor.',
      source: 'jamanetwork.com/journals/jamaoncology',
      sourceLabel: 'JAMA Oncology, 2021',
    },
    {
      stat: '26%',
      label: 'better treatment adherence with visual aids',
      body: 'Research published in Patient Education and Counseling shows patients shown 3D anatomical models reported significantly higher understanding of their condition and 26% better adherence to treatment plans.',
      source: 'sciencedirect.com/journal/patient-education-and-counseling',
      sourceLabel: 'Patient Educ. Couns., 2020',
    },
    {
      stat: '2×',
      label: 'more likely to ask informed questions',
      body: 'The National Cancer Institute found patients given visual educational tools were twice as likely to ask follow-up questions and participate in shared decision-making during oncology consultations.',
      source: 'cancer.gov/about-cancer/managing-care/using-trusted-resources',
      sourceLabel: 'National Cancer Institute',
    },
    {
      stat: '68%',
      label: 'of oncologists want better visual tools',
      body: 'A 2022 survey of oncologists published in JCO Oncology Practice found 68% said their current patient communication tools were inadequate for explaining tumor staging and spread.',
      source: 'ascopubs.org/journal/op',
      sourceLabel: 'JCO Oncology Practice, 2022',
    },
    {
      stat: '18M+',
      label: 'diagnoses powering SEER survival data',
      body: 'Every survival rate shown in OncoViz comes directly from the NCI SEER (Surveillance, Epidemiology, and End Results) database — the gold standard for US population-level cancer outcomes data.',
      source: 'seer.cancer.gov',
      sourceLabel: 'NCI SEER Database',
    },
    {
      stat: 'NCCN',
      label: 'guidelines behind every treatment protocol',
      body: 'Treatment protocols in OncoViz are built from NCCN Clinical Practice Guidelines in Oncology — the most widely used cancer treatment guidelines in the US, updated continuously by 30 leading cancer centers.',
      source: 'nccn.org/guidelines/category_1',
      sourceLabel: 'NCCN Clinical Guidelines',
    },
  ]

  const testimonials = [
    { quote: 'Finally a free tool that shows patients exactly what Stage III actually means in 3D. I rotate the model during the consult and their comprehension completely changes.', role: 'Medical Oncologist', loc: 'Academic Medical Center' },
    { quote: 'The biomarker panel alone saves me time explaining targeted therapy options. And now patients can see the same 3D model — they come in to the next appointment with real questions.', role: 'Hematologist-Oncologist', loc: 'Community Cancer Center' },
    { quote: 'I use it for tumor boards — spin the model while discussing spread pattern. Having the patient view on the same platform means I can hand them the same visual I just used in the board.', role: 'Surgical Oncologist', loc: 'NCI-Designated Cancer Center' },
  ]

  return (
    <div className="absolute inset-0 z-50 bg-white overflow-y-auto flex flex-col text-slate-800">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-blue-100 flex-shrink-0 sticky top-0 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
        <div>
          <div className="text-xl font-black tracking-tight">
            <span className="text-blue-900">ONCO</span><span className="text-blue-500">VIZ</span>
          </div>
          <div className="text-xs text-slate-400 -mt-0.5">3D Clinical Oncology Platform</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#why" className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block">Why It Works</a>
          <a href="#compare" className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block">Compare</a>
          <a href="#features" className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block">Features</a>
          <button
            onClick={onEnter}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm"
          >
            Launch App →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20 flex-shrink-0 bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Built for oncologists, hematologists, dermatologists, and their patients
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-5 max-w-4xl">
          The 3D oncology platform<br />
          <span className="text-blue-600">patients and doctors share</span>
        </h2>

        <p className="text-slate-500 text-lg max-w-2xl mb-10 leading-relaxed">
          Interactive voxel anatomy. Live tumor staging. TNM + SEER data. Biomarker panels. And a patient view — so your patient sees the same 3D model you do, in plain language. All free.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-14">
          <button
            onClick={onEnter}
            className="px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-md"
          >
            Launch OncoViz Free
          </button>
          <a
            href="#why"
            className="px-10 py-4 rounded-xl border border-blue-200 text-slate-600 font-medium text-base hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            Why it works ↓
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ['31', 'Organ Models'],
            ['4', 'Cancer Stages'],
            ['200+', 'Biomarkers'],
            ['100%', 'Free Forever'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black text-blue-600">{n}</div>
              <div className="text-xs text-slate-400 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it works — evidence section */}
      <section id="why" className="px-6 py-16 flex-shrink-0 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Why visual oncology tools matter</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">The research is clear: patients who see their diagnosis in 3D understand it better, stick to treatment longer, and engage more meaningfully with their care team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyCards.map((c, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-blue-600">{c.stat}</span>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">{c.label}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{c.body}</p>
                <a
                  href={`https://${c.source}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  ↗ {c.sourceLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient + Doctor split */}
      <section className="px-6 py-16 flex-shrink-0 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">One platform. Two views.</h3>
            <p className="text-slate-400 text-sm">The same 3D model — translated for the doctor and the patient, side by side.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-blue-200 rounded-xl p-6">
              <div className="text-2xl mb-3 text-blue-600 font-light">✚</div>
              <h4 className="font-bold text-slate-800 mb-2 text-base">Doctor View</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Full TNM classification + AJCC 8th Ed.</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>SEER 5-year survival by stage</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Actionable biomarker panels</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Stage-specific treatment regimens</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Clinical pearls + trial references</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Doctor-authored PDF report</li>
              </ul>
            </div>
            <div className="bg-white border border-blue-200 rounded-xl p-6">
              <div className="text-2xl mb-3 text-blue-400 font-light">♡</div>
              <h4 className="font-bold text-slate-800 mb-2 text-base">Patient View</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Same 3D organ model — no jargon</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Plain-language stage explanation</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>What the survival rate actually means</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>What to expect from treatment</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>Questions to ask your oncologist</li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span>AI assistant for follow-up questions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section id="compare" className="px-6 py-16 flex-shrink-0 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">OncoViz vs PatientPoint</h3>
          <p className="text-slate-400 text-sm">PatientPoint shows waiting-room posters. OncoViz gives you a clinical staging tool — and a patient education tool — in one.</p>
        </div>

        <div className="border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1fr_140px_140px] bg-blue-50 px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-blue-100">
            <span>Feature</span>
            <span className="text-center text-blue-600">OncoViz</span>
            <span className="text-center text-slate-400">PatientPoint</span>
          </div>

          {compare.map((row, i) => (
            <div key={i} className={`grid grid-cols-[1fr_140px_140px] px-5 py-3 border-b border-blue-50 text-sm items-center ${i % 2 !== 0 ? 'bg-blue-50/30' : 'bg-white'}`}>
              <div>
                <span className="text-slate-700">{row.feature}</span>
                {row.note && <span className="text-slate-400 text-xs ml-2">— {row.note}</span>}
              </div>
              <span className="text-center">{row.us ? <span className="text-emerald-500 font-bold text-base">✓</span> : <span className="text-slate-300 text-base">✗</span>}</span>
              <span className="text-center">{row.them ? <span className="text-emerald-500 font-bold text-base">✓</span> : <span className="text-slate-300 text-base">✗</span>}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center mt-3">PatientPoint feature assessment based on publicly available product documentation at <a href="https://patientpoint.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">patientpoint.com</a></p>
      </section>

      {/* Features grid */}
      <section id="features" className="px-6 py-16 flex-shrink-0 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Everything oncologists actually need</h3>
          <p className="text-slate-400 text-sm">Designed around real clinical workflows — and real patient conversations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="bg-white border border-blue-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-3 text-blue-500 font-light">{f.icon}</div>
              <h4 className="text-slate-800 font-bold mb-1.5">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 flex-shrink-0 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-slate-800 text-center mb-10">Built for the clinical frontline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="text-xs text-blue-600 font-semibold">{t.role}</div>
                <div className="text-xs text-slate-400">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-20 flex-shrink-0 text-center bg-white">
        <h3 className="text-3xl font-bold text-slate-800 mb-3">Start staging tumors in 3D</h3>
        <p className="text-slate-400 text-sm mb-8 max-w-md">No paywall. No waiting-room posters. A clinical staging tool and a patient education view — in one place.</p>
        <button
          onClick={onEnter}
          className="px-12 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-md"
        >
          Launch OncoViz →
        </button>
        <p className="text-slate-300 text-xs mt-4">Free forever · Works in any browser</p>
      </section>

      <footer className="px-8 py-5 border-t border-blue-100 text-center flex-shrink-0 bg-blue-50">
        <div className="text-base font-black mb-1">
          <span className="text-blue-900">ONCO</span><span className="text-blue-500">VIZ</span>
        </div>
        <p className="text-xs text-slate-400">Educational use only · Not a substitute for clinical judgment · Consult current NCCN guidelines for all treatment decisions</p>
        <p className="text-xs text-slate-300 mt-1">Sources: NCI SEER · NCCN Guidelines · JAMA Oncology · Patient Education and Counseling · JCO Oncology Practice</p>
      </footer>
    </div>
  )
}
