import { useState } from 'react'
import { SignIn, useUser, useAuth } from '@clerk/clerk-react'

export default function Paywall({ children }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [loading, setLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  const handleCheckout = async () => {
    setLoading(true)
    setCheckoutError(null)
    try {
      const token = await getToken()
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err.message)
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-blue-50 px-4">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🔬</div>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-800">
            ONCO<span className="text-blue-600">VIZ</span>
          </h1>
          <p className="text-slate-500 text-sm">3D Voxel Tumor Staging for Clinicians</p>
        </div>
        <SignIn routing="hash" />
      </div>
    )
  }

  const isSubscribed = user?.publicMetadata?.subscribed === true
  const trialEnd = user?.publicMetadata?.trialEnd
  const inTrial = trialEnd && new Date(trialEnd) > new Date()

  if (!isSubscribed && !inTrial) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-blue-50 px-4">
        <div className="max-w-md w-full bg-white border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
          <div className="text-4xl mb-4">🔬</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Subscribe to OncoViz</h2>
          <p className="text-slate-500 text-sm mb-6">
            Full access to 3D tumor staging for all organs. Start with a free 7-day trial — no charge until day 8.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="text-3xl font-black text-slate-800">$19<span className="text-lg font-normal text-slate-400">/month</span></div>
            <div className="text-blue-600 text-sm mt-1 font-medium">7-day free trial included</div>
          </div>

          <ul className="text-slate-600 text-sm text-left space-y-2 mb-6">
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> All organs & tumor stages</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Interactive 3D voxel models</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Explore organ interiors in 3D</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> AI patient communication assistant</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Cancel anytime</li>
          </ul>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="block w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold transition-colors"
          >
            {loading ? 'Redirecting to checkout...' : 'Start Free Trial'}
          </button>

          {checkoutError && (
            <p className="text-red-500 text-xs mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {checkoutError}
            </p>
          )}

          <p className="text-slate-400 text-xs mt-4">
            Signed in as {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    )
  }

  return children
}
