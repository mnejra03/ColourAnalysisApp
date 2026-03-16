import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Results.css'

const seasonEmoji = { Spring: '🌸', Summer: '🌊', Autumn: '🍂', Winter: '❄️' }
const seasonDesc = {
  Spring: 'Warm, fresh, and golden — you light up in peach, coral, warm greens, and golden yellows.',
  Summer: 'Cool, soft, and elegant — you shine in dusty rose, lavender, powder blue, and soft plum.',
  Autumn: 'Rich, warm, and earthy — you glow in rust, olive, burnt orange, and deep teal.',
  Winter: 'Cool, clear, and dramatic — you dazzle in icy pastels, pure white, black, and jewel tones.',
}

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(null)

  const result = state?.result

  useEffect(() => {
    if (!result) navigate('/analysis')
  }, [result, navigate])

  if (!result) return null

  const saveResult = async () => {
    setSaving(true)
    try {
      await supabase.from('analyses').insert({
        user_id: user.id,
        season: result.season,
        subtype: result.subtype,
        undertone: result.undertone,
        characteristics: result.characteristics,
        palette: result.palette,
        colour_names: result.colourNames,
        best_colors: result.bestColors,
        avoid_colors: result.avoidColors,
        makeup_tips: result.makeupTips,
        celebrities: result.celebrities,
        method: state.method,
      })
      setSaved(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="results-page">
      <div className={`results-banner results-banner-${result.season?.toLowerCase()}`}>
        <div className="container">
          <div className="banner-content fade-up">
            <span className="banner-emoji">{seasonEmoji[result.season]}</span>
            <div>
              <p className="banner-eyebrow">Your Season</p>
              <h1 className="banner-season">{result.subtype || result.season}</h1>
              <p className="banner-undertone">{result.undertone} Undertone</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container results-content">
        <section className="result-section fade-up">
          <div className="result-card result-card-wide">
            <h2>Your Natural Colouring</h2>
            <p className="result-text">{result.characteristics}</p>
            <p className="result-season-desc">{seasonDesc[result.season]}</p>
          </div>
        </section>

        <section className="result-section fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title">Your Colour Palette</h2>
          <p className="section-sub">Click any swatch to copy the hex code.</p>
          <div className="palette-grid">
            {result.palette?.map((hex, i) => (
              <button key={hex} className="palette-swatch" onClick={() => copyHex(hex)}>
                <div className="swatch-color" style={{ background: hex }} />
                <div className="swatch-info">
                  <span className="swatch-name">{result.colourNames?.[i] || `Colour ${i + 1}`}</span>
                  <span className="swatch-hex">{copied === hex ? 'Copied!' : hex}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="result-section result-two-col fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="result-card result-card-green">
            <div className="result-card-icon">✓</div>
            <h3>Wear These</h3>
            <p>{result.bestColors}</p>
          </div>
          <div className="result-card result-card-red">
            <div className="result-card-icon">✕</div>
            <h3>Avoid These</h3>
            <p>{result.avoidColors}</p>
          </div>
        </section>

        <section className="result-section fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="result-card">
            <h2>Makeup & Styling Tips</h2>
            <p className="result-text">{result.makeupTips}</p>
          </div>
        </section>

        {result.celebrities?.length > 0 && (
          <section className="result-section fade-up" style={{ animationDelay: '0.25s' }}>
            <div className="result-card">
              <h2>Your Season Twin</h2>
              <p className="result-sub-text">These celebrities share your colouring:</p>
              <div className="celebrity-list">
                {result.celebrities.map((c) => (
                  <span key={c} className="celebrity-chip">{c}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="results-actions fade-up" style={{ animationDelay: '0.3s' }}>
          {!saved ? (
            <button className="btn btn-primary" onClick={saveResult} disabled={saving}>
              {saving ? <><span className="loader" /> Saving…</> : '⊕ Save to My Profile'}
            </button>
          ) : (
            <span className="saved-badge">✓ Saved to your profile</span>
          )}
          <Link to="/analysis" className="btn btn-ghost">↺ Analyse Again</Link>
          <Link to="/profile" className="btn btn-outline">View My Profile</Link>
        </div>
      </div>
    </div>
  )
}