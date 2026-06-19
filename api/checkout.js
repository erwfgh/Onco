import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  
  let userId = null;
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    userId = payload.sub;
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const baseUrl = process.env.VITE_APP_URL || 'http://localhost:5173';
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    subscription_data: { trial_period_days: 7 },
    success_url: baseUrl + '?success=true',
    cancel_url: baseUrl + '?canceled=true',
    metadata: { clerkUserId: userId },
  });

  res.json({ url: session.url });
}
