import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const seasonEmoji = { Spring: '🌸', Summer: '🌊', Autumn: '🍂', Winter: '❄️' }
const seasonBg = {
  Spring: 'linear-gradient(135deg, #FFF0E6, #F9D9C0)',
  Summer: 'linear-gradient(135deg, #EEF0F8, #DDE0EE)',
  Autumn: 'linear-gradient(135deg, #F5EDE0, #EDD8B8)',
  Winter: 'linear-gradient(135deg, #EAF0F8, #D8E4F0)',
}

const getColorName = (color, i) => {
  if (typeof color === "string") return `Colour ${i + 1}`
  return color.name
}

export default function Profile() {
  const { user } = useAuth()
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { fetchAnalyses() }, [])

  const fetchAnalyses = async () => {
    setLoading(true)
    const { data } = await supabase.from('analyses').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setAnalyses(data || [])
    setLoading(false)
  }

  const deleteAnalysis = async (id) => {
    await supabase.from('analyses').delete().eq('id', id)
    setAnalyses((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header fade-up">
          <div>
            <h1>My Colour Profile</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <Link to="/analysis" className="btn btn-primary">+ New Analysis</Link>
        </div>

        {loading ? (
          <div className="profile-loading"><div className="loader" /></div>
        ) : analyses.length === 0 ? (
          <div className="profile-empty fade-up">
            <div className="empty-icon">◈</div>
            <h2>No analyses yet</h2>
            <p>Complete your first colour analysis to see your results here.</p>
            <Link to="/analysis" className="btn btn-primary">Begin Analysis</Link>
          </div>
        ) : (
          <div className="analyses-list fade-up" style={{ animationDelay: '0.1s' }}>
            {analyses.map((a) => (
              <div key={a.id} className="analysis-item">
                <div className="analysis-item-header" style={{ background: seasonBg[a.season] || seasonBg.Spring }} onClick={() => setExpanded(expanded === a.id ? null : a.id)}>
                  <div className="analysis-item-main">
                    <span className="analysis-emoji">{seasonEmoji[a.season]}</span>
                    <div>
                      <h3>{a.subtype || a.season}</h3>
                      <p>{a.undertone} Undertone · via {a.method === 'photo' ? 'Photo' : 'Quiz'}</p>
                    </div>
                  </div>
                  <div className="analysis-item-right">
                    <div className="analysis-mini-palette">
                      {a.palette?.slice(0, 5).map((color, i) => {
                        const hex = typeof color === "string" ? color : color.hex

                        return (
                          <div
                            key={hex + i}
                            style={{ background: hex }}
                          />
                        )
                      })}
                    </div>
                    <span className="analysis-date">{new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className={`expand-icon ${expanded === a.id ? 'open' : ''}`}>›</span>
                  </div>
                </div>

                {expanded === a.id && (
                  <div className="analysis-item-body fade-in">
                    <div className="detail-grid">
                      <div className="detail-block">
                        <h4>Natural Colouring</h4>
                        <p>{a.characteristics}</p>
                      </div>
                      <div className="detail-block">
                        <h4>Full Palette</h4>
                        <div className="detail-palette">
                          {a.palette?.map((color, i) => {
                            const hex = typeof color === "string" ? color : color.hex
                            const name = getColorName(color, i)

                            return (
                              <div key={hex + i} className="palette-swatch">
                                <div
                                  className="swatch-color"
                                  style={{ background: hex }}
                                />
                                <span>{name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="detail-block"><h4>Wear</h4><p>{a.best_colors}</p></div>
                      <div className="detail-block"><h4>Avoid</h4><p>{a.avoid_colors}</p></div>
                      <div className="detail-block detail-block-wide"><h4>Makeup & Styling</h4><p>{a.makeup_tips}</p></div>
                      {a.celebrities?.length > 0 && (
                        <div className="detail-block">
                          <h4>Season Twins</h4>
                          <div className="celebrity-list">
                            {a.celebrities.map((c) => (<span key={c} className="celebrity-chip">{c}</span>))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="delete-btn" onClick={() => deleteAnalysis(a.id)}>Delete this analysis</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}