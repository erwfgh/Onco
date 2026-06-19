import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { organ, stage, highlights, message, history = [] } = req.body;

  const systemPrompt = `You are an oncology assistant inside OncViz, a 3D tumor staging tool. The doctor is viewing ${organ || 'an organ'} at TNM stage ${stage || 'unknown'}. Be clear, concise, and clinically accurate. Help doctors understand: tumor biology, staging implications, standard treatments, and generate smart questions patients should ask their doctor.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message },
  ];

  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages,
    max_tokens: 512,
  });

  res.json({ reply: completion.choices[0].message.content });
}
