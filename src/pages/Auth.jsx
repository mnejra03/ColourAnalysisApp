import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate('/analysis')
      } else {
        const { error } = await signUp(email, password)
        if (error) throw error
        setMessage('Check your email to confirm your account!')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-quote">
          <span className="auth-quote-mark">"</span>
          <p>Colour is a power which directly influences the soul.</p>
          <cite>— Wassily Kandinsky</cite>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap fade-up">
          <div className="auth-logo">◈ Chromia</div>
          <h2>{mode === 'signin' ? 'Welcome back' : 'Create account'}</h2>
          <p className="auth-sub">
            {mode === 'signin' ? 'Sign in to access your colour profile.' : 'Start your personal colour journey.'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>

            {error && <p className="auth-error">{error}</p>}
            {message && <p className="auth-success">{message}</p>}

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? <span className="loader" /> : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="auth-toggle">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage('') }}>
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}