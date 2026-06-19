export default function handler(req, res) {
  res.json({
    hasGroqKey: !!process.env.GROQ_API_KEY,
    keyLength: process.env.GROQ_API_KEY?.length ?? 0,
    node: process.version,
  })
}
