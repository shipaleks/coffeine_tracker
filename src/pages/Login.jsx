import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signInWithOtp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signInWithOtp(email)
    setLoading(false)
    if (!error) {
      setSent(true)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 8 }}>☕ Caffeine Tracker</h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 24 }}>
          Отслеживайте потребление кофеина
        </p>

        {sent ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h3 style={{ marginBottom: 8 }}>Ссылка отправлена!</h3>
            <p style={{ color: '#6b7280' }}>
              Проверьте почту {email} и перейдите по ссылке для входа.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 16 }}
                disabled={loading}
              >
                {loading ? 'Отправка...' : 'Отправить ссылку для входа'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
