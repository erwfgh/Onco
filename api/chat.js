export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'GROQ_API_KEY not configured on this server' })
  }

  const { organ, stage, message, history = [], patientMode = false } = req.body
  if (!message) return res.status(400).json({ error: 'No message provided' })

  const systemPrompt = patientMode
    ? `You are a compassionate oncology assistant helping patients understand cancer. Explain medical terms in plain, simple English. Be warm, clear, and reassuring. Always remind users to consult their own doctor for personal medical advice.`
    : `You are an oncology assistant inside OncoViz, a 3D tumor staging tool. The doctor is viewing ${organ || 'an organ'} at TNM stage ${stage || 'unknown'}. Be clear, concise, and clinically accurate.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10),
    { role: 'user', content: message },
  ]

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'llama3-8b-8192', messages, max_tokens: 512 }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.text()
      return res.status(502).json({ error: `Groq error ${groqRes.status}: ${err}` })
    }

    const data = await groqRes.json()
    res.json({ reply: data.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
