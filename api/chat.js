import Groq from 'groq-sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ error: 'GROQ_API_KEY not configured' })
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const { organ, stage, message, history = [], patientMode = false } = req.body

  if (!message) return res.status(400).json({ error: 'No message provided' })

  const systemPrompt = patientMode
    ? `You are a compassionate oncology assistant helping patients understand cancer. Explain medical terms in plain, simple English. Be warm, clear, and reassuring. Cover topics like: what cancer is, types, treatments (chemotherapy, immunotherapy, radiation, surgery), side effects, and questions to ask doctors. Always remind users to consult their own doctor for personal medical advice.`
    : `You are an oncology assistant inside OncoViz, a 3D tumor staging tool. The doctor is viewing ${organ || 'an organ'} at TNM stage ${stage || 'unknown'}. Be clear, concise, and clinically accurate.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10),
    { role: 'user', content: message },
  ]

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages,
      max_tokens: 512,
    })
    res.json({ reply: completion.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
